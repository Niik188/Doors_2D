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
        this.img = new Image(),
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
            this.img.width = width
            this.img.height = height
        }
        this.img.src = this.model
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
        }
    }
    if (object.object == "dresser") {
        spawn_container(getRandomInt(1,4), object)
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

function spawn_container(containerSize, object) {
    for (let i = 1; i <= containerSize; i++) {
        console.log(i, object.id)
        var container = {
            object: `slot_${i}`,
            img: new Image(),
            x: object.x+20,
            y: 0,
            w: 0,
            h: 0,
            type: "static",
            id: object.id,
            item: getRandomInt(0,5),
            visible: true,
            img: new Image(),
            model: "",
            onCollision: false,
            power_physic: 0,
            ground: false,
            onAnimate: false,
            massFrame: 0,
            frameName: "",
            draw(){
                container.y = object.y-40+(i*50)
                container.img.src = "./sprites/objects/dresser_container_1.png"
                ctx.drawImage(container.img, container.x, container.y, container.img.width, container.img.height)
            }
        }
        objects.unshift(container)
        console.log(objects)
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