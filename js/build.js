function createHex(center_X, center_Y, id) {
    //Create DOM hex with fixed position.
    let center_X_rounded = Math.round(center_X * 100) / 100;
    let center_Y_rounded = Math.round(center_Y * 100) / 100;

    // First, it checks if there's another hex currently occupying the position
    if (checkEmptyPosition(center_X_rounded, center_Y_rounded)) {
        // There is no overlapping hex. Proceede to create one
        let hex = document.createElement('div');
        hex.className = "hex-clip";
        hex.id = id;
        hex.dataset.xPosition = center_X_rounded;
        hex.dataset.yPosition = center_Y_rounded;
        hex.setAttribute('style', `top: ${window.innerHeight/2 - (HEXHEIGHT/2) + center_Y}px; left: ${window.innerWidth/2 - (HEXWIDTH/2) + center_X}px`);
        hex.innerHTML = id;

        // Use this to debugg positioning
        //hex.innerHTML = `xPos${center_X_rounded}-yPos${center_Y_rounded}`;

        //Load the cell in memory.
        saveToMemory(center_X_rounded, center_Y_rounded);

        BOARD.appendChild(hex);
    }
}


function saveToMemory(position_X, position_Y) {
    //Create an object, asign position and save to array

    let cell = new Cell();
    cell.setPosX = position_X;
    cell.setPosY = position_Y;

    CELLARRAY.push(cell);

}

function checkEmptyPosition(position_X, position_Y) {
    //Check if position is already occupied. If so, reutrns false.

    let position_empty = true;
    for (let i = 0; i < CELLARRAY.length; i++) {
        if (CELLARRAY[i].getPosX == position_X && CELLARRAY[i].getPosY == position_Y) {
            position_empty = false;
            return position_empty;
        }
    }
    return position_empty;
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