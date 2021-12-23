// Import the express in typescript file
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
 
// Initialize the express engine
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server);
 
// Take a port 3000 for running server.
const port: number = 3000;
 
// Handling '/' Request
app.get('/', (_req, _res) => {
    _res.send("TypeScript Wiht Expresss");
});

io.on('connection', (socket) => {
    console.log("A user connected.");
});
 
// Server setup
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
});