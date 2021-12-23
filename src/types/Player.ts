import { Socket } from "socket.io";

type Player = {
    name: string;
    socket: Socket;
    score: number;
    side: string | null;
};

export default Player;