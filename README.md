# error-insights

Error Insight is a lightweight npm package that provides quick, concise summaries for any error code or error ID you provide. Whether you're debugging or handling exceptions, this tool helps you easily interpret error messages, so you can focus on fixing the issue faster. Simply pass the error code or ID, and get a detailed description of what the error means

It also provides potential Error causes suggested Error solutions and a Doc Error link

# Currently Supported Error Insights:-

1. Twilio

<br/>

# Installation

```
    npm install error-insights
```

<br/>

# Usage

```javascript
const { TwilioErrorCode } = require("error-insights");

// or

import { TwilioErrorCode } from "error-insights";

// Example: Retrieve all details for a specific error code
const errorDetails = TwilioErrorCode(30003);
console.log(errorDetails);

// Example: Retrieve specific fields for an error code
const errorMessage = TwilioErrorCode(30003, "message");
console.log(errorMessage);

// Example: Retrieve specific fields for an error code
const errorMessage = TwilioErrorCode(30003, "message", "docLink");
console.log(errorMessage);

// Example: Retrieve documentation link for a specific error code
const docLink = TwilioErrorCode(30003).docLink;
console.log(docLink);
```

# Available Fields

The available fields for Twilio error code Typically, these might include fields like:

- code: The error code
- message: A human-readable description of the error
- docLink: A link to the Twilio documentation for that error
- log_level,
- secondary_message,
- log_type
- docs:
- causes: Possible Causes
- solutions: Possible Solutions
- description: Error Description
- product:
- date_created: Error info Created by twilio team
- last_updated: Error info updated by twilio team

<br/>

# Contributing

If you'd like to contribute to the project, please fork the repository and submit a pull request. Any improvements or fixes are welcome!

<br/>

# License

This utility is available under the MIT License.

<br/>

# Todo

Add Error Support for other third party apis
