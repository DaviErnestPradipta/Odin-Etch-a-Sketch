function updateGrid() {
    const sideLength = Number(slider.value)
    const colorMode = colorModeCheckbox.checked
    const opacityMode = opacityModeCheckbox.checked
    createGrid(sideLength, colorMode, opacityMode)
}

function createGrid(sideLength, colorMode, opacityMode) {
    const container = document.querySelector(".container")

    // Clear previous squares
    container.innerHTML = ""

    //Set grid template
    container.style.gridTemplateColumns = `repeat(${sideLength}, 1fr)`
    container.style.gridTemplateRows = `repeat(${sideLength}, 1fr)`

    const totalSquares = sideLength * sideLength
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        container.appendChild(square)

        //Hover effect
        square.addEventListener("mouseover", () => {
            if (colorMode) {
                square.style.backgroundColor = getRandomColor()
            }
            else if (opacityMode) {
                square.style.backgroundColor = "red"
            }
            else {
                square.style.backgroundColor = "black"
            }
        })
    }
}

function getRandomColor() {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

const colorModeCheckbox = document.getElementById("colorMode")
const opacityModeCheckbox = document.getElementById("opacityMode")
const gridValue = document.getElementById("gridValue")
const slider = document.getElementById("gridSize")
const reloadButton = document.getElementById("reloadButton")

//Update grid and toggle behavior on Color Mode checkbox
colorModeCheckbox.addEventListener("change", () => {
    if (colorMode) {
        opacityModeCheckbox.checked = false
    }
    updateGrid()
})

//Update grid and toggle behavior on Opacity Mode checkbox
opacityModeCheckbox.addEventListener("change", () => {
    if (opacityMode) {
        colorModeCheckbox.checked = false
    }
    updateGrid()
})

//Update label to show current value
slider.addEventListener("input", () => {
    gridValue.textContent = `${slider.value} × ${slider.value}`
    updateGrid()
})

reloadButton.addEventListener("click", updateGrid)

createGrid(16, colorModeCheckbox.checked, opacityModeCheckbox.checked)