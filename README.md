# CHAD - Calisthenics Home Activity Designer

CHAD is a website that generates workouts for users that can be done completely equipment free at home..

Users input how long they would like to workout for, what combination of core, lower, and upper body they want to exercise, and how much rest they need (less rest, medium rest, or more rest)

CHAD then guides the user through the workout by displaying a sequence of timed rests and exercises. A timer, audio, visual effects, and toast pop ups are used to keep the user on track throughout the entire workout. 
## Backend

CHAD makes calls to an AWS Lambda function to generate workouts. The logic is divided into 3 modules: Activity, Exercise, and Workout. 

A Workout is a list of Activities. 

An Activity has an Exercise and an instructional description (Ex. Do X number of reps every Y seconds, Do as many as you can in X seconds, etc.)

An Exercise has a name (pushup, situp, etc.) and a URL demonstration of that Exercise.


[See the backend code here](amplify/backend/function/generateChadWorkout/src)

## Front End

React is used for the front end.
