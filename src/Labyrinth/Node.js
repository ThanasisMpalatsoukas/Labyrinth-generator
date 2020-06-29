"use strict";
exports.__esModule = true;
exports.Node = void 0;
var Node = /** @class */ (function () {
    function Node(x, y, value, parent) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.unvisited = true;
        this.finished = false;
        this.parent = parent;
        this.children = [];
    }
    Node.prototype.getUnvisitedChild = function () {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].unvisited && this.children[i].value != "x") {
                return this.children[i];
            }
        }
        this.finished = true;
        return this.parent;
    };
    Node.prototype.isWall = function () {
        return this.value == "x";
    };
    Node.prototype.checkIfChildShoudBeAdded = function (node) {
        return node.parent == null && !node.finished && !node.isWall();
    };
    Node.prototype.isYourParentNode = function (node) {
        // Root always has parent == null
        if (this.parent != null) {
            return node.x == this.parent.x && node.y == this.parent.y;
        }
        return false;
    };
    Node.prototype.findChildren = function (labyrinth) {
        /**
         * We are checking all different directions a player can go here.
         * [ left, up, down, right, diagonal ].
         */
        for (var i = this.x - 1; i <= this.x + 1; i++) {
            for (var j = this.y - 1; j <= this.y + 1; j++) {
                if (i < labyrinth.size && j < labyrinth.size && i >= 0 && j >= 0) {
                    var node = labyrinth.findTileByPosition(j, i);
                    if (!(this.x == i && this.y == j) && node.value != "x") {
                        if (this.checkIfChildShoudBeAdded(node) && !this.isYourParentNode(node)) {
                            node.parent = this;
                            this.children.push(node);
                        }
                    }
                }
            }
        }
    };
    return Node;
}());
exports.Node = Node;
