const express = require("express");
const router = express.Router();
const { getAllVideos,addSubtitles, deleteSubtitles} = require("../controller/video");


router.get("/", getAllVideos);
router.post("/", addSubtitles);
router.delete("/:videoId/:subtitleId", deleteSubtitles);

module.exports = router;
