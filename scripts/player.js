import { collis } from './physics.js';
import { objects } from './objects.js';
import { animateObject, animatePlayer } from './animation.js';
import { spawn_sound } from "./sounds.js";
import { ctx} from './utils.js';

//параметр игрока
export var player = {
    img: new Image(),
    active: true,
    hide: false,
    power_physic: 0,
    jump: false,
    sit: false,
    ground: false,
    groundY: 0,
    speed: 1,
    speed_left: 0,
    speed_right: 0,
    moving: false,
    flip: false,
    x: 0,
    y: 0,
    w: 90,
    h: 223,
    pictureX: 0,
    pictureY: 0,
    pictureW: 90,
    pictureH: 223,
    draw(){
    player.img.src = './sprites/player_new.png';
        if (!player.hide) {
        if (!player.sit&&player.ground&&!player.moving) {
            setPicture(0, 0, 90, 223)
        }
        if (player.sit&&player.ground&&!player.moving) {
            setPicture(0, 448,92,195)
        }
        if (player.flip) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(player.img, player.pictureX, player.pictureY, player.pictureW, player.pictureH, player.x*-1, player.y, player.w*-1, player.h);
            ctx.restore();
        }else{
            ctx.drawImage(player.img, player.pictureX, player.pictureY, player.pictureW, player.pictureH, player.x, player.y, player.w, player.h);
        }
        }
    }
}

//Размер и координаты спрайта у игрока
export function setPicture(x,y,w,h) {
    player.pictureX = x
    player.pictureY = y
    player.pictureW = w
    player.pictureH = h
}

//назначение картинки
player.img.src = './sprites/player_new.png';

//Прыжок
function player_jump() {
    if (player.active) { 
    if (player.ground&&player.jump) {
        player.y -= 6;
        player.power_physic = -20
        setTimeout(() => {
            return;
        }, 200);
    }}
}

//При присяди
export function sit() {
    // player.y += player.h-player.y
    setTimeout(() => {
        player.sit = true
        // setPicture(0,448,92,195)
        player.h = 160
    }, 150);
    player.speed = 0.8
}

//Проверка потолка
export function checkCeilling(object) {
    if(object.onCollision){
    if (player.x + player.w > object.x+20 && player.x < object.x-20 + object.img.width&&player.y-21 < object.y+object.img.height&&player.y-25 + player.h > object.y+object.img.height/1.5) {
        sit()
    }else if (player.x + player.w < object.x&&player.y-25 < object.y+object.img.height || player.x > object.x + object.img.width&&player.y-25 < object.y+object.img.height){
        player.h = 188
        player.sit = false
    }
}
}

//Клавиши
addEventListener('keydown', (e) =>{
    objects.forEach(object => {
        if (e.key == 'e'||e.key == 'E'||e.key == 'у'||e.key == 'У') {
        if (collis(player.x, player.y, player.w, player.h, object.x, object.y-10, object.img.width, object.img.height+10)) {
            if (object.object == "test") {
                animateObject(object)
            }
        }
        if (collis(player.x, player.y, player.w, player.h, object.x, object.y, object.img.width, object.img.height)) {
            if (object.object == "hide"&&!player.hide) {
                    setTimeout(() => {
                        animateObject(object)
                        player.x = object.x + object.img.width/2 - player.w/2
                        player.y = object.y + object.img.height/2 - player.h/2
                        spawn_sound(player.x, player.y, './sounds/close_hide.mp3', 800)
                        player.active = false
                        player.hide = true
                    }, 100);
                }
            }
        }
        if (e.key == 's'||e.key == 'S'||e.key == 'ы'||e.key == 'Ы') {
            if (collis(player.x, player.y, player.w, player.h, object.x, object.y-10, object.img.width, object.img.height+10)) {
                if (object.object == "hide"&& player.hide) {
                    setTimeout(() => {
                        animateObject(object)
                        spawn_sound(player.x, player.y, './sounds/close_hide.mp3', 800)
                        player.hide = false
                        player.active = true
                    }, 100);
                }
            }
        }
    });
})

var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.key] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.key] = false;
},true);

function gameLoop() {
    if (player.active) {
    if (keyState["a"] || keyState["A"] || keyState["ф"] || keyState["Ф"]){ 
        player.x -= player.speed_left*player.speed;
        player.flip = true
        player.moving = true
        if (player.moving) {
            animatePlayer(player)
        }
        // console.log(player.speed_left)
        if (!player.sit) {
            player.speed = 1.5
        }
    }

    if (keyState["w"] || keyState["W"] || keyState["ц"] || keyState["Ц"]){
        player_jump()
    }

    if (keyState["d"] || keyState["D"] || keyState["в"] || keyState["В"]){
        player.x += player.speed_right*player.speed;
        player.flip = false
        player.moving = true
        if (player.moving) {
            animatePlayer(player)
        }
        if (!player.sit) {
            player.speed = 1.5
        }
        // console.log(player.speed_right)
    }

    if (keyState["s"] || keyState["S"] || keyState["ы"] || keyState["Ы"]){
        player.y += 27
        sit()
    }else{
        setTimeout(() => {
        objects.forEach(object => {
            checkCeilling(object)
        });
        player.h = 188
        player.sit = false
        }, 150);
    }

    if (!keyState["d"] && !keyState["D"] && !keyState["в"] && !keyState["В"]&& !keyState["a"] && !keyState["A"] && !keyState["ф"] && !keyState["Ф"]){
        player.moving = false
    }
    }
    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user

    setTimeout(gameLoop, 10);
}    
gameLoop();
