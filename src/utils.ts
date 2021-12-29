export function generateBoard(): [][] {

    let board = Array();

    // B side board
    for(let i = 0; i < 3; i++) {

        board.push([]);

        for(let j = 0; j < 8; j++) {

            if((i + j) % 2 == 0) {
                board[i].push(0);
            } else {
                board[i].push('B');
            }
        }

    }

    // empty part
    for(let i = 0; i < 2; i++) {

        board.push([]);

        for(let j = 0; j < 8; j++) {
            board[i].push(0);
        }

    }

    // A side board
    for(let i = 0; i < 3; i++) {

        board.push([]);

        for(let j = 0; j < 8; j++) {

            if((i + j) % 2 == 0) {
                board[i].push('A');
            } else {
                board[i].push(0);
            }
        }

    }
    
    return board;
};
