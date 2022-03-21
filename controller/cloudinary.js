const fs = require("fs");
const cloudinary = require("cloudinary").v2;

exports.uploadFile = (file, fileType, fileName) => {
    return new Promise((resolve, reject) => {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure: true,
        });

        cloudinary.uploader.upload(
            file,
            {
                resourceType: fileType,

                public_id: fileName,

                overwrite: true,
            },
            (error, result) => {
                if (error) {
                    fs.unlinkSync(file);
                    resolve({
                        status: false,
                        error: error.message,
                    });
                } else {
                    fs.unlinkSync(file);
                    resolve({
                        status: true,
                        fileUrl: result.secure_url,
                    });
                }
            }
        );
    });
};
