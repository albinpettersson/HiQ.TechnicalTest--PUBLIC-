import React, { useState } from 'react';

import axios from 'axios';

import { Button, Container, Input, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FileInput from '../components/FileInput/FileInput';
import FileInputContext from '../context/FileInputContext';


const UploadPage = () => {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [uploadedFile, setUploadedFile] = useState({});

    const onFileInput = (file) => {
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

            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            console.log("File successfully uploaded");
        } catch (err) {
            if (err.response.status === 500) {
                console.log("There was a problem with the server")
            } else {
                console.log(err.response.data.msg);
            }
        }
    }
    return (
        <FileInputContext.Provider value={fileInputValue} >
            <Container>
                <Typography>
                        
                    <FontAwesomeIcon icon={["fab", "react"]} />
                    Upload file
                </Typography>
                <form>
                    <FileInput />
                    <Button type="submit" onClick={onFormSubmit}>
                        Upload
                    </Button>
                </form>
            </Container>
        </FileInputContext.Provider>
    );
};

export default UploadPage;
