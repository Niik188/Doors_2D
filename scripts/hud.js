import { canv } from "./utils.js";
import { ctx } from "./utils.js";
import { effect_canv } from "./utils.js";
import { effect_ctx } from "./utils.js";
import { cursor } from "./cursor.js";
import { camera } from "./camera.js";
import { roomsMass } from "./map.js";
import { objects } from "./objects.js";

//Счётчик кадров в сек.
var times = [];
var fps;

export function renderHUD() {
    //Рассчёт fps
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    roomsMass.forEach(stage => {
        if (stage.type == "dark") {
        effect_ctx.drawImage(cursor.img, cursor.x-cursor.img.width/2, cursor.y-cursor.img.height/2);
        //Показ fps
        fps = times.length;
        effect_ctx.fillStyle = "red";
        effect_ctx.font = "normal 16pt Arial";
        effect_ctx.fillText(fps + " fps", camera.x+10, camera.y+26);
        objects.forEach(object => {
        if(object.object == "light"){
            effect_ctx.drawImage(object.main, object.x, object.y, object.main.width, object.main.height)
        }
        });
    }
    //Показ fps
    });
    
    ctx.drawImage(cursor.img, cursor.x-cursor.img.width/2, cursor.y-cursor.img.height/2);
    ctx.fillStyle = "red";
    ctx.font = "normal 16pt Arial";
    ctx.fillText(fps + " fps", camera.x+10, camera.y+26);
    
}