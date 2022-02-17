//Import npm modules
const express = require('express');
const fileUpload = require('express-fileupload');


//Import all of the other things.
const routes = require('./routes');

const app = express();

//Middleware
app.use(fileUpload());

//Define routes
app.use('/files', routes.files);

//404 any routes that aren't defined.
app.use((req, res, next) => {
	const error = new Error("Not found!");
	error.status = 404;
	next(error);
});

//Start the express server.
app.listen(5000, () => console.log("Express server running on port 5000"));