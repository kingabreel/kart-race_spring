# 🏁 Wacky Race - Command Line Board Game

A simple command-line racing game inspired by *Wacky Races*, built in JavaScript (Node.js). Each player competes on a track, using attributes like **speed**, **maneuverability**, and **power** to win battles and reach the finish line.

---

## How to Play

- You select a character from a list of racers.
- The track has 30 positions with 3 lanes: **left**, **center**, and **right**.
- Players move forward based on a dice roll.
- If you roll a 6, you may switch lanes.
- When players land on the same space and lane, a **battle** happens:
  - `Straight` → compare **speed**
  - `Curve` → compare **maneuverability**
  - `Confront` → compare **power**
- Winning a battle can move you forward; losing may send you back.

---

## Getting Started

### Requirements
- Node.js 18+
