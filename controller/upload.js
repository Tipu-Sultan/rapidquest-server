const Video = require("../models/video");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.MY_CLOUD_NAME,
    api_key: process.env.MY_API_KEY,
    api_secret: process.env.MY_API_SECRET
});


async function uploadVideo(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const { title, description } = req.body;


        // Upload file buffer to Cloudinary
        cloudinary.uploader.upload_stream({ resource_type: "video" }, async (error, result) => {
            if (error) {
                console.error('Error uploading file to Cloudinary:', error);
                return res.status(500).json({ success: false, error: 'Error uploading file to Cloudinary.' });
            }

            const newFile = new Video({
                title,
                description,
                filename: req.file.originalname,
                mimetype: req.file.mimetype,
                originalname: req.file.originalname,
                size: req.file.size,
                public_url: result.secure_url
            });
    
            await newFile.save();
            const updatedVideos = await Video.find();
            
            // Cloudinary upload success
            res.status(201).json({
                success: true,
                message: 'File & Details added successfully',
                videosData: updatedVideos,
                cloudinary_data: result 
            });
        }).end(req.file.buffer); // Pass the file buffer to upload_stream

    } catch (err) {
        console.error("Error saving file details to MongoDB:", err);
        return res.status(500).json({ message: "Error saving file details to MongoDB." });
    }
}

module.exports = {
    uploadVideo,
}
