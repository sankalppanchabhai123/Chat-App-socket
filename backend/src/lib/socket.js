import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chatapp-o6be.onrender.com"
    ],
  },
});

// Used to store online users: { userId: socketId }
const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId] || null;
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`✅ User connected: ${userId} -> Socket ID: ${socket.id}`);
  }

  // Emit updated list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("call-user", ({ to, from, signal }) => {
    const receiverSocketId = getReceiverSocketId(to);
    if (receiverSocketId) {
      console.log(`📞 Calling user ${to} from ${from}`);
      io.to(receiverSocketId).emit("incoming-call", { from, signal });
    } else {
      console.warn(`⚠️ User ${to} is offline or not found.`);
    }
  });

  socket.on("answer-call", ({ to, signal }) => {
    const callerSocketId = getReceiverSocketId(to);
    if (callerSocketId) {
      console.log(`✅ Call answered by ${userId} for ${to}`);
      io.to(callerSocketId).emit("call-answered", { signal });
    } else {
      console.warn(`⚠️ Caller ${to} not found.`);
    }
  });

  socket.on("ice-candidate", ({ candidate, to }) => {
    const receiverSocketId = getReceiverSocketId(to);
    if (receiverSocketId) {
      console.log(`❄️ Sending ICE candidate from ${userId} to ${to}`);
      io.to(receiverSocketId).emit("ice-candidate", { candidate, from: userId });
    } else {
      console.warn(`⚠️ ICE candidate receiver ${to} not found.`);
    }
  });

  socket.on("end-call", ({ to }) => {
    const receiverSocketId = getReceiverSocketId(to);
    if (receiverSocketId) {
      console.log(`🚫 Call ended by ${userId} for ${to}`);
      io.to(receiverSocketId).emit("call-ended");
    } else {
      console.warn(`⚠️ Cannot end call, user ${to} not found.`);
    }
  });

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
      console.log(`❌ User disconnected: ${userId}`);
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server, userSocketMap }


// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://real-time-chat-app-with-video-call-using.onrender.com"
// ];

// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     credentials: true, // Add this
//     methods: ["GET", "POST"]
//   },
//   transports: ["websocket", "polling"] // Add this for better compatibility
// });

// // Used to store online users: { userId: socketId }
// const userSocketMap = {};

// // Helper to find userId by socket ID
// function getUserIdBySocketId(socketId) {
//   for (const [userId, sid] of Object.entries(userSocketMap)) {
//     if (sid === socketId) return userId;
//   }
//   return null;
// }

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId] || null;
// }

// io.on("connection", (socket) => {
//   console.log("\n=== New Connection ===");
//   console.log("Socket ID:", socket.id);
//   console.log("Query:", socket.handshake.query);

//   // Extract userId - ensure it's a string
//   const userId = String(socket.handshake.query.userId || "").trim();

//   if (userId && userId !== "undefined" && userId !== "null" && userId !== "") {
//     // Remove any previous connection for this user
//     if (userSocketMap[userId]) {
//       console.log(`🔄 Replacing old connection for user ${userId}`);
//     }

//     // Store the userId on the socket object for later use
//     socket.userId = userId;

//     userSocketMap[userId] = socket.id;
//     console.log(`✅ User ${userId} -> Socket ${socket.id}`);

//     // Log current state
//     console.log("📊 Online users:", Object.keys(userSocketMap));
//   } else {
//     console.warn("⚠️ Invalid or missing userId:", userId);
//     return;
//   }

//   // Emit updated list of online users to ALL clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // Send confirmation to the connected user
//   socket.emit("connection-confirmed", {
//     userId,
//     socketId: socket.id,
//     onlineUsers: Object.keys(userSocketMap)
//   });

//   // Your existing video call events...
//   socket.on("call-user", ({ to, from, signal }) => {
//     const receiverSocketId = getReceiverSocketId(to);
//     if (receiverSocketId) {
//       console.log(`📞 Calling user ${to} from ${from}`);
//       io.to(receiverSocketId).emit("incoming-call", { from, signal });
//     } else {
//       console.warn(`⚠️ User ${to} is offline or not found.`);
//     }
//   });

//   socket.on("answer-call", ({ to, signal }) => {
//     const callerSocketId = getReceiverSocketId(to);
//     if (callerSocketId) {
//       console.log(`✅ Call answered by ${socket.userId} for ${to}`);
//       io.to(callerSocketId).emit("call-answered", { signal });
//     } else {
//       console.warn(`⚠️ Caller ${to} not found.`);
//     }
//   });

//   socket.on("ice-candidate", ({ candidate, to }) => {
//     const receiverSocketId = getReceiverSocketId(to);
//     if (receiverSocketId) {
//       console.log(`❄️ Sending ICE candidate from ${socket.userId} to ${to}`);
//       io.to(receiverSocketId).emit("ice-candidate", {
//         candidate,
//         from: socket.userId
//       });
//     } else {
//       console.warn(`⚠️ ICE candidate receiver ${to} not found.`);
//     }
//   });

//   socket.on("end-call", ({ to }) => {
//     const receiverSocketId = getReceiverSocketId(to);
//     if (receiverSocketId) {
//       console.log(`🚫 Call ended by ${socket.userId} for ${to}`);
//       io.to(receiverSocketId).emit("call-ended");
//     } else {
//       console.warn(`⚠️ Cannot end call, user ${to} not found.`);
//     }
//   });

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     console.log("\n=== Disconnection ===");
//     console.log("Socket ID:", socket.id);

//     // Use the userId stored on socket object
//     const disconnectedUserId = socket.userId;

//     if (disconnectedUserId && userSocketMap[disconnectedUserId]) {
//       delete userSocketMap[disconnectedUserId];
//       console.log(`❌ User ${disconnectedUserId} disconnected`);

//       // Emit updated list to ALL clients
//       io.emit("getOnlineUsers", Object.keys(userSocketMap));
//       console.log("📊 Remaining online users:", Object.keys(userSocketMap));
//     }
//   });

//   // Handle user typing
//   socket.on("typing", ({ receiverId, isTyping }) => {
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("user-typing", {
//         senderId: socket.userId,
//         isTyping
//       });
//     }
//   });
// });

// // Add debug endpoint
// app.get("/api/debug/online-users", (req, res) => {
//   res.json({
//     success: true,
//     onlineUsers: Object.keys(userSocketMap),
//     count: Object.keys(userSocketMap).length,
//     timestamp: new Date().toISOString()
//   });
// });

// export { io, app, server, userSocketMap };
