//Параметры canvas
export var canv = document.getElementById('canv')
export const ctx = canv.getContext("2d");
//Параметры эффекта(освещение)
export var effect_canv = document.getElementById('effects')
export const effect_ctx = effect_canv.getContext("2d");

//Рандомизатор
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}