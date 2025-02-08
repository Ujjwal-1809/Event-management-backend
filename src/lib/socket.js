// import { Server } from "socket.io";

// let io;

// export const initializeSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173", // Update this with your frontend URL
//       methods: ["GET", "POST"]
//     }
//   });

//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     socket.on("joinEvent", (eventId) => {
//       console.log(`User joined event: ${eventId}`);
//       io.emit("updateAttendees", eventId); // Broadcast update to all clients
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });
//   });
// };

// export const getIO = () => {
//   if (!io) {
//     throw new Error("Socket.io not initialized!");
//   }
//   return io;
// };
