import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    let mounted = true;

    const checkAdmin = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-admin`, {
          method: "GET",
          signal: abortController.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!mounted) return;

        // console.log("Admin verification response:", data);
        if (response.ok && data.isAdmin) {
          setIsVerified(true);
        } else {
          toast.error("You are not authorized to access this page.");
          setIsVerified(false);
        }
      } catch (error) {
        if (!mounted) return;
        console.error("Error verifying admin:", error);
        toast.error("An error occurred while verifying admin status.");
        setIsVerified(false);
      }
    };

    checkAdmin();
    return () => {
      abortController.abort();
      mounted = false;
    };
  }, []);

  if (isVerified === null) {
    return <div>Loading...</div>;
  }

  if (!isVerified) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
