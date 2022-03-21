const fs = require("fs");

const path = require("path");

const PDFDocument = require("pdfkit");

const uploadFile = require("./cloudinary");

exports.generatePdf = async (req, res) => {
    try {
        const { fileName, content } = req.body;

        if (!fileName || !content) {
            return res.status(400).json({
                message: "Please provide the necessaey payloads",
            });
        }

        //create the path in which the pdf would be saved
        const pdfPath = path.join("data", "pdf", fileName + ".pdf");

        const pdfDoc = new PDFDocument();

        //set the response headers neeeded
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="' + fileName + '" '
        );
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/pdf");

        //read the data from the writable stream into the pdf doc created with pdfkit
        pdfDoc.pipe(fs.createWriteStream(pdfPath));

        await pdfDoc.pipe(res);

        await pdfDoc.text(content);

        //upload to cloudinary
        let uploadPdf = await uploadFile.uploadFile(pdfPath);
        console.log(uploadPdf);

        pdfDoc.end();

        // return res.status(200).json({
        //     messgae: "Successfully uploaded generated PDF to cloudinary",
        //     data: uploadPdf.fileUrl,
        // });
    } catch (err) {
        console.log(err);
        // res.status(404).json({
        //     message: "Sorry, an error occured",
        // });
    }
};
