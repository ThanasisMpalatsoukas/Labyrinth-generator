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
