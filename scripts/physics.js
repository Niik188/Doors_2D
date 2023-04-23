import { player, setPicture, sit } from "./player.js"
import { objects } from "./objects.js"
import { roomsMass } from "./map.js"
import { mapBounds } from "./utils.js"

//Столкновение
export function collision() {
    roomsMass.forEach(stage => {
        if (player.y+player.h > stage.y+160) {
        player.y = stage.y+161-player.h
        player.ground = true
        }else if (player.y+player.h < stage.y+160){
            player.ground = false
        }
    });
    
    if (player.x + player.w > mapBounds.maxX) {
        player.x = mapBounds.maxX+1-player.w
        player.speed_right = 0
    }else if (player.x < mapBounds.minX) {
        player.x = mapBounds.minX-1
        player.speed_left = 0
    }else{
        player.speed_right = 5
        player.speed_left = 5
    }
    
    
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].onCollision == true) {
            if(player.x + player.w > objects[i].x+20 &&
                 player.x < objects[i].x-20 + objects[i].main.width&&
                 player.y + player.h > objects[i].y&&
                 player.y + player.h < objects[i].y+objects[i].main.height/2.5){
                player.y = objects[i].y+1-player.h
                player.ground = true
            }
            if(player.x + player.w > objects[i].x+20 &&
                 player.x < objects[i].x-20 + objects[i].main.width&&
                 player.y < objects[i].y+objects[i].main.height&&
                 player.y + player.h > objects[i].y+objects[i].main.height/2.5){
                player.y = objects[i].y + objects[i].main.height
                player.ground = true
            }
            if (player.x + player.w > objects[i].x&&
                player.x + player.w < objects[i].x+objects[i].main.width/2&&
                player.y + player.h > objects[i].y+10&&
                player.y < objects[i].y+objects[i].main.height-10) {
                player.x = objects[i].x+1-player.w
                player.speed_right = 0
                player.moving = false
            }else if (player.x < objects[i].x + objects[i].main.width&&
                player.x + player.w > objects[i].x+objects[i].main.width/2&&
                player.y + player.h > objects[i].y+10&&
                player.y < objects[i].y+objects[i].main.height-10) {
                player.x = (objects[i].x + objects[i].main.width)-1
                player.speed_left = 0
                player.moving = false
            }else{
                player.speed_right = 5
                player.speed_left = 5
            }
        }
    }
    
    
}



//Физика игрока
export function gravity() {
    if (!player.ground&&player.active) {
        player.power_physic+=0.5
        player.y+=player.power_physic
        if (!player.sit) {
        setPicture(70, 0, 70, 188)
        }
    }else{
        player.power_physic=0
    }
    roomsMass.forEach(stage => {
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == "physics") {
            if (objects[i].y + objects[i].main.height < stage.y+150||objects[i].x < stage.x) {
                objects[i].ground = false
                objects[i].power_physic+=0.5
                objects[i].y+=objects[i].power_physic
            }else if(objects[i].y + objects[i].main.height > stage.y+150){
                objects[i].y = stage.y+150-objects[i].main.height
                objects[i].ground = true
                objects[i].power_physic=0
            }
            if (objects[i].y > canv.width) {
                objects.splice(i)
            }
        }
    } 
    });
}

//Функция определяет, что первый обьект внутри второго
export function collis(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x2 < x1+w1 &&  x1 < x2+ w2
            && y2 < y1+h1 &&  y1 < y2+ h2
}