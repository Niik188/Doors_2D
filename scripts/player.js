import { collision } from './physics.js';
import { collis } from './physics.js';
import { objects } from './objects.js';
import { animateObject } from './animation.js';
import { spawn_sound } from "./sounds.js";

//параметр игрока
export var player = {
    img: new Image(),
    active: true,
    hide: false,
    power_physic: 0,
    jump: true,
    ground: false,
    speed_left: 5,
    speed_right: 5,
    x: 0,
    y: 0,
    w: 70,
    h: 188,
    picture: 0
}

//назначение картинки
player.img.src = './sprites/player.png';

//Прыжок
function player_jump() {
    if (player.active) { 
    if (player.ground&&player.jump) {
        player.y -= 6;
        player.power_physic = -20
        collision()
        setTimeout(() => {
            return;
        }, 200);
    }}
}

//Клавиши
addEventListener('keydown', (e) =>{
    for (let i = 0; i < objects.length; i++) {
    if (e.key == 'e') {
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
                    spawn_sound(200, 200, '../sounds/close_hide.mp3')
                    player.active = false
                    player.hide = true
                }, 100);
            }
        }
    }
    if (e.key == 's') {
        if (collis(player.x, player.y, player.w, player.h, objects[i].x, objects[i].y-10, objects[i].main.width, objects[i].main.height+10)) {
            if (objects[i].object == "hide"&& player.hide) {
                setTimeout(() => {
                    animateObject(objects[i])
                    spawn_sound(200, 200, '../sounds/close_hide.mp3')
                    player.hide = false
                    player.active = true
                }, 100);
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
    }
    if (keyState["w"] || keyState["W"] || keyState["ц"] || keyState["Ц"]){
        player_jump()
    }
    if (keyState["d"] || keyState["D"] || keyState["в"] || keyState["В"]){
        player.x += player.speed_right;
    }
    }
    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user

    setTimeout(gameLoop, 10);
}    
gameLoop();
