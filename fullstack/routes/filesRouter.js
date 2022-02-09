const express = require('express');

const controller = require('../controllers');

const router = express.Router();

router.post('/', controller.files.post);
/*
router.post('/', (req, res) => {
    console.log("router reached");
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }


    if (req.files && req.files.file) {    
        const file = req.files.file;
        console.log(file.data.toString());
    }
});*/

module.exports = router;