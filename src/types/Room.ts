import Player from './Player';

type Room = {
    name: string;
    password: string;
    players: Player[];
    board: [][]
};

export default Room;