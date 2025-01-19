const boxes = document.querySelectorAll("[data-box-num]");
const input1 = document.querySelector("#player1");
const input2 = document.querySelector("#player2");
const label1 = document.querySelector("[for='player1']");
const label2 = document.querySelector("[for='player2']");
const startGameButton = document.querySelector("#startGame");
const form = document.querySelector(".landingPage");
const flexboxContainer = document.querySelector(".flexbox-container");
const gameStartCounter = document.querySelector(".counter");

function createPlayer(name, marker){
    return {name, marker};
}

const player1 = createPlayer("player1 name", "X");
const player2 = createPlayer("player2 name", "O");


const gameBoard = (function(){
    const board = [];
    for(i = 0; i < 9; i++) board.push(null);
    const allWinCombinations = [
        [0, 1, 2],
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

let activePlayer = player1;

function gameController(player1, player2, move){

    activePlayer = activePlayer === player1 ? player2 : player1;
    // prevent overwriting
    if(gameBoard.board.slice(move, move+1)[0] === null) {
        gameBoard.board.splice(move, 1, activePlayer.marker);
    }
    let [mark, winningBoxesIndexes] = isWin(gameBoard.board);
    let winningBoxes = [];
    //do that to get winning blocks
    if (mark === "X" || mark === "O") {
        winningBoxes.push(document.querySelector(`[data-box-num = '${winningBoxesIndexes[0]}']`));
        winningBoxes.push(document.querySelector(`[data-box-num = '${winningBoxesIndexes[1]}']`));
        winningBoxes.push(document.querySelector(`[data-box-num = '${winningBoxesIndexes[2]}']`));
        setTimeout(() => {
            winningBoxes.forEach(item => {
                item.style.animation = "winBlocks .5s ease-in";
            })
        },300)
        

    }
    switch (mark){
        case "X":
            console.log("x won")
            
            break;
        case "O":
            console.log("O won")

            break;
    }
}

function checkSubset(parentArr, subArr){
    return subArr.every(item => {
        return parentArr.includes(item);
    })
}

// figure out why there is a vice versa relation
function isWin(board){
    const indexesOfX = [];
    const indexesOfO = [];
    let counter = 0;
    board.forEach(item => {
        if (item === "X") indexesOfO.push(counter);
        else if (item === "O") indexesOfX.push(counter);
        counter++
    })
        for(item of gameBoard.allWinCombinations){
            if(checkSubset(indexesOfO, item)){
                return ["O", item];
            }
            else if(checkSubset(indexesOfX, item)){
                return ["X", item];
            }
        }
}


boxes.forEach(element => {
    element.addEventListener("click" , e => {
        let boxNum = e.target.getAttribute("data-box-num");
        let marker = document.createElement("div");
        marker.innerText = activePlayer.marker;
        marker.classList.add("marker");
        marker.style.cursor = "default";
        marker.style.color = activePlayer.marker === "X" ? "#fa145e" : "#FFEB00";
        e.target.appendChild(marker);
        gameController(player1, player2, boxNum);
    }, { once: true })
})

input1.addEventListener("input", e => {
    label1.innerText =(`Hello, ${input1.value}`);
})

input2.addEventListener("input", e => {
    label2.innerText =(`Hello, ${input2.value}`);
})

startGameButton.addEventListener("click", e => {
    form.style.display = "none";
    gameStartCounter.classList.toggle("animatedCounter");
    setTimeout(function(){
        gameStartCounter.firstChild.innerText = 2;
    }, 1000)
    setTimeout(function(){
        gameStartCounter.innerText = 1;
    }, 2000)
    setTimeout(function(){
        gameStartCounter.parentNode.removeChild(gameStartCounter);
        flexboxContainer.style.display = "flex";
    }, 3000)
    gameStartCounter.appendChild(counterP);

})

