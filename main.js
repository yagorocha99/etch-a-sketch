document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector("#gridContainer");
    for (let i = 0; i < 16 * 16; i++){
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        container.appendChild(gridSquare);
    }
})