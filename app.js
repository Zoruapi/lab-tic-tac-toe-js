let cells = document.querySelectorAll('.row > div');

/* Varables to help know the status of the game */
var player1 = 0, player2 = 0, j = 0, winner = '0', clear = 0;
var boardStatus = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
var cellNumber = 0;

/* Variables to play the sound effects */
let pika = document.getElementById("pika");
let char = document.getElementById("char");
let draw = document.getElementById("draw");


for(var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClicked);
}

/* Core of the game. Once a cell it's click it fills it with the corresponding
    value. Checks for winner and clear the board */
function cellClicked(){
    console.log(event);
    if ( clear == 1) {
        clearBoard(boardStatus);
    } else {
        cellNumber = findCell(event.target.className);
        if ( emptyCell(boardStatus[cellNumber])) {
            fillCell(cellNumber, boardStatus);
        }
        winner = checkWinner(boardStatus);
        if (winner != '0') {
            showWinner(winner);
            clear++;
        } else if(checkBoard(boardStatus)) {
            showWinner(winner);
        }
    }
}

/* Decides who's turn it is and fills an empty cell with the appropiate symbol */
function fillCell(cellNumber, boardStatus){
    if (playerTurn(boardStatus)){
        var pikachu = document.createElement("img");
        pikachu.src = "media/pikachu.webp";
        pikachu.width = "83";
        event.target.appendChild(pikachu);
        boardStatus[cellNumber] = 'X';
    } else {
        var charmander = document.createElement("img");
        charmander.src = "media/charmander.webp";
        charmander.width = "110";
        event.target.appendChild(charmander);
        boardStatus[cellNumber] = 'O';
    }
}

/* Checks if the cell is empty */
function emptyCell(empty){
    if (empty === '0') {
        return true;
    } else {
        return false;
    }
}

/* Finds which cell was click and return its position on the local array */
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

/* Finds who's turn it is to play once a cell it's clicked */
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

/* Check if there is a winner on the board */
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

/* Checks if the board is full or if it's possible to keep playing */
function checkBoard(board){
    for ( j = 0; j < board.length; j++) {
        if (board[j] === '0') {
            return false;
        }
    }
    clear++;
    return true;
}

/* Clears the board and prepares it for the next game */
function clearBoard(board) {
    for ( j = 0; j < board.length; j++) {
        board[j] = '0';
        cells[j].textContent = '';
    }
    removeElement(document.getElementById("end"));
    clear = 0;
}

/* Shows the winner or if its a draw. Playing the corresponding sound effects */
function showWinner(winner){
    const end = document.createElement("h1");

    if (winner === 'X') {
        pika.volume = 0.25;
        pika.play();
        end.textContent = "PIKACHU WINS!!!!";
    } else if (winner === 'O') {
        char.volume = 0.5;
        char.play();
        end.textContent = "CHARMANDER WINS!!!!";
    } else {
        draw.volume = 0.10;
        draw.play();
        end.textContent = "IT'S A DRAW :(";
    }
    end.style.textAlign = "center";
    end.id = "end";
    end.style.color = "darkgoldenrod"

    const parent = document.getElementById("board");
    parent.appendChild(end);
    const currentDiv = document.getElementById("cell");
    parent.insertBefore(end, currentDiv);
}

/* Removes a given html element */
function removeElement(ele) {
    ele.parentNode.removeChild(ele);
}