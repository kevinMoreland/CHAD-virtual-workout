let exerciseModule = require('./Exercise.js');
let activityModule = require('./Activity.js');

const restLevels = {LESS: 0, MEDIUM: 1, MORE: 2};

exports.generateWorkout = async function (workoutLengthInMin, hasUpper, hasLower, hasCore, restLevel) {
  var activities = [];
  let workoutLengthInSec = workoutLengthInMin * 60;
  if(!hasLower && !hasUpper && !hasCore) {
      return generateWorkoutSection("none", 0, workoutLengthInSec);
  }

  let ratioOfEachExerciseGroupNeeded = getRatioEachExerciseGroup(hasUpper, hasLower, hasCore);
  let upperWorkoutLengthInSec = (workoutLengthInSec / 3) * ratioOfEachExerciseGroupNeeded.upper;
  let lowerWorkoutLengthInSec = (workoutLengthInSec / 3) * ratioOfEachExerciseGroupNeeded.lower;
  let coreWorkoutLengthInSec =  (workoutLengthInSec / 3) * ratioOfEachExerciseGroupNeeded.core;

  let upperWorkout = generateWorkoutSection(exerciseModule.exerciseTypes.UPPER, restLevel, upperWorkoutLengthInSec);
  let lowerWorkout = generateWorkoutSection(exerciseModule.exerciseTypes.LOWER, restLevel, lowerWorkoutLengthInSec);
  let coreWorkout =  generateWorkoutSection(exerciseModule.exerciseTypes.CORE,  restLevel, coreWorkoutLengthInSec);

  //randomize order of exercise groups
  let randomNum = Math.random();
  if(randomNum < 0.3) {
      activities = activities.concat(upperWorkout);
      activities = activities.concat(lowerWorkout);
      activities = activities.concat(coreWorkout);
  }
  else if(randomNum < 0.6) {
      activities = activities.concat(coreWorkout);
      activities = activities.concat(upperWorkout);
      activities = activities.concat(lowerWorkout);
  }
  else {
      activities = activities.concat(lowerWorkout);
      activities = activities.concat(coreWorkout);
      activities = activities.concat(upperWorkout);
  }
  return activities;
}

function generateWorkoutSection(workoutType, restLevel, workoutLengthInSec) {
  let totalWorkoutTime = 0;
  let activities = [];
  let prevActivity = null;
  while(totalWorkoutTime < workoutLengthInSec) {

    let newActivity = null;
    let restActivity = activityModule.nonExerciseActivities.REST.getClone();
    let randomNum = Math.random();
    let restAmountInSec = 0;
    switch(workoutType) {
      case workoutType.UPPER:
        restAmountInSec = restLevel === restLevels.LESS ? 10 : restLevel === restLevels.MEDIUM ? 20 : 30;
        newActivity = activityModule.upperActivities[randomNum * activityModule.upperActivities.length].getClone();
      break;
      case workoutType.LOWER:
        restAmountInSec = restLevel === restLevels.LESS ? 0 : restLevel === restLevels.MEDIUM ? 10 : 15;
        newActivity = activityModule.lowerActivities[randomNum * activityModule.lowerActivities.length].getClone();
      break;
      case workoutType.CORE:
        restAmountInSec = restLevel === restLevels.LESS ? 5 : restLevel === restLevels.MEDIUM ? 10 : 20;
        newActivity = activityModule.coreActivities[randomNum * activityModule.coreActivities.length].getClone();
      break;
      default:
        newActivity = activityModule.nonExerciseActivities.MEDITATE;
        newActivity.setAmountTime(workoutLengthInSec - totalWorkoutTime);
    }
    
    //This added activity causes overflow, adjust its length
    if(totalWorkoutTime + newActivity.amountTime > workoutLengthInSec) {
      newActivity.setAmountTime(workoutLengthInSec - totalWorkoutTime);
    }

    //Add rest
    if(restAmountInSec > 0){
      restActivity.setAmountTime(restAmountInSec);

      //take the rest amount time out of the activity's time
      newActivity.setAmountTime(newActivity.amountTime - restAmountInSec);
    }

    //The previous exercise is exact same (and not upper for time. This would be too difficult. Ex, pushups for 2 minutes). Merge these two.
    if(!(workoutType == workoutType.UPPER && newActivity instanceof activityModule.ActivityForTime) &&
        prevActivity != null && 
        prevActivity.equals(newActivity)) {      
      prevActivity.setAmountTime(newActivity.amountTime + prevActivity.amountTime);
      
      // Actual last activity may be rest. If so, merge this newActivity's rest to it
      let literalPrevActivity = activities[activities.lastIndexOf];
      if(literalPrevActivity.name === activityModule.nonExerciseActivities.REST.name) {
        literalPrevActivity.setAmountTime(literalPrevActivity.amountTime + restActivity.amountTime);
      }
    }
    else {
      activities.push(newActivity);
      activities.push(restActivity);
    }
    
    prevActivity = newActivity;
    totalWorkoutTime += newActivity.amountTime;
  }
  return activities;
}

function getRatioEachExerciseGroup(hasUpper, hasLower, hasCore) {
  //ratio must add up to 3 at end so workout is divided in thirds and assigned an exercise focus
  let outputRatio = {upper: 0, lower: 0, core: 0};

  //if this is a a full body workout, do each exercise group evenly
  if(hasUpper && hasLower && hasCore) {
      outputRatio.upper = 1;
      outputRatio.lower = 1;
      outputRatio.core = 1;
  }
  //if this is a upper and lower workout, randomly pick 1 to focus more on than the other
  else if(hasUpper && hasLower) {
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
  //if this is an upper and core workout, do 2 upper to 1 core
  else if(hasUpper && hasCore) {
      outputRatio.upper = 2;
      outputRatio.core = 1;
  }
  //if this is an lower and core workout, do 2 lower to 1 core
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