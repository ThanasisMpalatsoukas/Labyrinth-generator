import {Labyrinth} from './Labyrinth';
import { LabyrinthMarkup } from './LabyrinthMarkup';

/**
 * end:        The end point of the game.
 * player:     Starting point for the player.
 * obstacles:  Amount of obstacles.
 * board_size: Size of the board.
 */
const OPTIONS = {
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
}

let l = new Labyrinth(OPTIONS.board_size);
l.setEndTile(OPTIONS.end.x,OPTIONS.end.y);
l.setPlayerTile(OPTIONS.player.x,OPTIONS.player.y);
let nNew = l.createObstacles(OPTIONS.obstacles);
let solution = l.findFinishRoad(nNew);

let m = new LabyrinthMarkup(l, document.getElementById("board"), solution);
m.drawTiles();
m.populateTiles();
m.animateSolution();
        
