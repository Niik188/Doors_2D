import { setPicture } from "./player.js";

//Кадры в секунду
const SPEED_FRAME = 120
const PLAYER_FRAME_X = 90
//Анимация обьектов
export function animateObject(object) {
    if (object.onAnimate == true) {
        var frames = 50;
        object.model = `./sprites/objects/${object.frameName}_${1}.png`;
        // for (let i = 1; i <= object.massFrame.length; i++) {
            if (frames <= 50) {
                var timer = setInterval(() => {
                frames++
                object.main.src = object.model  
                object.model = `./sprites/objects/${object.frameName}_${object.massFrame[Math.round(frames*10/SPEED_FRAME) % object.massFrame.length]}.png`;
                console.log(frames)
                if (frames >= 100) {
                     clearInterval(timer)
                }
                }, 10);
            }
            
            
    //         setTimeout(() => {
    //         object.main.src = object.model        
    //         }, SPEED_FRAME);
        // }
    //     setTimeout(() => {
    //         object.model = `./sprites/objects/${object.frameName}_1.png`;
    //         object.main.src = object.model
    //     }, SPEED_FRAME+200);
    }
}

export function animatePlayer(player) {
    if (!player.sit) {
        var mass = [0,90]
        setPicture(mass[Math.round(Date.now()/SPEED_FRAME) % mass.length], 223, 90, 223)
        }
    }