
//параметр курсора
export var cursor = {
    img: new Image(),
    x: 0,
    y: 0
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

// Проверка звука(для разработчиков)
// window.addEventListener('click',(e)=>{
//     spawn_sound(cursor.x, cursor.y, './sounds/psst-roblox-doors.mp3', 1000)
// })

// window.addEventListener('dblclick',(e)=>{
//     spawn_sound(cursor.x, cursor.y, './sounds/screech_dodge.mp3', 1000)
// })