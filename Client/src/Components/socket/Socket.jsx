// Client/src/config/socket.js
import { io } from "socket.io-client";

// Create socket instance
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  autoConnect: false,
  transports: ["websocket"], // Using WebSocket only for better performance
  withCredentials: true,
});

// Example socket events
socket.on("connect", () => {
  console.log("Connected to socket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from socket server");
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

// Optionally, you can listen for server-side events
socket.on("pong", () => {
  console.log("Received pong from server");
});

// Export socket for use in other components
export default socket;
