# 🗺️ Mapty — Map Your Workouts

> Track your running and cycling workouts on an interactive map, pinned exactly where you trained.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge)](https://mapty-sa.netlify.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/shivamkumar1103/Mapty)
[![Deployed on Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://mapty-sa.netlify.app/)

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How to Use](#-how-to-use)
- [Architecture](#-architecture)
- [Author](#-author)

---

## 🧭 About

**Mapty** is a browser-based workout tracker that lets you log running and cycling sessions directly on an interactive map. Every workout is pinned at the exact geographic location where it occurred. Data persists across sessions using the browser's `localStorage`, so your workout history is always available when you return.

This project was built as a deep-dive into **Object-Oriented JavaScript**, geolocation APIs, and third-party map libraries.

---

## ✨ Features

- 📍 **Geolocation-based Map** — The map auto-centers on your current location on load
- 🏃 **Running Workouts** — Log distance, duration, and cadence; auto-calculates pace
- 🚴 **Cycling Workouts** — Log distance, duration, and elevation gain; auto-calculates speed
- 🗺️ **Interactive Map Markers** — Each workout is pinned with a custom popup on the Leaflet map
- 📋 **Workout Sidebar** — All workouts listed in the sidebar; click any entry to fly to it on the map
- 🔃 **Sort Workouts** — Sort your workout list by date, distance, or duration
- 💾 **Persistent Storage** — Workouts are saved to `localStorage` and restored on every visit
- 📱 **Responsive Layout** — Clean split-panel design works on desktop and mobile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | App structure and semantic markup |
| **CSS3** | Styling, layout, custom properties |
| **JavaScript (ES6+)** | Core application logic, OOP, modules |
| **Leaflet.js v1.9.4** | Interactive map rendering and markers |
| **Geolocation API** | Detecting user's current position |
| **localStorage API** | Persisting workout data between sessions |
| **Parcel v2** | Module bundler and dev server |
| **Google Fonts** | Manrope typeface |
| **Netlify** | Deployment and hosting |

---

## 📁 Project Structure

```
Mapty/
├── src/
│   └── js/
│       └── controller.js      # App entry point & main logic
├── index.html                 # Main HTML file
├── style.css                  # Global styles
├── logo.png                   # App logo
├── icon.png                   # Favicon
├── package.json               # Project metadata & scripts
└── package-lock.json          # Dependency lock file
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shivamkumar1103/Mapty.git

# 2. Navigate into the project directory
cd Mapty

# 3. Install dependencies
npm install
```

### Running Locally

```bash
npm start
```

This starts the Parcel dev server. Open [http://localhost:1234](http://localhost:1234) in your browser.

> ⚠️ **Important:** The Geolocation API requires either `localhost` or an HTTPS connection. Make sure to open the app via the dev server URL, not by opening `index.html` directly as a file.

### Building for Production

```bash
npm run build
```

Output will be placed in the `dist/` folder.

---

## 📖 How to Use

1. **Allow location access** when the browser prompts — the map will center on your position.
2. **Click anywhere on the map** to open the workout form in the sidebar.
3. **Select workout type** (Running or Cycling) from the dropdown.
4. **Fill in the details:**
   - Running: Distance (km), Duration (min), Cadence (step/min)
   - Cycling: Distance (km), Duration (min), Elevation Gain (meters)
5. **Press Enter or click OK** to save the workout.
6. A **marker and popup** will appear on the map at the clicked location.
7. The workout appears in the **sidebar list** below the form.
8. **Click a workout** in the list to pan the map to that location.
9. **Sort workouts** using the sort controls (by date, distance, or duration).
10. Your workouts are **automatically saved** — they'll be there when you come back!

---

## 🏛️ Architecture

Mapty follows an **Object-Oriented Programming** design pattern:

```
App (Controller)
├── Workout (Base Class)
│   ├── Running  → calculates pace (min/km)
│   └── Cycling  → calculates speed (km/h)
└── Map (Leaflet instance)
    └── Markers & Popups per workout
```

- **Workout** is the parent class holding shared properties (id, date, coords, distance, duration).
- **Running** and **Cycling** extend Workout and add type-specific computed metrics.
- The **App** class orchestrates geolocation, map events, form handling, localStorage, and rendering.

---

## 👤 Author

**Shivam Kumar**

- GitHub: [shivamkumar1103](https://github.com/shivamkumar1103)

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">Made with ❤️ and lots of outdoor workouts 🏃🚴</p>
