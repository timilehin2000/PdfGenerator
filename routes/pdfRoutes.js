const router = require("express").Router();

const pdfController = require("../controller/pdf");

router.post("/generatePdf", pdfController.generatePdf);

module.exports = router;
