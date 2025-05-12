# 📊 Market Research App

A sleek and powerful React application powered by **OpenAI** that generates **instant market research reports** with compelling text and insightful charts—tailored for any industry and region.

---

## ✨ Features

- ⚡ Instant market research report generation  
- 🌍 Industry- and region-specific insights  
- 📈 Auto-generated charts to accompany each section  
- 🤖 Powered by OpenAI for natural language generation  
- 🧩 Modular architecture using React and Node.js  

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js  
- Redis Server  
- `market_research_service` (microservice backend)  

---

### 🖥️ Run Frontend (React)

Start the frontend in development mode:

```bash
npm run dev --host=<your-ip>
```

### ⚙️ Run Backend (Node.js)
Start the Node.js backend:

```bash
node server.cjs
```
Ensure your Redis server and the market_research_service are properly configured in server.cjs.


### 🧠 Required Services
This app depends on the following microservice:

- https://github.com/morales0021/Market_Research_Services

Make sure it is running and accesible for full functionality.


### 🛠 Tech Stack
- **Frontend:** React

- **Backend:** Node.js

- **AI Integration:** OpenAI

- **Cache & Messaging:** Redis

📝 License
This project is licensed under a GNU GPL license.