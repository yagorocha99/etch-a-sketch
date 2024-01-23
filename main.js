let container = document.querySelector("#gridContainer");
let gridSize = document.querySelector("#gridSize");
let gridRange = document.querySelector("#gridRange");
let eraserMode = false;
let gridMode = true;

function change() {
    let value = gridRange.value;
    gridSize.innerHTML = `${value} x ${value}`;
    
    createGrid();
}

function createGrid() {
    let size = parseInt(gridRange.value);
    let containerWidth = Math.min(window.innerWidth, window.innerHeight) * 0.7;
    let inputColor = document.querySelector("#inputColor");

    container.innerHTML = '';

    for (let i = 0; i < size * size; i++) {
        let gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");

        if (gridMode) {
            gridSquare.style.border = "0.1vh solid #9c9c9c";
        }

        container.appendChild(gridSquare);

        let squareSize = containerWidth / size;
        gridSquare.style.width = `${squareSize}px`;
        gridSquare.style.height = `${squareSize}px`;
        
        gridSquare.addEventListener('mouseover', function() {
            if (buttons === 1) {
                if (eraserMode) {
                    gridSquare.style.backgroundColor = 'white';
                } else {
                    gridSquare.style.backgroundColor = inputColor.value;
                }
            }
        });

        gridSquare.addEventListener('mousedown', function() {
            isMousePressed = true;
            if (eraserMode) {
                gridSquare.style.backgroundColor = 'white';
            } else {
                gridSquare.style.backgroundColor = inputColor.value;
            }
        });

        gridSquare.addEventListener('mouseover', function() {
            if (isMousePressed) {
                if (eraserMode) {
                    gridSquare.style.backgroundColor = 'white';
                } else {
                    gridSquare.style.backgroundColor = inputColor.value;
                }
            }
        });

        gridSquare.addEventListener('mouseup', function() {
            isMousePressed = false;
        });


    }

    container.style.maxWidth = `${containerWidth}px`;
    container.style.maxHeight = `${containerWidth}px`;
}

function clearGrid() {
    let gridSquares = document.querySelectorAll(".grid-square");

    gridSquares.forEach(gridSquare => {
        gridSquare.style.backgroundColor = 'white';
    });
}

function toggleEraser() {
    eraserMode = !eraserMode;
}

function toggleGrid() {
    gridMode = !gridMode;
    updateGridStyles();
}

function updateGridStyles() {
    let gridSquares = document.querySelectorAll(".grid-square");

    gridSquares.forEach(gridSquare => {
        if (gridMode) {
            gridSquare.style.border = "0.1vh solid #9c9c9c";
        } else {
            gridSquare.style.border = "none";
        }
    });
}

function changeColor() {
    let selectedColor = inputColor.value;

    container.addEventListener('mouseover', function(event) {
        if (event.buttons === 1) {
            let gridSquare = event.target;
            if (gridSquare.classList.contains("grid-square")) {
                if (eraserMode) {
                    gridSquare.style.backgroundColor = 'white';
                } else {
                    gridSquare.style.backgroundColor = selectedColor;
                }
            }
        }
    });
}

document.body.addEventListener('mousedown', function() {
    isMousePressed = true;
});

document.body.addEventListener('mouseup', function() {
    isMousePressed = false;
});

container.addEventListener('mousedown', function() {
    isMousePressed = true;
});

container.addEventListener('mouseup', function() {
    isMousePressed = false;
});


gridRange.addEventListener("input", change);
createGrid();