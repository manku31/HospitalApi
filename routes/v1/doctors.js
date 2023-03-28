const express = require("express");
const router = express.Router();

const doctorsController = require("../../controllers/v1/doctors");

router.post("/register", doctorsController.register);

router.post("/login", doctorsController.login);

module.exports = router;