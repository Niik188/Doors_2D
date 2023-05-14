import { canv, ctx, effect_ctx } from "./utils.js";
import { cursor } from "./cursor.js";
import { camera } from "./camera.js";
import { roomsMass, rooms, before_rooms } from "./map.js";
import { coinsGive, objects } from "./objects.js";
import { player } from "./player.js";
import { animatePlayer } from "./animation.js";

//Счетчик монет
export var coinsCount = 0

var doorTable = new Image()
doorTable.src = "./sprites/door.png"

//Интерфейс проверки тумбочки
export var check = {
    img: new Image(),
    background: 0,
    item: 0,
    visible: false
}

//Интерфейс предмета
export var item = {
    img: new Image()
}

//Слот
var slot = {
    x: 550,
    y: 0,
    img: new Image()
}

//Для мобильных телефонов
var right_mobile = {
    x: 10,
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

//Загрузка картинок в обьекты
slot.img.src = "./sprites/slot.png"
right_mobile.img.src = "./sprites/mobile/right_button.png"
left_mobile.img.src = "./sprites/mobile/right_button.png"

//Счётчик кадров в сек.
var times = [];
var fps;

//Для мобильных телефонов
var clickState;    
window.addEventListener('touchstart',function(e){
    clickState = setInterval(() => {
        if (player.active) {
        if (cursor.x>right_mobile.x+camera.x&&
        cursor.x<(right_mobile.x+right_mobile.w)+camera.x&&
        cursor.y>right_mobile.y+camera.y
        &&cursor.y<(right_mobile.y+right_mobile.h)+camera.y
        ) {
            player.x += player.speed_right*player.speed;
            player.flip = false
            animatePlayer(player)
            player.moving = true
            if (!player.sit) {
                player.speed = 2
            }
        }
        if (cursor.x>left_mobile.x+camera.x&&
            cursor.x<(left_mobile.x+left_mobile.w)+camera.x&&
            cursor.y>left_mobile.y+camera.y
            &&cursor.y<(left_mobile.y+left_mobile.h)+camera.y
            ) {
                player.x -= player.speed_left*player.speed;
                player.flip = true
                animatePlayer(player)
                player.moving = true
                if (!player.sit) {
                    player.speed = 2
                }
            }
        }
    }, 10);
},true);    
window.addEventListener('touchend',function(){
    clearInterval(clickState)
},true);

//Отрисовка HUD
export function renderHUD() {
    right_mobile.x = window.innerWidth-100
    right_mobile.y = left_mobile.y = window.innerHeight/2
    //Рассчёт fps
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    roomsMass.forEach(stage => {
        //В темной комнате
        if (stage.type == "dark") {
        effect_ctx.drawImage(cursor.img, cursor.x-cursor.img.width/2, cursor.y-cursor.img.height/2);
        //Показ fps
        fps = times.length;
        effect_ctx.fillStyle = "red";
        effect_ctx.font = "16pt img_Font";
        effect_ctx.fillText(fps + " fps", camera.x+10, camera.y+26);
        effect_ctx.fillStyle = "yellow";
        effect_ctx.font = "16pt img_Font";
        effect_ctx.fillText(coinsCount + " coins", camera.x+10, camera.y+36);
        objects.forEach(object => {
        if(object.object == "light"){
            effect_ctx.drawImage(object.img, object.x, object.y, object.img.width, object.img.height)
        }
        });
    }
    
    });
    // ctx.drawImage(slot.img, slot.x+camera.x, slot.y+canv.height/1.5+camera.y);
    if (check.visible) {
        ctx.drawImage(check.img, cursor.x ,cursor.y-check.img.height)
        ctx.drawImage(item.img, cursor.x, cursor.y-check.img.height)
    }
    ctx.fillStyle = "black";
    ctx.font = "20pt img_Font";
    ctx.drawImage(doorTable, roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2-100, 365)
    if (roomsMass[roomsMass.length-2] != undefined) {
    ctx.drawImage(doorTable, roomsMass[roomsMass.length-2].x+roomsMass[roomsMass.length-2].img.width*2-100, 365)
    }
    //Добавление нулей к номеру комнат
    if (rooms<10) {
        ctx.fillText("000"+rooms, roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2-80, 395);
        if (roomsMass[roomsMass.length-2] != undefined) {
            ctx.fillText("000"+before_rooms, roomsMass[roomsMass.length-2].x+roomsMass[roomsMass.length-2].img.width*2-80, 395);
        }
    }else if (rooms>=10&&rooms<100){
        ctx.fillText("00"+rooms, roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2-80, 395);
        if (roomsMass[roomsMass.length-2] != undefined) {
            ctx.fillText("00"+before_rooms, roomsMass[roomsMass.length-2].x+roomsMass[roomsMass.length-2].img.width*2-80, 395);
        }
    }else if (rooms>=100&&rooms<1000){
        ctx.fillText("0"+rooms, roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2-80, 395);
        if (roomsMass[roomsMass.length-2] != undefined) {
            ctx.fillText("0"+before_rooms, roomsMass[roomsMass.length-2].x+roomsMass[roomsMass.length-2].img.width*2-80, 395);
        }
    }else if (rooms>=1000){
        ctx.fillText(rooms, roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2-80, 395);
        if (roomsMass[roomsMass.length-2] != undefined) {
            ctx.fillText(before_rooms, roomsMass[roomsMass.length-2].x+roomsMass[roomsMass.length-2].img.width*2-80, 395);
        }
    }
    ctx.drawImage(cursor.img, cursor.x-cursor.img.width/2, cursor.y-cursor.img.height/2);
    //Показ fps
    ctx.fillStyle = "red";
    ctx.font = "16pt img_Font";
    ctx.fillText(fps + " fps", camera.x+10, camera.y+26);
    ctx.fillStyle = "yellow";
    coinsCount = coinsGive
    ctx.fillText(coinsCount + " coins", camera.x+canv.width-100, camera.y+26);
    // ctx.save();
    // ctx.scale(-1, 1);
    // ctx.drawImage(left_mobile.img, -left_mobile.x-camera.x, left_mobile.y+camera.y, -left_mobile.w, left_mobile.h);
    // ctx.restore();
    
    // ctx.drawImage(right_mobile.img, right_mobile.x+camera.x, right_mobile.y+camera.y, right_mobile.w, right_mobile.h);
}