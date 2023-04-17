import { player } from "./player.js"
export var music = new Audio()
export var sounds = []

export function spawn_sound(pointX, pointY, src, distance){
    var sound = {
        main: new Audio(),
        src: src,
        x: pointX,
        y: pointY,
        volume: 1,
        distance: distance
    }
    sound.main.src = sound.src
    sound.main.play()
    sounds.push(sound)
}

export function distanceSound(sound) {
        sound.volume = 1
        var distanceX = 0
        var distanceY = 0
        var d = sound.distance/100
        if (player.y < sound.y) {
            distanceY = sound.y - player.y
        }
        if (player.y > sound.y) {
            distanceY = player.y - sound.y
        }
        if (player.x < sound.x) {
            distanceX = sound.x - player.x
        }
        if (player.x > sound.x) {
            distanceX = player.x - sound.x
        }
        
        if (distanceX+distanceY>sound.distance) {
            sound.volume = 0
        }else{
            sound.volume -= (distanceX+distanceY)/d/100
        }
        if (distanceX+distanceY==0) {
            sound.volume = 1
        }
        sound.main.volume = sound.volume
    }

// export function deleteSound() {
//     for (let i = 0; i < sounds.length; i++) {
//         setTimeout(() => {
//             sounds.splice(i, 1);
//         }, sounds[i].main.duration);
//     }
// }