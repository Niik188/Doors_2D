import { spawn_sound } from "./sounds.js";
export var click = false

//параметр курсора
export var cursor = {
    img: new Image(),
    x: 0,
    y: 0,
    w: 10,
    h: 10
}

//назначение картинки
cursor.img.src = './sprites/cursor.png';

//Параметры страницы сайта
export var page = {
    x: 0,
    y: 0
}

//Расположение курсора
window.addEventListener('mousemove',(e)=>{
    page.x = e.pageX
    page.y = e.pageY
})

//При нажатии мышки
window.addEventListener('mousedown',(e)=>{
    click = true
    console.log(page.x,page.y)
})

//При отжатии мышки
window.addEventListener('mouseup',(e)=>{
    click = false
})

// Проверка звука(для разработчиков)
// window.addEventListener('click',(e)=>{
//     spawn_sound(cursor.x, cursor.y, './sounds/psst-roblox-doors.mp3', 1000)
// })

// window.addEventListener('dblclick',(e)=>{
//     spawn_sound(cursor.x, cursor.y, './sounds/screech_dodge.mp3', 1000)
// })