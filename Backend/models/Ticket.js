const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({

    module: String,
    issue: String,
    urgency: String,
    blocked: String,
    priority: String,
    suggestedSolution: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        default: "Open"
    },

    solution: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Ticket", ticketSchema);