const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    // includes the array of reports
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Report"
        }
    ]
}, {
    timestamps: true
});


const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;