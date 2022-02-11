import React, { useState } from 'react';

import axios from 'axios';

import { Box, Button, Container, Input, Paper, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FileInput from '../components/FileInput/FileInput';
import FileInputContext from '../context/FileInputContext';


const UploadPage = () => {

    const [result, setResult] = useState(null);

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    //const [uploadedFile, setUploadedFile] = useState({});

    const onFileInput = (file) => {
        console.log(file)
        setFile(file);
        setFileName(file.name);
    }


    const fileInputValue = {
        file: file,
        fileName: fileName,
        onFileInput: onFileInput,
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(fileName);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("File successfully uploaded");

            setResult(res.data);

        } catch (err) {
            if (err.response.status === 500) {
                console.log("There was a problem with the server");
            } else {
                console.log(err.response.data.msg);
            }
        }
    }
    return (
        <FileInputContext.Provider value={fileInputValue} >
            <Container>
                <Box py={4}>
                    <Paper elevation={4} >
                        <Box p={2}>
                            <Box pb={2}>
                                <Typography variant="h5">
                                    Upload file
                                </Typography>
                                <form>
                                    <Box alignItems="center" justifyContent="center" display="flex" flexDirection="row">
                                        <FileInput flexGrow={1} mr={1}/>
                                        <Button type="submit" onClick={onFormSubmit} variant="outlined" ml={1}>
                                            Upload
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                            <Box pb={2}>
                                <Typography variant="h5">Most common words</Typography>
                                <Typography>
                                    {result && result.words.toString()}
                                {/*result && result.words && result.words.map((word, i) => (    
                                    <>{word + ((i < result.words.length - 1) ? ', ' : '')}</>
                                ))*/}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h5">Edited text</Typography>
                                <Typography>
                                    {result && result.text}
                                {/*result && result.text && result.text.split("\n").map((line, i) => (    
                                    <>{line} <br/></>
                                ))*/}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </FileInputContext.Provider>
    );
};

export default UploadPage;
