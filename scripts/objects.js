import { ctx, getRandomInt } from "./utils.js";

//Массив с обьектами
export var objects = []

class Object{
    constructor(name, pointX, pointY, width, height, id, type, model, collision, animation, size){
        if (id == "none") {
            id = `${Date.now().toString(36) + Math.random().toString(36).slice(2)}`
        }
        this.object = name,
        this.x = pointX,
        this.y = pointY,
        this.id = id,
        this.type = type,
        this.main = new Image(),
        this.model = model,
        this.onCollision = collision,
        this.power_physic = 0,
        this.ground = false,
        this.onAnimate = animation,
        this.sizeFrame = size,
        this.frameName = ""
        if (animation = true) {
            this.frameName = this.model.replace('./sprites/objects/','').replace(`_1.png`,'');
        }
        if (width!=0&&height!=0) {
            this.main.width = width
            this.main.height = height
        }
        this.main.src = this.model
    }
}

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
        main: new Image(),
        model: model,
        onCollision: collision,
        power_physic: 0,
        ground: false,
        onAnimate: animation,
        massFrame: frames,
        frameName: "",
        draw(){
            if (object.visible) {
                ctx.drawImage(object.main, object.x, object.y, object.main.width, object.main.height)
            }
        }
    }
    if (object.object == "dresser") {
        spawn_container(3, object)
    }
    if (animation = true) {
        object.frameName = object.model.replace('./sprites/objects/','').replace(`_1.png`,'');
    }
    if (width!=0) {
        object.main.width = width
    }
    if (height!=0) {
        object.main.height = height
    }
    if (object.visible) {
        object.main.src = object.model
    }
    objects.unshift(object)
}

function spawn_container(containerSize, object) {
    for (let i = 1; i <= containerSize; i++) {
        console.log(i, object.id)
        var container = {
            img: new Image(),
            id: object.id,
            slot: i,
            item: getRandomInt(0,5),
            draw(){
                container.img.src = "./sprites/objects/dresser_container_1.png"
                ctx.drawImage(container.img, object.x-10, object.y-10, container.img.width, container.img.height)
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