const express = require("express");
const router = express.Router();
const passport = require("passport");

const reportsController = require("../../controllers/v1/reports");

router.get("/:status", passport.authenticate("jwt", {session: false}),reportsController.allReportsByStatus);

module.exports = router;