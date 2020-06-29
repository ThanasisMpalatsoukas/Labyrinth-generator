import { Labyrinth } from "./Labyrinth";

export class Node {

    x: number;
    y: number;
    value: string;
    children: Array<Node>;
    unvisited: boolean;
    finished: boolean;
    parent: Node;

    constructor(x: number, y:number, value: string, parent: Node) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.unvisited = true;
        this.finished = false;
        this.parent = parent;
        this.children = [];
    }
    
    getUnvisitedChild():Node
    {
        for (let i=0;i<this.children.length;i++) {
            if (this.children[i].unvisited && this.children[i].value != "x") {
                return this.children[i]; 
            }
        }
        this.finished = true;
        return this.parent;
    }

    isWall() {
        return this.value == "x";
    }

    checkIfChildShoudBeAdded(node: Node)
    {
        return node.parent == null && !node.finished && !node.isWall();
    }

    isYourParentNode(node: Node) {
        // Root always has parent == null
        if (this.parent != null) {
            return node.x == this.parent.x && node.y == this.parent.y
        }
        return false;
    }

    findChildren(labyrinth: Labyrinth): void|number
    {
        /**
         * We are checking all different directions a player can go here.
         * [ left, up, down, right, diagonal ].
         */
        for (let i=this.x-1;i<=this.x+1;i++) {
            for (let j=this.y-1;j<=this.y+1;j++) {
                if (i < labyrinth.size && j < labyrinth.size && i >=0 && j>=0) {
                    let node = labyrinth.findTileByPosition(j,i);
                    if (!(this.x == i && this.y == j) && node.value != "x") {
                        if (this.checkIfChildShoudBeAdded(node) && !this.isYourParentNode(node)) {
                            node.parent = this;
                            this.children.push(node);
                        }
                    }
                }
            }
        }
    }
    
}