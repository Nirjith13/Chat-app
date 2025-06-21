# 💬 CHAT_APP — Real-Time Group Chat

A full-stack group chat application built with **React**, **Node.js**, and **Socket.IO**. 
Users can join chat rooms using just their name and a room ID. All sessions are temporary — messages and users are cleared upon leaving.
This project focuses on real-time communication without database storage.

---
## 🚀 Features
- Real-time messaging via **WebSockets (Socket.IO)**
- Room-based group chat
- Stateless: no database, all sessions reset on exit

---
## 🛠️ Tech Stack
**Frontend:** React, Socket.IO Client  
**Backend:** Node.js, Express.js, Socket.IO Server

---
## 🔧 How to Run
```terminal
# Server
cd server
yarn install
yarn start

# Client (new terminal)
cd client
yarn install
yarn start
