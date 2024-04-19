import express from "express";
import cors from "cors";
import csrf from "csurf";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/db.js";
import { restRoutes } from "./routes/restRoutes.js"



const app = express(csrf());
const port = 3000;
const io = new Server(3002, {
    cors: {
        origin: "*",
    }
});


// Connect to MongoDB
connectMongoDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", restRoutes);
 
io.on("connection", (socket) => {
    console.log(`socket connected ${socket}`);
    
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
