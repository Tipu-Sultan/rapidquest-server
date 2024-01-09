const Video = require("../models/video");
const { storage } = require('../services/cloudStorage')

const bucket = storage.bucket('edunify');

async function uploadVideo(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        const { title, description } = req.body;

        const newFile = new Video({
            title,
            description,
            filename: req.file.originalname,
            mimetype: req.file.mimetype,
            originalname: req.file.originalname,
            size: req.file.size,
        });

        await newFile.save();
        const updatedVideos = await Video.find();

        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => {
            console.error('Error uploading file to Google Cloud Storage:', err);
            res.status(500).json({ success: false, error: 'Error uploading file to Google Cloud Storage.' });
        });

        blobStream.on('finish', () => {
            res.status(201).json({
                success: true,
                message: 'File & Details added successfully',
                videosData: updatedVideos,
            });
        });

        blobStream.end(req.file.buffer);
    } catch (err) {
        console.error("Error saving file details to MongoDB:", err);
        return res.status(500).json({ message: "Error saving file details to MongoDB." });
    }
}



module.exports = {
    uploadVideo,
}