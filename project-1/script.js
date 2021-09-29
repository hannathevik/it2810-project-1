/**
 * Canvas
 */

const canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 300;
const ctx = canvas.getContext("2d");
let moveX = 200;
let moveY = 100;
let i = 1;

function drawRainbow(){
    const colors = ['#FFB1B0', '#FFDFBE', '#FFFFBF', '#B4F0A7', '#A9D1F7', '#CC99FF'];
    let radius = 175
    for (let i = 0; i < colors.length; i++){
        ctx.beginPath();
        ctx.arc(310, 300, radius, 0, Math.PI, true);
        ctx.lineWidth = 15;
        ctx.strokeStyle = colors[i];
        ctx.stroke();
        radius -= 15;
    }
}


function drawGrass(){
    // Darker grass
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.bezierCurveTo(70, 300, 500, 150, 500, 300);
    ctx.fillStyle = " #52be80";
    ctx.fill();
    //Lighter grass
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.bezierCurveTo(70, 200, 400, 250, 450, 300);
    ctx.fillStyle = " #7DCEA0";
    ctx.fill();
}


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    drawSky();
    drawSun(moveX, moveY)
    drawRainbow();
    drawGrass();
    drawCloud();
    moveX += 0.4
    moveY += 0.4
}

function drawSun(moveX, moveY){
    ctx.beginPath();
    ctx.arc(moveX, moveY, 50, 0, 2*Math.PI);
    ctx.fillStyle = "#FFFF8F";
    ctx.fill();
    ctx.strokeStyle = "yellow"
    ctx.lineWidth = 5;
    ctx.stroke();
}


function drawSky(){
    ctx.beginPath();
    ctx.moveTo(0, 300)
    ctx.bezierCurveTo(0, 0, 400, -100, 500, 300);
    ctx.fillStyle = "#ADD8E6";
    ctx.fill();
}

//lets us be able to move the whole cloud w/o changing all of the numbers for x and y.
let cloudX = 100;
let cloudY = 175;
const cloudBubbles = [makeCloudBubble(cloudX, cloudY, 20), makeCloudBubble(cloudX + 30,cloudY - 15, 30 ), makeCloudBubble(cloudX + 75,cloudY - 10, 25 ), makeCloudBubble(cloudX + 100, cloudY, 20 )]

function drawCloud(){
    if (i % 2 === 0){
        ctx.fillStyle = "#C0C0C0";
    } else {
        ctx.fillStyle = "#FFFFFF";
    }
    ctx.beginPath();
    ctx.fillRect(cloudX, cloudY, 100, 20);
    ctx.beginPath();
    cloudBubbles.forEach(cloudBubble => ctx.arc(cloudBubble.x, cloudBubble.y, cloudBubble.radius, 0, 2*Math.PI));
    ctx.fill()
}

function makeCloudBubble(x, y, radius){
    return {x, y, radius}
}

$("#canvas").on("click", changeCloudColor);
$("#canvas").on("click", animate);

/**
 * Draws the initial canvas
 */
function main(){
    drawSky();
    drawSun(moveX, moveY)
    drawRainbow();
    drawGrass();
    drawCloud();
}

function changeCloudColor(){
    i ++;
}

/**
 *
 * Interaction for SVG Cloud
 */
let j = 1;

$('#cloud').on("click", changeSVGCloudColor);


/** source
 * https://stackoverflow.com/questions/20211890/svg-change-fill-color-on-button-click/20212046
 */
function changeSVGCloudColor(){
    j ++;
    if (j % 2 === 0 ){
        $('#cloud').children().css({ fill: "#C0C0C0" });
    }else{
        $('#cloud').children().css({ fill: "#ffffff" });
    }
}

main();

/** source
 * https://www.w3schools.com/jquery/jquery_hide_show.asp
 */
$("#doc_btn").click(function(){
    $("#doc_wrapper").toggle();
});





