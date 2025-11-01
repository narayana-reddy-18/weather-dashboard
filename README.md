# 🌦️ Weather Analytics Dashboard

A modern **Weather Analytics Dashboard** built with **React**, **Redux Toolkit**, and **Recharts** that provides real-time weather data, forecasts, and interactive visualizations.
This project helps users explore both **short-term** and **long-term weather patterns** across multiple locations.

---

## 🚀 Live Demo

🔗 [https://weather-dashboard-git-main-vemannagari-narayana-reddys-projects.vercel.app/](https://weather-dashboard-git-main-vemannagari-narayana-reddys-projects.vercel.app/)

---

## 📸 Preview

### 🏠 Dashboard

Displays weather summaries for multiple cities with:

* Current temperature
* Weather condition icons (☀️ 🌧️ ☁️)
* Humidity, wind speed, and quick info cards

### 🌤 Detailed City View

When a city card is clicked:

* Hourly and 7-day forecasts
* Charts for temperature, humidity, and wind trends
* Additional data like pressure, dew point, and UV index

---

## 🧩 Features

✅ **Dashboard Overview**

* Displays real-time weather data for multiple cities
* Auto-refresh every minute

✅ **Detailed Forecast View**

* Shows 5–7 day weather forecast
* Hourly temperature trend chart

✅ **Search & Favorites**

* Search cities with autocomplete
* Add to favorites for quick access
* Favorites persist using local storage

✅ **Interactive Visualizations**

* Charts powered by **Recharts**
* Temperature, wind speed, and precipitation graphs
* Responsive and interactive

✅ **Settings**

* Toggle between °C and °F

✅ **Real-Time Data**

* Fetches data using **OpenWeatherMap API**
* Refreshes automatically at intervals

---

## 🛠️ Tech Stack

| Category             | Technologies                       |
| -------------------- | ---------------------------------- |
| **Frontend**         | React + Vite                       |
| **State Management** | Redux Toolkit                      |
| **Charts**           | Recharts                           |
| **API**              | OpenWeatherMap                     |
| **Deployment**       | Vercel                             |
| **Styling**          | CSS / Tailwind CSS (if configured) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/narayana-reddy-18/weather-dashboard.git
cd weather-dashboard
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```bash
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

> ⚠️ Do **not** commit this file to GitHub.
> In Vercel, add it under **Settings → Environment Variables**.

### 4️⃣ Start the App Locally

```bash
npm run dev
```

### 5️⃣ Build for Production

```bash
npm run build
```

---

## 🌍 API Integration

This project uses the **OpenWeatherMap API** for fetching:

* Current weather data
* Hourly and daily forecasts

**Endpoints:**

```
https://api.openweathermap.org/data/2.5/weather
https://api.openweathermap.org/data/2.5/forecast
```

---

## 📊 Data Visualization

Using **Recharts**, the dashboard visualizes:

* 🌡️ Temperature Trends
* 💨 Wind Speed Variations
* ☔ Precipitation Probability

All charts are:

* Responsive
* Interactive with tooltips
* Animated for better user experience

---

## 💾 Caching & Optimization

* Stores fetched data in Redux store and local storage
* Refreshes only when data is older than 60 seconds
* Minimizes API calls to avoid rate limits

---

## 🔒 Environment Variables (Vercel)

| Variable               | Description                 |
| ---------------------- | --------------------------- |
| `VITE_WEATHER_API_KEY` | API key from OpenWeatherMap |

Set this in **Vercel → Project Settings → Environment Variables** for Production and Preview.

---

## 📁 Folder Structure

```
weather-dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── api/           # API handlers
│   ├── app/           # Redux store setup
│   ├── components/    # UI components
│   ├── features/      # Weather and dashboard logic
│   ├── assets/        # Icons, images
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🧠 Bonus Enhancements (Future Scope)

* 🔐 Google Sign-In Authentication
* ⚡ Real-Time Updates via WebSocket
* 💾 Advanced caching for offline use

---

## 👨‍💻 Author

**Narayana Reddy V**
🎓 B.Tech ECE, Mohan Babu University
💡 Passionate about Full-Stack Web Development and Data Visualization
🌐 [GitHub Profile](https://github.com/narayana-reddy-18)

---

## 🙏 Acknowledgements

* [OpenWeatherMap API](https://openweathermap.org/)
* [Recharts](https://recharts.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [Vercel](https://vercel.com)

---

## 🏁 Conclusion

This **Weather Analytics Dashboard** demonstrates real-time data fetching, caching, interactive charts, and responsive design — helping users understand weather trends across cities.

> “Turning weather data into beautiful, meaningful insights.”
