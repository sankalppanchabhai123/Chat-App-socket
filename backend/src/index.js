import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
dotenv.config();
import { server, app, io } from "./lib/socket.js";

const __dirname = path.resolve();

// Middleware configuration
app.use(express.json({ limit: "50mb" })); // JSON body parser with size limit
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // URL-encoded parser
app.use(cookieParser()); // Parse cookies

// Correctly configure CORS
app.use(
  cors({
    origin: process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://chatify-ten-beta.vercel.app",
    credentials: true, // Allow credentials (cookies, headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the server
server.listen(3000, () => {
  console.log("Server running on port 3000:");
  connectDB();
});


// this code is from the chatgpt but now my previous code run's well


// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from 'url';

// // Load environment variables FIRST
// dotenv.config();

// // Get __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// import authRoutes from "./routes/auth.route.js";
// import messageRoute from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";

// // Import socket.js AFTER dotenv.config()
// import { server, app, io } from "./lib/socket.js";

// // Middleware configuration
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(cookieParser());

// // Configure CORS to match Socket.io
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://real-time-chat-app-with-video-call-using.onrender.com"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps, curl, postman)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.indexOf(origin) === -1) {
//         console.warn(`CORS blocked for origin: ${origin}`);
//         return callback(new Error("Not allowed by CORS"), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   })
// );

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/message", messageRoute);

// // Add a test endpoint
// app.get("/api/test", (req, res) => {
//   res.json({
//     message: "Server is running",
//     timestamp: new Date().toISOString()
//   });
// });

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// // Start the server
// const PORT = process.env.PORT || 3000;

// connectDB().then(() => {
//   server.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//     console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
//     console.log(`✅ CORS origins: ${allowedOrigins.join(', ')}`);
//   });
// }).catch((error) => {
//   console.error("❌ Failed to start server:", error);
//   process.exit(1);
// });