const express = require("express");
const db = require("./config/mongoose");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
const app = express();
const port = 8000;

app.use(express.json());

// configure body parser
app.use(express.urlencoded({
    extended: true
}));

// passport
app.use(passport.initialize());

// routes
app.use("/", require("./routes"));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on the port : ${port}`);
});