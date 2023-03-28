const jwt = require("jsonwebtoken");
const Doctor = require("../../models/doctor");

// register the doctor
module.exports.register = async function(req, res){
    try{
        // console.log(req.body);
        const doctor = await Doctor.findOne({email: req.body.email});

        if(doctor){

            return res.status(200).json({
                message: "Email id already exists"
            });

        }else{

            const doctor = await Doctor.create(req.body);

            return res.status(200).json({
                message: "Sign up successful",
                doctorId: doctor._id
            });
        }

    }catch(err){
        console.log("******", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// login the doctor and send the jwt token
module.exports.login = async function(req, res){
    try{

        const doctor = await Doctor.findOne({email: req.body.email});

        if(doctor && doctor.password === req.body.password){

            const token = jwt.sign({ id: doctor._id }, "secret", {expiresIn: "1d"});
            return res.status(200).json({
                success: "true",
                message: "Sign in successfully",
                token: token
            });

        }else{
            return res.status(401).json({
                success: "false",
                message: "Invalid username and password"
            })
        }

    }catch(err){
        console.log("******", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}