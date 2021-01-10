import generateWorkout from './modules/Workout.js'
//let workout = require('./modules/Workout')

//A workout is a list of Activities, and each Activity has an Exercise. 
//Each Activity contains an Exercise, a length, and possibly a number of reps and seconds to do reps.
//An Exercise contains a name of an exercise and a url to a video demonstration

exports.handler = async (event) => {
    var workoutLength = parseInt(event.queryStringParameters.workoutLength);
    var hasUpper = event.queryStringParameters.hasUpper == "true" ? true : false;
    var hasLower = event.queryStringParameters.hasLower == "true" ? true : false;
    var hasCore =  event.queryStringParameters.hasCore  == "true" ? true : false;
    var restLevel = parseInt(event.queryStringParameters.restLevel);

    const response = {
        statusCode: 200,
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*",
         'Content-Type': 'application/json',
         "Access-Control-Allow-Methods": "GET"
     }, 
        body: JSON.stringify(generateWorkout(workoutLength, hasUpper, hasLower, hasCore, restLevel)),
    };
    return response;
};
