"use strict";

// Variabls

var imagePath = {
    " ": "Pics/floor1.png",
    W: "Pics/wall1.png",
    B: "Pics/box1.png",
    G: "Pics/goal1.png",
    P: "Pics/player1.PNG",
};
var player;
var tileMap = tileMap01;
var goalCounter;
var moveCounter;
var won;
var score = [1000, 1000, 1000];


// Functions 

function reset() { //resets new game. also used to start initial game. 
    goalCounter = 0;
    moveCounter = 0;
    won = false;

    document.getElementById("moves").innerHTML = "<b>Your Moves: </b>" + goalCounter; // sets up a move counter at 0, actual counting handled by another function.
    document.getElementById("map").innerHTML = ""; // clears previous map.
    document.getElementById("resetButton").innerHTML = "Reset";

    for (let x = 0; x < tileMap.mapGrid.length; x++) { // for loops goes through x and y axis
        for (let y = 0; y < tileMap.mapGrid[x].length; y++) {
            let tile = document.createElement("img"); // each iteration creates an image element
            tile.id = "x" + x + "y" + y; // assign each element with an id

            let tileType = tileMap.mapGrid[x][y][0]; // gets value from SokoanBase array
            tile.src = imagePath[tileType]; //assigns appropriate image based on sokoban array value

            if (tileType == "P") {
                player = { x, y }; // assign player coordinates
            } else if (tileType == "G") {
                goalCounter++; // if goal, raise goal counter
            }

            document.getElementById("map").appendChild(tile); // implement tile in map element
        }
    }

    console.log(goalCounter);
}

function move(moveX, moveY) { // function for player movement, parameters based on eventlisteners
    let playerTilePlus = [ // array with relevant tiles at each index
        document.getElementById("x" + player.x + "y" + player.y), // index 0: player tile
        document.getElementById("x" + (player.x + moveX) + "y" + (player.y + moveY)), // index 1: tile next to player
        document.getElementById("x" + (player.x + moveX + moveX) + "y" + (player.y + moveY + moveY)), // index 2: two tiles away from player
    ];

    let tileTypes = [playerTilePlus[0].src, playerTilePlus[1].src, playerTilePlus[2].src]; // gets what type each tile is at specified index
    let moveIsOk = false;

    if (tileTypes[1].endsWith(imagePath["G"]) || tileTypes[1].endsWith(imagePath[" "])) // move is allowed if tile next to player is floor or goal
        moveIsOk = true;
    else if (tileTypes[1].endsWith(imagePath["B"]) && (tileTypes[2].endsWith(imagePath[" "]) || tileTypes[2].endsWith(imagePath["G"]))) { // move is allowed if tile next to player is box AND tile after that is goal or floor
        moveIsOk = true;

        if (tileTypes[2].endsWith(imagePath["G"])) // if box ends up on goal, reduce goal counter
            goalCounter--;
        if (tileMap.mapGrid[player.x + moveX][player.y + moveY][0] == "G") // if box is moved away from goal position, increase goal counter
            goalCounter++;
        playerTilePlus[2].src = imagePath["B"]; // moves box along with player
    }

    if (moveIsOk == true && won != true) { // if move is allowed and won state not met
        playerTilePlus[0].src = tileMap.mapGrid[player.x][player.y][0] === "G"
            ? imagePath["G"] : imagePath[" "]; // checks SokobanBase map what tiletype is att player position and inserts that tile there
        playerTilePlus[1].src = imagePath["P"]; // inserts player tile at index 1
        player.y += moveY;
        player.x += moveX; // assigns player with new coordinates
        moveCount(); // increases move counter only when move is ok
    }
}

function moveCount() { // adds a move counter
    moveCounter++;
    document.getElementById("moves").innerHTML = "<b>Your Moves: </b>" + moveCounter;
}

function winning() { // when winning conditions are met
    alert("Congratulations! You've Won! Your score: " + moveCounter);
    highscore(moveCounter);
    won = true; // prevents player from further movement
}

function highscore(highscore) {
    let name;
    let keepAlive = true;

    // compares current highscore with previous scores
    if (highscore <= score[0]) {
        moveHigh(1);
        moveHigh(0);

        score[0] = highscore; // if higher, set new score

        while (keepAlive == true) { // loop until user inputs 3 symbols 
            name = prompt("You got a highscore! Please enter a name with 3 symbols.");
            if (name.length == 3) {
                document.getElementById("sc1").innerHTML = name + ": " + score[0] + " moves";
                keepAlive = false;
            }
        }
    } else if (highscore <= score[1]) {
        moveHigh(1);

        score[1] = highscore;

        while (keepAlive == true) {
            name = prompt("You got a highscore! Please enter a name with 3 symbols.");
            if (name.length == 3) {
                document.getElementById("sc2").innerHTML = name + ": " + score[1] + " moves";
                keepAlive = false;
            }
        }
    } else if (highscore <= score[2]) {
        score[2] = highscore;

        while (keepAlive == true) {
            name = prompt("You got a highscore! Please enter a name with 3 symbols.");
            if (name.length == 3) {
                document.getElementById("sc3").innerHTML = name + ": " + score[2] + " moves";
                keepAlive = false;
            }
        }
    }
}

function moveHigh(posNum) {
    let content = [document.getElementById("sc1").textContent, document.getElementById("sc2").textContent];
    let pos = ["sc2", "sc3"];

    document.getElementById(pos[posNum]).innerHTML = content[posNum];
}


//--------------------------------EVENT LISTENERS-----------------------------------------------
window.addEventListener("keydown", function (event) { // listens to if arrow keys are pressed and

    if (event.key == "ArrowUp" && won != true) { move(-1, 0); }
    else if (event.key == "ArrowLeft" && won != true) { move(0, -1); }
    else if (event.key == "ArrowDown" && won != true) { move(1, 0); }
    else if (event.key == "ArrowRight" && won != true) { move(0, 1); }
    event.preventDefault();
}); // prevents default function of arrowkeys (aka move page up/down etc)


window.addEventListener("keyup", function () { if (goalCounter === 0) winning(); }); // checks if won state is met after move is done


// 'use strict';
// var gSteps = 0;
// var gBoard;
// var gGameDone = false;
// var gLevel = {
//     level: 1,
//     SIZE: 6,
//     boxesCount: 0
// }
// var gPlayerPos = {
//     i: 0,
//     j: 0
// };
// var SPACE = ' ';
// var BOX = '@';
// var PLAYER = '&#9791';

// function init(value) {
//     gSteps = 0;
//     gGameDone = false;
//     var numValue = +value;
//     gLevel.level = numValue;
//     if (numValue === 2) setBoardLevel2();
//     else setBoardLevel1();
// }

// function buildBoard(size) {
//     gBoard = [];
//     for (var i = 0; i < size; i++) {
//         gBoard.push([]);
//         for (var j = 0; j < size; j++) {
//             gBoard[i][j] = {
//                 isBox: false,
//                 isBlackHole: false,
//                 isTarget: false,
//                 isWall: false,
//                 isGlue: false
//             };
//         }
//     }

// }

// function setBoardLevel1() {
//     var size = 6;
//     buildBoard(size);

//     gBoard[1][1].isBox = true;
//     gLevel.boxesCount++;

//     gBoard[1][2].isBox = true;
//     gLevel.boxesCount++;

//     gBoard[1][3].isBox = true;
//     gLevel.boxesCount++;
//     gPlayerPos.i = 0;
//     gPlayerPos.j = 1;
//     gBoard[3][1].isTarget = true;
//     gBoard[3][2].isTarget = true;
//     gBoard[3][3].isTarget = true;
//     var randLine = parseInt(Math.random() * size);
//     var randRow = parseInt(Math.random() * size);
//     if ((!gBoard[randLine][randRow].isWall) &&
//         (!gBoard[randLine][randRow].isTarget) &&
//         (!gBoard[randLine][randRow].isBox) &&
//         (!gBoard[randLine][randRow].isBlackHole) &&
//         (!gBoard[randLine][randRow].isGlue) &&
//         (randLine !== gPlayerPos.i) &&
//         (randRow !== gPlayerPos.j))
//         gBoard[randLine][randRow].isGlue = true;

//     var randLine = parseInt(Math.random() * size);
//     var randRow = parseInt(Math.random() * size);
//     if ((!gBoard[randLine][randRow].isWall) &&
//         (!gBoard[randLine][randRow].isTarget) &&
//         (!gBoard[randLine][randRow].isBox) &&
//         (!gBoard[randLine][randRow].isBlackHole) &&
//         (!gBoard[randLine][randRow].isGlue) &&
//         (randLine !== gPlayerPos.i) &&
//         (randRow !== gPlayerPos.j))
//         gBoard[randLine][randRow].isBlackHole = true;

//     renderBoard(gBoard);

// }

// function setBoardLevel2() {
//     gBoard = [];
//     var size = 6;
//     buildBoard(size);

//     for (var i = 0; i < size; i++) {
//         for (var j = 0; j < size; j++) {
//             if (i === 0 ||
//                 j === 0 ||
//                 i === size - 1 ||
//                 j === size - 1)
//                 gBoard[i][j].isWall = true;
//             if (j === size - 2)
//                 gBoard[i][j].isWall = true;
//             if ((i === 3 && j === 1) || (i === 4 && j === 1))
//                 gBoard[i][j].isWall = true;
//         }
//     }


//     gBoard[1][2].isBox = true;
//     gLevel.boxesCount++;

//     gBoard[2][2].isBox = true;
//     gLevel.boxesCount++;
//     gPlayerPos.i = 1;
//     gPlayerPos.j = 1;
//     gBoard[2][1].isTarget = true;
//     gBoard[1][3].isTarget = true;

//     renderBoard(gBoard);
// }

// function renderBoard(board) {
//     var elContainer = document.querySelector('.table');
//     var strHTML = '<table border="1"><tbody>';
//     board.forEach(function (row, i) {
//         strHTML += '<tr>';
//         row.forEach(function (cell, j) {
//             var className = 'cell cell-' + i + '-' + j;

//             if (board[i][j].isTarget) {
//                 className += ' target';
//             }
//             if (board[i][j].isWall) {
//                 className += ' wall';
//             }
//             if (board[i][j].isGlue) {
//                 className += ' glue';
//             }
//             if (board[i][j].isBlackHole) {
//                 className += ' blackHole';
//             }
//             var textInCell = (board[i][j].isBox) ? BOX : SPACE;
//             strHTML += '<td class="' + className + '"> ' + textInCell + ' </td>';
//         });
//         strHTML += '</tr>'
//     });
//     strHTML += '</tbody></table>';
//     elContainer.innerHTML = strHTML;

//     var cellClass = '.cell-' + (gPlayerPos.i) + '-' + (gPlayerPos.j);
//     document.querySelector(cellClass).innerHTML = PLAYER;

//     document.querySelector('.stepsCounter').innerHTML = gSteps;

// }

// function movePlayer(event) {
//     if (gGameDone) return;
//     var prevPlayerPos = {
//         i: gPlayerPos.i,
//         j: gPlayerPos.j
//     };
//     var newPlayerPos = getNewPos(prevPlayerPos, event)
//     if (isValidLocation(event, gBoard)) {
//         gSteps++;
//         document.querySelector('.stepsCounter').innerHTML = gSteps;
//         var cellClass = '.cell-' + (gPlayerPos.i) + '-' + (gPlayerPos.j);
//         document.querySelector(cellClass).innerHTML = SPACE;

//         if (gBoard[newPlayerPos.i][newPlayerPos.j].isBlackHole) {
//             alert("you fell to the valley of death");
//             init(gLevel.level);
//             return;
//         }
//         var cellClass = '.cell-' + (newPlayerPos.i) + '-' + (newPlayerPos.j);
//         document.querySelector(cellClass).innerHTML = PLAYER;
//         //if there is a box there, move it
//         if (gBoard[newPlayerPos.i][newPlayerPos.j].isBox) {
//             gBoard[newPlayerPos.i][newPlayerPos.j].isBox = false;
//             var objPos = getNewPos(newPlayerPos, event);

//             if (gBoard[newPlayerPos.i][newPlayerPos.j].isGlue) {
//                 wait(3000);
//             }

//             if (gBoard[objPos.i][objPos.j].isTarget) {
//                 gLevel.boxesCount--;
//             }
//             if (gBoard[newPlayerPos.i][newPlayerPos.j].isTarget) {
//                 gLevel.boxesCount++;
//             }
//             if (!gBoard[objPos.i][objPos.j].isBlackHole) {
//                 gBoard[objPos.i][objPos.j].isBox = true;
//                 var cellClass = '.cell-' + (objPos.i) + '-' + (objPos.j);
//                 document.querySelector(cellClass).innerHTML = BOX;
//             }
//         }

//         if (gBoard[newPlayerPos.i][newPlayerPos.j].isGlue) {
//             gSteps += 4;

//         }
//         if (gBoard[prevPlayerPos.i][prevPlayerPos.j].isGlue) {
//             wait(3000);
//         }
//         gPlayerPos.i = newPlayerPos.i;
//         gPlayerPos.j = newPlayerPos.j;

//         if (isGameOver()) {
//             alert('YOU WIN! you did it in ' + gSteps + ' steps');
//             gGameDone = true;
//             // setBoardLevel2();
//         }
//     }
// }

// function getNewPos(oldPos, event) {
//     var newPos = {
//         i: oldPos.i,
//         j: oldPos.j
//     };
//     switch (event.code) {

//         case 'ArrowUp':
//             newPos.i--;
//             break;
//         case 'ArrowDown':
//             newPos.i++;
//             break;
//         case 'ArrowLeft':
//             newPos.j--;
//             break;
//         case 'ArrowRight':
//             newPos.j++;
//             break;
//         default:
//             return null;
//     }
//     return newPos;
// }

// function isValidLocation(event, board) {
//     //player hit a wall
//     var newPlayerPos = getNewPos(gPlayerPos, event);
//     if (!newPlayerPos) return false;
//     if (newPlayerPos.i < 0 ||
//         newPlayerPos.i >= board.length ||
//         newPlayerPos.j < 0 ||
//         newPlayerPos.j >= board.length) {
//         return false;
//     }
//     if (board[newPlayerPos.i][newPlayerPos.j].isWall)
//         return false;

//     if (board[newPlayerPos.i][newPlayerPos.j].isBox) {
//         var sameDirectionNextPos = getNewPos(newPlayerPos, event)

//         if (sameDirectionNextPos.i < 0 ||
//             sameDirectionNextPos.i >= board.length ||
//             sameDirectionNextPos.j < 0 ||
//             sameDirectionNextPos.j >= board.length) {
//             return false;
//         }
//         if (board[sameDirectionNextPos.i][sameDirectionNextPos.j].isWall)
//             return false;

//         if (board[sameDirectionNextPos.i][sameDirectionNextPos.j].isBox) {
//             return false;
//         }
//     }
//     return true;
// }

// function isObsta(newPos) {
//     if (!gBoard[newPos.i][newPos.j]) {
//         return
//     }
//     return true;
// }

// function isGameOver() {
//     if (!gLevel.boxesCount) return true;
//     return false;
// }

// function wait(ms) {
//     var start = new Date().getTime();
//     var end = start;
//     while (end < start + ms) {
//         end = new Date().getTime();
//     }
// }

// //not to accidently change level when you want to move
// function ignoreAlpha(e) {
//     if (!e) {
//         e = window.event;
//     }

//     e.returnValue = false;
//     e.cancel = true;

// }
