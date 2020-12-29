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

function MapHeartRates(heartRate) {
    //Map function
    //map(value, start1, stop1, start2, stop2, [withinBounds])
    //What we're doing here is mapping the heart rate to a case# within the Bpm function
    //This whole function should be optimized to be within the switch function Bpm()

    if (heartRate < 50) {
        //throw error or preliminary song

    } else if (heartRate >= 50 && heartRate <= 75) {

        currentSongBPM = map(heartRate, 50, 75, 1, 1);
    } else if (heartRate >= 76 && heartRate <= 85) {

        currentSongBPM = map(heartRate, 76, 85, 2, 2);
    }

}





}

function SetHeartRate() {

    //function to set heartrate to 1-10 based on switch statement
}

function Bpm() {

    switch (currentSongBMP) {
        case 1:
            //HR - 50-75

            break;
        case 2:
            //HR - 76-85
            break;
        case 3:
            //HR - 86-95
            break;
        case 4:
            //HR - 96-100
            break;
        case 5:
            //HR - 101-105
            break;
        case 6:
            //HR - 106-110
            break;
        case 7:
            //HR - 111-120
            break;
        case 8:
            //HR - 121-150
            break;
        case 9:
            //HR - 151-175
            break;
        case 10:
            //HR - 176-200+
            break;
        case 99:
            //Out of range below or above - let's play something based on last heart rate or an intro song
        default:
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
