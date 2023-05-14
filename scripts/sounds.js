import { player } from "./player.js"
export var background_sound = new Audio()
export var sounds = []
background_sound.volume = 0.3
background_sound.loop = true

//Создание звука
export function spawn_sound(pointX, pointY, src, distance, loop){
    var sound = {
        audio: new Audio(),
        loop: loop,
        src: src,
        x: pointX,
        y: pointY,
        volume: 1,
        distance: distance
    }
    sound.audio.src = sound.src
    sound.audio.play()
    sounds.push(sound)
}

//Проверка дистанции и изменение громкости звука при дистанции
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
        sound.audio.volume = sound.volume
    }