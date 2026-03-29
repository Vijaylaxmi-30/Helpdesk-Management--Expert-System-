const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Ticket = require("./models/Ticket");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/supportSystem")
.then(()=>console.log("MongoDB Connected"));


function computePriorityAndSolution(module, issue, urgency, blocked) {
let priority;
let suggestedSolution;

if(issue==="System Error" && urgency==="High")
priority="Critical";
else if(blocked==="Yes")
priority="High";
else if(issue==="Bug")
priority="Medium";
else
priority="Low";

if (module === "Authentication") {
    if (issue === "System Error") {
        suggestedSolution = "Verify auth service health, check token signing keys, and review auth logs.";
    } else if (issue === "Performance Issue") {
        suggestedSolution = "Inspect login latency, rate limits, and cache hit ratios for auth flows.";
    } else if (issue === "Bug") {
        suggestedSolution = "Reproduce with a test user, capture auth trace logs, and check recent auth changes.";
    } else if (issue === "Feature Request") {
        suggestedSolution = "Clarify login requirements (SSO, MFA), estimate scope, and document in backlog.";
    }
} else if (module === "Payment") {
    if (issue === "System Error") {
        suggestedSolution = "Check payment gateway status, verify webhooks, and review failed transaction codes.";
    } else if (issue === "Performance Issue") {
        suggestedSolution = "Audit gateway response times, retry queues, and payment DB write latency.";
    } else if (issue === "Bug") {
        suggestedSolution = "Reproduce with a sandbox transaction and review payment validation rules.";
    } else if (issue === "Feature Request") {
        suggestedSolution = "Confirm payment method needs, compliance checks, and add to roadmap.";
    }
} else if (module === "Database") {
    if (issue === "System Error") {
        suggestedSolution = "Check DB connectivity, disk space, and recent schema changes.";
    } else if (issue === "Performance Issue") {
        suggestedSolution = "Review slow query logs, add indexes, and tune connection pool limits.";
    } else if (issue === "Bug") {
        suggestedSolution = "Validate data integrity, check migration scripts, and audit recent writes.";
    } else if (issue === "Feature Request") {
        suggestedSolution = "Define new data requirements and assess migration impact.";
    }
} else if (module === "UI") {
    if (issue === "System Error") {
        suggestedSolution = "Check browser console errors and roll back recent UI deployments.";
    } else if (issue === "Performance Issue") {
        suggestedSolution = "Audit bundle size, reduce render blocking, and check API response times.";
    } else if (issue === "Bug") {
        suggestedSolution = "Capture screenshots, reproduce on supported browsers, and review UI state logic.";
    } else if (issue === "Feature Request") {
        suggestedSolution = "Collect UX requirements, create a wireframe, and add to UI backlog.";
    }
}

if (!suggestedSolution && issue==="System Error" && urgency==="High")
suggestedSolution="Restart the affected service, check recent logs, and notify the on-call engineer.";
else if (!suggestedSolution && issue==="System Error")
suggestedSolution="Review system logs for errors and validate recent deployments.";
else if (!suggestedSolution && issue==="Performance Issue")
suggestedSolution="Check CPU/memory metrics, identify slow queries, and run profiling.";
else if (!suggestedSolution && issue==="Bug")
suggestedSolution="Capture steps to reproduce, gather logs, and assign to development.";
else if (!suggestedSolution && issue==="Feature Request")
suggestedSolution="Document requirements, estimate effort, and add to the product backlog.";
else if (!suggestedSolution && blocked==="Yes")
suggestedSolution="Provide a workaround if possible and escalate the ticket.";
else if (!suggestedSolution)
suggestedSolution="Collect more details from the requester and monitor for patterns.";

return { priority, suggestedSolution };
}


/* ---------------- CREATE TICKET ---------------- */

app.post("/tickets", async (req,res)=>{

let {module,issue,urgency,blocked} = req.body;

const { priority, suggestedSolution } = computePriorityAndSolution(module, issue, urgency, blocked);

let ticket = new Ticket({
module,
issue,
urgency,
blocked,
priority,
suggestedSolution
});

await ticket.save();

res.json(ticket);

});



/* ---------------- GET ALL TICKETS ---------------- */

app.get("/tickets", async (req,res)=>{

let tickets = await Ticket.find();

res.json(tickets);

});


/* ---------------- GET SINGLE TICKET ---------------- */

app.get("/tickets/:id", async (req, res) => {
try {
let ticket = await Ticket.findById(req.params.id);
if (!ticket) return res.status(404).json({ error: "Ticket not found" });
res.json(ticket);
} catch (err) {
console.error(err);
res.status(500).json({ error: "Failed to fetch ticket" });
}
});



/* ---------------- ESCALATE TICKET ---------------- */

app.put("/tickets/:id/escalate", async (req,res)=>{

let ticket = await Ticket.findByIdAndUpdate(

req.params.id,

{status:"Escalated"},

{new:true}

);

res.json(ticket);

});



/* ---------------- RESOLVE TICKET ---------------- */

app.put("/tickets/:id/resolve", async (req,res)=>{

let {solution} = req.body;

let ticket = await Ticket.findByIdAndUpdate(

req.params.id,

{
status:"Resolved",
solution:solution
},

{new:true}

);

res.json(ticket);

});

app.put("/tickets/:id", async (req, res) => {
try {
const { module, issue, urgency, blocked } = req.body;
const { priority, suggestedSolution } = computePriorityAndSolution(module, issue, urgency, blocked);

let ticket = await Ticket.findByIdAndUpdate(
req.params.id,
{ module, issue, urgency, blocked, priority, suggestedSolution },
{ new: true }
);

if (!ticket) return res.status(404).json({ error: "Ticket not found" });

res.json(ticket);
} catch (err) {
console.error(err);
res.status(500).json({ error: "Failed to update ticket" });
}
});


/* ---------------- START SERVER ---------------- */

app.listen(5000,()=>{

console.log("Server running on port 5000");

});