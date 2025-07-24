# 📈 Smart Goal Planner

A React app that helps users create, track, and manage their financial goals.  
Users can add savings goals, make deposits toward them, see their progress, and get alerts when deadlines are close or overdue.  
The app fetches and saves data using a local `db.json` file served with `json-server`.
[Live link](https://smartgoalfinder.netlify.app/)

## Features

- Create, update, and delete savings goals
- Track progress visually with progress bars
- Deposit money toward any goal
- Overview of total goals, total saved, and completed goals
- Warnings for goals close to deadline or overdue
- Data persisted via REST API (CRUD) to `db.json`

## Tech Stack

- React (Create React App)
- JavaScript (ES6+)
- CSS (inline & optional styling)
- JSON Server (`db.json` as mock REST API)
- Git & GitHub (version control)

## 🧰 Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js & npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [JSON Server](https://www.npmjs.com/package/json-server)

### Installation

1 Clone this repository:

```bash
git clone <your-repo-url>
cd smart-goal-planner
```bash

2 Install dependencies:

npm install

npm install

```bash
npm install
```bash

3 Start the React app:

npm start
npm start

```

4 In another terminal, start JSON Server:

```bash
npx json-server --watch db.json --port 3001
npx json-server --watch db.json --port 3001
npx json-server --watch db.json --port 3001
```

5 Open your browser and go to:

React app: <http://localhost:3000>

JSON Server API: <https://my-json-server.typicode.com/Kujo254/code-challenge-phase2/goals>

## 📋 Usage

- Open the app in your browser at [http://localhost:3000](http://localhost:3000)
- Add a new goal by filling out the form and submitting
- View all your goals in the list with progress bars
- Make deposits toward a goal to increase its saved amount
- See the overview section for total goals, total saved, completed goals, and warnings for deadlines
- Edit or delete goals as needed

## 📜 License

This project is for educational purposes at Moringa School.

## LIve server
https://smartgoalfinder.netlify.app/

## 🙌 Acknowledgments

- Thanks to Moringa School instructors & peers
- Built with [React](https://reactjs.org/) and [JSON Server](https://github.com/typicode/json-server)

### Author

- **Kurui Joshua**
- [GitHub](https://github.com/Kujo254)
- Email: <kuruijoshua@gmail.com>
