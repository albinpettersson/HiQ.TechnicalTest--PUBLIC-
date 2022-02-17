import React, { useState } from 'react';

import axios from 'axios';

import { Box, Button, Container, Input, Paper, styled, TextareaAutosize, TextField, Typography, withStyles } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FileInput from '../components/FileInput/FileInput';
import FileInputContext from '../context/FileInputContext';



const UploadPage = () => {

    const [result, setResult] = useState(null);

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const onFileInput = (file) => {
        setFile(file);
        setFileName(file.name);
    }

    const fontColor = {
        style: { 
            color: 'red',
            '&:disabled': {
                color: 'red'
            }
        }
    }

    const fileInputValue = {
        file: file,
        fileName: fileName,
        onFileInput: onFileInput,
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setResult(res.data);

        } catch (err) {
            if (!err.response || !err.response.status) {
                console.log("Something went really wrong.");
            } else if (err.response.status === 500) {
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
                            <Box pb={2} display="flex" flexDirection="column">
                                <Typography variant="h5">Most common words</Typography>
                                <TextField
                                    id="words"
                                    type="text"
                                    display="flex"
                                    multiline
                                    spellCheck={false}
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                    value = { ((result && result.words && Array.isArray(result.words) ) ? result.words.join(', ') : "" ) }
                                />
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">Edited text</Typography>
                                <TextField 
                                    id="text" 
                                    type="text" 
                                    display="flex" 
                                    multiline
                                    spellCheck={false}
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                    value={ ((result && result.text) ? result.text : "")}/>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </FileInputContext.Provider>
    );
};

export default UploadPage;
