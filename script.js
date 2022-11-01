// Learning from Franks Laboratory
// https://www.youtube.com/watch?v=GFO_txvwK_c&t=308s

let playerState = 'idle';
const dropdown = document.querySelector('#animations');
dropdown.addEventListener('change', function(evt){
    playerState = evt.target.value;
})

const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = 600;
const canvasHeight = canvas.height = 600;

const playerImage = new Image();
playerImage.src = './dog-sprite-sheet.png/shadow_dog.png';
const spriteWidth = 575 /*(6876px width sprite sheet/12 rows of sprites)*/
const spriteHeight = 523 /*(5230px height sprite sheet/10 rows of sprites)*/
let gameFrame = 0;
const staggerFrames = 7;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'gethit',
        frames: 4,
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for(let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(animationStates);

// Creating let x = 0 variable and calling x as first argument in ctx.fillRect() makes the square move across the canvas. Kind of like a balloon.
// 7 min in the video

// let x = 0;


function animate(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // ctx.fillRect(50, /*x*/ 50, 100, 100);
    // ctx.drawImage(imageToUse, /*s = source*/sx, sy, sw, sh, /*d = destination*/dx, dy, dw, dh);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);



// Basic way of running sprite sheets
    // if(gameFrame % staggerFrames == 0){
    //     if(frameX < 6) frameX++;
    //     else frameX = 0;
    // }
    

    gameFrame++;
    requestAnimationFrame(animate);
    // x++;
}
animate();