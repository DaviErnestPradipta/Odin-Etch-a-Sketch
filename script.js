function updateGrid() {
    createGrid(Number(slider.value));
}

function createGrid(sideLength) {
    const container = document.querySelector(".container");

    // Clear previous squares and set grid template
    container.innerHTML = "";
    container.style.gridTemplateColumns = container.style.gridTemplateRows = `repeat(${sideLength}, 1fr)`;

    // Create squares
    Array.from({ length: sideLength * sideLength }).forEach(() => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.addEventListener("mouseover", () => handleHover(square));
        container.appendChild(square);
    });
}

function handleHover(square) {
    const modeHandlers = {
        colorMode: () => applyStyle(square, getRandomColor()),
        eraserMode: () => applyStyle(square, null),
        opacityMode: () => applyOpacity(square),
        default: () => applyStyle(square, "black"),
    };

    (modeHandlers[getActiveMode()] || modeHandlers.default)();
}

function applyStyle(square, color) {
    square.style.backgroundColor = color ?? ""; // Clear color if null
}

function applyOpacity(square) {
    const rgb = getRgbValues(square.style.backgroundColor || "rgb(255, 255, 255)");
    const newRgb = rgb.map(value => Math.max(0, value - 255 / 10));
    square.style.backgroundColor = `rgb(${newRgb.join(",")})`;
}

function getRgbValues(color) {
    return color.match(/\d+/g)?.map(Number) || [255, 255, 255];
}

function getRandomColor() {
    return `#${Array.from({ length: 6 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;
}

function getActiveMode() {
    return modeCheckboxes.find(cb => cb.checked)?.id || "default";
}

function setupExclusiveCheckboxes(checkboxes) {
    checkboxes.forEach(currentCheckbox => {
        currentCheckbox.addEventListener("change", () => {
            if (currentCheckbox.checked) {
                checkboxes.forEach(box => (box.checked = box === currentCheckbox));
            }
        });
    });
}

function setupSlider() {
    slider.addEventListener("input", () => {
        gridValue.textContent = `${slider.value} × ${slider.value}`;
    });
}

// DOM Elements
const modeCheckboxes = [
    document.getElementById("colorMode"),
    document.getElementById("eraserMode"),
    document.getElementById("opacityMode"),
];
const gridValue = document.getElementById("gridValue");
const slider = document.getElementById("gridSize");
const reloadButton = document.getElementById("reloadButton");

// Initialize
setupExclusiveCheckboxes(modeCheckboxes);
setupSlider();
reloadButton.addEventListener("click", updateGrid);
createGrid(16);