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
    }else if (player.x+player.velocityX < mapBounds.minX) {
        player.velocityX = 0
    }else{
        player.speed_right = 5
        player.speed_left = 5
    }
     
    objects.forEach(object => {
        if (object.onCollision == true) {
            if(player.x + player.w > object.x+20 &&
                 player.x < object.x-20 + object.img.width&&
                 player.y + player.h > object.y&&
                 player.y + player.h < object.y+object.img.height/2.5){
                player.y = object.y+1-player.h
                player.ground = true
            }
            if(player.x + player.w > object.x+20 &&
                 player.x < object.x-20 + object.img.width&&
                 player.y < object.y+object.img.height&&
                 player.y + player.h > object.y+object.img.height/2.5){
                player.y = object.y + object.img.height
                player.ground = true
            }
            if (player.x + player.w > object.x&&
                player.x + player.w < object.x+object.img.width/2&&
                player.y + player.h > object.y+10&&
                player.y < object.y+object.img.height-10) {
                player.x = object.x+1-player.w
                player.speed_right = 0
                player.moving = false
            }else if (player.x < object.x + object.img.width&&
                player.x + player.w > object.x+object.img.width/2&&
                player.y + player.h > object.y+10&&
                player.y < object.y+object.img.height-10) {
                player.x = (object.x + object.img.width)-1
                player.speed_left = 0
                player.moving = false
            }else{
                player.speed_right = 5
                player.speed_left = 5
            }
        }
    });
    
}

//Физика игрока
export function gravity() {
    roomsMass.forEach(stage => {
    if (player.y+player.h+player.velocityY < stage.y+160&&player.active) {
        player.velocityY += 0.5
        player.ground = false
        player.y+=player.velocityY
        if (!player.sit) {
        setPicture(0, 645, 90, 223)
        }
    }else{
        player.velocityY=0
        player.ground = true
    }
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == "physics") {
            if (objects[i].y + objects[i].img.height < stage.y+150||objects[i].x < stage.x) {
                objects[i].ground = false
                objects[i].power_physic+=0.5
                objects[i].y+=objects[i].power_physic
            }else if(objects[i].y + objects[i].img.height > stage.y+150){
                objects[i].y = stage.y+150-objects[i].img.height
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
export function collis(object1, object2) {
    return object2.x < object1.x+object1.w &&  object1.x < object2.x+object2.w
            && object2.y < object1.y+object1.h &&  object1.y < object2.y+object2.h
}