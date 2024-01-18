document.querySelector('#createGrid').addEventListener('click', function() {
    let container = document.querySelector("#gridContainer");
    let input = prompt("Select the size of the grid: ");
    let size = parseInt(input);
    
    if (input === null || isNaN(input) || input < 1 || input > 100) {
        alert("Invalid input or canceled. Please enter a number between 1 and 100.");
        return;
    }

    container.innerHTML = '';
    
    for (let i = 0; i < size * size; i++){
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        container.appendChild(gridSquare);
        gridSquare.style.width = `calc(100% / ${size})`;
        gridSquare.style.paddingBottom = `calc(100% / ${size})`;
        gridSquare.addEventListener('click', function(){
            gridSquare.style.backgroundColor = 'black';
        })
    
    }

    
    
})