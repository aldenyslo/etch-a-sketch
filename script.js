const grid = document.getElementById("grid-container");
const sizeBtn = document.getElementById("size-btn")
const rainbowBtn = document.getElementById("rainbow")
const colorInput = document.getElementById("color")
const clearBtn = document.getElementById("clear")

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


function changeColor(e) {
    if (mode == "color") {
        e.target.style.backgroundColor = curColor;
    }
    else if (mode == "rainbow") {
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, 
        ${Math.floor(Math.random() * 256)}, 
        ${Math.floor(Math.random() * 256)})`
    }
}


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


createGrid(16)
let mode = "color"
curColor = "red"

sizeBtn.addEventListener("click", recreateGrid)
colorInput.oninput = (e) => {
    curColor = e.target.value
    mode = "color"
}
rainbowBtn.onclick = () => {
    if (rainbowBtn.classList.contains("active")) {
        rainbowBtn.classList.remove("active")
        mode = "color"
    }
    else {
        rainbowBtn.classList.add("active")
        mode = "rainbow"
    }
}
clearBtn.onclick = () => {
    grid.innerHTML = ""
    createGrid(16)
}