import { Labyrinth } from "./Labyrinth";
import { Node } from "./Node";

export class LabyrinthMarkup {

    wall_signs: Array<Node> = [];
    road_signs: Array<Node> = [];
    solution_signs: Array<Node> = [];
    player: Node;
    end: Node;
    container: HTMLElement;
    labyrinth: Labyrinth;

    /**
     * We are basically taking all tiles and adding them in different
     * arrayes to manipulate them easire later on.
     * 
     * @param labyrinth Read only value, got here to create markup
     */
    constructor(labyrinth: Labyrinth, container: HTMLElement, solution: Array<Node>) {
        for (let i=0;i<labyrinth.tiles.length;i++) {
            if (labyrinth.tiles[i].value == labyrinth.WALL_SIGN) {
                this.wall_signs.push(labyrinth.tiles[i]);
            }
            else if (labyrinth.tiles[i].value == labyrinth.ROAD_SIGN) {
                this.road_signs.push(labyrinth.tiles[i]);
            }
            else if (labyrinth.tiles[i].value == labyrinth.PLAYER_SIGN) {
                this.player = labyrinth.tiles[i];
            }
            else {
                this.end = labyrinth.tiles[i];
            }
        }

        if (this.wall_signs.length == 0) {
            throw new Error("No traps have been found! Check if you have called createObstacles(n) on Labyrinth");
        }

        this.solution_signs = [...solution];

        
        if (this.solution_signs.length == 0) {
            throw new Error("No solution has been inputted. Check if you have called findFinishRoad() on Labyrinth");
        }
        this.container = container;
        this.labyrinth = labyrinth;
    }

    drawTiles()
    {
        for (let i=0;i<this.labyrinth.size;i++) {
            for(let j=0;j<this.labyrinth.size;j++) {
                let div: HTMLElement = document.createElement("div");
                let width = (100/this.labyrinth.size);
                div.style.flex = "1 0 " + width + "%";
                div.style.height = "100px";
                div.classList.add("tile");
                div.setAttribute("x", j+"");
                div.setAttribute("y", i+"");
                this.container.appendChild(div);
            }
        }
    }

    /**
     * We are searching on the dom elements that
     * got attacked to the x and y attributes.
     * 
     * @param x Shows the coordinates of the x axis
     * @param y Shows the coordinates of the y axis.
     */
    getDomElementByCoordinate(x: number, y:number): Element
    {
        let tiles: HTMLCollection = document.getElementsByClassName("tile");
        for (let i=0;i<tiles.length;i++) {
            if (tiles[i].getAttribute("x") === x+"" && tiles[i].getAttribute("y") === y+"") {
                return tiles[i];
            }
        }
    }

    populateTiles()
    {
        for (let i=0;i<this.wall_signs.length;i++) {
            let div = this.getDomElementByCoordinate(this.wall_signs[i].x, this.wall_signs[i].y);
            div.classList.add("danger");
        }

        let playerdiv = this.getDomElementByCoordinate(this.player.x, this.player.y);
        playerdiv.classList.add("player");

        let endDiv = this.getDomElementByCoordinate(this.end.x, this.end.y);
        endDiv.classList.add("end");
    }

    animateSolution()
    {
        let solutionSigns: Array<Node> = [...this.solution_signs];
        let domEl: Element;
        let tempInt = setInterval(() => {
            let node: Node = solutionSigns.shift();
            if (domEl!=null) {
                domEl.classList.remove("solution");
            }
            domEl = this.getDomElementByCoordinate(node.x, node.y);
            domEl.classList.add("solution");
            if (solutionSigns.length == 0) {
                clearInterval(tempInt);
            }
        }, 1000);
    }

}