import { player } from "./player.js";
import { gravity } from "./physics.js";
import { collision } from "./physics.js";
import { objects } from "./objects.js";
import { cursor } from "./cursor.js";
import { stage } from "./stage.js";
import { sounds } from "./sounds.js";
import { canv } from "./utils.js";
import { ctx } from "./utils.js";
import { lighting } from "./lighting.js";
import { deleteSound } from "./sounds.js";

//Параметр холста
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

//Счётчик кадров в сек.
var times = [];
var fps;

//Размер отдельных кадров игрока
const PLAYER_PICTURE_SIZE = 70

//Зарисовка обьектов на холст
function draw() {
    requestAnimationFrame(draw)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    collision()
    gravity()
    lighting()
    ctx.drawImage(stage.img, 0, stage.y-stage.img.width+150, stage.img.width*2, stage.img.height*2);
    
    for (let i = 0; i < objects.length; i++) {
        ctx.drawImage(objects[i].main, objects[i].x, objects[i].y, objects[i].main.width, objects[i].main.height)
    }
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].main.play()
      deleteSound()
    }
    
    // ctx.save();
    // ctx.scale(-1, 1);
    if (!player.hide) {
      ctx.drawImage(player.img, player.picture * PLAYER_PICTURE_SIZE , 0, player.w, player.h, player.x, player.y, player.w, player.h);
    }
    // ctx.translate(camera.x,camera.y)
    // ctx.restore();
    ctx.drawImage(cursor.img, cursor.x-cursor.img.width/2, cursor.y-cursor.img.height/2);
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    ctx.fillStyle = "White";
    ctx.font = "normal 16pt Arial";
    ctx.fillText(fps + " fps", 10, 26);
}

draw()