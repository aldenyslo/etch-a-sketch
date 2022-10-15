const grid = document.getElementById("grid-container");
const sizeBtn = document.getElementById("size-btn")

function createGrid(size) {

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.addEventListener("mouseover", changeColor);
        grid.appendChild(gridCell);
    }
}

createGrid(4)

function changeColor(e) {
    e.target.style.backgroundColor = "red";
}

sizeBtn.addEventListener("click", recreateGrid)

function recreateGrid() {
    let newSize = prompt("Please select size")
    grid.innerHTML = ""
    createGrid(newSize)
}