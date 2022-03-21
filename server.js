const express = require("express");

const dotenv = require("dotenv").config();

const pdfKit = require("pdfkit");

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App is running on port ");
});
