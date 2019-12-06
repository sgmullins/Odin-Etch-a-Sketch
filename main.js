const container = document.getElementById("container");
const btn = document.querySelector(".resetBtn");
const colorBtn = document.querySelector('.colorBtn');
let colorLine = false;
let blackLine = true;

colorBtn.addEventListener('click', switchToColor);

// Reset board logic and prompt for future board number
btn.addEventListener('click', function () {
    let tiles = document.querySelector('.tileDiv');
    tiles.remove();
    createTileDiv();
    do {
        var numOfSquares = parseInt(prompt("How large would you like your Etch-a-Sketch? (squares per side)", ""), 10);
    } while (isNaN(numOfSquares) || numOfSquares > 100 || numOfSquares < 1);
    createGrid(numOfSquares);
});

//Logic to switch from colored lines back to black and white
function switchToColor() {
    if (colorLine != true) {
        colorBtn.innerHTML = 'Turn Off Colored Line';
        colorLine = true;
        blackLine = false;
    } else {
        colorBtn.innerHTML = 'Turn On Colored Line';
        colorLine = false;
        blackLine = true;
    }
};

//Random color generator for the colored line option
function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    return bgColor = "rgb(" + r + "," + b + "," + g + ")";
};

// Tile div was created as a functional way to later remove all div elements inside it and still preserve the playing board
function createTileDiv() {
    let tileDiv = document.createElement('div');
    tileDiv.setAttribute('class', 'tileDiv');
    container.appendChild(tileDiv);
}
createTileDiv();

// Individual tile creation and onload board setup
function createGrid(gridSize) {
    let tileDiv = document.querySelector('.tileDiv');
    tileDiv.style.setProperty("--colNum", gridSize);
    tileDiv.style.setProperty("--rowNum", gridSize);
    for (let row = 0; row < gridSize; row++) {
        for (let column = 0; column < gridSize; column++) {
            let newTileDiv = document.createElement('div');
            newTileDiv.setAttribute('class', 'tile');
            // newTileDiv.style.filter = 'brightness(100%)';
            tileDiv.appendChild(newTileDiv);
            newTileDiv.addEventListener('mouseenter', function () {
                let opacity = this.style.opacity;
                if (blackLine === true) {
                    const opacity = Number(this.style.opacity);
                    this.style.backgroundColor = 'black';
                    this.style.opacity = opacity + 0.2;
                } else if (this.classList.contains('active')) {
                    this.style.opacity = (Number(opacity) + 0.2);
                } else {
                    this.classList.add('active');
                    this.setAttribute('style', 'opacity:0.1');
                    this.style.background = randomColor();
                };
            });
        }
    }
}
createGrid(16);