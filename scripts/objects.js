import { click, cursor } from "./cursor.js";
import { check, coinsCount, item } from "./hud.js";
import { collis } from "./physics.js";
import { ctx, getRandomInt } from "./utils.js";

//Массив с обьектами
export var objects = []
export var coinsGive = 0

//Создание обьекта с параметрами
export function spawn_object(visible, name, pointX, pointY, width, height, id, type, model, collision, animation, frames) {
    if (id == "none") {
        id = `${Date.now().toString(36) + Math.random().toString(36).slice(2)}`
    }
    
    var object = {
        object: name,
        x: pointX,
        y: pointY,
        w: width,
        h: height,
        id: id,
        type: type,
        visible: visible,
        img: new Image(),
        model: model,
        onCollision: collision,
        power_physic: 0,
        ground: false,
        onAnimate: animation,
        massFrame: frames,
        frameName: "",
        draw(){
            if (object.visible) {
                ctx.drawImage(object.img, object.x, object.y, object.img.width, object.img.height)
            }
        },
        update(){}
    }
    if (object.object == "dresser") {
        spawn_container(1, object)
    }
    if (animation = true) {
        object.frameName = object.model.replace('./sprites/objects/','').replace(`_1.png`,'');
    }
    if (width!=0) {
        object.img.width = width
    }
    if (height!=0) {
        object.img.height = height
    }
    if (object.visible) {
        object.img.src = object.model
    }
    objects.unshift(object)
}

//Создание полки
function spawn_container(containerSize, object) {
    var random = getRandomInt(1,4)
    for (let i = 1; i <= containerSize; i++) {
        console.log(i, object.id)
        var container = {
            object: `slot_${i}`,
            item: 1,
            other_slot: random,
            coins: 0,
            img: new Image(),
            x: 0,
            y: 0,
            w: 204,
            h: 41,
            type: "static",
            id: object.id,
            visible: true,
            model: "",
            onCollision: false,
            power_physic: 0,
            ground: false,
            onAnimate: false,
            massFrame: 0,
            frameName: "",
            draw(){
                container.x = object.x+20
                container.y = object.y-40+(i*50)
                container.img.src = "./sprites/objects/dresser_container_1.png"
                ctx.drawImage(container.img, container.x, container.y, container.img.width, container.img.height)
            },
            update(){
                if (collis(cursor,this)) {
                    check.visible = true
                    console.log(container.object)
                    check.img.src = `./sprites/check_${container.other_slot}.png`
                    item.img.src = "#"
                    if (container.item == 1) {
                        item.img.src = `./sprites/coin_${container.coins}.png`
                        console.log(100)
                        if (click) {
                            coinsGive += container.coins
                            container.item = 0
                            container.coins = 0
                        }
                    }
                }
            }
        }
        if (container.item == 1) {
            container.coins = getRandomInt(1,100)-10
            if (container.coins <= 0||container.coins >= 1&& container.coins < 10) {
                container.coins = 1
            }else if (container.coins >= 10&& container.coins < 25) {
                container.coins = 10
            }else if (container.coins >= 25&& container.coins < 50) {
                container.coins = 25
            }else if (container.coins >= 50&& container.coins < 75) {
                container.coins = 50
            }else if (container.coins >= 75&& container.coins < 100) {
                container.coins = 75
            }
        }
        objects.unshift(container)
    }
}

//Удаление обьекта(для разработчика)
export function removeObject(id) {
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id == id) {
            objects.splice(i, 1);
        }
    }
}