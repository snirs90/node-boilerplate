'use strict';

var fs = require("fs");

/**
 * Read a file, parse its contents and return an object.
 * @param path
 * @returns {*}
 */
function parseJSONFile(path) {
    var fileContent = fs.readFileSync(path, 'utf8');
    try {
        return JSON.parse(fileContent);
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports.parseJSONFile = parseJSONFile;