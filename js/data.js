//Data structure and definitions
const BOARD = document.getElementById('board');
const TAU = Math.PI * 2;

// Change this value to increment honeycomb size
const LAYERS = 2;
// Hex Size. Used for positioning. Should be slightly higher than the one setted in style.scss to separate one from the other
const HEX_WIDTH = window.innerWidth * 0.05;
const HEX_HEIGHT = HEX_WIDTH;
const RAD = HEX_WIDTH * 2;

//Modify this to set global displacement
const CENTER_X = window.innerWidth / 2 - (HEX_WIDTH / 2);
const CENTER_Y = window.innerHeight / 2 - (HEX_HEIGHT / 2);

const CELL_ARRAY = [];

class Cell {
    constructor() {
        this.posX = 0;
        this.posY = 0;
        this.isEmpty = true;
    }

    get getPosX() {
        return this.posX;
    }
    get getPosY() {
        return this.posY;
    }
    get getIsEmpty() {
        return this.isEmpty;
    }

    set setPosX(newPos) {
        this.posX = newPos;
    }
    set setPosY(newPos) {
        this.posY = newPos;
    }

    set setIsEmpty(newValue) {
        this.isEmpty = newValue;
    }
}