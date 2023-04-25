import { spawn_object, } from "./objects.js"
import { spawn_sound } from "./sounds.js"
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
generateMap(100, "standart")

export function checkStage() {
    mapBounds.maxX = roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2+10
    if (roomsMass.length > 5) {
        roomsMass.shift()
        mapBounds.minX = roomsMass[0].x
        }
    if (roomsMass[roomsMass.length-1].room != "key") {
        if (player.x-10+player.w > roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2) {
        rooms++
        before_rooms++
        generateMap(roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2+1)
        console.log(roomsMass[roomsMass.length-1].x+roomsMass[roomsMass.length-1].img.width*2+1)
        }
    }
    
}

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
        if (getRandomInt(0,2)==1) {
            stage.img.src = `./sprites/background_${getRandomInt(1,6)}.png`
            
            spawn_object("hide", x+70, 300, 0, 0, "none", "physics", "./sprites/objects/hide_1.png", false, true,[1,2,3,4])
            // spawn_object("light_off", x+500, 300, 0, 0, "none", "static", "./sprites/objects/light_off.png", false, false, 0)
            // spawn_object("light", x+500, 300, 0, 0, "none", "static", "./sprites/objects/light.png", false, false, 0)
            spawn_object("hide", x+700, 300, 0, 0, "none", "physics", "./sprites/objects/hide_1.png", false, true, [1,2,3,4])
            // spawn_object("light_off", x+1000, 300, 0, 0, "none", "static", "./sprites/objects/light_off.png", false, false, 0)
            // spawn_object("light", x+1000, 300, 0, 0, "none", "static", "./sprites/objects/light.png", false, false, 0)
        }else{
            stage.img.src = `./sprites/background_${getRandomInt(1,6)}.png`
            spawn_object("dresser", x+70, 460, 0, 0, "none", "physics", "./sprites/objects/dresser_1.png", false, false, 0)
            spawn_object("painting", x+400, 200, 200, 250, "none", "static", `./sprites/objects/painting_${getRandomInt(1,3)}.png`, false, false, 0)
            spawn_object("dresser", x+700, 460, 0, 0, "none", "physics", "./sprites/objects/dresser_2.png", false, false, 0)
    }
    }else if (rooms == 0+1) {
        stage.img.src = `./sprites/lobby.png`
        //spawn_object("door", x+stage.img.width*1.9+100, 0, 0, stage.img.height*2, "none", "static", "./sprites/objects/door.png", false, false)
        
    }
    roomsMass.push(stage)
}

// function start() {
//     stage.img.src = `./sprites/background_${getRandomInt(1,6)}.png`

//     spawn_object("light", 500, 300, "none", "static", "./sprites/objects/light.png", false, false, 0)
//     spawn_object("light", 900, 300, "none", "static", "./sprites/objects/light.png", false, false, 0)
//     spawn_object("hide", 400, 300, "none", "physics", "./sprites/objects/hide_1.png", false, true, 3)
//     spawn_object("hide", 900, 300, "none", "physics", "./sprites/objects/hide_1.png", false, true, 3)
//     spawn_object("test", 800, 300, "none", "static", "./sprites/objects/test_button_1.png", false, true, 2)
//     // spawn_sound(90, 200, './sounds/Unhinged_II_(intense).ogg', 1000)
// }



// start()