"use strict";
exports.__esModule = true;
exports.Labyrinth = void 0;
var Node_1 = require("./Node");
var Labyrinth = /** @class */ (function () {
    function Labyrinth(size) {
        this.PLAYER_SIGN = "s";
        this.WALL_SIGN = "x";
        this.END_SIGN = "e";
        this.ROAD_SIGN = "-";
        this.SOLUTION_SIGN = "O";
        this.tiles = [];
        this.size = size;
        this.createEmptyBoard();
    }
    Labyrinth.prototype.setWall = function (x, y) {
        this.findTileByPosition(x, y).value = this.WALL_SIGN;
    };
    Labyrinth.prototype.setSize = function (size) {
        this.size = size;
    };
    Labyrinth.prototype.createEmptyBoard = function () {
        // Initialize labyrinth
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                var node = new Node_1.Node(i, j, this.ROAD_SIGN, null);
                this.tiles.push(node);
            }
        }
    };
    Labyrinth.prototype.findTileByPosition = function (x, y) {
        var arrayPos = (y * this.size) + x;
        return this.tiles[arrayPos];
    };
    Labyrinth.prototype.setEndTile = function (x, y) {
        if (x >= this.size || y >= this.size) {
            throw new Error("Size of point must be between " + this.size + " and " + this.size);
        }
        var node = this.findTileByPosition(x, y);
        node.value = this.END_SIGN;
        this.endTile = node;
    };
    Labyrinth.prototype.setPlayerTile = function (x, y) {
        if (x >= this.size || y >= this.size) {
            throw new Error("Size of point must be between " + this.size + " and " + this.size);
        }
        var node = this.findTileByPosition(x, y);
        node.value = this.PLAYER_SIGN;
    };
    Labyrinth.prototype.getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    };
    Labyrinth.prototype.findFinishRoad = function (nNew) {
        var nodeArr = [];
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
                    var node = this.findTileByPosition(nNew.y, nNew.x);
                    nodeArr.push(node);
                    node.value = this.SOLUTION_SIGN;
                }
            }
        }
        return nodeArr;
    };
    Labyrinth.prototype.draw = function () {
        var valuesArr = [];
        var allValues = [];
        for (var i = 0; i < this.tiles.length; i++) {
            allValues.push(this.tiles[i].value);
        }
        for (var i = 0; i < this.size; i++) {
            valuesArr[i] = [];
            for (var j = 0; j < this.size; j++) {
                valuesArr[i].push(allValues[i * this.size + j]);
            }
        }
        console.log(valuesArr);
    };
    Labyrinth.prototype.createObstacles = function (numberOfObstacles) {
        if (numberOfObstacles === void 0) { numberOfObstacles = 7; }
        var currentObst = 1;
        var failedAttempts = 0;
        while (currentObst < numberOfObstacles) {
            var nNew = this.deepClone(this.endTile);
            var labCopy = this.deepClone(this);
            var obsNode = void 0;
            do {
                var obstacle = [this.getRandomInt(this.size), this.getRandomInt(this.size)];
                obsNode = this.findTileByPosition(obstacle[0], obstacle[1]);
            } while (obsNode.value == this.WALL_SIGN ||
                obsNode.value == this.END_SIGN ||
                obsNode.value == this.PLAYER_SIGN);
            while (null != nNew && nNew.value != this.PLAYER_SIGN) {
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
    };
    Labyrinth.prototype.deepClone = function (obj) {
        var _out = new obj.constructor;
        var getType = function (n) {
            return Object.prototype.toString.call(n).slice(8, -1);
        };
        for (var _key in obj) {
            if (obj.hasOwnProperty(_key)) {
                _out[_key] = getType(obj[_key]) === 'Object' || getType(obj[_key]) === 'Array' ? this.deepClone(obj[_key]) : obj[_key];
            }
        }
        return _out;
    };
    return Labyrinth;
}());
exports.Labyrinth = Labyrinth;
