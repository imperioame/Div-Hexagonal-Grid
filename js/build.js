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
        hex.style.top = `${center_Y}px`;
        hex.style.left = `${center_X}px`;
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
    let cell = new Cell(position_X, position_Y);
    CELL_ARRAY.push(cell);
}

function checkEmptyPosition(position_X, position_Y) {
    //Checks if position in board is occupied, if so, reutns false

    return !CELL_ARRAY.some((cell) => {
        // checks surroundings wit +/- 0.01

        let x_pos_is_in_range = cell.getPosX <= position_X + 0.01 && cell.getPosX >= position_X - 0.01
        let y_pos_is_in_range = cell.getPosY <= position_Y + 0.01 && cell.getPosY >= position_Y - 0.01

        return x_pos_is_in_range && y_pos_is_in_range
    });
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
    recursiveHexagon(CENTER_X, CENTER_Y, max_layers, RAD);
}

window.onload = function () {
    console.log('initializing...');
    initialize(LAYERS);
};