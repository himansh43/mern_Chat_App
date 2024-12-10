const {Server}= require('socket.io')
const http= require('http')
const express= require('express')
const app= express()
const server= http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST"],
	},
});

//realTime message code
const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

//How many users are connecting
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	console.log(" loggedIn user Id",userId)
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	console.log("userSocketMap is",userSocketMap)

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	//how many users are disconnecting
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

module.exports= {app,io,server,getReceiverSocketId}