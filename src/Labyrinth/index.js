"use strict";
exports.__esModule = true;
var Labyrinth_1 = require("./Labyrinth");
var LabyrinthMarkup_1 = require("./LabyrinthMarkup");
/**
 * end:        The end point of the game.
 * player:     Starting point for the player.
 * obstacles:  Amount of obstacles.
 * board_size: Size of the board.
 */
var OPTIONS = {
    end: {
        x: 4,
        y: 7
    },
    player: {
        x: 4,
        y: 0
    },
    obstacles: 40,
    board_size: 10
};
var l = new Labyrinth_1.Labyrinth(OPTIONS.board_size);
l.setEndTile(OPTIONS.end.x, OPTIONS.end.y);
l.setPlayerTile(OPTIONS.player.x, OPTIONS.player.y);
var nNew = l.createObstacles(OPTIONS.obstacles);
var solution = l.findFinishRoad(nNew);
var m = new LabyrinthMarkup_1.LabyrinthMarkup(l, document.getElementById("board"), solution);
m.drawTiles();
m.populateTiles();
m.animateSolution();
