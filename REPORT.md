Project Report
==============

Project Explanation
-------------------
This project is a small expert-system-driven helpdesk application. A user raises a support ticket in the frontend, the expert rules evaluate the issue to assign a priority (Critical, High, Medium, Low), and the ticket is stored in a MongoDB database via a Node/Express backend. The UI includes a dashboard that summarizes ticket counts, a form to create new tickets, and a history view to track and act on tickets (escalate or resolve).

Changes Log (Start to End)
--------------------------
1) Fixed the ticket history markup so the table structure is valid and actions are rendered in the correct column.
2) Added frontend logic to fetch tickets from the backend and render history, plus working Escalate and Resolve actions.
3) Connected the dashboard counts to the backend rather than local storage.
4) Added loading and error messaging for the dashboard.
5) Overhauled the frontend UI: redesigned layout, navigation, cards, forms, buttons, and tables.
6) Added status and priority badges for faster scanning in the ticket history.
7) Added user-friendly empty/loading/error states for ticket history and creation.
8) Refactored frontend script for clarity, consistent DOM helpers, and proper flow control.
9) Added expert-system suggested solutions to tickets and stored them in the database.
10) Displayed suggested solutions in the ticket history and during ticket creation.
11) Expanded expert rules to provide module-specific solutions for Authentication, Payment, Database, and UI.
12) Cleaned backend dependencies and ensured mongoose is installed for the API.

Files Updated
-------------
- index.html (new layout and dashboard status placement)
- ticket.html (new layout and form structure)
- history.html (new layout and status placement)
- style.css (complete visual refresh)
- script.js (refactor + UX improvements)
- Backend/server.js (expert suggestions on creation)
- Backend/models/Ticket.js (new suggestedSolution field)
- Backend/package.json (cleaned dependencies)

How to Run
----------
1) Start MongoDB and ensure it is accessible at mongodb://127.0.0.1:27017/supportSystem
2) Start the backend:
   - cd "Expert_System/Backend"
   - npm install
   - node server.js
3) Open the frontend pages in your browser:
   - Expert_System/index.html
   - Expert_System/ticket.html
   - Expert_System/history.html
