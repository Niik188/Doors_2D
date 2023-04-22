import { spawn_object } from "./objects.js"
import { spawn_sound } from "./sounds.js"
import { player } from "./player.js"
import { getRandomInt } from "./utils.js"
//Номер комнаты
var rooms = 1
export var roomsMass = []

//параметр фона

//При старте
generateMap(0)

function generateMap(x) {
    var stage = {
    img: new Image(),
    x: x,
    y: 500,
    type: "light"
    }
    stage.x = x
    
    if (rooms!=0) {
        if (getRandomInt(0,2)==1) {
            stage.img.src = `./sprites/background_${getRandomInt(1,6)}.png`
            spawn_object("hide", 70, 300, 0, 0, "none", "physics", "./sprites/objects/hide_1.png", false, true, 3)
            spawn_object("light_off", 500, 300, 0, 0, "none", "static", "./sprites/objects/light_off.png", false, false, 0)
            spawn_object("light", 500, 300, 0, 0, "none", "static", "./sprites/objects/light.png", false, false, 0)
            spawn_object("hide", 700, 300, 0, 0, "none", "physics", "./sprites/objects/hide_1.png", false, true, 3)
            spawn_object("light_off", 1000, 300, 0, 0, "none", "static", "./sprites/objects/light_off.png", false, false, 0)
            spawn_object("light", 1000, 300, 0, 0, "none", "static", "./sprites/objects/light.png", false, false, 0)
        }else{
            stage.img.src = `./sprites/background_${getRandomInt(1,6)}.png`
            spawn_object("dresser", 70, 460, 0, 0, "none", "physics", "./sprites/objects/dresser_1.png", true, false, 0)
            spawn_object("painting", 400, 200, 200, 250, "none", "static", `./sprites/objects/painting_${getRandomInt(1,3)}.png`, false, false, 0)
            spawn_object("dresser", 700, 460, 0, 0, "none", "physics", "./sprites/objects/dresser_2.png", true, false, 0)
    }
    }else if (rooms == 0) {
        stage.img.src = `./sprites/lobby.png`
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