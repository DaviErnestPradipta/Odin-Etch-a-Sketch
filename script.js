function updateGrid() {
    const sideLength = Number(slider.value)
    const colorMode = colorModeCheckbox.checked
    const eraserMode = eraserModeCheckbox.checked
    const opacityMode = opacityModeCheckbox.checked
    createGrid(sideLength, colorMode, opacityMode)
}

function createGrid(sideLength, colorMode, eraserMode, opacityMode) {
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
            if (colorModeCheckbox.checked) {
                if (!square.style.backgroundColor) {
                    square.style.backgroundColor = getRandomColor()
                }
            }
            else if (eraserModeCheckbox.checked) {
                square.style.backgroundColor = ""
            }
            else if (opacityModeCheckbox.checked) {
                let currentColor = window.getComputedStyle(square).backgroundColor
                let rgb = currentColor.match(/\d+/g).map(Number)
                let newRgb = rgb.map(value => Math.max(0, value - 255 / 10))
                square.style.backgroundColor = `rgb(${newRgb.join(",")})`
            }
            else {
                if (!square.style.backgroundColor) {
                    square.style.backgroundColor = "black"
                }
                
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
const eraserModeCheckbox = document.getElementById("eraserMode")
const opacityModeCheckbox = document.getElementById("opacityMode")
const gridValue = document.getElementById("gridValue")
const slider = document.getElementById("gridSize")
const reloadButton = document.getElementById("reloadButton")

//Enable exclusive checkbox
const checkboxes = [colorModeCheckbox, eraserModeCheckbox, opacityModeCheckbox]
checkboxes.forEach(currentCheckbox => {
    currentCheckbox.addEventListener("change", () => {
        if (currentCheckbox.checked) {
            checkboxes.forEach(box => {
                if (box !== currentCheckbox) {
                    box.checked = false
                }
            })
        }
    })
})

//Update label to show current value
slider.addEventListener("input", () => {
    gridValue.textContent = `${slider.value} × ${slider.value}`
})

reloadButton.addEventListener("click", updateGrid)

createGrid(16, colorModeCheckbox.checked, opacityModeCheckbox.checked)