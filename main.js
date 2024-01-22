let container = document.querySelector("#gridContainer");
let gridSize = document.querySelector("#gridSize");
let gridRange = document.querySelector("#gridRange");
let eraserMode = false;

function change() {
    let value = gridRange.value;
    gridSize.innerHTML = `${value} x ${value}`;
    
    createGrid();
}

function createGrid() {
    let size = parseInt(gridRange.value);
    let containerWidth = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    let inputColor = document.querySelector("#inputColor");

    container.innerHTML = '';

    for (let i = 0; i < size * size; i++) {
        let gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
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

        gridSquare.addEventListener('click', function() {
            if (eraserMode) {
                gridSquare.style.backgroundColor = 'white';
            } else {
                gridSquare.style.backgroundColor = inputColor.value;
            }
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

gridRange.addEventListener("input", change);
createGrid();