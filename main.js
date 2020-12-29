//CM2020-agil-g1g2-1ml
//This class needs to take in a single number (heart rate) and turn it into a staggered case with a cooldown. This allows us to slowly change the song to a new song within a certain BPM range.

currentSongBPM = 0;
isChangeable = TRUE;
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
    //    run map function
    //    run Bpm

}

function MapHeartRates(heartRate) {
    //Map function
    //map(value, start1, stop1, start2, stop2, [withinBounds])
    //This should be optimized to be within the switch function

    if (heartRate < 50) {
        //throw error or preliminary song

    } else if (heartRate >= 50 && <= 75) {

    }



    map(heartRate, 50, 75, 1, 1)

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
    // keys are pressed.

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
