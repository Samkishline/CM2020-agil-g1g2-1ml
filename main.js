//CM2020-agil-g1g2-1ml
//This class needs to take in a single number (heart rate) and turn it into a staggered case with a cooldown. This allows us to slowly change the song to a new song within a certain BPM range.

//Our current song BPM, this decides the actual BPM for the song output which is derived from the heart rate.
currentSongBPM = 0;
//A variable to decide if it is time to change the song yet.
isChangeable = TRUE;
//temporary heart rate since we don't have an input device.
heartRate = 75;

function preload() {
    //preload music
}

function setup() {
    //create a canvas for the robot
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
    //We need to take music data from the melody mixer library and play it within the canvas

    //    run map function
    //    run Bpm function

}

function SetHeartRate() {

    //function to set heartrate to 1-10 based on switch statement
}

function Bpm() {
    //x allows us to create a case that isn't a single integer but rather a comparison between numbers.
    var x = heartRate;
    switch (true) {
        case (x >= 50 && x <= 75):
            //HR - 50-75

            break;
        case (x >= 76 && x <= 85):
            //HR - 76-85

            break;
        case (x >= 86 && x <= 95):
            //HR - 86-95

            break;
        case (x >= 96 && x <= 100):
            //HR - 96-100

            break;
        case (x >= 101 && x <= 105):
            //HR - 101-105
            break;
        case (x >= 106 && x <= 110):
            //HR - 106-110
            break;
        case (x >= 111 && x <= 120):
            //HR - 111-120
            break;
        case (x >= 121 && x <= 150):
            //HR - 121-150
            break;
        case (x >= 151 && x <= 175):
            //HR - 151-175
            break;
        case (x >= 176 && x <= 200):
            //HR - 176-200+
            break;
        case (x > 200):
            //HR - 200+
            //Out of range below or above - let's play something based on last heart rate or an intro song
            break;
        default:
            break;
    }

}

function DecideSongChange() {
    //run within switch statement

}

function ChangeSong() {

    //if current song can gracefully change to new song then change, if not - delay

    if (currentBMP = isChangable) {
        //change song
    } else {
        //add delay
    }
}

function keyPressed() {
    // Changing BPM by arrow keys.
    // keys are pressed -- 66 = temp

    //detects which key is pressed in a switch statement
    switch (keyCode) {
        case 66:
            break;
        case 66:
            break;
        default:
            //random key pressed
            break;
    }
}

function keyReleased() {
    // This probably isn't used

    switch (keyCode) {
        case 66:
            //Potentially used later
            break;
        default:
            break;
    }
}
