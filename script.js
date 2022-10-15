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

createGrid(16)

function changeColor(e) {
    e.target.style.backgroundColor = "red";
}

sizeBtn.addEventListener("click", recreateGrid)

function recreateGrid() {
    let newSize = prompt("Please select size")
    if (!Number.isInteger(Number(newSize))) {
        alert("Please enter a valid integer")
        return
    }
    if (Number(newSize) > 100) {
        alert("Max is 100, please try again")
        return
    }
    else if (Number(newSize) < 1) {
        alert("Min is 1, please try again")
        return
    }

    grid.innerHTML = ""
    createGrid(newSize)
}