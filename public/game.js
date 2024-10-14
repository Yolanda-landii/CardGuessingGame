const tilesContainer = document.querySelector(".tiles");
const startButton = document.getElementById("startButton");
const exitButton = document.getElementById("resetButton");

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
let lettersPicklist;
let tileCount;
let revealedCount;
let activeTile;
let awaitingEndOfMove;
let timer;
let seconds = 0, minutes = 0, hours = 0;
const timerElement = document.getElementById('timer');

function initGame() {
    tilesContainer.innerHTML = '';
    lettersPicklist = [...letters, ...letters];
    tileCount = lettersPicklist.length;
    revealedCount = 0;
    activeTile = null;
    awaitingEndOfMove = false;
    startTimer();

    for (let i = 0; i < tileCount; i++) {
        const randomIndex = Math.floor(Math.random() * lettersPicklist.length);
        const letter = lettersPicklist[randomIndex];
        const tile = buildTile(letter);
        lettersPicklist.splice(randomIndex, 1);
        tilesContainer.appendChild(tile);
    }
}

function buildTile(letter) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-letter", letter);
    element.setAttribute("data-revealed", "false");

    const frontFace = document.createElement("div");
    frontFace.classList.add("front");
    frontFace.textContent = "";

    const backFace = document.createElement("div");
    backFace.classList.add("back");
    backFace.textContent = letter;

    element.appendChild(frontFace);
    element.appendChild(backFace);

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");

        if (awaitingEndOfMove || revealed === "true" || element === activeTile) {
            return;
        }

        element.classList.add("revealed");

        if (!activeTile) {
            activeTile = element;
            return;
        }

        const letterToMatch = activeTile.getAttribute("data-letter");

        if (letterToMatch === letter) {
            element.setAttribute("data-revealed", "true");
            activeTile.setAttribute("data-revealed", "true");
            activeTile = null;
            awaitingEndOfMove = false;
            revealedCount += 2;

            if (revealedCount === tileCount) {
                stopTimer();
                alert("You win! Refresh to start again.");
            }

            return;
        }

        awaitingEndOfMove = true;
        setTimeout(() => {
            activeTile.classList.remove("revealed");
            element.classList.remove("revealed");
            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000);
    });

    return element;
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes === 60) {
            hours++;
            minutes = 0;
        }
        timerElement.textContent = `Time: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// Event listeners
startButton.addEventListener("click", initGame);
exitButton.addEventListener("click", () => {
    tilesContainer.innerHTML = '';
    stopTimer();
});
