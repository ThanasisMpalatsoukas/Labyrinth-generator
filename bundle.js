(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./Node":3}],2:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.LabyrinthMarkup = void 0;
var LabyrinthMarkup = /** @class */ (function () {
    /**
     * We are basically taking all tiles and adding them in different
     * arrayes to manipulate them easire later on.
     *
     * @param labyrinth Read only value, got here to create markup
     */
    function LabyrinthMarkup(labyrinth, container, solution) {
        this.wall_signs = [];
        this.road_signs = [];
        this.solution_signs = [];
        for (var i = 0; i < labyrinth.tiles.length; i++) {
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
        this.solution_signs = __spreadArrays(solution);
        if (this.solution_signs.length == 0) {
            throw new Error("No solution has been inputted. Check if you have called findFinishRoad() on Labyrinth");
        }
        this.container = container;
        this.labyrinth = labyrinth;
    }
    LabyrinthMarkup.prototype.drawTiles = function () {
        for (var i = 0; i < this.labyrinth.size; i++) {
            for (var j = 0; j < this.labyrinth.size; j++) {
                var div = document.createElement("div");
                var width = (100 / this.labyrinth.size);
                div.style.flex = "1 0 " + width + "%";
                div.style.height = "100px";
                div.classList.add("tile");
                div.setAttribute("x", j + "");
                div.setAttribute("y", i + "");
                this.container.appendChild(div);
            }
        }
    };
    /**
     * We are searching on the dom elements that
     * got attacked to the x and y attributes.
     *
     * @param x Shows the coordinates of the x axis
     * @param y Shows the coordinates of the y axis.
     */
    LabyrinthMarkup.prototype.getDomElementByCoordinate = function (x, y) {
        var tiles = document.getElementsByClassName("tile");
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].getAttribute("x") === x + "" && tiles[i].getAttribute("y") === y + "") {
                return tiles[i];
            }
        }
    };
    LabyrinthMarkup.prototype.populateTiles = function () {
        for (var i = 0; i < this.wall_signs.length; i++) {
            var div = this.getDomElementByCoordinate(this.wall_signs[i].x, this.wall_signs[i].y);
            div.classList.add("danger");
        }
        var playerdiv = this.getDomElementByCoordinate(this.player.x, this.player.y);
        playerdiv.classList.add("player");
        var endDiv = this.getDomElementByCoordinate(this.end.x, this.end.y);
        endDiv.classList.add("end");
    };
    LabyrinthMarkup.prototype.animateSolution = function () {
        var _this = this;
        var solutionSigns = __spreadArrays(this.solution_signs);
        var domEl;
        var tempInt = setInterval(function () {
            var node = solutionSigns.shift();
            if (domEl != null) {
                domEl.classList.remove("solution");
            }
            domEl = _this.getDomElementByCoordinate(node.x, node.y);
            domEl.classList.add("solution");
            if (solutionSigns.length == 0) {
                clearInterval(tempInt);
            }
        }, 1000);
    };
    return LabyrinthMarkup;
}());
exports.LabyrinthMarkup = LabyrinthMarkup;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./Labyrinth":1,"./LabyrinthMarkup":2}]},{},[4]);
