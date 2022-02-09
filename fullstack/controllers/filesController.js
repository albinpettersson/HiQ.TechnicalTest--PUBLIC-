
//const delimiters = [' ', '\\t', '\\n', '\\.', ',', '!', '\\?', '"', '--'];

const countWords = (text) => {

    let delimiters = /(?:[\r\n\t ,.?!&+:;"_]|(?:--))+/
    let alphabet = /[a-zA-Z]+/

    const words = text.split(delimiters).filter((s) => alphabet.test(s));

    
    const map = {}
    words.forEach((e) => {
        e = e.toLowerCase();
        if (map[e]) {
            map[e] = map[e] + 1;
        } else {
            map[e] = 1;
        }
    });
    let sorted = Object.fromEntries(
        Object.entries(map).sort(([,a], [,b]) => b-a)
    );

    return sorted;
}

const getMostCommonWords = (sorted) => {
    let filtered = Object.fromEntries(
        Object.entries(sorted).filter((kvp, i) => Object.values(sorted)[i] == Object.values(sorted)[0])  
    );
    return filtered;
}

const processText = (text) => {
    
    let sorted = countWords(text);
    let filtered = getMostCommonWords(sorted);



    //console.log(map);
    console.log(sorted);
    console.log(filtered);

    let editedText = text;
    Object.keys(filtered).forEach((key) => {
        editedText = editedText.replace(RegExp('(' + key + ')', 'gi'), 'foo$1bar');
    });
    
    console.log(editedText);

}

const post = (req, res) => {
    console.log("router reached");
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }


    if (req.files && req.files.file) {    
        const file = req.files.file;
        console.log(file.data.toString());
        const editedText = processText(file.data.toString());
        res.status(200).send(editexText);
    }
}

module.exports = {
    post,
}