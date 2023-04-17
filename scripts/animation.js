//Кадры в секунду
const SPEED_FRAME = 100
//Анимация обьектов
export function animateObject(object) {
    if (object.onAnimate == true) {
        var frame = 1
        while (frame < object.sizeFrame) {
            frame++
            object.model = `./sprites/objects/${object.frameName}_${frame}.png`;
            object.main.src = object.model
        }
        setTimeout(() => {
            object.model = `./sprites/objects/${object.frameName}_1.png`;
            object.main.src = object.model
        }, SPEED_FRAME);
    }
    
}