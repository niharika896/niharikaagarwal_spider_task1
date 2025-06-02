This is the task for SPIDER R&D CLUB INDUCTIONS'25
It has a common task and a domain specific task both in the field of application development

1) Common Task:
  # Hammer Strength Game 🎯

A simple and fun two-player reflex-based browser game where timing is everything! Players compete by hitting a button as the needle rotates back and forth — the closer the needle is to the vertical line (90°), the higher the impact on the strength meter and the higher the score!

## 🎮 Gameplay Overview

- A needle rotates between 0° and 180°.
- Two players take turns pressing their respective buttons.
- The goal is to **press the button when the needle is as close as possible to the vertical (90°)**.
- The closer the needle to 90°, the **higher the meter** will go.
- Points are awarded based on the strength meter's value for that turn.
- After a set number of rounds or turns, the player with the **highest total score wins**!

---

## 🛠️ Features

- 🎯 Smooth needle animation between 0° and 180°
- 👥 Turn-based two-player interaction
- 📈 Real-time strength meter calculation based on needle position
- 🏆 Scoring system with final winner display

---

## 💻 Technologies Used

- HTML5 & CSS3
- JavaScript (Vanilla)
- DOM Manipulation
- Basic Game Logic & Timing

---

## 🚀 Getting Started

### 1. Clone the Repository
git clone https://github.com/yourusername/hammer-strength-game.git
cd hammer-strength-game

### 2. Open the game
Just open index.html in your browser — no build or server setup required!

## 📸 Demo
Open the demo folder for an mp4 demo of the game



2) **Domain Specific task:**

# 🎮 Disc Connect Game

**Disc Connect** is a two-player strategy game inspired by the classic Connect Four, but with new twists like **column blocking** and **power-ups** to make gameplay more dynamic and exciting!

Created by Binod and Vinod, who were tired of the same old board games, this project brings new life to the grid with thoughtful rules and game mechanics.

## 📜 Rules of the Game

- The game is played on a **6-row × 7-column** board.
- **Two players** take turns dropping **red** and **yellow** discs into columns.
- Discs fall to the **lowest unoccupied space** in the selected column.
- At the **start of each turn**, the **opponent blocks one column**. The current player **cannot drop a disc** in that column for that turn.

### 🛑 Column Blocking Logic
- Only one column can be blocked per turn.
- Blocking must not prevent the current player from making a move (i.e., at least one unblocked and non-full column must remain).

### 🎯 Win Condition
- The goal is to **connect four discs** of the same color:
  - Vertically
  - Horizontally
  - Diagonally
- If the board fills up and no one connects four, the game ends in a **draw**.
  
## ⚡ Power-Ups

To keep the game unpredictable and fun, players get access to **strategic power-ups**:

- ⏱️ **Extra 15 Seconds**: Grants additional thinking time during your turn.
- 🔁 **Color Flip**: Flip one of your opponent's discs to your own color (can be used strategically to block or create a winning path).

**Power-ups can only be used **once per player** per game.**

## 🧱 Technologies Used

- **HTML5** – Structure of the game board and interface
- **CSS3** – Styling, layout, and animations
- **Vanilla JavaScript** – Core game logic, DOM manipulation, turn-based flow, win-checking, blocking, and power-ups

## 🚀 Getting Started

### 1. Clone the Repository
git clone https://github.com/yourusername/disc-connect-game.git
cd disk-battle-4

### 2. Open the game
Just open index.html in your browser — no build or server setup required!

## 📸 Demo
Open the demo folder for an mp4 demo of the game

Made with ❤️ by Niharika
