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
import { distanceSound } from "./sounds.js";
import { cameraMoving } from "./camera.js";

//Параметр холста
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

//Размер отдельных кадров игрока
const PLAYER_PICTURE_SIZE = 70

//Счётчик кадров в сек.
var times = [];
var fps;

//Зарисовка обьектов на холст
function draw() {
    ctx.setTransform(1,0,0,1,0,0);
    requestAnimationFrame(draw)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    collision()
    gravity()
    lighting()
    cameraMoving()
    ctx.drawImage(stage.img, 0, stage.y-stage.img.height-110, stage.img.width*2, stage.img.height*2);
    for (let i = 0; i < objects.length; i++) {
        ctx.drawImage(objects[i].main, objects[i].x, objects[i].y, objects[i].main.width, objects[i].main.height)
    }
    for (let i = 0; i < sounds.length; i++) {
      distanceSound(sounds[i])
      //Удаление звука, если звук прекратился
      if (sounds[i].main.paused) {
        sounds.splice(i, 1)
      }
    }
    if (!player.hide) {
    if (player.flip) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(player.img, player.picture * PLAYER_PICTURE_SIZE , 0, player.w, player.h, player.x*-1, player.y, player.w*-1, player.h);
      ctx.restore();
    }else{
      ctx.drawImage(player.img, player.picture * PLAYER_PICTURE_SIZE , 0, player.w, player.h, player.x, player.y, player.w, player.h);
    }
    }
    ctx.drawImage(cursor.img, cursor.x-cursor.img.width/2, cursor.y-cursor.img.height/2);
    //Рассчёт fps
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