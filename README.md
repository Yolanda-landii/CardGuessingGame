# Node Card Guessing Game

## Overview

The **Node Card Guessing Game** is a memory card game built using Node.js and Express.js. The objective of the game is to match pairs of cards in the shortest possible time. The game is played on a 6x6 grid (36 cards) with 18 matching pairs. The project includes features such as a timer, leaderboard, game reset, and persistent data storage using JSON files for tracking high scores.

## Features

- **Card Matching Mechanics**: Players select two cards at a time. If the cards match, they stay revealed. If not, they are hidden again.
- **6x6 Game Grid**: The game board consists of 6 rows and 6 columns, with a total of 18 pairs of cards to match.
- **Timer**: The game features a timer that tracks the time taken to complete the game in hours, minutes, and seconds.
- **Leaderboard**: When a player finishes the game, their time is recorded. If it's a high score (shortest time), the player's name and time are stored in a JSON file.
- **Game Reset**: Players can reset the game at any time, which reshuffles the cards and restarts the timer.
- **Persistent Storage**: High scores and leaderboard data are stored in a `score.json` file.
- **Responsive UI**: The game is designed with a simple and user-friendly interface using HTML, CSS, and EJS for templating.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 12.x or later)
- [NPM](https://www.npmjs.com/get-npm) (Node Package Manager)
- A code editor, such as [Visual Studio Code](https://code.visualstudio.com/)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/node-card-guessing-game.git
    cd node-card-guessing-game
    ```

2. **Install dependencies**:
    Navigate to the project directory and run the following command:
    ```bash
    npm install
    ```

3. **Start the server**:
    Run the following command to start the Express server:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:4000`.

### Project Structure

```bash
node-card-guessing-game/
│
├── data/
│   └── score.json         # JSON file storing leaderboard data
├── public/
│   ├── game.js            # Game logic for the card guessing       functionality
│   └── styles.css         # Styling for the game interface
├── views/
│   └── index.ejs          # EJS template for rendering the game UI
├── app.js                 # Main application entry point
├── package.json           # NPM package configuration
└── README.md              # Project documentation
