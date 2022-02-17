
const crypto = require('crypto');

const MAX_FILE_SIZE = 10000000;

/**
 * @description Counts the occurrences of all words in 'text'.
 * @date 2022-02-16
 * @param {string} text
 * @param {boolean} ignoreCase
 * @returns {object}
 */
const countWords = (text, ignoreCase) => {
    //let delimiters = /(?:[\r\n\t ,.?!&+:;"_*]|(?:--))+/
    let delimiters = /(?:[^a-zA-Z'])+/
    let alphabet = /[a-zA-Z]+/

    //Split text by delimiters
    const words = text.split(delimiters).filter((s) => alphabet.test(s));

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

/**
 * Sorts the provided "dictionary" by value in either ascending or descending order.
 * @date 2022-02-16
 * @param {object} dict
 * @param {boolean} ascending
 * @returns {object}
 */

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

/**
 * Sorts the provided "dictionary" by key in either ascending or descending order.
 * @date 2022-02-16
 * @param {object} dict
 * @param {boolean} ascending
 * @returns {object}
 */
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

/**
 * Gets all keys whose value matches that of the object at index 'idx' from a "dictionary" object.
 * @date 2022-02-16
 * @param {object} sorted
 * @param {number} idx
 * @returns {Array<string>}
 */
const getKeysWithValueMatchingIndex = (sorted, idx) => {
    let filtered = [];
    let max = sorted[Object.keys(sorted)[0]];
    let val = max;
    let i = 0;
    let len = Object.keys(sorted).length;
    while (val == max && i < len) {
        let key = Object.keys(sorted)[i];
        val = sorted[key];
        if (val != max) {
            break;
        }
        filtered.push(key); 
        i++;
    }
    /*let filtered = Object.fromEntries(
        Object.entries(sorted).filter((kvp, i) => Object.values(sorted)[i] == Object.values(sorted)[idx])  
    );
    return Object.keys(filtered);
    */

    return filtered;
}

/**
 * Returns an array containing the most common word(s) in a provided string.
 * @date 2022-02-16
 * @param {string} text
 * @returns {Array<string>}
 */
const getMostCommonWords = (text) => {
    //Get a """dictionary""" of words : counts
    let wordCountDict = countWords(text);

    //Sort the """dictionary"""
    let sortedWordCountDict = sortDictionaryByVal(wordCountDict, false);

    //Get all words with the same count as the word at index 0 -> All words with the same, highest count.
    let mostCommonWords = getKeysWithValueMatchingIndex(sortedWordCountDict, 0);

    return mostCommonWords;
}



/**
 * Searched through 'text' and wraps any occurences of 'word' with 'pre' and 'post'.
 * @date 2022-02-16
 * @param {any} text
 * @param {any} word
 * @param {any} pre
 * @param {any} post
 * @returns {any}
 */
const wrapWordInText = (text, word, pre, post) => {
    //Capture word with negative lookbehind and lookahead for any alphabetic characters.
    //Including both a-z and A-Z is superfluous seeing as we use the case insetivity flag, 'i'.
    let regexString = "(?<![a-zA-Z])(" + word + ")(?![a-zA-Z])";
    return text.replace(RegExp(regexString, 'gi'), pre + '$1' + post);
}


/**
 * Searched through 'text' and wraps any occurences of each word from 'words' with 'pre' and 'post'.
 * @date 2022-02-16
 * @param {any} text
 * @param {any} words
 * @param {any} pre
 * @param {any} post
 * @returns {any}
 */
const wrapWordsInText = (text, words, pre, post) => {
    let editedText = text;
    words.forEach((word) => {
        editedText = wrapWordInText(editedText, word, pre, post);
    });
    return editedText;
}


/**
 * Returns an md5 hash of 'text'
 * @date 2022-02-16
 * @param {string} text
 * @returns {string}
 */
const hashString = (text) => {
    return crypto.createHash('md5').update(text).digest('hex');
}

const validateStringHash = (text, hash) => {
    return hashString(text) === hash;
}


/**
 * Checks whether or not a provided object matches the expected structure of 
 * a file uploaded via the browser to express-fileupload.
 * @date 2022-02-16
 * @param {object} file
 * @returns {boolean}
 */
const validateFileProperties = (file) => {
	//TODO: Clean up.

	if (!file.hasOwnProperty('name') || typeof file['name'] != 'string'
		|| !file.hasOwnProperty('data')         || typeof file['data'] != 'object'
		|| !file.hasOwnProperty('size')         || typeof file['size'] != 'number'
		|| !file.hasOwnProperty('encoding')     || typeof file['encoding'] != 'string'
		|| !file.hasOwnProperty('tempFilePath') || typeof file['tempFilePath'] != 'string'
		|| !file.hasOwnProperty('truncated')    || typeof file['truncated'] != 'boolean'
		|| !file.hasOwnProperty('mimetype')     || typeof file['mimetype'] != 'string'
		|| !file.hasOwnProperty('md5')          || typeof file['md5'] != 'string'
		|| !file.hasOwnProperty('mv')          	|| typeof file['mv'] != 'function'
	) {
        console.log("false");
		return false;
	}
	return true;
}

/**
 * Checks whether the provided request is valid or not.
 * @date 2022-02-16
 * @param {object} req
 * @returns {boolean}
 */
const validatePostRequest = (req) =>{
	//Check that the request has the property 'files', and that that property in turn has the property 'file'.
    if(req.files === null || req.files.file === null) {
        return { valid: false, msg: 'No file provided' }
    }
    
    const file = req.files.file;

	//Check that the file provided in the request matches the format expected when using express-fileupload.
    if (!validateFileProperties(file)) {
		return { valid: false, msg: 'Invalid file data' }
	}

	//Check that the file is not too large.
    if (file.data.length > MAX_FILE_SIZE || file.size > MAX_FILE_SIZE) {
        return { valid: false, msg: 'File too big' }
    }

	//Validate the MD5 hash provided.
    if (!validateStringHash(file.data.toString(), file.md5)) {
        return { valid: false, msg: 'Invalid hash.' }
    }

	//If we've gotten this far, the request is considered valid.
	return { 
        valid: true, 
        msg: "",
    };
}


/**
 * Controller for post requests to '/files' path.
 * @date 2022-02-16
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
const post = (req, res) => {

	try {
		//Validate the request.
		const validateResult = validatePostRequest(req);

		//If the request is invalid, return an appropriate error message.
		if (!validateResult.valid) {
			res.status(400).json({ msg: validateResult.msg });
		} else {
			//Otherwise, process the file provided.
			const file = req.files.file;

			if (file) {
				const text = file.data.toString();

				//Get the most common words in text.
				const words = getMostCommonWords(text);
				
				//TODO: Clean up.

				//Wrap any occurrences of the most common word(s) with 'foo' and 'bar'.
				let editedText = wrapWordsInText(text, words, 'foo', 'bar');

				//Set the headers for the response.
				res.setHeader('Content-Type', 'application/json');
				

				//Build the 'data' object that will be sent in the response.
				const data = {
					text: editedText,
					words: words, 
				}

				//Send the response.
				res.json(data);
			}
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ msg: 'Something seems to have gone terribly wrong. :('});
	}
}

module.exports = {
    post,
}