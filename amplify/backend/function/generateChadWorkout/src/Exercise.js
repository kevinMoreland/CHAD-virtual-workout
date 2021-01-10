class Exercise {
  constructor(name, videoURL) {
    this.name = name;
    this.videoURL = videoURL;
  }
}

const exerciseTypes = {UPPER: "upper", LOWER: "lower", CORE: "core"};

const exercises = {PUSHUPS:           new Exercise('Pushups', "https://www.youtube.com/embed/IODxDxX7oi4"),
                   DIPS:              new Exercise('Chair dips', "https://www.youtube.com/embed/u5HbUxh40Y4"),
                   ARM_HAULERS:       new Exercise('Arm haulers', "https://www.youtube.com/embed/P4SBXSIwNpc"),
                   LUNGES:            new Exercise('Lunges', "https://www.youtube.com/embed/COKYKgQ8KR0"),
                   SQUATS:            new Exercise('Squats', "https://www.youtube.com/embed/otzWCWpuW-A"),
                   WALL_SIT:          new Exercise('Wall sit', "https://www.youtube.com/embed/y-wV4Venusw"),
                   SITUPS:            new Exercise('Situps', "https://www.youtube.com/embed/jDwoBqPH0jk"),
                   LEG_LIFTS:         new Exercise('Leg Lifts', "https://www.youtube.com/embed/l4kQd9eWclE"),
                   PLANK:             new Exercise('Plank', "https://www.youtube.com/embed/pSHjTRCQxIw"),
                   MOUNTAIN_CLIMBERS: new Exercise('Mountain climbers', "https://www.youtube.com/embed/ZhiCSdOVJp0"),
                   JUMPING_JACKS:     new Exercise('Jumping jacks', "https://www.youtube.com/embed/nGaXj3kkmrU"),
                   BEAR_CRAWLS:       new Exercise('Bear crawls', "https://www.youtube.com/embed/6muIdIDEE2E"),
                   CRAB_WALKS:        new Exercise('Crab walks', "https://www.youtube.com/embed/I-3r4cl4ahA"),
                   REST:              new Exercise('Rest', null),
                   MEDITATE:          new Exercise('Meditate', "https://www.youtube.com/embed/thcEuMDWxoI")};

//important for description of workouts. (ex, don't want to say "do as many as you can" for wall sits, doesn't make sense)
const nonRepExercises = [exercises.ARM_HAULERS.name, exercises.WALL_SIT.name,
                        exercises.PLANK.name,       exercises.BEAR_CRAWLS.name, exercises.CRAB_WALKS.name];

export {exercises, nonRepExercises, exerciseTypes};