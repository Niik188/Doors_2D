import { setPicture } from "./player.js";

//Кадры в секунду
const SPEED_FRAME = 120
const PLAYER_FRAME_X = 70
//Анимация обьектов
export function animateObject(object) {
    if (object.onAnimate == true) {
        for (let i = 1; i <= object.sizeFrame; i++) {
            object.main.src = object.model  
            object.model = `./sprites/objects/${object.frameName}_${i}.png`;
            setTimeout(() => {
            object.main.src = object.model        
            }, SPEED_FRAME);
        }
        setTimeout(() => {
            object.model = `./sprites/objects/${object.frameName}_1.png`;
            object.main.src = object.model
        }, SPEED_FRAME+200);
    }
}

export function animatePlayer(player) {
    if (!player.sit) {
        for (let i = 0; i < 2; i++) {
            setPicture(i*PLAYER_FRAME_X, 188, 70, 188)
            setTimeout(() => {
                setPicture(0, 188, 70, 188)       
            }, SPEED_FRAME/2);
        }
    }
    
}