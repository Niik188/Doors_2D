export var music = new Audio()
export var sounds = []

export function spawn_sound(pointX, pointY, src){
    var sound = {
        main: new Audio(),
        x: pointX,
        y: pointY,
        src: src
    }
    sound.main.src = sound.src
    sounds.push(sound)
}

export function deleteSound() {
    for (let i = 0; i < sounds.length; i++) {
        setTimeout(() => {
            sounds.splice(i, 1);
        }, sounds[i].main.duration);
    }
    
}