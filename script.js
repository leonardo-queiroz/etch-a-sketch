const body = document.querySelector("body");
const r = document.querySelector(":root");
const canvas = document.querySelector("#canvas");

let canvasWidth = 450;
let canvasHeight = 450;
let squaresWidth;
let squaresHeight;
let squaresPerSide = 50;

let holdClick = false;
body.addEventListener("mousedown", function() {
    holdClick = true;
});
body.addEventListener("mouseup", function() {
    holdClick = false;
})

const activeColor = document.querySelector("#active-color");
activeColor.addEventListener("change", function() {
    r.style.setProperty('--brushColor', activeColor.value);
});

const canvasColor = document.querySelector("#canvas-color");
canvasColor.addEventListener("input", function() {
    r.style.setProperty('--canvasColor', canvasColor.value);
});

let randomOn = false;
const randomButton = document.querySelector("#random-button");
randomButton.addEventListener("click", function() {
    if (!randomOn) {
        randomOn = true;
    } else if (randomOn) {
        randomOn = false;
    }
});

let gridOn = false;
const gridButton = document.querySelector("#grid-button");
gridButton.addEventListener("click", function() {
    const pixels = document.querySelectorAll(".pixels");
    
    if (!gridOn) {
        gridOn = true;
        pixels.forEach(pixel => pixel.classList.add("pixel-grid"));
    } else if (gridOn) {
        gridOn = false;
        pixels.forEach(pixel => pixel.classList.remove("pixel-grid"));
    }
});

let eraserOn = false;
const eraserButton = document.querySelector("#eraser-button");
eraserButton.addEventListener("click", function() {
    if (!eraserOn) {
        eraserOn = true;
    } else if (eraserOn) {
        eraserOn = false;
    }
});

const brushSlider = document.querySelector("#brush-slider");
brushSlider.addEventListener("change", function() {
    squaresPerSide = brushSlider.value;

    renderCanvas();
})

const canvasSlider = document.querySelector("#canvas-slider");
canvasSlider.addEventListener("change", function() {
    canvasWidth = canvasSlider.value;
    canvasHeight = canvasSlider.value;

    renderCanvas();
})


renderCanvas();


function renderCanvas() {
    canvas.textContent = "";
    r.style.setProperty('--canvasWidth', `${canvasWidth}px`);
    r.style.setProperty('--canvasHeight', `${canvasHeight}px`);

    calculateSquare();

    for (let i = 1; i <= squaresPerSide ** 2; i++) {
        const pixel = document.createElement("div");
        pixel.removeAttribute("class");
        pixel.classList.add("pixels");
        
        if (gridOn) {
            pixel.classList.add("pixel-grid");
        }

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

    if (eraserOn) {
        e.target.style.backgroundColor = "";
    } 
    else if (randomOn) {
        let R = Math.floor(Math.random() * 256);
        let G = Math.floor(Math.random() * 256);
        let B = Math.floor(Math.random() * 256);
        
        e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    } 
    else {
        e.target.style.backgroundColor = activeColor.value;
    }
}
