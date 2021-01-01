function getRatioEachExerciseGroup(hasUpper, hasLower, hasCore) {
    //ratio must add up to 3 at end
    let outputRatio = {upper: 0, lower: 0, core: 0};
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

    //it is important that all lengths divide by 4 and 5 evenly so that even work:rest portions can be divided
    //based on the ratios of work:rest we specified (1:1, 3:1, 5:1).
    //Also, the potential excess of combining any of these before hitting 300 must follow these requirments
    //(Ex of excess: we want to add an exercise of length 120 to a list of exercises that add up to 240, and
    //our target length is 300. we can only do 60 of that exercise. This is okay, 60 divides as per the ratio)
    const exerciseLengths = {SHORT: 60, MEDIUM: 120, LONG: 300};
    const restUpperLimit = 45;
    const exerNames = {PUSHUPS: 'Pushups', DIPS: 'Dips', ARM_HAULERS: 'Arm haulers',
                          LUNGES: 'Lunges', SQUATS: 'Squats', WALL_SIT: 'Wall sit',
                          SITUPS: 'Situps', LEG_LIFTS: 'Leg Lifts', PLANK: 'Plank', MOUNTAIN_CLIMBERS: 'Mountain climbers',
                          JUMPING_JACKS: 'Jumping jacks', BEAR_CRAWLS: 'Bear crawls', CRAB_WALKS: 'Crab walks'};

    //important for description of workouts. (ex, don't want to say "do as many as you can" for wall sits, doesn't make sense)
    const nonRepWorkouts = [exerNames.ARM_HAULERS, exerNames.WALL_SIT, exerNames.PLANK, exerNames.BEAR_CRAWLS, exerNames.CRAB_WALKS];
    const upperWorkouts = [new ExerciseCycle(exerNames.PUSHUPS,     exerciseLengths.SHORT,  null, null),
                           new ExerciseCycle(exerNames.PUSHUPS,     exerciseLengths.LONG,   10,   30),
                           new ExerciseCycle(exerNames.DIPS,        exerciseLengths.SHORT,  null, null),
                           new ExerciseCycle(exerNames.DIPS,        exerciseLengths.LONG,   15,   30),
                           new ExerciseCycle(exerNames.ARM_HAULERS, exerciseLengths.SHORT,  null, null),
                           new ExerciseCycle(exerNames.BEAR_CRAWLS, exerciseLengths.MEDIUM, null, null),
                           new ExerciseCycle(exerNames.CRAB_WALKS,  exerciseLengths.MEDIUM, null, null)];

    const lowerWorkouts = [new ExerciseCycle(exerNames.LUNGES,        exerciseLengths.LONG,   null, null),
                           new ExerciseCycle(exerNames.SQUATS,        exerciseLengths.LONG,   null, null),
                           new ExerciseCycle(exerNames.WALL_SIT,      exerciseLengths.MEDIUM, null, null),
                           new ExerciseCycle(exerNames.JUMPING_JACKS, exerciseLengths.MEDIUM, null, null)];

    const coreWorkouts =  [new ExerciseCycle(exerNames.SITUPS,            exerciseLengths.LONG,   null, null),
                           new ExerciseCycle(exerNames.LEG_LIFTS,         exerciseLengths.LONG,   null, null),
                           new ExerciseCycle(exerNames.PLANK,             exerciseLengths.MEDIUM, null, null),
                           new ExerciseCycle(exerNames.MOUNTAIN_CLIMBERS, exerciseLengths.MEDIUM, null, null)];
    class Activity {
        constructor(name, description, amountTime, numReps, numSecToDoReps) {
            this.name = name;
            this.description = description;
            this.amountTime = amountTime;
            this.numReps = numReps;
            this.numSecToDoReps = numSecToDoReps;
            this.isForTime = (numReps == null || numSecToDoReps == null);
        }
        equals(otherActivity) {
          return otherActivity.name === this.name &&
            ((this.numReps == null || this.numSecToDoReps == null) === (otherActivity.numReps == null || otherActivity.numSecToDoReps == null));
        }
    }

    function getRest(length) {
        return new Activity("Rest", "Take a rest!", length, null, null);
    }

    function getRandomExerciseCycle(workoutGroup) {
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
      return exerciseCycleUsed;
    }

    function secondsIntToString(amountTime) {
      var timeAsString = "";
      var minutes = Math.floor(amountTime/60);
      if(minutes > 0) {
        timeAsString += minutes;
        if(minutes == 1) {
          timeAsString += " minute"
        }
        else {
          timeAsString += " minutes"
        }
      }
      var seconds = amountTime - (minutes * 60);
      if(seconds > 0) {
        timeAsString += " " + seconds + " seconds";
      }
      return timeAsString;
    }
    function getDescription(exerciseCycleUsed, workLength){
      var description = "";
      if(exerciseCycleUsed.isForTime) {
        description = "Do as many as you can in " +  secondsIntToString(workLength) + "!";
        if(nonRepWorkouts.includes(exerciseCycleUsed.name)) {
          description = "Keep going for " + secondsIntToString(workLength) + "!";
        }
      }
      else {
        description = "Do " + exerciseCycleUsed.numReps + " every " + exerciseCycleUsed.numSecToDoReps + " seconds for " +  secondsIntToString(workLength) + "!";

      }
      return description;
    }
    function addActivity(activities, exerciseCycleUsed) {
      let timeToDoThisExercise = exerciseCycleUsed.cycleTimeSec;
      //if the exercise cycle is for time, we need to divide up time for exercise and time for rest
      if(exerciseCycleUsed.isForTime) {
          var restLengthUnlimited = timeToDoThisExercise / (1 + workRestRatio);
          var restLength = restLengthUnlimited > restUpperLimit ? restUpperLimit : restLengthUnlimited;
          var workLength = timeToDoThisExercise - restLength;
          var description = getDescription(exerciseCycleUsed, workLength);
          var newActivity = new Activity(exerciseCycleUsed.name, description, workLength, exerciseCycleUsed.numReps, exerciseCycleUsed.numSecToDoReps);

          //previous exercise is exact same. merge these two.
          if(activities.length >= 1 && activities[activities.length - 1].equals(newActivity)) {
              var prevActivity = activities.pop();
              newActivity.amountTime += prevActivity.amountTime;
              description = getDescription(exerciseCycleUsed, newActivity.amountTime);
              newActivity.description = description;
          }
          activities.push(newActivity);

          if(restLength > 0) {
              activities.push(getRest(restLength));
          }
      }
      //otherwise, the rest is built in to the workout
      else {
          var description = getDescription(exerciseCycleUsed, timeToDoThisExercise);
          var newActivity = new Activity(exerciseCycleUsed.name, description, timeToDoThisExercise, exerciseCycleUsed.numReps, exerciseCycleUsed.numSecToDoReps);

          //previous exercise is exact same. merge these two.
          if(activities.length >= 1 && activities[activities.length - 1].equals(newActivity)) {
               var prevActivity = activities.pop();
               newActivity.amountTime += prevActivity.amountTime;
               description = getDescription(exerciseCycleUsed.isForTime, newActivity.amountTime);
               newActivity.description = description;
           }
          activities.push(newActivity);
      }
    }

    function generateActivities(workoutGroup, workoutLength, workRestRatio) {
        var activities = [];
        var totalTime = 0;
        const workoutLengthInSec = workoutLength * 60;

        while(totalTime < workoutLengthInSec) {
            var exerciseCycleUsed = getRandomExerciseCycle(workoutGroup);
            
            //check if there would overflow the allocated time. If so, adjust workout length
            if(exerciseCycleUsed.cycleTimeSec + totalTime > workoutLengthInSec) {
              let timeToDoThisExercise = workoutLengthInSec - totalTime;
              let numReps = exerciseCycleUsed.numReps;
              let numSecToDoReps = exerciseCycleUsed.numSecToDoReps;

              //if less than 2 minutes, exercise has to be for time
              if(timeToDoThisExercise < 120) {
                numReps = null;
                numSecToDoReps = null;
              }
              const cycleWithReducedTime = new ExerciseCycle(exerciseCycleUsed.name,
                                                             timeToDoThisExercise,
                                                             numReps,
                                                             numSecToDoReps);
              exerciseCycleUsed = cycleWithReducedTime;
            }

            addActivity(activities, exerciseCycleUsed);
            totalTime += exerciseCycleUsed.cycleTimeSec;
        }
        return activities;
    }


    //---------MAIN CODE OF GENERATE WORKOUT-------------
    var activities = [];
    if(!hasLower && !hasUpper && !hasCore) {
        var exercise = new Activity("Meditate", "You didn't specify anything you want to exercise!", workoutLength, null, null);
        activities.push(exercise);
        return activities;
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
        activities = activities.concat(upperActivities);
        activities = activities.concat(lowerActivities);
        activities = activities.concat(coreActivities);
    }
    else if(randomNum < 0.6) {
        activities = activities.concat(coreActivities);
        activities = activities.concat(upperActivities);
        activities = activities.concat(lowerActivities);
    }
    else {
        activities = activities.concat(lowerActivities);
        activities = activities.concat(coreActivities);
        activities = activities.concat(upperActivities);
    }
    return activities;
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
