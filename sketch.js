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

//song bpm
let bpm;

//music wave function variables
let xspacing = 20; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 400.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

let mappedBPM = 0.05;

//timer to load and initialize player
let loaded = false;

//var to only draw buttons once on screen - this was a bug fix as we were slowing down the draw function by drawing the two buttons within the toolbar every cycle.
let drawButtonsOnce = true;

//show sine wave if we are playing music
let isPlaying = false;

const sampleAndPlayForever = () => {
    player.stop();
    //This could be used as future functionality to show how many times we've played songs.
    count += 1;
    //This is code from our player library to begin playing sample music at our specified tempo.
    return model.sample(1)
        .then((samples) => player.start(samples[0], tempo))
        .then(stopSignal ? undefined : sampleAndPlayForever)
};

const changeTempo = (delta) => {
    tempo = Math.max(Math.min(tempo + delta * 10, 120), 40);
    //display Tempo

    //set mapped bpm
    Bpm(round(tempo));
}

const start = () => {
    //This allows us to start the player
    mm.Player.tone.context.resume(); // Required on mobile.

    //initialze tempo with no delta
    changeTempo(0);
    stopSignal = false;
    //call function to begin playing AI generated music forever.
    sampleAndPlayForever();
    //set isPlaying BOOL to true, so that we know to display the sine wave.
    isPlaying = true;
};

const stop = () => {
    //This allows us to stop the player
    stopSignal = true;
    player.stop();
    isPlaying = false;
};

model.initialize().then(stop);


function preload() {
    //preload our images
    img = loadImage('Assets/imgs/iphone-App-load-Img.jpg')
    imgLoaded = loadImage('Assets/imgs/iphone-App-Img.jpg')
}

function setup() {
    //create a canvas for the robot
    //hardcode - numbers to take away scroll bars
    createCanvas(windowWidth - 25, windowHeight - 16);

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

    //bpm initialize
    bpm = 75;

    //music wave setup
    w = (phoneRight - phoneLeft) + 16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));
}

//start function for starting the music after button click
function startMusic() {
    start();
}

//stop function for ending music after button click
function stopMusic() {
    stop();
}

//this will resize the window to any size. -25 & 16 to remove scroll bars.
function windowResized() {
    resizeCanvas(windowWidth - 25, windowHeight - 16);
}

function draw() {
    //We need to take music data from the melody mixer library and play it within the canvas
    background(255);

    //create loading image
    LoadProgram();
    if (loaded) {
        //change loading image to fully loaded image after 2000ms
        image(imgLoaded, 0, 0);

        if (drawButtonsOnce) {
            //load buttons to bottom bar on iphone
            createButtons();
            drawButtonsOnce = false;
        }

        //Here we took boilerplate code for a heartbeat animation and mapped it to our tempo and mimicked heartrate.
        heartBeat();

        //Here we initialize the timer for the mimicked heartrate which also changes the tempo.
        SetHeartRate();

        //draw heartrate on screen.
        drawHeartRate();

        if (isPlaying) {
            musicWave();
        }
    } else {
        //Add a loading bar like there would be in a native iOS Application.
        image(img, 0, 0)

        loadBar();

    }
    if (isChangeable) {
        //potentially change BPM
    }
}

function musicWave() {
    //Here we update sine wave in order to show that music is playing, how fast the sing wave is moving is mapped to the tempo.
    calcWave();
    renderWave();
}

function drawHeartRate() {
    //We show on screen the current heart rate we are using to map to a BPM for music generation
    push();
    textSize(100);
    fill(0);
    text(round(tempo), phoneLeft + 210, phoneTop + 160)
    pop();
}

function heartBeat() {
    // https://editor.p5js.org/copperfrance/sketches/OOoDzbl89
    // Here we have code which we've updated to be our on screen heart rate indicator. Once we had a physical device to detect heartrate this function would be mapped to beat to the users exact heart rate.
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

    //This percent change can actually also be mapped to the switch statement which would make the heart beat on screen go faster or slower.
    //This would be a future change
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
    //here we create two buttons one start and one stop which will begin/stop playing our music on the bottom iphone toolbar.
    button = createButton('Start Music');
    button.position(phoneLeft + (phoneMiddle - phoneLeft) / 4, 910);
    button.mousePressed(startMusic);

    button = createButton('Stop Music');
    button.position(phoneMiddle + (phoneRight - phoneMiddle) / 4, 910);
    button.mousePressed(stopMusic);
}

function initializePlayer() {
    //initialize music player, utilizing the music vae library.
    const player = new core.Player();
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

        //We need to set deltaT to a random number in Milliseconds in order to mimick a heartrate
        deltaT = random(1500, 5000);

        //This will set the temp to either down 1 or up 1 + a delta to give us a more randomized tempo change which will then be mapped to our BPM within our Bpm switch statement.
        tempRand = random(-1, 1);

        //here we actually call the changeTempo function and give our up or down tempo.
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
function Bpm(x) {
    //x allows us to create a case that isn't a single integer but rather a comparison between numbers.

    switch (true) {
        case (x >= 40 && x <= 49):
            //HR - 40-49
            console.log("1");

            mappedBPM = map(x, 40, 49, 0.05, 0.06);
            console.log(mappedBPM);
            break;
        case (x >= 50 && x <= 75):
            //HR - 50-75
            console.log("2");

            mappedBPM = map(x, 50, 75, 0.06, 0.07);
            console.log(mappedBPM);
            break;
        case (x >= 76 && x <= 85):
            //HR - 76-85
            console.log("3");

            mappedBPM = map(x, 76, 85, 0.07, 0.08);
            console.log(mappedBPM);
            break;
        case (x >= 86 && x <= 95):
            //HR - 86-95
            console.log("4");

            mappedBPM = map(x, 86, 95, 0.08, 0.09);
            console.log(mappedBPM);
            break;
        case (x >= 96 && x <= 100):
            //HR - 96-100
            console.log("5");

            mappedBPM = map(x, 96, 100, 0.09, 0.1);
            console.log(mappedBPM);
            break;
        case (x >= 101 && x <= 105):
            //HR - 101-105
            console.log("6");

            mappedBPM = map(x, 101, 105, 0.1, 0.11);
            console.log(mappedBPM);
            break;
        case (x >= 106 && x <= 110):
            //HR - 106-110
            console.log("7");

            mappedBPM = map(x, 106, 110, 0.11, 0.12);
            console.log(mappedBPM);
            break;
        case (x >= 111 && x <= 120):
            //HR - 111-120
            console.log("8");

            mappedBPM = map(x, 111, 120, 0.12, 0.13);
            console.log(mappedBPM);
            break;
        case (x >= 121 && x <= 150):
            //HR - 121-150
            console.log("9");

            mappedBPM = map(x, 121, 150, 0.13, 0.14);
            console.log(mappedBPM);
            break;
        case (x >= 151 && x <= 175):
            //HR - 151-175
            console.log("10");

            mappedBPM = map(x, 151, 175, 0.14, 0.15);
            console.log(mappedBPM);
            break;
        case (x >= 176 && x <= 200):
            //HR - 176-200+
            console.log("11");

            mappedBPM = map(x, 176, 200, 0.15, 0.16);
            console.log(mappedBPM);
            break;
        case (x > 200):
            //HR - 200+
            console.log("12");

            mappedBPM = 999;
            console.log(mappedBPM);
            //Out of range below or above - let's play something based on last heart rate or an intro song
            break;
        default:
            break;
    }
}

//sine wave derived from https://p5js.org/examples/math-sine-wave.html
function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += mappedBPM;
    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * amplitude;
        x += dx;
    }
}
function renderWave() {
    noStroke();
    fill(0);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
        ellipse(x * xspacing + phoneLeft - 3, (phoneBottom / 2 + 140)+ yvalues[x], 16, 16);
    }
}