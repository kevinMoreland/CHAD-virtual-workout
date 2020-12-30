function generateWorkout(workoutLength, hasUpper, hasLower, hasCore) {

    class WorkoutPlan {
        constructor(workoutLength) {
            this.workoutLength = workoutLength;
            this.exercises = [];
        }
    
        addExercise(exercise) {
            this.exercises.push(exercise);
        }
    }
    
    class Exercise {
        constructor(name, length) {
            this.name = name;
            this.length = length;
        }
    }

    var wp = new WorkoutPlan(workoutLength);
    if(hasUpper) {
        var exercise = new Exercise("pushup", workoutLength);
        wp.addExercise(exercise);
    }
    else if(hasLower) {
        var exercise = new Exercise("squat", workoutLength);
        wp.addExercise(exercise);
    }
    else if(hasCore) {
        var exercise = new Exercise("situp", workoutLength);
        wp.addExercise(exercise);
    }
    return wp;
}

exports.handler = async (event) => {
    var workoutLength = parseInt(event.queryStringParameters.workoutLength);
    var hasUpper = event.queryStringParameters.hasUpper == "true" ? true : false;
    var hasLower = event.queryStringParameters.hasLower == "true" ? true : false;
    var hasCore =  event.queryStringParameters.hasCore  == "true" ? true : false;

    const response = {
        statusCode: 200,
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify(generateWorkout(workoutLength, hasUpper, hasLower, hasCore)),
        //body: JSON.stringify("testing " + hasUpper + ", " + hasLower + ", " + hasCore),
    };
    return response;
};
