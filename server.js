const express = require("express");

const dotenv = require("dotenv").config();

const pdfKit = require("pdfkit");

const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

//middleware
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

//routes
app.use("/", pdfRoutes);

port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App is running on port ");
});
