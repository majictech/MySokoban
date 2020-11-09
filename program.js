"use strict";

// Variabls ................................................

var imagePath = {
    " ": "Pics/floor.png",
    W: "Pics/wall.png",
    B: "Pics/box.png",
    G: "Pics/goal.png",
    P: "Pics/picachu.PNG",
};
var player;
var tileMap = tileMap01;
var goalCounter;
var moveCounter;
var win;



// Functions ...................................................


//resets/Start Function 

function reset() {
    goalCounter = 0;
    moveCounter = 0;
    win = false;

    document.getElementById("resetButton").innerHTML = "Reset";
    //Reset
    document.getElementById("moves").innerHTML = "<b> Moves: </b>" + goalCounter;
    //Move Counter setup
    document.getElementById("map").innerHTML = "";
    //Clear Map

    // For loop that creates the map ............................

    for (let x = 0; x < tileMap.mapGrid.length; x++) {
        for (let y = 0; y < tileMap.mapGrid[x].length; y++) {
            let tile = document.createElement("img");
            tile.id = "x" + x + "y" + y;
            // For loop to give each element IMG

            let tileType = tileMap.mapGrid[x][y][0];
            tile.src = imagePath[tileType];
            // get image based on SokobanBase array
            if (tileType == "P") {
                player = { x, y };
                // give player position coordinates
            } else if (tileType == "G") {
                goalCounter++;
                // if at goal position ++ increase goal counter
            }

            document.getElementById("map").appendChild(tile);
            // implement tile in map element
        }
    }

    console.log(goalCounter);
}

// Player movement function .................................................

function move(moveX, moveY) {
    let playerTilePlus = [
        document.getElementById("x" + player.x + "y" + player.y),
        // player tile
        document.getElementById("x" + (player.x + moveX) + "y" + (player.y + moveY)),
        //  next tile
        document.getElementById("x" + (player.x + moveX + moveX) + "y" + (player.y + moveY + moveY)),
        // next next tile
    ];

    let moveIsOk = false;
    let tileTypes = [playerTilePlus[0].src, playerTilePlus[1].src, playerTilePlus[2].src];

    // Type of tile will be saved in tileType Variable


    if (tileTypes[1].endsWith(imagePath["G"]) || tileTypes[1].endsWith(imagePath[" "]))
        moveIsOk = true;
    // if next tile is floor or goal MoveIsOk
    else if (tileTypes[1].endsWith(imagePath["B"]) && (tileTypes[2].endsWith(imagePath[" "]) || tileTypes[2].endsWith(imagePath["G"]))) {
        moveIsOk = true;
        // if next tile is box and the tile after that is goal or floor MoveIsOk

        if (tileTypes[2].endsWith(imagePath["G"]))
            goalCounter--;
        // if box on goal tile reduce goal counter
        if (tileMap.mapGrid[player.x + moveX][player.y + moveY][0] == "G")
            goalCounter++;
        // if true add to goal counter
        playerTilePlus[2].src = imagePath["B"];
        // if true player will move the box 
    }

    if (moveIsOk == true && win != true) {
        playerTilePlus[0].src = tileMap.mapGrid[player.x][player.y][0] === "G"
            ? imagePath["G"] : imagePath[" "];
        // replaces tiletype at player position from MAP
        playerTilePlus[1].src = imagePath["P"];
        // moves player tile 
        player.y += moveY;
        player.x += moveX;
        // new X and Y for Player
        moveCount();

    }
}

// Winning Alert Message

function winning() {
    alert("You solved the puzzle in " + moveCounter + " moves");
    highscore(moveCounter);
    win = true;
}

// Move Counter Function

function moveCount() {
    moveCounter++;
    document.getElementById("moves").innerHTML = "<b>Your Moves: </b>" + moveCounter;
}



// Evenetlisteners 


window.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp" && win != true) { move(-1, 0); }
    else if (event.key == "ArrowLeft" && win != true) { move(0, -1); }
    else if (event.key == "ArrowDown" && win != true) { move(1, 0); }
    else if (event.key == "ArrowRight" && win != true) { move(0, 1); }
    event.preventDefault();
    // Stop the Scroll Effect
});


window.addEventListener("keyup", function () { if (goalCounter === 0) winning(); });



