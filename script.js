const body = document.querySelector("body");
const canvas = document.querySelector("#canvas");
let canvasWidth = 500;
let canvasHeight = 500;

const activeColor = document.querySelector("#active-color");
const canvasColor = document.querySelector("#canvas-color");
canvasColor.addEventListener("input", function() {
    canvas.style.backgroundColor = canvasColor.value;
})

const smallButton = document.querySelector("#small-button");
smallButton.addEventListener("click", function() {
    canvasWidth = 400;
    canvasHeight = 400;
    canvas.removeAttribute("class");
    canvas.classList.add("s-canvas");
    renderCanvas();
});
const mediumButton = document.querySelector("#medium-button");
mediumButton.addEventListener("click", function() {
    canvasWidth = 500;
    canvasHeight = 500;
    canvas.removeAttribute("class");
    canvas.classList.add("m-canvas");
    renderCanvas();
});
const largeButton = document.querySelector("#large-button");
largeButton.addEventListener("click", function() {
    canvasWidth = 600;
    canvasHeight = 600;
    canvas.removeAttribute("class");
    canvas.classList.add("l-canvas");
    renderCanvas();
});

let squaresPerSide = 50;
let squaresWidth;
let squaresHeight;

let holdClick = false;
body.addEventListener("mousedown", function() {
    holdClick = true;
});
body.addEventListener("mouseup", function() {
    holdClick = false;
})

renderCanvas();

function renderCanvas() {
    canvas.textContent = "";  

    calculateSquare();

    for (let i = 1; i <= squaresPerSide ** 2; i++) {
        const pixel = document.createElement("div");
        pixel.removeAttribute("class");
        pixel.classList.add("pixels");     
        pixel.style.width = `${squaresWidth}px`;
        pixel.style.height = `${squaresHeight}px`;
        pixel.addEventListener("mousedown", paint);
        pixel.addEventListener("mouseover", paint);
        canvas.appendChild(pixel);
    };
}

function calculateSquare() {
    squaresWidth = canvasWidth / squaresPerSide;
    squaresHeight = canvasHeight / squaresPerSide;    
}

function paint(e) {
    if (e.type === "mouseover" && !holdClick) {
        return;
    }
    e.target.style.backgroundColor = activeColor.value;
}
