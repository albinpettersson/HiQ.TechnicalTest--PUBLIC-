

const countWords = (text, ignoreCase) => {
    //let delimiters = /(?:[\r\n\t ,.?!&+:;"_*]|(?:--))+/
    let delimiters = /(?:[^a-zA-Z'])+/
    let alphabet = /[a-zA-Z]+/

    //Split text by delimiters
    const words = text.split(delimiters).filter((s) => alphabet.test(s));

    //console.log(words);
    const dict = {}
    words.forEach((e) => {
        //If we're ignoring case, change the current word to lowercase.
        if (ignoreCase) {
            e = e.toLowerCase();
        }

        //Build the """dictionary""".
        if (dict[e]) {
            dict[e] = dict[e] + 1;
        } else {
            dict[e] = 1;
        }
    });
    return dict;
}

//Sorts the dictionary.
const sortDictionaryByVal = (dict, ascending) => {
    let sorted;

    //You could put the ascending check inside of the .sort() call to reduce the number of lines.
    //However, that would be inefficient.
    if (ascending) {
        sorted = Object.fromEntries(
            Object.entries(dict).sort(([,a], [,b]) => a-b)
        );
    } else {
        sorted = Object.fromEntries(
            Object.entries(dict).sort(([,a], [,b]) => b-a)
        );
    }
    return sorted;
}

//Never actually used.
const sortDictionaryByKey = (dict, ascending) => {
    //You could put the ascending check inside of the .sort() call to reduce the number of lines.
    //However, that would be inefficient.
    if (ascending) {
        sorted = Object.fromEntries(
            Object.entries(dict).sort(([a,], [b,]) => a-b)
        );
    } else {
        sorted = Object.fromEntries(
            Object.entries(dict).sort(([a,], [b,]) => b-a)
        );
    }
    return sorted;
}

const getKeysWithValueMatchingIndex = (sorted, idx) => {
    let filtered = [];
    let max = sorted[Object.keys(sorted)[0]];
    let val = max;
    let i = 0;
    let len = Object.keys(sorted).length;
    console.log("val: " + val);
    console.log("max: " + max);
    console.log("len: " + len);
    while (val == max && i < len) {
        let key = Object.keys(sorted)[i];
        val = sorted[key];
        if (val != max) {
            break;
        }
        console.log(key);
        filtered.push(key); 
        i++;
    }
    /*let filtered = Object.fromEntries(
        Object.entries(sorted).filter((kvp, i) => Object.values(sorted)[i] == Object.values(sorted)[idx])  
    );
    return Object.keys(filtered);
    */

    console.log(filtered)
    return filtered;
}

const getMostCommonWords = (text) => {
    //Get a """dictionary""" of words : counts
    let wordCountDict = countWords(text);
    console.log(":(");

    //Sort the """dictionary"""
    let sortedWordCountDict = sortDictionaryByVal(wordCountDict, false);
    console.log(":(");
    //console.log(sortedWordCountDict);

    //Get all words with the same count as the word at index 0 -> All words with the same, highest count.
    let mostCommonWords = getKeysWithValueMatchingIndex(sortedWordCountDict, 0);
    console.log(":(");

    return mostCommonWords;
}


const wrapWordInText = (text, word, pre, post) => {
    //Capture word with negative lookbehind and lookahead for any alphabetic characters.
    //Including both a-z and A-Z is superfluous seeing as we use the case insetivity flag, 'i'.
    let regexString = "(?<![a-zA-Z])(" + word + ")(?![a-zA-Z])";
    return text.replace(RegExp(regexString, 'gi'), pre + '$1' + post);
}

const wrapWordsInText = (text, words, pre, post) => {
    let editedText = text;
    words.forEach((word) => {
        editedText = wrapWordInText(editedText, word, pre, post);
    });
    return editedText;
}

const post = (req, res) => {
    console.log("router reached");
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }


    if (req.files && req.files.file) {    
        const file = req.files.file;
        const text = file.data.toString();
        const words = getMostCommonWords(text);
        
        console.log("---");
        console.log(words);
        let editedText = wrapWordsInText(text, words, 'foo', 'bar');

        res.setHeader('Content-Type', 'application/json');
        
        const data = {
            text: editedText,
            words: words, 
        }

        console.log(":)");
        res.json(data);
    }
}

module.exports = {
    post,
}