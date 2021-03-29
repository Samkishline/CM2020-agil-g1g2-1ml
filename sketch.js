//CM2020-agil-g1g2-1ml
//This class needs to take in a single number (heart rate) and turn it into a staggered case with a cooldown. This allows us to slowly change the song to a new song within a certain BPM range.

//Our current song BPM, this decides the actual BPM for the song output which is derived from the heart rate.
let currentSongBPM = 0;
//A variable to decide if it is time to change the song yet.
let isChangeable = false;
//temporary heart rate since we don't have an input device.
let heartRate = 75;

//heart beat variables
let npoints = 100;
let radius;
let percent = 0;

//timer
let startT, deltaT, startTLoad, deltaTLoad, startLoad;

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
let phoneMiddle = ((phoneLeft + phoneRight) / 2);

//Initialize BG image so we can resize it upon window resize
var img;
var imgLoaded;

//timer to load and initialize player
let loaded = false;

let drawButtonsOnce = true;

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
    img = loadImage('Assets/imgs/iphone-App-load-Img.jpg')
    imgLoaded = loadImage('Assets/imgs/iphone-App-Img.jpg')
    //player = new mm.Player();

}

function setup() {
    //create a canvas for the robot
    //hardcode - numbers to take away scroll bars
    createCanvas(windowWidth - 25, windowHeight - 16);



    //img.resize(1000,1000);

    //set start time

    deltaT = random(1500, 5000);
    //set Load timer
    deltaTLoad = 2000;

    //initiate start times
    startT = millis();
    startTLoad = millis();

    //loading bar
    startLoad = millis();

    //hearbeat rad
    radius = 75;
}

function startMusic() {
    start();

    //beginPlay();
}

function stopMusic() {
    stop();
}

function windowResized() {
    resizeCanvas(windowWidth - 25, windowHeight - 16);
}

function beginPlay() {
    player.start(DRUMS);
}

//***TEST*** */





function draw() {
    //We need to take music data from the melody mixer library and play it within the canvas
    background(255);

    //create loading image
    LoadProgram();
    if (loaded) {
        image(imgLoaded, 0, 0);

        if (drawButtonsOnce) {
            createButtons();
            drawButtonsOnce = false;
        }

        heartBeat();

        SetHeartRate();

        push();
        textSize(100);
        fill(0);
        text(round(tempo), phoneLeft + 210, phoneTop + 160)
        pop();
    } else {
        image(img, 0, 0)

        loadBar();

    }
    //load buttons to bottom bar on iphone


    //startup the music


    if (isChangeable) {
        //potentially change BPM
    }

    //    run map function
    //    run Bpm function

}

function mapHeartRate() {

    //heartRate = map function
}

function heartBeat() {
    // https://editor.p5js.org/copperfrance/sketches/OOoDzbl89
    push();
    translate(phoneLeft + 70, phoneTop + 125);
    var angle = TWO_PI / npoints;
    fill(150, 0, 100);
    stroke(255);
    strokeWeight(1);
    beginShape();
    for (var a = 0; a < TWO_PI; a += angle) {
        // cardioid
        let ac = a;
        let r = (1 - sin(ac)) * 0.4;
        let cx = cos(ac) * r * radius;
        let cy = ((sin(ac) * r) + 0.4) * radius;

        // heart 1
        let ah = PI / 2 - a;
        let hx = 16 * pow(sin(ah), 3) * radius * 0.06;
        let hy = (13 * cos(ah) - 7 * cos(2 * ah) - 2 * cos(3 * ah) - cos(4 * ah)) * radius * 0.05;

        let coef = sin(percent * PI);
        let sx = cx * coef + hx * (1 - coef);
        let sy = cy * coef + hy * (1 - coef);
        vertex(sx, -sy);
    }
    endShape(CLOSE);
    pop();

    percent += 0.03;
    if (percent >= 1) {
        percent = 0;
    }
}

function loadBar() {
    stroke(255, 0, 0);
    strokeWeight(10);

    x = map(millis(), startLoad, startLoad + 2000, phoneLeft, phoneRight);
    line(phoneLeft, 700, x, 700);
}

function createButtons() {

    button = createButton('Start Music');
    button.position(phoneLeft + (phoneMiddle - phoneLeft) / 4, 910);
    button.mousePressed(startMusic);

    button = createButton('Stop Music');
    button.position(phoneMiddle + (phoneRight - phoneMiddle) / 4, 910);
    button.mousePressed(stopMusic);
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
    if (millis() > startT + deltaT) {
        startT = millis()
        console.log("New Heart Rate"); // do what you have to do!
        isChangeable = true;

        deltaT = random(1500, 5000);

        tempRand = random(-1, 1);
        changeTempo(tempRand);

    }

}

function LoadProgram() {

    //function to set heartrate to 1-10 based on switch statement
    if (millis() > startTLoad + deltaTLoad && loaded == false) {
        startTLoad = millis()
        console.log("Loaded"); // do what you have to do!
        loaded = true;
    }

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