let container = document.querySelector("#gridContainer");
let gridSize = document.querySelector("#gridSize");
let gridRange = document.querySelector("#gridRange");
let eraserMode = false;
let gridMode = true;
let buttons = 0;
let isMousePressed = false;
let isTouching = false;
let isDrawing = false;
let isTouchingInsideContainer = false;

let buttonsContainer = document.querySelector(".buttons-container");
buttonsContainer.addEventListener("touchstart", function(event) {
    event.preventDefault();
});

function change() {
    let value = gridRange.value;
    gridSize.innerHTML = `${value} x ${value}`;
    createGrid();
}

function createGrid() {
    let size = parseInt(gridRange.value);
    let containerWidth = Math.min(window.innerWidth, window.innerHeight) * 0.7;

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

        gridSquare.addEventListener('mousedown', handleMouseDown);
        gridSquare.addEventListener('mousemove', handleMouseMove);
        gridSquare.addEventListener('mouseup', handleMouseUp);

        gridSquare.addEventListener('touchstart', handleTouchStart);
        gridSquare.addEventListener('touchmove', handleTouchMove);
        gridSquare.addEventListener('touchend', handleTouchEnd);
    }

    container.style.maxWidth = `${containerWidth}px`;
    container.style.maxHeight = `${containerWidth}px`;
}

function handleDrawing(gridSquare) {
    if (eraserMode) {
        gridSquare.style.backgroundColor = 'white';
    } else {
        gridSquare.style.backgroundColor = inputColor.value;
    }
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

function handleMouseDown() {
    isDrawing = true;
    handleDrawing(this);
}

function handleMouseMove() {
    if (isDrawing) {
        handleDrawing(this);
    }
}

function handleMouseUp() {
    isDrawing = false;
}

document.addEventListener('touchstart', function(event) {
    if (event.target.closest("#gridContainer")) {
        isTouchingInsideContainer = true;
        if (isDrawing) {
            handleDrawing(event.targetTouches[0].target);
        }
    } else {
        isTouchingInsideContainer = false;
        event.preventDefault();
    }
});

function handleTouchStart(event) {
    if (isDrawing && isTouchingInsideContainer) {
        handleDrawing(event.targetTouches[0].target);
    }
}

document.addEventListener('touchmove', function(event) {
    if (!isTouchingInsideContainer) {
        event.preventDefault();
    }

    if (isDrawing && isTouchingInsideContainer) {
        handleTouchMove(event);
    }
});

function handleTouchMove(event) {
    let touchX = event.touches[0].clientX;
    let touchY = event.touches[0].clientY;
    let targetElement = document.elementFromPoint(touchX, touchY);

    if (targetElement && targetElement.classList.contains("grid-square")) {
        handleDrawing(targetElement);
    }
}

function handleTouchEnd() {
    isDrawing = false;
}

function changeColor() {
    container.addEventListener('mouseover', function(event) {
        if (event.buttons === 1) {
            let gridSquare = event.target;
            if (gridSquare.classList.contains("grid-square")) {
                handleDrawing(gridSquare);
            }
        }
    });
}

container.addEventListener('mousedown', function() {
    isMousePressed = true;
});

container.addEventListener('mouseup', function() {
    isMousePressed = false;
});


gridRange.addEventListener("input", change);
createGrid();