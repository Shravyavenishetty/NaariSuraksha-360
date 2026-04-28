# NaariSuraksha 360 – Women Safety & Digital Protection Platform

NaariSuraksha 360 is a real-time safety decision system designed to help women make safer choices in travel, location, and digital interactions. It analyzes multiple data points (Weather, Time, News, and Context) to provide actionable safety recommendations.

## 🚀 Features

- **Real-time Safety Score**: A 0–10 risk index calculated dynamically based on your location.
- **SafeRoute Module**: Analyzes multiple routes between a source and destination to recommend the safest path.
- **Area Safety Scanner**: Scans recent news and safety signals for any location globally.
- **Emergency Companion**: A one-tap "Danger" button that provides immediate guidance and safe zone locations.
- **Digital Safety**: Validates emails and phone numbers to protect against digital harassment and phishing.

## 🛠 Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **APIs**: IPify, ip-api, Open-Meteo, GNews (simulated fallback)

## 🔌 APIs Used

- **Location**: IPify & ip-api (No key required)
- **Weather**: Open-Meteo (No key required)
- **News**: GNews (Simulation implemented for zero-key usage)
- **Digital**: Custom Logic & Regex (Simulation implemented for zero-key usage)

## ⚙️ Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB connection string

### 1. Backend Setup
```bash
cd server
npm install
# Update .env with your MongoDB URI
node index.js
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🧠 Safety Engine Logic
The core score is calculated as:
`Score = (Weather Risk * 0.3) + (News Risk * 0.4) + (Time Risk * 0.2) + (Context Risk * 0.1)`

- **Weather**: Rain, fog, or storms increase risk.
- **Time**: Night time (18:00 - 06:00) adds a significant risk factor.
- **News**: Recent crime keywords in the area frequency.
- **Context**: Population density and safe zone proximity.
