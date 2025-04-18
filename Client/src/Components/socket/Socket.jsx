// Client/src/config/socket.js
import { io } from "socket.io-client";

// Create socket instance
const socket = io(import.meta.env.VITE_BACKEND_URL, {
  autoConnect: false,
  transports: ["websocket"], 
  withCredentials: true,
});

// Example socket events
socket.on("connect", () => {
  console.log("✅ Connected to socket server");
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from socket server");
});

socket.on("connect_error", (error) => {
  console.error("❌ Connection error:", error);
});

// Export socket for use in other components
export default socket;
