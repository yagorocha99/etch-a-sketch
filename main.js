    let container = document.querySelector("#gridContainer");
    let gridSize = document.querySelector("#gridSize");
    let gridRange = document.querySelector("#gridRange");

    function change() {
        let value = gridRange.value;
        gridSize.innerHTML = `${value} x ${value}`;
        
        createGrid();
    }

    function createGrid(){
        let size = parseInt(gridRange.value);

        container.innerHTML = '';
        
        for (let i = 0; i < size * size; i++){
            let gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            container.appendChild(gridSquare);
            gridSquare.style.width = `calc(100% / ${size})`;
            gridSquare.style.paddingBottom = `calc(100% / ${size})`;
            gridSquare.addEventListener('click', function(){
                gridSquare.style.backgroundColor = 'black';
            })
        
        }
    }

    gridRange.addEventListener("input", change);
