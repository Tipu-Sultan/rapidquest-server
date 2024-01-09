const mongoose = require('mongoose');

const SubtitleSchema = new mongoose.Schema({
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const VideoSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  description: String,
  title: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  subtitles: [SubtitleSchema], 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
