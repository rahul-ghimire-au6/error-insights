// index.d.ts

// Define the structure of an error information object.
// You can adjust the properties based on what is in your error-info.json.
export interface ErrorInfo {
    code: number;
    message: string;
    log_level: string;
    secondary_message: string,
    docs: string,
    causes: string,
    solutions: string,
    description: string;
    product: string;
    date_created: string;
    last_updated: string;
    // Add other fields as needed.
    // [key: string]: any;
}

/**
 * Look up error information for a given Twilio error code.
 * @param errorCode - The error code to look up.
 * @param fields - Optional list of fields to return. If empty, returns the entire error object.
 * @returns If one field is specified, returns its value; if multiple fields are specified, returns an object mapping field names to values; if the error code isn’t found, returns an error message.
 */
export function TwilioErrorCode(
    errorCode: number,
    ...fields: string[]
): ErrorInfo | string | any;
