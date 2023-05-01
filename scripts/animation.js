import { setPicture } from "./player.js";

//Кадры в секунду
const SPEED_FRAME = 120

//Анимация обьектов
export function animateObject(object) {
    if (object.onAnimate == true) {
        var frames = 50;
        object.model = `./sprites/objects/${object.frameName}_${1}.png`;
            if (frames <= 50) {
                var timer = setInterval(() => {
                frames++
                object.main.src = object.model  
                object.model = `./sprites/objects/${object.frameName}_${object.massFrame[Math.round(frames*10/SPEED_FRAME) % object.massFrame.length]}.png`;
                if (frames >= 100) {
                     clearInterval(timer)
                }
                }, 10);
            }
    }
}

//Анимация игрока
export function animatePlayer(player) {
    if (!player.sit) {
        var mass = [0,90]
        setPicture(mass[Math.round(Date.now()/SPEED_FRAME) % mass.length], 224, 90, 223)
    }
    if(player.sit){
        var mass = [0,92,184]
        setPicture(mass[Math.round(Date.now()/SPEED_FRAME) % mass.length], 448,92,194)
    }}

export function animateBackground(background) {
    background.source_y = -Math.round(Date.now()/SPEED_FRAME*100) % 500
}