const Videos = require('../models/video')

async function getAllVideos(req, res) {
    try {
        const videos = await Videos.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function addSubtitles(req, res) {
    try {
        const { videoId, subtitleId, startTime, endTime, text } = req.body;
        const video = await Videos.findById(videoId);

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const existingSubtitleIndex = video.subtitles.findIndex(subtitle => subtitle._id.toString() === subtitleId);

        if (existingSubtitleIndex !== -1) {
            video.subtitles[existingSubtitleIndex] = {
                _id: subtitleId,
                startTime,
                endTime,
                text,
            };
            const updatedVideo = await video.save();
            res.status(201).json({ updatedVideo, msg: 'subtitle update successfully' });
        } else {
            const newSubtitle = {
                startTime,
                endTime,
                text,
            };
            video.subtitles.push(newSubtitle);
            const updatedVideo = await video.save();
            res.status(201).json({ updatedVideo, msg: 'subtitle added successfully' });
        }
    } catch (error) {
        console.error('Error adding/subtitle:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const deleteSubtitles = async (req, res) => {
    try {
        const { videoId, subtitleId } = req.params;
        const video = await Videos.findById(videoId);

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        const subtitleIndex = video.subtitles.findIndex(subtitle => subtitle._id.toString() === subtitleId);

        if (subtitleIndex === -1) {
            return res.status(404).json({ error: 'Subtitle not found' });
        }

        video.subtitles.splice(subtitleIndex, 1);

        const updatedVideo = await video.save();

        res.json(updatedVideo);
    } catch (error) {
        console.error('Error deleting subtitle:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    getAllVideos,
    addSubtitles,
    deleteSubtitles,
}