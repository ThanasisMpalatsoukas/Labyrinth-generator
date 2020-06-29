import {Node} from './Node';

export class Labyrinth {
    PLAYER_SIGN: string = "s";
    WALL_SIGN: string = "x";
    END_SIGN: string = "e";
    ROAD_SIGN: string = "-";
    SOLUTION_SIGN: string = "O";

    size: number;
    tiles: Array<Node> = [];
    endTile: Node;

    constructor(size: number) {
        this.size = size;
        this.createEmptyBoard();
    }

    setWall(x: number, y: number)
    {
        this.findTileByPosition(x,y).value = this.WALL_SIGN;
    }

    setSize(size: number)
    {
        this.size = size;
    }

    createEmptyBoard()
    {
        // Initialize labyrinth
        for(let i=0;i<this.size;i++) {
            for (let j=0;j<this.size;j++) {
                let node = new Node(i, j, this.ROAD_SIGN, null);
                this.tiles.push(node);
            }    
        }
    }

    findTileByPosition(x: number, y: number): Node
    {
        let arrayPos: number = (y*this.size) + x;
        return this.tiles[arrayPos];
    }

    setEndTile(x: number, y: number) {
        if (x >= this.size || y >= this.size) {
            throw new Error("Size of point must be between " + this.size + " and "+this.size);
        }
        let node = this.findTileByPosition(x,y);
        node.value = this.END_SIGN;
        this.endTile = node;
    }

    setPlayerTile(x: number, y: number) {
        if (x >= this.size || y >= this.size) {
            throw new Error("Size of point must be between " + this.size + " and "+this.size);
        }
        let node = this.findTileByPosition(x,y);
        node.value = this.PLAYER_SIGN;
    }

    getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    findFinishRoad(nNew: Node)
    {
        let nodeArr:Array<Node> = [];
        /**
         * We are traversing the tree here the opposite way
         * to get to the way he came until here.
         */
        while (nNew != null) {
            nNew = nNew.parent;
            if (nNew != null) {
                if (nNew.value != this.END_SIGN && nNew.value != this.PLAYER_SIGN) {
                    /**
                     * nNew is located on the virtual labyrinth that is why we need
                     * to copy its value to the real labyrinth
                     */
                    let node = this.findTileByPosition(nNew.y, nNew.x);
                    nodeArr.push(node);
                    node.value = this.SOLUTION_SIGN;
                }
            }
        }
        return nodeArr;
    }

    draw()
    {
        let valuesArr: Array<Array<String>> = [];
        let allValues: Array<String> = [];

        for (let i=0;i<this.tiles.length;i++) {
            allValues.push(this.tiles[i].value);
        }

        for (let i=0;i<this.size;i++) {
            valuesArr[i] = [];
            for (let j=0;j<this.size;j++) {
                valuesArr[i].push(allValues[i*this.size + j]);
            }
        }

        console.log(valuesArr);
    }

    createObstacles(numberOfObstacles: number = 7)
    {
        let currentObst: number = 1;
        let failedAttempts = 0;

        while (currentObst < numberOfObstacles) {
            let nNew = this.deepClone(this.endTile);
            let labCopy = this.deepClone(this);

            let obsNode: Node;
            do {
                let obstacle = [this.getRandomInt(this.size), this.getRandomInt(this.size)];
                
                obsNode = this.findTileByPosition(obstacle[0], obstacle[1]);
            } while
            (
                obsNode.value == this.WALL_SIGN ||
                obsNode.value == this.END_SIGN  || 
                obsNode.value == this.PLAYER_SIGN 
            );

            while ( null != nNew && nNew.value != this.PLAYER_SIGN) {
                nNew.findChildren(labCopy);
                nNew.unvisited = false;
                nNew = nNew.getUnvisitedChild();
            }

            if (nNew != null) {
                obsNode.value = this.WALL_SIGN;
                currentObst++;
                failedAttempts = 0;
            }

            failedAttempts++;

            if (currentObst == numberOfObstacles) {
                return nNew;
            }

            if (failedAttempts > 1250) {
                throw Error("No solution for this puzzle...");
            }
        }
    }

    deepClone (obj) {
        var _out = new obj.constructor;
    
        var getType = function (n) {
            return Object.prototype.toString.call(n).slice(8, -1);
        }
    
        for (var _key in obj) {
            if (obj.hasOwnProperty(_key)) {
                _out[_key] = getType(obj[_key]) === 'Object' || getType(obj[_key]) === 'Array' ? this.deepClone(obj[_key]) : obj[_key];
            }
        }
        return _out;
    }
}