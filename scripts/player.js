import { collis } from './physics.js';
import { objects } from './objects.js';
import { animateObject, animatePlayer } from './animation.js';
import { spawn_sound } from "./sounds.js";
import { ctx} from './utils.js';

//параметр игрока
export var player = {
    img: new Image(),
    sfx: new Audio(),
    active: true,
    hide: false,
    velocityY: 0,
    velocityX: 0,
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
    w: 110,
    h: 223,
    pictureX: 0,
    pictureY: 0,
    pictureW: 90,
    pictureH: 223,
    draw(){
    player.x += player.velocityX;
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
        player.velocityY = -20
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
        player.h = 195
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
        if (collis(player,object)) {
            if (object.object == "test") {
                animateObject(object)
            }
        }
        if (collis(player,object)) {
            if (object.object == "hide"&&!player.hide) {
                    setTimeout(() => {
                        animateObject(object)
                        player.x = object.x + object.img.width/2 - player.w/2
                        player.y = object.y + object.img.height/2 - player.h/2
                        spawn_sound(player.x, player.y, './sounds/close_hide.mp3', 800, false)
                        player.active = false
                        player.hide = true
                    }, 100);
                }
            }
        }
        if (e.key == 's'||e.key == 'S'||e.key == 'ы'||e.key == 'Ы') {
            if (collis(player,object)) {
                if (object.object == "hide"&& player.hide) {
                    setTimeout(() => {
                        animateObject(object)
                        spawn_sound(player.x, player.y, './sounds/close_hide.mp3', 800, false)
                        player.hide = false
                        player.active = true
                    }, 100);
                }
            }
        }
        
    });
})

player.sfx.src = "./sounds/step.mp3"

var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.key] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.key] = false;
    player.velocityX=0;
},true);

function gameLoop() {
    if (player.active) {
    if (keyState["a"] || keyState["A"] || keyState["ф"] || keyState["Ф"]){ 
        player.velocityX=-10;
        player.flip = true
        player.moving = true
        if (player.velocityX > 0||player.velocityX < 0) {
            player.sfx.play()
        }
        if (player.moving) {
            animatePlayer(player)
        }
        // console.log(player.speed_left)
        if (player.sit) {
            player.velocityX = -5
        }
    }

    if (keyState["w"] || keyState["W"] || keyState["ц"] || keyState["Ц"]){
        player_jump()
    }

    if (keyState["d"] || keyState["D"] || keyState["в"] || keyState["В"]){
        player.velocityX=10;
        player.flip = false
        player.moving = true
        if (player.velocityX > 0||player.velocityX < 0) {
            player.sfx.play()
        }
        if (player.moving) {
            animatePlayer(player)
        }
        if (player.sit) {
            player.velocityX = 5
        }
        // console.log(player.speed_right)
    }

    if (keyState["s"] || keyState["S"] || keyState["ы"] || keyState["Ы"]){
        player.y += 27
        player.sfx.volume = 0.2
        sit()
    }else{
        setTimeout(() => {
        objects.forEach(object => {
            checkCeilling(object)
        });
        player.h = 223
        player.sfx.volume = 0.5
        player.sit = false
        }, 150);
    }

    if (!keyState["d"] && !keyState["D"] && !keyState["в"] && !keyState["В"]&& !keyState["a"] && !keyState["A"] && !keyState["ф"] && !keyState["Ф"]){
        player.moving = false
        if(player.velocityX == 0){
            player.sfx.currentTime = 0;
            player.sfx.pause();
        }
    }
    }else{
        player.sfx.currentTime = 0;
        player.sfx.pause();
    }
    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user

    setTimeout(gameLoop, 10);
}    
gameLoop();
