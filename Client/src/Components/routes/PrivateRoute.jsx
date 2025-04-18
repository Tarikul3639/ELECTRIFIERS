import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import socket from "../socket/Socket.jsx";

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (token && user && !socket.connected) {
      socket.connect();
      socket.emit("user:connected", user);
    }
  }, [token, user]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;