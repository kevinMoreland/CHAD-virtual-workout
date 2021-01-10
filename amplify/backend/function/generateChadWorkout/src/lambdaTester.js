//import your handler file or main file of Lambda
let handler = require('./index.js');

//Call your exports function with required params
//In AWS lambda these are event, content, and callback
//event and content are JSON object and callback is a function
//In my example i'm using empty JSON
let handlePromise = handler.handler( {
      "queryStringParameters": {
        "workoutLength": "15",
        "restLevel": "0",
        "hasUpper": "true",
        "hasLower": "false",
        "hasCore": "false"
      }
    }, //event
    {}, //content
);
handlePromise.then(function(result){console.log(result)});