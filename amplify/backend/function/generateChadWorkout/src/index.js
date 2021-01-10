let workout = require('./modules/Workout.js');

//A workout is a list of Activities, and each Activity has an Exercise. 
//Each Activity contains an Exercise, a length, and possibly a number of reps and seconds to do reps.
//An Exercise contains a name of an exercise and a url to a video demonstration

exports.handler = async (event) => {
    let workoutLength = parseInt(event.queryStringParameters.workoutLength);
    let hasUpper = event.queryStringParameters.hasUpper == "true" ? true : false;
    let hasLower = event.queryStringParameters.hasLower == "true" ? true : false;
    let hasCore =  event.queryStringParameters.hasCore  == "true" ? true : false;
    let restLevel = parseInt(event.queryStringParameters.restLevel);

    let generatedWorkout = await workout.generateWorkout(workoutLength, hasUpper, hasLower, hasCore, restLevel);
    const response = {
        statusCode: 200,
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*",
         'Content-Type': 'application/json',
         "Access-Control-Allow-Methods": "GET"
     }, 
        body: JSON.stringify(generatedWorkout),
    };
    return response;
};
