import { camera } from "./camera.js";
import { spawn_sound } from "./sounds.js";
//параметр курсора

export var cursor = {
    img: new Image(),
    x: 0,
    y: 0
}
cursor.img.src = './sprites/cursor.png';
export var page = {
    x: 0,
    y: 0
}
export var pageY = 0
//Расположение курсора
window.addEventListener('mousemove',(e)=>{
    page.x = e.pageX
    page.y = e.pageY
})

// Проверка звука
// window.addEventListener('click',(e)=>{
//     spawn_sound(cursor.x, cursor.y, './sounds/psst-roblox-doors.mp3', 1000)
// })

// window.addEventListener('dblclick',(e)=>{
//     spawn_sound(cursor.x, cursor.y, './sounds/screech_dodge.mp3', 1000)
// })