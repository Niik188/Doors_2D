//Кадры в секунду
const SPEED_FRAME = 120
//Анимация обьектов
export function animateObject(object) {
    if (object.onAnimate == true) {
        for (let i = 1; i <= object.sizeFrame; i++) {
            object.main.src = object.model  
            object.model = `./sprites/objects/${object.frameName}_${i}.png`;
            setTimeout(() => {
            object.main.src = object.model        
            }, SPEED_FRAME);
        }
        setTimeout(() => {
            object.model = `./sprites/objects/${object.frameName}_1.png`;
            object.main.src = object.model
        }, SPEED_FRAME+200);
    }
}