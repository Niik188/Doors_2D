import { canv, ctx, effect_canv, effect_ctx } from "./utils.js";
import { cursor } from "./cursor.js";
import { camera } from "./camera.js";
import { roomsMass, rooms } from "./map.js";
import { objects } from "./objects.js";
import { player } from "./player.js";
import { animatePlayer } from "./animation.js";

var clickState;    
window.addEventListener('mousedown',function(){
    clickState = setInterval(() => {
        if (cursor.x>right_mobile.x+camera.x&&
        cursor.x<(right_mobile.x+right_mobile.w)+camera.x&&
        cursor.y>right_mobile.y+camera.y
        &&cursor.y<(right_mobile.y+right_mobile.h)+camera.y
        ) {
            player.x += player.speed_right*player.speed;
            player.flip = false
            if (!player.sit) {
                animatePlayer(player)
                player.speed = 2
                player.moving = true
            }
        }
        if (cursor.x>left_mobile.x+camera.x&&
            cursor.x<(left_mobile.x+left_mobile.w)+camera.x&&
            cursor.y>left_mobile.y+camera.y
            &&cursor.y<(left_mobile.y+left_mobile.h)+camera.y
            ) {
                player.x -= player.speed_left*player.speed;
                player.flip = true
                if (!player.sit) {
                    animatePlayer(player)
                    player.speed = 2
                    player.moving = true
                }
            }
    }, 10);
},true);    
window.addEventListener('mouseup',function(){
    clearInterval(clickState)
},true);

var right_mobile = {
    x: 150,
    y: canv.height/2,
    w: 130,
    h: 120,
    img: new Image()
}

var left_mobile = {
    x: 10,
    y: canv.height/2,
    w: 130,
    h: 120,
    img: new Image()
}

right_mobile.img.src = "./sprites/mobile/right_button.png"
left_mobile.img.src = "./sprites/mobile/right_button.png"
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
    ctx.fillText(rooms + " room", camera.x+10, camera.y+46);

    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(left_mobile.img, -left_mobile.x-camera.x, left_mobile.y-camera.y, -left_mobile.w, left_mobile.h);
    ctx.restore();
    
    ctx.drawImage(right_mobile.img, right_mobile.x+camera.x, right_mobile.y+camera.y, right_mobile.w, right_mobile.h);
}