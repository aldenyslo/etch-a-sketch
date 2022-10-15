const grid = document.getElementById("grid-container");
const sizeBtn = document.getElementById("size-btn")
const rainbowBtn = document.getElementById("rainbow")
const colorInput = document.getElementById("color")
const clearBtn = document.getElementById("clear")
const shadeBtn = document.getElementById("shade")

function createGrid(size) {

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridCell = document.createElement("div");
        gridCell.classList.add("grid-cell");
        gridCell.style.backgroundColor = "white";
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
    else if (mode == "shade") {
        const cellColor = window.getComputedStyle(e.target).getPropertyValue("background-color")
        const colors = cellColor.substring(4, cellColor.length - 1).replace(/ /g, "").split(",")
        let r = colors[0] / 255;
        let g = colors[1] / 255;
        let b = colors[2] / 255;
        let max = Math.max(r, g, b)
        let min = Math.min(r, g, b)
        let c = max - min;
        let lum = (((max + min) / 2) * 0.9 * 100).toString();
        let hue;
        if (c == 0) {
            hue = 0;
        }
        else {
            switch(max) {
                case r:
                    let segmentr = (g - b) / c;
                    let shiftr   = 0 / 60;       // R° / (360° / hex sides)
                    if (segmentr < 0) {          // hue > 180, full rotation
                    shiftr = 360 / 60;         // R° / (360° / hex sides)
                    }
                    hue = segmentr + shiftr;
                    break;
                case g:
                    let segmentg = (b - r) / c;
                    let shiftg   = 120 / 60;     // G° / (360° / hex sides)
                    hue = segmentg + shiftg;
                    break;
                case b:
                    let segmentb = (r - g) / c;
                    let shiftb   = 240 / 60;     // B° / (360° / hex sides)
                    hue = segmentb + shiftb;
                    break;
            }
        }
        e.target.style.backgroundColor = `hsl(${hue * 60}, 100%, ${lum + "%"})`
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
    mode = "rainbow"
}
shadeBtn.onclick = () => {
    mode = "shade"
}

clearBtn.onclick = () => {
    grid.innerHTML = ""
    createGrid(16)
}