let cells = document.querySelectorAll('.row > div');
var player1 = 0, player2 = 0, j = 0, winner = 0, clear = 0;
var boardStatus = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
var cellNumber = 0;

for(var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClicked);
}

function cellClicked(){
    console.log(boardStatus)
    checkBoard(boardStatus);
    if ( clear == 1) {
        clearBoard(boardStatus);
    } else {
        cellNumber = findCell(event.target.className);
        if ( emptyCell(boardStatus[cellNumber])) {
            fillCell(cellNumber, boardStatus);
        }
        winner = checkWinner(boardStatus);
        if (winner != '0') {
            clear++;
            console.log(winner + ' WINS!!!!');
        } 
    }
}

function fillCell(cellNumber, boardStatus){
    if (playerTurn(boardStatus)){
        event.target.textContent = 'X';
        boardStatus[cellNumber] = 'X';
    } else {
        event.target.textContent = 'O';
        boardStatus[cellNumber] = 'O';
    }
}

function emptyCell(empty){
    if (empty === '0') {
        return true;
    } else {
        return false;
    }
}

function findCell(cell) {
    switch (cell) {
        case "top left":
            return 0;
        case "top middle":
            return 1;
        case "top right":
            return 2;
        case "center left":
            return 3;
        case "center middle":
            return 4;
        case "center right":
            return 5;
        case "bottom left":
            return 6;
        case "bottom middle":
            return 7;
        case "bottom right":
            return 8;
    }
}

function playerTurn(board) {
    player1 = 0;
    player2 = 0;

    for (j = 0; j < board.length; j++) {
        if (board[j] === 'X') {
            player1++;
        } else if (board[j] === 'O') {
            player2++;
        }
    }

    if ( player1 === player2) {
        return true;
    } else {
        return false;
    }
}

function checkWinner(board) {
    if ( (board[0] === 'X') || (board[0] === 'O') ) {
        if ( (board[0] === board[1]) && (board[0] === board[2]) ) {
            return board[0];
        } else if ( (board[0] === board[3]) && board[0] === (board[6]) ) {
            return board[0];
        } else if ( (board[0] === board[4]) && (board[0] === board[8])) {
            return board[0];
        }
    }
    if ( (board[1] === 'X') || (board[1] === 'O')) {
        if ( (board[1] === board[4]) && (board[1] === board[7]) ) {
            return board[1];
        }
    }
    if ( (board[2] === 'X') || (board[2] === 'O')) {
        if ( (board[2] === board[4]) && (board[2] === board[6]) ) {
            return board[2];
        } else if ( (board[2] === board[5]) && board[2] === (board[8]) ) {
            return board[2];
        } 
    }
    if ( (board[3] === 'X') || (board[3] === 'O')) {
        if ( (board[3] === board[4]) && (board[3] === board[5]) ) {
            return board[3];
        }
    }
    if ( (board[6] === 'X') || (board[6] === 'O')) {
        if ( (board[6] === board[7]) && (board[6] === board[8]) ) {
            return board[6];
        }
    } 
    return '0';
}

function checkBoard(board){
    for ( j = 0; j < board.length; j++) {
        if (board[j] === '0') {
            return;
        }
    }
    clear++;
}

function clearBoard(board) {
    for ( j = 0; j < board.length; j++) {
        board[j] = '0';
        cells[j].textContent = '';
    }
    clear = 0;
}