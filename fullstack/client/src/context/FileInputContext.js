import { createContext } from "react";


const FileInputContext = createContext({
    file: null,
    fileName: "",
    onFileInput: (file) => {},
});

export default FileInputContext;