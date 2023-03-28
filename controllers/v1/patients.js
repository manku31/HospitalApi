const Patient = require("../../models/patient");
const Report = require("../../models/report");

module.exports.register = async function(req, res){
    try{

        const patient = await Patient.findOne({ phone: req.body.phone });

        if (patient) {

            return res.status(200).json({
                success: "true",
                message: "information of the patient",
                patientId: patient._id
            });

        } else {
            
            const patient = await Patient.create(req.body);
            return res.status(200).json({
                success: "true",
                message: "New patient is register",
                patientId: patient._id
            });
        }

    }catch(err){
        console.log("******", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


// create a report
module.exports.createReport = async function(req, res){
    try{

        // find the patient
        const patient = await Patient.findById(req.params.id);

        if(patient){
            // create the report if patient exists
            const report = await Report.create({
                createdBy: req.user._id,
                status: req.body.status,
                date: new Date(),
                patient: patient._id
            });

            patient.reports.push(report);
            patient.save();

            return res.status(200).json({
                success: "true",
                message: "new report is created"
            });

        }else{
            return res.status(401).json({
                message: "Could find the patient"
            });
        }

    }catch(err){
        console.log("******", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// get all the reports of the patient
module.exports.allReports = async function(req, res){
    try{

        // find the patient
        const patient = await Patient.findById(req.params.id);
        
        if(patient){

            // get all the reports of the patient
            const poppatient = await Patient.findById(req.params.id).sort("createdAt").populate("reports");

            return res.status(200).json({
                message: "All the reports",
                allReports: poppatient.reports
            });

        }else{
            return res.status(401).json({
                message: "Could find the patient"
            });
        }

    }catch(err){
        console.log("******", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}