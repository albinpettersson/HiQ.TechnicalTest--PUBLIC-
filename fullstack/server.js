const express = require('express');
const fileUpload = require('express-fileupload');


const app = express();

app.listen(5000, () => console.log("Express server running on port 5000"));