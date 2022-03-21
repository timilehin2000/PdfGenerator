const fs = require("fs");
const cloudinary = require("cloudinary").v2;

exports.uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure: true,
        });

        cloudinary.uploader.upload(
            file,
            (error, result) => {
                if (error) {
                    resolve({
                        status: false,
                        error: error.message,
                    });
                } else {
                    console.log(result);
                    resolve({
                        status: true,
                        fileUrl: result.secure_url,
                    });
                }
            },
            {
                resource_type: "auto",
            }
        );
    });
};
