import { Box, Button, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import FileInputContext from '../../context/FileInputContext';

const FileInput = (props) => {
    const {
        onFileSelected
    } = props;
    
    const {onFileInput} = useContext(FileInputContext);
    
    
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    

    const onChange = (e) => {

        console.log(e.target.files[0].name);
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
            //console.log(fileName);
        } else {
            console.log("not true");
        }

        console.log("file selected");

        onFileInput(e.target.files[0]);

    }
    

    return (
        <Box {...props} sx={{ border: 1, borderRadius: 2 }} display="flex" justifyContent="center" alignItems="center">

            <Box flex={1} px={2} >
                <Typography>
                    {file ? fileName : "Choose File"}
                </Typography>
            </Box>
            <Button
                variant="contained"
                component="label"
            >
                Select File
                <input
                    onChange={onChange}
                    type="file"
                    hidden
                />
            </Button>
        </Box>
    );
};

export default FileInput;
