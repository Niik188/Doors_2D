//параметр курсора
export var cursor = {
    img: new Image(),
    x: 0,
    y: 0
}
cursor.img.src = './sprites/cursor.png';

//Расположение курсора
window.addEventListener('mousemove',(e)=>{
    cursor.x = e.pageX
    cursor.y = e.pageY
})