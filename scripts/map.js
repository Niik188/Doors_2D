import { spawn_object, } from "./objects.js"
import { background_sound, spawn_sound } from "./sounds.js"
import { player } from "./player.js"
import { getRandomInt, mapBounds } from "./utils.js"
//Номер комнаты
export var rooms = 1
export var before_rooms = 0
export var roomsMass = []

//параметр фона
export var background = {
    source_x: 0,
    source_y: 0,
    source_w: 1000,
    source_h: 1000,
    img: new Image()
}

background.img.src = "./sprites/rain.png"

//При старте
// var playerSound = background_sound.play()
// if (playerSound !== undefined) {
//     playerSound.then(_ => {
//       // Automatic playback started!
//       // Show playing UI.
//       // We can now safely pause video...
      
//     })
//     .catch(error => {
//       // Auto-play was prevented
//       // Show paused UI.
//     });
// }
generateMap(100, "standart")

//Проверка комнаты
export function checkStage() {
    mapBounds.maxX = roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2+10
    if (roomsMass.length) {
        if (roomsMass.length > 5) {
            roomsMass.shift()
            mapBounds.minX = roomsMass[0].x
        }
        if (roomsMass[roomsMass.length-1].room != "key") {
            if (player.x-10+player.w > roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2) {
                rooms++
                before_rooms++
                spawn_sound(player.x, player.y, './sounds/open_door.mp3', 800, false)
                generateMap(roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2)
                console.log(roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2+1)
            }
        }
    }
    
}

//Функция генерации карты
function generateMap(x, room) {
    var stage = {
    img: new Image(),
    x: x,
    y: 500,
    type: "light",
    room: room
    }
    stage.x = x
    
    if (rooms!=0+1) {
        var numberBG = getRandomInt(1,6)
        stage.img.src = `./sprites/background_${numberBG}.png`
        if (numberBG == 5) {
            background_sound.src = "./sounds/rain.mp3"
            console.log("i love rain")
        }else{
            background_sound.src = "#"
        }
        if (getRandomInt(0,2)==1) {
            // spawn_object(false, "ground", x+70, 300, 0, 0, "none", "physics", "", true, true,[1,2,3,4])
            spawn_object(true, "hide", x+70, 300, 260, 332, "none", "physics", "./sprites/objects/hide_1.png", false, true,[1,2,3,2])
            // spawn_object("light_off", x+500, 300, 0, 0, "none", "static", "./sprites/objects/light_off.png", false, false, 0)
            // spawn_object("light", x+500, 300, 0, 0, "none", "static", "./sprites/objects/light.png", false, false, 0)
            spawn_object(true, "hide", x+700, 300, 260, 332, "none", "physics", "./sprites/objects/hide_1.png", false, true, [1,2,3,2])
            // spawn_object("light_off", x+1000, 300, 0, 0, "none", "static", "./sprites/objects/light_off.png", false, false, 0)
            // spawn_object("light", x+1000, 300, 0, 0, "none", "static", "./sprites/objects/light.png", false, false, 0)
        }else{
            spawn_object(true, "dresser", x+70, 460, 240, 195, "none", "physics", "./sprites/objects/dresser_background.png", false, false, 0)
            spawn_object(true, "painting", x+550, 200, 200, 250, "none", "static", `./sprites/objects/painting_${getRandomInt(1,3)}.png`, false, false, 0)
            spawn_object(true, "dresser", x+800, 460, 0, 0, "none", "physics", "./sprites/objects/dresser_background.png", false, false, 0)
    }
    }else if (rooms == 0+1) {
        background_sound.src = "./sounds/rain.mp3"
        stage.img.src = `./sprites/lobby.png`
        //spawn_object("door", x+stage.img.width*1.9+100, 0, 0, stage.img.height*2, "none", "static", "./sprites/objects/door.png", false, false;  
    }
    background_sound.play()
    roomsMass.push(stage)
}
