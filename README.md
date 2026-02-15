# TaskFlow 📋

> A demo task management app — monitored by **GitAgent Master** AI agents

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=flat-square&logo=vercel)](https://taskflow-demo.vercel.app)
[![API](https://img.shields.io/badge/API-Express-green?style=flat-square&logo=node.js)](https://taskflow-api.onrender.com)
[![Agents](https://img.shields.io/badge/GitAgent%20Master-Live-yellow?style=flat-square)](http://34.100.156.81:3000)

## 🤖 AI Agents Monitoring This Repo

This repo is connected to **GitAgent Master** — a multi-agent AI system that:

- 🔍 **PR Intelligence** — Reviews every PR for bugs and code quality
- 📊 **Repo Analyst** — Tracks repo health, commits, and issues  
- 🎫 **Linear Agent** — Auto-creates tickets for bugs found in PRs

## 🐛 Known Issues (for agent demo)

This repo intentionally contains bugs for AI agent demonstration:

1. **No input validation** — `POST /api/tasks` accepts empty titles
2. **Type mismatch** — `GET /api/tasks/:id` uses string comparison instead of `parseInt`
3. **Silent delete** — `DELETE /api/tasks/:id` returns success even if task doesn't exist

Ask GitAgent Master to review PRs in this repo and watch it find these issues! 

## 🏗️ Stack

| Layer | Tech |
|-------|------|
| Frontend | Vanilla HTML/CSS/JS |
| Backend | Node.js + Express |
| Deployment | Vercel (frontend) |
| AI Agents | Archestra + Gemini 2.0 Flash |
| Issue Tracking | Linear (auto-created by agents) |

## 📁 Structure

```
taskflow/
├── frontend/          # Static HTML frontend
│   ├── public/
│   │   └── index.html
│   └── vercel.json
├── backend/           # Express REST API
│   ├── index.js
│   └── package.json
└── README.md
```

## 🚀 Run Locally

```bash
# Backend
cd backend
npm install
npm start
# API running at http://localhost:4000

# Frontend
cd frontend
open public/index.html
```

## 🔗 Links

- **GitAgent Master UI:** http://34.100.156.81:3000
- **Hackathon:** [2Fast2MCP — WeMakeDevs](https://forms.gle/S1fV4shNaDmAbgSB8)
