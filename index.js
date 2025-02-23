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

// Error lookup function
function TwilioErrorCode(errorCode, ...fields) {
    const base_url = "https://www.twilio.com/docs/api/errors";
    const error = twilioErrorInfo.find(e => e.code === errorCode);

    if (!error) {
        return `Error code ${errorCode} not found.`;
    }

    // Generate the docLink dynamically
    const docLink = `${base_url}/${errorCode}`;

    const result = {};
    // If no fields are provided, return all fields related to the error code
    if (fields.length === 0) {
        // Include docLink in the result
        return { ...error, docLink }; // Return all fields with docLink
    }

    // Otherwise, return only the requested fields
    fields.forEach(field => {
        if (error[field]) {
            result[field] = error[field];
        } else {
            result[field] = `Field '${field}' not found in error code ${errorCode}.`;
        }
    });

    // Add docLink to the result
    result.docLink = docLink;

    if (fields.length === 1) {
        return result[fields[0]];  // If only one field is requested, return it directly.
    }

    return result;  // Return all fields as an object if more than one field is requested.
}


module.exports = { TwilioErrorCode };
