import { collision } from './physics.js';
import { collis } from './physics.js';
import { objects } from './objects.js';
import { animateObject } from './animation.js';
import { spawn_sound } from "./sounds.js";
import { ctx } from './utils.js';
import { canv } from './utils.js';

//параметр игрока
export var player = {
    img: new Image(),
    active: true,
    hide: false,
    power_physic: 0,
    jump: true,
    sit: false,
    ground: false,
    groundY: 0,
    speed_left: 5,
    speed_right: 5,
    flip: false,
    x: 0,
    y: 0,
    w: 70,
    h: 188,
    pictureX: 0,
    pictureY: 0,
    pictureW: 70,
    pictureH: 188
}

export function setPicture(x,y,w,h) {
    player.pictureX = x
    player.pictureY = y
    player.pictureW = w
    player.pictureH = h
}

//назначение картинки
player.img.src = './sprites/player.png';

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

export function sit() {
    // player.y += player.h-player.y
    setTimeout(() => {
        player.sit = true
        setPicture(140,0,70,148)
        player.h = 148
    }, 150);
    
}

export function checkCeilling(object) {
    if(object.onCollision){
    if (player.x + player.w > object.x+20 && player.x < object.x-20 + object.main.width&&player.y-21 < object.y+object.main.height&&player.y-25 + player.h > object.y+object.main.height/1.5) {
        sit()
    }else if (player.x + player.w < object.x&&player.y-25 < object.y+object.main.height || player.x > object.x + object.main.width&&player.y-25 < object.y+object.main.height){
        player.h = 188
        player.sit = false
    }
}
}

//Клавиши
addEventListener('keydown', (e) =>{
    for (let i = 0; i < objects.length; i++) {
    if (e.key == 'e'||e.key == 'E'||e.key == 'у'||e.key == 'У') {
        if (collis(player.x, player.y, player.w, player.h, objects[i].x, objects[i].y-10, objects[i].main.width, objects[i].main.height+10)) {
            if (objects[i].object == "test") {
                animateObject(objects[i])
            }
        }
        if (collis(player.x, player.y, player.w, player.h, objects[i].x, objects[i].y, objects[i].main.width, objects[i].main.height)) {
            if (objects[i].object == "hide"&&!player.hide) {
                setTimeout(() => {
                    animateObject(objects[i])
                    player.x = objects[i].x + objects[i].main.width/2 - player.w/2
                    player.y = objects[i].y + objects[i].main.height/2 - player.h/2
                    spawn_sound(player.x, player.y, './sounds/close_hide.mp3', 200)
                    player.active = false
                    player.hide = true
                    clearTimeout()
                }, 350);
            }
        }
    }
    if (e.key == 's'||e.key == 'S'||e.key == 'ы'||e.key == 'Ы') {
        if (collis(player.x, player.y, player.w, player.h, objects[i].x, objects[i].y-10, objects[i].main.width, objects[i].main.height+10)) {
            if (objects[i].object == "hide"&& player.hide) {
                setTimeout(() => {
                    animateObject(objects[i])
                    spawn_sound(player.x, player.y, './sounds/close_hide.mp3', 200)
                    player.hide = false
                    player.active = true
                    clearTimeout()
                }, 350);
            }
        }
    }
    }
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
        player.x -= player.speed_left;
        player.flip = true
    }
    if (keyState["w"] || keyState["W"] || keyState["ц"] || keyState["Ц"]){
        player_jump()
    }
    if (keyState["d"] || keyState["D"] || keyState["в"] || keyState["В"]){
        player.x += player.speed_right;
        player.flip = false
    }
    if (keyState["s"] || keyState["S"] || keyState["ы"] || keyState["Ы"]){
        player.y += 15
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
    }
    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user

    setTimeout(gameLoop, 10);
}    
gameLoop();
