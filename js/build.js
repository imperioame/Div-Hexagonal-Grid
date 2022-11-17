//Definitions
const BOARD = document.getElementById('board');
let w = Math.min(window.innerWidth, window.innerHeight);
const RAD = w / 5;
const TAU = Math.PI * 2;


const LAYERS = 2;
const HEXHEIGHT = 60;
const HEXWIDTH = 104;



function createHex(center_X, center_Y, id) {
    //Create a DOM element with fixed position
    let center_X_rounded = Math.round(center_X * 100) / 100;
    let center_Y_rounded = Math.round(center_Y * 100) / 100;

    let hex = document.createElement('div');
    hex.className = "hex-clip";
    hex.id = id;
    hex.dataset.xPosition = center_X_rounded;
    hex.dataset.yPosition = center_Y_rounded;
    hex.setAttribute('style', `top: ${window.innerHeight/2 - (HEXHEIGHT/2) + center_Y}px; left: ${window.innerWidth/2 - (HEXWIDTH/2) + center_X}px`);
    hex.innerHTML = id;

    //Use this to debbug positioning
    //hex.innerHTML = `xPos${center_X_rounded}-yPos${center_Y_rounded}`;

    BOARD.appendChild(hex);
}


let hexcount = 0;
function recursiveHexagon(center_X, center_Y, depth, r) {
    //Create recursively all hexagons
    if (depth == 0) {
        createHex(center_X, center_Y, hexcount++);
    } else {
        recursiveHexagon(center_X, center_Y, depth - 1, r / 2)
        for (let a = 0; a < TAU; a += TAU / 6) {
            let x = center_X + r * Math.cos(a);
            let y = center_Y + r * Math.sin(a);

            if (depth > 0) {
                recursiveHexagon(x, y, depth - 1, r / 2);
            }
        }
    }
}



function initialize(max_layers) {
    //Initialice honeycomb

    //Modify this to set global displacement
    let center_X = 0;
    let center_Y = 0;
    recursiveHexagon(center_X, center_Y, max_layers, RAD);
}

window.onload = function () {
    console.log('initializing...');
    
    initialize(LAYERS);
};