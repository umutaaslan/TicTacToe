function createPlayer(name, marker){
    return {name, marker};
}

const player1 = createPlayer("player1 name", "X");
const player2 = createPlayer("player2 name", "O");


const gameBoard = (function(){
    const board = [];
    for(i = 0; i < 9; i++) board.push(null);
    const allWinCombinations = [
        [0,1,2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return {board, allWinCombinations};
}());

let activePlayer = null;
function gameController(player1, player2, move){
    switch (isWin(gameBoard.board)){
        case "X":
            console.log("x won")
            break;
        case "Y":
            // Y won
            break;
        default:
            // no one won
            activePlayer = activePlayer === player1 ? player2 : player1;
            gameBoard.board.splice(move, 1, activePlayer.marker);
    }
}

function checkSubset(parentArr, subArr){
    return subArr.every(item => {
        return parentArr.includes(item);
    })
}

function isWin(board){
    const indexesOfX = [];
    const indexesOfY = [];
    let counter = 0;
    board.forEach(item => {
        if (item === "X") indexesOfX.push(counter);
        else if (item === "Y") indexesOfY.push(counter);
        counter++
    })
    console.log(indexesOfX)
    gameBoard.allWinCombinations.forEach(item => {
        if(checkSubset(indexesOfX, item)){
            console.log("x w")
            return "X";
        }
        else if(checkSubset(indexesOfY, item)){
            return "Y";
        }
    })
}


gameController(player1, player2, 0);
gameController(player1, player2, 4);
gameController(player1, player2, 1);
gameController(player1, player2, 6);
gameController(player1, player2, 2);
gameController(player1, player2, 7);

console.log(gameBoard.board);

