# Helpdesk Management Expert System

## Overview
This project is a web-based expert system for helpdesk support. It assigns ticket priority and generates suggested solutions based on issue type, urgency, blocked status, and module (Authentication, Payment, Database, UI). A Node/Express backend stores tickets in MongoDB, and a simple frontend provides a dashboard, ticket creation, and ticket history.

## Features
- Rule-based priority assignment (Critical/High/Medium/Low)
- Module-specific suggested solutions
- Ticket dashboard and history with status actions
- MongoDB persistence

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## How to Run
1) Start MongoDB (Windows service or `mongod`).
2) Start the backend:
   ```powershell
   cd "Backend"
   npm install
   node server.js
   ```
3) Open the frontend pages:
   - `index.html`
   - `ticket.html`
   - `history.html`

## Project Structure
```
Expert_System/
  Backend/
    models/
    server.js
  index.html
  ticket.html
  history.html
  script.js
  style.css
  REPORT.md
```
