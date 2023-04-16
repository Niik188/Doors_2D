//Параметр холста
var canv = document.getElementById('canv')
const ctx = canv.getContext("2d");
//Размер отдельных кадров персонажа
const PLAYER_PICTURE_SIZE = 70
//Счётчик кадров в сек.
var times = [];
var fps;

var camera = {
    x: 0,
    y: 0
}
//secret functions
var noclip = false

//параметр фона
var background = {
    img: new Image(),
    y: 500
}

//Массив с обьектами
var objects = []

//параметр игрока
var player = {
    img: new Image(),
    active: true,
    hide: false,
    power_physic: 0,
    jump: true,
    ground: false,
    speed_left: 5,
    speed_right: 5,
    x: 0,
    y: 0,
    w: 70,
    h: 188,
    picture: 0
}

//параметр курсора
var cursor = {
    img: new Image(),
    x: 0,
    y: 0
}

//назначение картинок к объектам
player.img.src = './sprites/player.png';
cursor.img.src = './sprites/cursor.png';
background.img.src = "./sprites/background.png"

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

//Зарисовка обьектов на холст
function draw() {
    requestAnimationFrame(draw)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.drawImage(background.img, 0, background.y-background.img.width+150, background.img.width*2, background.img.height*2);
    for (let i = 0; i < objects.length; i++) {
        ctx.drawImage(objects[i].main, objects[i].x, objects[i].y, objects[i].main.width, objects[i].main.height)
    }
    // ctx.save();
    // ctx.scale(-1, 1);
    ctx.drawImage(player.img, player.picture * PLAYER_PICTURE_SIZE , 0, player.w, player.h, player.x, player.y, player.w, player.h);
    ctx.translate(camera.x,camera.y)
    // ctx.restore();
    gravity()
    collision()
    ctx.drawImage(cursor.img, cursor.x-cursor.img.width/1.5, cursor.y-cursor.img.height/1.5);
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    ctx.fillStyle = "White";
    ctx.font = "normal 16pt Arial";
    ctx.fillText(fps + " fps", 10, 26);
}

draw()
start()

//При старте
function start() {
    spawn_object("dresser", 70, 460, "none", "physics", "./sprites/objects/dresser.png", false)
    spawn_object("dresser", 700, 460, "none", "physics", "./sprites/objects/dresser.png", false)
    spawn_object("light", 500, 300, "none", "static", "./sprites/objects/light.png", false)
    spawn_object("light", 900, 300, "none", "static", "./sprites/objects/light.png", false)
    spawn_object("fire_barrel", 500, 200, "none", "s", "./sprites/objects/dresser.png", true)
}

//Столкновение
function collision() {
    if (player.y+player.h < background.y+160||player.x > background.img.width*2||player.y > background.y+170) {
        player.ground = false
    }else{
        player.y = background.y+160-player.h
        player.ground = true
    }
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].onCollision == true) {
            if(player.x + player.w > objects[i].x+5 && player.x < objects[i].x-5 + objects[i].main.width&&player.y + player.h > objects[i].y&&player.y + player.h < objects[i].y+objects[i].main.height/2.5){
                player.y = objects[i].y+1-player.h
                player.ground = true
            }
            if(player.x + player.w > objects[i].x+5 && player.x < objects[i].x-5 + objects[i].main.width&&player.y < objects[i].y+objects[i].main.height&&player.y + player.h > objects[i].y+objects[i].main.height/2.5){
                player.y = objects[i].y + objects[i].main.height
                player.ground = true
            }
            if (player.x + player.w > objects[i].x&&player.x + player.w < objects[i].x+objects[i].main.width/2&&player.y + player.h > objects[i].y+10&&player.y < objects[i].y+objects[i].main.height-10) {
                player.x = objects[i].x+1-player.w
                player.speed_right = 0
            }else if (player.x < objects[i].x + objects[i].main.width&&player.x + player.w > objects[i].x+objects[i].main.width/2&&player.y + player.h > objects[i].y+10&&player.y < objects[i].y+objects[i].main.height-10) {
                player.x = (objects[i].x + objects[i].main.width)-1
                player.speed_left = 0
            }else{
                player.speed_right = 5
                player.speed_left = 5
            }
        }
    }
}

//Физика игрока
function gravity() {
    if (!player.ground&&player.active) {
        player.power_physic+=0.5
        player.y+=player.power_physic
        player.picture = 1
    }else{
        player.power_physic=0
        player.picture = 0
    }
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].type == "physics") {
            if (objects[i].y + objects[i].main.height < background.y+150||objects[i].x > background.img.width*2) {
                objects[i].ground = false
                objects[i].power_physic+=0.5
                objects[i].y+=objects[i].power_physic
            }else if(objects[i].y + objects[i].main.height > background.y+150){
                objects[i].y = background.y+150-objects[i].main.height
                objects[i].ground = true
                objects[i].power_physic=0
            }
            if (objects[i].y > canv.width) {
                objects.splice(i)
            }
        }
    } 
}

//Прыжок
function player_jump() {  
    if (player.ground&&player.jump) {
        player.y -= 6;
        player.power_physic = -20
        collision()
        setTimeout(() => {
            return;
        }, 200);
    }
}

//Расположение курсора
window.addEventListener('mousemove',(e)=>{
    cursor.x = e.clientX
    cursor.y = e.clientY
})

//Клавиши
var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.key] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.key] = false;
    camera.x = 0
    camera.y = 0
},true);

function gameLoop() {
    if (player.active) {
    if (keyState["a"] || keyState["A"] || keyState["ф"] || keyState["Ф"]){ 
        player.x -= player.speed_left;
    }
    if (keyState["w"] || keyState["W"] || keyState["ц"] || keyState["Ц"]){
        player_jump()
        camera.x = 1
    }
    if (keyState["d"] || keyState["D"] || keyState["в"] || keyState["В"]){
        player.x += player.speed_right;
    }
    }
    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user

    setTimeout(gameLoop, 10);
}    
gameLoop();

//Создание обьекта с параметрами
function spawn_object(name, pointX, pointY, id, type, model, collision) {
    if (id == "none") {
        id = `${Date.now().toString(36) + Math.random().toString(36).slice(2)}`
    }
    var object = {
        object: name,
        x: pointX,
        y: pointY,
        id: id,
        type: type,
        main: new Image(),
        model: model,
        onCollision: collision,
        power_physic: 0,
        ground: false
    }
    object.main.src = object.model
    objects.push(object)
    console.log(objects)
}

//Удаление обьекта(для разработчика)
function removeObject(id) {
    
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id == id) {
            objects.splice(i, 1);
        }
    }
}

//Рандомизатор
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}