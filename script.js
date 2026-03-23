const API_BASE_URL = "http://localhost:5000";

function getEl(id) {
return document.getElementById(id);
}

function setText(id, text) {
let el = getEl(id);
if (el) el.innerText = text;
}

function setHtml(id, html) {
let el = getEl(id);
if (el) el.innerHTML = html;
}

function getPriorityClass(priority) {
let value = String(priority || "").toLowerCase();
if (value === "critical") return "badge--priority-critical";
if (value === "high") return "badge--priority-high";
if (value === "medium") return "badge--priority-medium";
return "badge--priority-low";
}

function getStatusClass(status) {
if (status === "Resolved") return "badge--resolved";
if (status === "Escalated") return "badge--escalated";
return "badge--open";
}

function calculatePriority(issue, urgency, blocked) {
if (issue === "System Error" && urgency === "High") return "Critical";
if (blocked === "Yes") return "High";
if (issue === "Bug") return "Medium";
return "Low";
}

async function createTicket() {
let submitButton = getEl("submitTicket");
let module = getEl("module")?.value;
let issue = getEl("issue")?.value;
let urgency = getEl("urgency")?.value;
let blocked = getEl("blocked")?.value;

if (!module || !issue || !urgency || !blocked) {
setHtml("result", "Please complete every field before submitting.");
return;
}

let priority = calculatePriority(issue, urgency, blocked);
if (submitButton) submitButton.disabled = true;
setHtml("result", "Submitting ticket...");

try {
let response = await fetch(`${API_BASE_URL}/tickets`, {
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ module, issue, urgency, blocked, priority })
});

let data = await response.json();
setHtml(
"result",
`Ticket ID: ${data._id || "N/A"}<br>Priority: ${data.priority}<br>Suggested Solution: ${data.suggestedSolution || "Pending review"}<br>Status: Ticket Created`
);
} catch (error) {
console.error(error);
setHtml("result", "Error submitting ticket. Please try again.");
} finally {
if (submitButton) submitButton.disabled = false;
}
}

async function fetchTickets() {
setText("historyStatus", "Loading tickets...");
setHtml("ticketTable", `<tr><td colspan="7">Loading tickets...</td></tr>`);

try {
let response = await fetch(`${API_BASE_URL}/tickets`);
let tickets = await response.json();
renderTicketTable(tickets);
setText("historyStatus", "");
} catch (error) {
console.error(error);
setText("historyStatus", "Unable to load tickets.");
setHtml("ticketTable", `<tr><td colspan="7">Error loading tickets</td></tr>`);
}
}

function renderTicketTable(tickets) {
if (!Array.isArray(tickets) || tickets.length === 0) {
setHtml("ticketTable", `<tr><td colspan="7">No tickets found</td></tr>`);
return;
}

setHtml("ticketTable", tickets.map(ticket => `
<tr>
<td>${ticket._id}</td>
<td>${ticket.module}</td>
<td>${ticket.issue}</td>
<td><span class="badge ${getPriorityClass(ticket.priority)}">${ticket.priority}</span></td>
<td><span class="badge ${getStatusClass(ticket.status)}">${ticket.status}</span></td>
<td class="solution-text">${ticket.suggestedSolution || "Pending review"}</td>
<td>
<button class="btn btn--ghost" onclick="escalate('${ticket._id}')" ${ticket.status === "Resolved" ? "disabled" : ""}>Escalate</button>
<button class="btn btn--primary" onclick="resolveTicket('${ticket._id}')" ${ticket.status === "Resolved" ? "disabled" : ""}>Resolve</button>
</td>
</tr>
`).join(""));
}

async function escalate(id) {
try {
await fetch(`${API_BASE_URL}/tickets/${id}/escalate`, { method: "PUT" });
fetchTickets();
} catch (error) {
console.error(error);
}
}

async function resolveTicket(id) {
let solution = prompt("Enter resolution details:");
if (solution === null) return;
try {
await fetch(`${API_BASE_URL}/tickets/${id}/resolve`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ solution })
});
fetchTickets();
} catch (error) {
console.error(error);
}
}

async function fetchDashboardStats() {
setText("dashboardStatus", "Loading ticket stats...");
try {
let response = await fetch(`${API_BASE_URL}/tickets`);
let tickets = await response.json();
let total = tickets.length;
let open = tickets.filter(t => t.status === "Open").length;
let closed = tickets.filter(t => t.status === "Resolved").length;

setText("totalTickets", total);
setText("openTickets", open);
setText("closedTickets", closed);
setText("dashboardStatus", "");
} catch (error) {
console.error(error);
setText("dashboardStatus", "Unable to load ticket stats.");
}
}

document.addEventListener("DOMContentLoaded", () => {
if (getEl("ticketTable")) {
fetchTickets();
}
if (getEl("totalTickets")) {
fetchDashboardStats();
}
});