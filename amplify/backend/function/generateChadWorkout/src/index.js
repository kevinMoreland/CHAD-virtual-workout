exports.handler = async (event) => {
    // + " for: " + event.queryStringParameters.length;
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify(event.queryStringParameters.hasUpper + ", " + event.queryStringParameters.hasCore + " , " +event.queryStringParameters.hasLower + ", " + event.queryStringParameters.workoutLength),
    };
    return response;
};
