const fs = require('fs');
const path = require('path');

// Read the JSON file containing error information
function loadErrorInfo() {
    const filePath = path.join(__dirname, 'error-info.json');  // Path to the JSON file
    try {
        const data = fs.readFileSync(filePath, 'utf8');  // Read the JSON file synchronously
        const jsonData = JSON.parse(data);  // Parse the JSON data into a JavaScript object
        return jsonData.twilioErrorCode;  // Return the array of errors
    } catch (err) {
        console.error('Error reading or parsing the JSON file:', err);
        return [];
    }
}

// Load the error info from the JSON file
const twilioErrorInfo = loadErrorInfo();

// Binary search function to find an error by code
function binarySearchErrorCode(errorCode) {
    let left = 0;
    let right = twilioErrorInfo.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let midCode = twilioErrorInfo[mid].code;

        if (midCode === errorCode) {
            return twilioErrorInfo[mid]; // Found the error
        } else if (midCode < errorCode) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return null; // Not found
}

// Error lookup function using binary search
function TwilioErrorCode(errorCode, ...fields) {
    const base_url = "https://www.twilio.com/docs/api/errors";
    const error = binarySearchErrorCode(errorCode);

    if (!error) {
        return `Error code ${errorCode} not found.`;
    }

    // Generate the docLink dynamically
    const docLink = `${base_url}/${errorCode}`;

    // If no fields are provided, return all fields with docLink
    if (fields.length === 0) {
        return { ...error, docLink };
    }

    // Otherwise, return only the requested fields
    const result = {};
    fields.forEach(field => {
        if(field!=="")
            result[field] = error[field] ?? `Field '${field}' not found in error code ${errorCode}.`;
    });

    if (fields.includes("docLink")) {
        result.docLink = docLink;
    }

    return fields.length === 1 ? result[fields[0]] : result;
}

module.exports = { TwilioErrorCode };