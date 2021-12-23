import express from 'express';
import http from 'http';
import { Server, Socket, ServerOptions } from 'socket.io';
import Play from './types/Play';
import Player from './types/Player';
import Room from './types/Room';

const options: any = {
    serveClient: true,
    cors: {
        origin: "*",
        credentials: true
    }
};

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, options);
 
const port: number = 3000;

let rooms: Room[] = [];
 
app.get('/', (_req, _res) => {
    _res.send("TypeScript Wiht Expresss");
});

io.on('connection', (socket: Socket) => {
    console.log("A user connected.");

    socket.on("join", (data, callback) => {

        let existing_room: any = null;
        let room_password_right: boolean = false;
        let room_player_count: number = 0;

        const player: Player = {
            name: data.player_name,
            socket,
            score: 0,
            side: null
        };

        // find the room
        rooms.forEach((room: Room) => {
            if(room.name == data.room_name) {

                existing_room = room;

                if(room.password == data.room_password) {

                    room_password_right = true;

                }

                room_player_count = socket.in(data.room_name).allSockets.length;

            }
        });

        // room exists
        if(existing_room) {

            // password is right
            if(room_password_right) {

                // room is not full
                if(room_player_count < 2) {

                    // choose the other side
                    player.side = existing_room.players[0].side == 'A' ? 'B' : 'A';

                    existing_room.players.push(player);
                    player.socket.join(data.room_name);

                    console.log(`${player.name} joined ${data.room_name}`);
                    console.log(existing_room);

                    // lobby is now full
                    // send event to start game to both players
                    io.to(data.room_name).emit("game_start", existing_room.board);

                    player.socket.emit("side", player.side);

                    callback("OK");

                } else {

                    callback("ROOM_FULL");

                }
            } else {

                callback("WRONG_ROOM_PASSWORD");

            }
            
            
        } else {

            // choose random side
            // 'A' starts first
            player.side = ['A', 'B'][Math.floor(Math.random())];

            let r: Room = {
                name: data.room_name,
                password: data.room_password,
                players: [player],
                board: [
                    [0, 'B', 0, 'B', 0, 'B', 0, 'B'],
                    ['B', 0, 'B', 0, 'B', 0, 'B', 0],
                    [0, 'B', 0, 'B', 0, 'B', 0, 'B'],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    ['A', 0, 'A', 0, 'A', 0, 'A', 0],
                    [0, 'A', 0, 'A', 0, 'A', 0, 'A'],
                    ['A', 0, 'A', 0, 'A', 0, 'A', 0]
                ]
            };

            rooms.push(r);

            player.socket.join(data.room_name);
            player.socket.emit("side", player.side);

            console.log(`${player.name} created ${data.room_name}`);
            console.log(r);

            callback("OK");
        }

    });

    socket.on("play", (play: Play, callback) => {

        console.log(play);
        
    });

});

server.listen(port, () => {
    console.log(`Server listening http://localhost:${port}/`);
});