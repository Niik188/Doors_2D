//Параметры canvas
export var canv = document.getElementById('canv')
export const ctx = canv.getContext("2d");
//Параметры эффекта(освещение)
export var effect_canv = document.getElementById('effects')
export const effect_ctx = effect_canv.getContext("2d");
export var font = new FontFace('img_Font', 'url(./font/typewriter.ttf)');

document.fonts.add(font);

canv.width = effect_canv.width = window.innerWidth
canv.style.width = effect_canv.style.width = window.innerWidth
canv.height = effect_canv.height = window.innerHeight

//Границы карты
export var mapBounds = {
    minX:0,
    maxX:100000,
    minY:0,
    maxY:100000
}

//Рандомизатор
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}