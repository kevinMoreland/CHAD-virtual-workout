let exerciseModule = require('./Exercise.js');

class Activity {
  constructor(exercise, amountTime) {
    this.name = exercise.name;
    this.videoURL = exercise.videoURL;
    this.amountTime = amountTime;
    this.giveDescription();
  }
  secondsIntToString(timeInSeconds) {
    var timeAsString = "";
    var minutes = Math.floor(timeInSeconds/60);
    if(minutes > 0) {
      timeAsString += minutes;
      if(minutes == 1) {
        timeAsString += " minute"
      }
      else {
        timeAsString += " minutes"
      }
    }
    var seconds = timeInSeconds - (minutes * 60);
    if(seconds > 0) {
      if(minutes > 0) {
        timeAsString += " ";
      }
      timeAsString += seconds + " seconds";
    }
    return timeAsString;
  }

  setAmountTime(amountTime) {
    this.amountTime = amountTime;
    this.giveDescription();
  }

  /*abstract method*/
  //intended for use within setAmountTime only
  giveDescription() {
    throw new Error("Cannot call abstract method!");
  }

  /*abstract method*/
  getClone() {
    throw new Error("Cannot call abstract method!");
  }

}
class ActivityNonExercise extends Activity {
  constructor(exercise, amountTime) {
    super(exercise, amountTime);
    this.possibleNames = ["Rest", "Meditate"];
    if(!this.possibleNames.includes(this.name)) {
      throw new Error("The name " + this.name + " is not a possible ActivityNonExercise type");
    }
  }
  getClone() {
    return new ActivityNonExercise(new exerciseModule.Exercise(this.name, this.videoURL));
  }
  giveDescription() {
      if(this.name === "Rest") {
        this.description = "Take a rest!";
      }
      else if(this.name === "Meditate") {
        this.description = "You didn't specify anything you want to exercise!";
      }
  }
}
class ActivityWithReps extends Activity {
  constructor(exercise, amountTime, numReps, numSecToDoReps) {
    super(exercise, amountTime);
    this.numReps = numReps;
    this.numSecToDoReps = numSecToDoReps;
  }
  getClone() {
    return new ActivityWithReps(new exerciseModule.Exercise(this.name, this.videoURL), this.amountTime, this.numReps, this.numSecToDoReps);
  }
  giveDescription() {
    this.description = "Do " + this.numReps + " every " + this.numSecToDoReps + " seconds for " +  this.secondsIntToString(this.amountTime) + "!";
  }
  equals(otherActivity) {
    if(!(otherActivity instanceof ActivityWithReps)) {
      return false;
    }
    return otherActivity.name === this.name;
  }
}
class ActivityForTime extends Activity {                        
  constructor(exercise, amountTime) {
    super(exercise, amountTime);
  }
  getClone() {
    return new ActivityForTime(new exerciseModule.Exercise(this.name, this.videoURL), this.amountTime);
  }
  giveDescription() {
    this.description = "Do as many as you can in " +  this.secondsIntToString(this.amountTime) + "!";
    if(exerciseModule.nonRepExercises.includes(this.name)) {
      this.description = "Keep going for " + this.secondsIntToString(this.amountTime) + "!";
    }
  }
  equals(otherActivity) {
    if(!(otherActivity instanceof ActivityForTime)) {
      return false;
    }
    return otherActivity.name === this.name;
  }
}

const activityLengths = {SHORT: 60, MEDIUM: 120, LONG: 300};

const upperActivities = [new ActivityForTime(exerciseModule.exercises.PUSHUPS,           activityLengths.SHORT),
                         new ActivityWithReps(exerciseModule.exercises.PUSHUPS,          activityLengths.LONG,   10,   30),
                         new ActivityForTime(exerciseModule.exercises.DIPS,              activityLengths.SHORT),
                         new ActivityWithReps(exerciseModule.exercises.DIPS,             activityLengths.LONG,   15,   30),
                         new ActivityForTime(exerciseModule.exercises.ARM_HAULERS,       activityLengths.SHORT),
                         new ActivityForTime(exerciseModule.exercises.BEAR_CRAWLS,       activityLengths.MEDIUM),
                         new ActivityForTime(exerciseModule.exercises.CRAB_WALKS,        activityLengths.MEDIUM)];

const lowerActivities = [new ActivityForTime(exerciseModule.exercises.LUNGES,            activityLengths.LONG),
                         new ActivityForTime(exerciseModule.exercises.SQUATS,            activityLengths.LONG),
                         new ActivityForTime(exerciseModule.exercises.WALL_SIT,          activityLengths.MEDIUM),
                         new ActivityForTime(exerciseModule.exercises.JUMPING_JACKS,     activityLengths.MEDIUM)];

const coreActivities =  [new ActivityForTime(exerciseModule.exercises.SITUPS,            activityLengths.MEDIUM),
                         new ActivityForTime(exerciseModule.exercises.LEG_LIFTS,         activityLengths.MEDIUM),
                         new ActivityForTime(exerciseModule.exercises.PLANK,             activityLengths.MEDIUM),
                         new ActivityForTime(exerciseModule.exercises.MOUNTAIN_CLIMBERS, activityLengths.MEDIUM)];

const nonExerciseActivities = {REST:     new ActivityNonExercise(exerciseModule.exercises.REST), 
                               MEDITATE: new ActivityNonExercise(exerciseModule.exercises.MEDITATE)}

exports.upperActivities = upperActivities;
exports.lowerActivities = lowerActivities;
exports.coreActivities = coreActivities;
exports.nonExerciseActivities = nonExerciseActivities;
exports.ActivityForTime = ActivityForTime;