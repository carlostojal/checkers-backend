// Import the express in typescript file
import express from 'express';
import http from 'http';
 
// Initialize the express engine
const app: express.Application = express();
const server: http.Server = http.createServer(app);
 
// Take a port 3000 for running server.
const port: number = 3000;
 
// Handling '/' Request
app.get('/', (_req, _res) => {
    _res.send("TypeScript Wiht Expresss");
});
 
// Server setup
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
});