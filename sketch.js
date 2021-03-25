//CM2020-agil-g1g2-1ml
//This class needs to take in a single number (heart rate) and turn it into a staggered case with a cooldown. This allows us to slowly change the song to a new song within a certain BPM range.

//Our current song BPM, this decides the actual BPM for the song output which is derived from the heart rate.
let currentSongBPM = 0;
//A variable to decide if it is time to change the song yet.
let isChangeable = true;
//temporary heart rate since we don't have an input device.
let heartRate = 75;

//Initial model initializations
// Instantiate the model by specifying the desired checkpoint.
const model = new mm.MusicVAE(
    'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/trio_4bar');

const player = new mm.Player();

let stopSignal = false;
let count = 0;
let tempo = 80;

//Screen Size info for easy access (this is the bounds of the iphone 'screen')
//hardcode + numbers because of scroll bar
let phoneTop = 82;
let phoneBottom = 946;
let phoneLeft = 279 + 12.5;
let phoneRight = 693 + 12.5;
let phoneMiddle = ((phoneLeft+phoneRight)/2);

// DRUMS = {
//     notes: [
//       {pitch: 60, startTime: 0.0, endTime: 0.5},
//       {pitch: 60, startTime: 0.5, endTime: 1.0},
//       {pitch: 67, startTime: 1.0, endTime: 1.5},
//       {pitch: 67, startTime: 1.5, endTime: 2.0},
//       {pitch: 69, startTime: 2.0, endTime: 2.5},
//       {pitch: 69, startTime: 2.5, endTime: 3.0},
//       {pitch: 67, startTime: 3.0, endTime: 4.0},
//       {pitch: 65, startTime: 4.0, endTime: 4.5},
//       {pitch: 65, startTime: 4.5, endTime: 5.0},
//       {pitch: 64, startTime: 5.0, endTime: 5.5},
//       {pitch: 64, startTime: 5.5, endTime: 6.0},
//       {pitch: 62, startTime: 6.0, endTime: 6.5},
//       {pitch: 62, startTime: 6.5, endTime: 7.0},
//       {pitch: 60, startTime: 7.0, endTime: 8.0},
//     ],
//     totalTime: 8
//   };

//Test player

//Initialize BG image so we can resize it upon window resize
var img;

const sampleAndPlayForever = () => {
    player.stop();
    count += 1;
    //display counter
    //document.getElementById('count').innerHTML = `${count} trios`;
    return model.sample(1)
        .then((samples) => player.start(samples[0], tempo))
        .then(stopSignal ? undefined : sampleAndPlayForever)
};

const changeTempo = (delta) => {
    tempo = Math.max(Math.min(tempo + delta * 10, 120), 40);
    //display Tempo
}

const start = () => {
    mm.Player.tone.context.resume(); // Required on mobile.
    changeTempo(0);
    stopSignal = false;
    sampleAndPlayForever();
};

const stop = () => {
    stopSignal = true;
    player.stop();
};

model.initialize().then(stop);


function preload() {
    //preload
    img = loadImage('Assets/iPhone-Application-Img.png'); // Load the image
    //player = new mm.Player();

}

function setup() {
    //create a canvas for the robot
    //hardcode - numbers to take away scroll bars
    createCanvas(windowWidth-25, windowHeight-16);

    button = createButton('Start Music - (will take a second)');
    button.position(phoneMiddle - button.width/2, phoneTop + 10);
    button.mousePressed(startMusic);

    button = createButton('Stop Music');
    button.position(phoneMiddle - button.width/2, phoneTop + 50);
    button.mousePressed(stopMusic);
    
    img.resize(1000,1000);
}

function startMusic() {
    start();

    //beginPlay();
}

function stopMusic() {
    stop();
}

function windowResized() {
    resizeCanvas(windowWidth-25, windowHeight-16);
}

function beginPlay() {
    player.start(DRUMS);
}

//***TEST*** */



  

function draw() {
    //We need to take music data from the melody mixer library and play it within the canvas
    background(255);

    //Make image scale with width of screen


        image(img, 0, 0)
    

    //    run map function
    //    run Bpm function

}

function initializePlayer() {
    const player = new core.Player();
    //...
    const mvae = new music_vae.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small');
    mvae.initialize().then(() => {
        mvae.sample(1).then((samples) => player.start(samples[0]));
    });
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