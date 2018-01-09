/*

Mobile number validation with Node JS
Simple demo which passes mobile phone number to the API and shows a message based on response.

For non UK numbers you will need to include the country code at the start, in either +44 or 0044 format

Full mobile validation API documentation:-
https://developers.alliescomputing.com/postcoder-web-api/mobile-validation

*/

// Using a simplified HTTP client from NPM - https://github.com/request/request
var request = require('request');

// Going to grab the arg from the command line arguments for this example
var mobile_number = process.argv[2] || "";
    
// Replace with your API key, test key will always return true regardless of mobile number
var api_key = "PCW45-12345-12345-1234X";

// Grab the input text and trim any whitespace
mobile_number = mobile_number.trim() || "";

// Create an empty output object
var output = new Object;

if (mobile_number == "") {

    // Respond without calling API if no mobile number supplied
    output.valid = false;
    output.message = "No mobile supplied";

    console.log(output);

} else {

    // Create the URL including API key and encoded mobile number
    var mobile_url = "https://ws.postcoder.com/pcw/" + api_key + "/mobile/" + encodeURIComponent(mobile_number);

    // Call the API
    request(mobile_url, function (error, response, body) {

        if (!error && response.statusCode == 200) {

            // Convert response into a JSON object
            var mobile_response = JSON.parse(body);
                
            if(mobile_response.valid === true) {

                // Do something if valid, here we will output the response

                output.valid = mobile_response.valid;
                output.message = mobile_response.state;

            } else {

                // Do something if invalid, here we will output the response

                output.valid = mobile_response.valid;
                output.message = mobile_response.state;

            }
            
            // Additional info such as Network is also returned, full details - https://developers.alliescomputing.com/postcoder-web-api/mobile-validation

            // Full list of "state" responses - https://developers.alliescomputing.com/postcoder-web-api/mobile-validation

            console.log(output);

        } else {

            output.message = "An error occurred" + response.statusCode;

            console.log(output);

            // Triggered if API does not return HTTP code between 200 and 399
            // More info - https://developers.alliescomputing.com/postcoder-web-api/error-handling

        }

    });

}
