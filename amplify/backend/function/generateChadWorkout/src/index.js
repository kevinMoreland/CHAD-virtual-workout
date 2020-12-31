function getRatioEachExerciseGroup(hasUpper, hasLower, hasCore) {
    //ratio must add up to 3 at end
    let outputRatio = {upper: 0.0, lower: 0.0, core: 0};
    if(hasUpper && hasLower && hasCore) {
        outputRatio.upper = 1;
        outputRatio.lower = 1;
        outputRatio.core = 1;
    }
    else if(hasUpper && hasLower) {
        //Randomly decide to focus more on upper or lower
        let randomNum = Math.random();
        if(randomNum < 0.5) {
            outputRatio.upper = 2;
            outputRatio.lower = 1;
        }
        else {
            outputRatio.upper = 1;
            outputRatio.lower = 2;
        }
    }
    else if(hasUpper && hasCore) {
        outputRatio.upper = 2;
        outputRatio.core = 1;
    }
    else if(hasLower && hasCore) {
        outputRatio.lower = 2;
        outputRatio.core = 1;
    }
    else if(hasUpper) {
        outputRatio.upper = 3;
    }
    else if(hasLower) {
        outputRatio.lower = 3;
    }
    else if(hasCore) {
        outputRatio.core = 3;
    }
    return outputRatio;
}

function generateWorkout(workoutLength, hasUpper, hasLower, hasCore, workRestRatio) {

    //represents the smallest unit of a certain type of way of doing an exercise
    class ExerciseCycle {
        //cycleTimeSec converted to minutes should ideally be something that divides 5 minutes well, but not greater than 5 minutes
        constructor(name, cycleTimeSec, numReps, numSecToDoReps) {
            this.name = name;
            this.cycleTimeSec = cycleTimeSec;
            this.numReps = numReps;
            this.numSecToDoReps = numSecToDoReps;
            this.isForTime = (numReps == null || numSecToDoReps == null);
        }    
    }

    const workoutGroups = {UPPER: 'upper', LOWER: 'lower', CORE: 'core'};

    const exerNames = {PUSHUPS: 'Pushups', DIPS: 'Dips', ARM_HAULERS: 'Arm haulers',
                          LUNGES: 'Lunges', SQUATS: 'Squats', WALL_SIT: 'Wall sit',
                          SITUPS: 'Situps', LEG_LIFTS: 'Leg Lifts', PLANK: 'Plank', MOUNTAIN_CLIMBERS: 'Mountain climbers',
                          JUMPING_JACKS: 'Jumping jacks', BEAR_CRAWLS: 'Bear crawls', CRAB_WALKS: 'Crab walks'};
    //important for description of workouts. (ex, don't want to say "do as many as you can" for wall sits, doesn't make sense)
    const nonRepWorkouts = [exerNames.ARM_HAULERS, exerNames.WALL_SIT, exerNames.PLANK, exerNames.BEAR_CRAWLS, exerNames.CRAB_WALKS];
    const upperWorkouts = [new ExerciseCycle(exerNames.PUSHUPS, 60, null, null),
                           new ExerciseCycle(exerNames.PUSHUPS, 180, 10, 30),
                           new ExerciseCycle(exerNames.DIPS, 60, null, null),
                           new ExerciseCycle(exerNames.DIPS, 180, 10, 30, false),
                           new ExerciseCycle(exerNames.ARM_HAULERS, 60, null, null),
                           new ExerciseCycle(exerNames.BEAR_CRAWLS, 60, null, null),
                           new ExerciseCycle(exerNames.CRAB_WALKS, 60, null, null)];

    const lowerWorkouts = [new ExerciseCycle(exerNames.LUNGES, 180, null, null),
                           new ExerciseCycle(exerNames.SQUATS, 180, null, null),
                           new ExerciseCycle(exerNames.WALL_SIT, 180, null, null),
                           new ExerciseCycle(exerNames.JUMPING_JACKS, 180, null, null)];

    const coreWorkouts =  [new ExerciseCycle(exerNames.SITUPS, 180, null, null),
                           new ExerciseCycle(exerNames.SITUPS, 180, 15, 30),
                           new ExerciseCycle(exerNames.LEG_LIFTS, 180, null, null),
                           new ExerciseCycle(exerNames.LEG_LIFTS, 180, 10, 30),
                           new ExerciseCycle(exerNames.PLANK, 60, null, null),
                           new ExerciseCycle(exerNames.MOUNTAIN_CLIMBERS, 60, null, null)];

    class WorkoutPlan {
        constructor(workoutLength) {
            this.workoutLength = workoutLength;
            this.activities = [];
        }
    }
    class Activity {
        constructor(name, description, amountTime) {
            this.name = name;
            this.description = description;
            this.amountTime = amountTime;
        }
    }
    function getRest(length) {
        return new Activity("Rest", "Take a rest!", length);
    }

    function generateActivities(workoutGroup, workoutLength, workRestRatio) {
        var activities = [];
        var totalTime = 0;
        const workoutLengthInSec = workoutLength * 60;

        while(totalTime < workoutLengthInSec) {
            var exerciseCycleUsed = null;
            if(workoutGroup == workoutGroups.UPPER) {
                exerciseCycleUsed = upperWorkouts[Math.floor(Math.random() * upperWorkouts.length)];
            }
            else if(workoutGroup == workoutGroups.LOWER) {
                exerciseCycleUsed = lowerWorkouts[Math.floor(Math.random() * lowerWorkouts.length)];
            }
            else if(workoutGroup == workoutGroups.CORE) {
                exerciseCycleUsed = coreWorkouts[Math.floor(Math.random() * coreWorkouts.length)];
            }
            //In the edge case that the workout we specified is null, we just rest the entire time
            else {
                activities.push(new Activity(getRest(workoutLength)));
                return activities;
            }
            
            //check if there would need to be overflow. if so, return a break
            if(exerciseCycleUsed.cycleTimeSec + totalTime > workoutLengthInSec) {
                var newActivity = new Activity(getRest(workoutLengthInSec - totalTime));

                //previous exercise is exact same. merge these two
                if(activities.length >= 1 && activities[activities.length - 1].name == newActivity.name && 
                   activities[activities.length - 1].description == newActivity.description) {
                    var prevActivity = activities.pop();
                    newActivity.amountTime += prevActivity.amountTime;
                }

                activities.push(newActivity);
                return activities;
            }
            let exerciseTime = 0;

            //if the exercise cycle is for time, we need to divide up time for exercise and time for rest
            if(exerciseCycleUsed.isForTime) {
                var restLength = exerciseCycleUsed.cycleTimeSec / (1 + workRestRatio);
                var workLength = exerciseCycleUsed.cycleTimeSec - restLength;
                var description = "Do as many as you can in " + workLength + " seconds!";
                if(nonRepWorkouts.includes(exerciseCycleUsed.name)) {
                  description = "Keep going for " + workLength + " seconds!";
                }
                var newActivity = new Activity(exerciseCycleUsed.name, description, workLength);

                //previous exercise is exact same. merge these two.
                if(activities.length >= 1 && activities[activities.length - 1].name == newActivity.name && 
                   activities[activities.length - 1].description == newActivity.description) {
                    var prevActivity = activities.pop();
                    newActivity.amountTime += prevActivity.amountTime;
                }
                exerciseTime += newActivity.amountTime;
                activities.push(newActivity);

                if(restLength > 0) {
                    activities.push(getRest(restLength));
                    exerciseTime += restLength;
                }
            }
            //otherwise, the rest is built in to the workout
            else {
                var newActivity = new Activity(exerciseCycleUsed.name,
                    "Do " + exerciseCycleUsed.numReps + " every " + exerciseCycleUsed.numSecToDoReps + " seconds!",
                    exerciseCycleUsed.cycleTimeSec);

                //previous exercise is exact same. merge these two.
                if(activities.length >= 1 && activities[activities.length - 1].name == newActivity.name && 
                    activities[activities.length - 1].description == newActivity.description) {
                     var prevActivity = activities.pop();
                     newActivity.amountTime += prevActivity.amountTime;
                 }
                exerciseTime += newActivity.amountTime;
                activities.push(newActivity);
            }

            totalTime += exerciseTime;
        }
        return activities;
    }

    var wp = new WorkoutPlan(workoutLength);
    if(!hasLower && !hasUpper && !hasCore) {
        var exercise = new Activity("Meditate", "You didn't specify anything you want to exercise!", workoutLength); 
        wp.activities.push(exercise);
        return wp;
    }

    let ratioOfEachExerciseGroupNeeded = getRatioEachExerciseGroup(hasUpper, hasLower, hasCore);
    let upperWorkoutLength = (workoutLength / 3) * ratioOfEachExerciseGroupNeeded.upper;
    let lowerWorkoutLength = (workoutLength / 3) * ratioOfEachExerciseGroupNeeded.lower;
    let coreWorkoutLength =  (workoutLength / 3) * ratioOfEachExerciseGroupNeeded.core;

    var upperActivities = generateActivities(workoutGroups.UPPER, upperWorkoutLength, workRestRatio);
    var lowerActivities = generateActivities(workoutGroups.LOWER, lowerWorkoutLength, workRestRatio);
    var coreActivities =  generateActivities(workoutGroups.CORE,  coreWorkoutLength,  workRestRatio);

    //randomize order of exercise groups
    let randomNum = Math.random();
    if(randomNum < 0.3) {
        wp.activities = wp.activities.concat(upperActivities);
        wp.activities = wp.activities.concat(lowerActivities);
        wp.activities = wp.activities.concat(coreActivities);
    }
    else if(randomNum < 0.6) {
        wp.activities = wp.activities.concat(coreActivities);
        wp.activities = wp.activities.concat(upperActivities);
        wp.activities = wp.activities.concat(lowerActivities);
    }
    else {
        wp.activities = wp.activities.concat(lowerActivities);
        wp.activities = wp.activities.concat(coreActivities);
        wp.activities = wp.activities.concat(upperActivities);
    }
    return wp;
}

exports.handler = async (event) => {
    var workoutLength = parseInt(event.queryStringParameters.workoutLength);
    var hasUpper = event.queryStringParameters.hasUpper == "true" ? true : false;
    var hasLower = event.queryStringParameters.hasLower == "true" ? true : false;
    var hasCore =  event.queryStringParameters.hasCore  == "true" ? true : false;
    //more rest = 1, medium rest = 3, less rest = 5.
    var workRestRatio = parseInt(event.queryStringParameters.workRestRatio);

    const response = {
        statusCode: 200,
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify(generateWorkout(workoutLength, hasUpper, hasLower, hasCore, workRestRatio)),
    };
    return response;
};
