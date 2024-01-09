const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const uploadRouter = require("./routes/uploadRoutes.js");
const videoRouter = require("./routes/videoRoutes.js");
require('dotenv').config();

const PORT = process.env.PORT;
const main = require("./models/db");
main()
    .then()
    .catch((err) => console.log(err));

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/upload', uploadRouter);
app.use('/api/videos', videoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
