const express = require('express');
const fileUpload = require('express-fileupload');

const fileRouter = require('./routes/filesRouter.js');

const app = express();

app.use(fileUpload());

app.use('/files', fileRouter);

app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }


    if (req.files && req.files.file) {    
        const file = req.files.file;
        console.log(file.data.toString());
    }
});

app.listen(5000, () => console.log("Express server running on port 5000"));

/*
app.use(express.json());
app.get('/tshirt', (req, res) => {
	res.status(200).send({
		tshirt: '👕',
		size: 'large',
	})
});

app.post('/tshirt/:id', (req, res) => {
	const { id } = req.params;
	const { logo } = req.body;

	if (!logo) {
		res.status(418).send({message: 'Logo needed'});
	}

	res.send({
		tshirt: `👕 with ${logo}`
	})
});*/
