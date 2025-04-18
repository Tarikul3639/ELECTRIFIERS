import { Navigate,useLocation  } from "react-router-dom";
import { useEffect,useRef } from "react";
import socket from "../socket/Socket.jsx";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const initialized = useRef(false);

  useEffect(() => {
    if (token && user && !socket.connected && !initialized.current) {
      socket.connect();
      socket.emit("user:connected", user);
      initialized.current = true;
    }
  }, [token, user]);

  if (!token) {
    // return <Navigate to="/login" replace state={{from:location}} />;
  }

  return children;
};

export default PrivateRoute;