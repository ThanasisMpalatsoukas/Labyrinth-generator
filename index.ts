import {Labyrinth} from './src/Labyrinth';

/**
 * end:        The end point of the game.
 * player:     Starting point for the player.
 * obstacles:  Amount of obstacles.
 * board_size: Size of the board.
 */
const OPTIONS = {
    end: {
        x: 0,
        y: 1 
    },
    player: {
        x: 3,
        y: 1
    },
    obstacles: 4,
    board_size: 4
}

let l = new Labyrinth(OPTIONS.board_size);
l.setEndTile(OPTIONS.end.x,OPTIONS.end.y);
l.setPlayerTile(OPTIONS.player.x,OPTIONS.player.y);
let nNew = l.createObstacles(OPTIONS.obstacles);
l.findFinishRoad(nNew);
l.draw();

        
