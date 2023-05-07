import { effect_canv, effect_ctx } from "./utils.js";
import { page, cursor } from "./cursor.js"
import { objects } from "./objects.js";
import { camera } from "./camera.js";
import { roomsMass } from "./map.js";
var radialGradient;
var flashlight = {
    x: 0,
    y: 0,
    power: 600,
    active: true
}

//Освещение
export function lighting() {
    roomsMass.forEach(stage => {
    if (stage.type == "dark") {
        flashlight.x = page.x
        flashlight.y = page.y
        effect_ctx.clearRect(0, 0, effect_canv.width, effect_canv.height);
        // first reset the gCO
        effect_ctx.globalCompositeOperation = 'source-over';
        // Paint the canvas black.
        effect_ctx.fillStyle = '#000';
        effect_ctx.fillRect(0, 0, effect_canv.width, effect_canv.height);
        
        radialGradient = effect_ctx.createRadialGradient(flashlight.x, flashlight.y, 1, flashlight.x, flashlight.y, flashlight.power);
        radialGradient.addColorStop(0, 'rgba(255,255,255,50)');
        radialGradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        effect_ctx.globalCompositeOperation = "destination-out";
        objects.forEach(object => {
            if(object.object == "light"){
                effect_ctx.beginPath();
                effect_ctx.arc((object.x+object.img.width/2)-camera.x, object.y, 200, 0, Math.PI*2, false);
                effect_ctx.fill();
                effect_ctx.closePath();
            }
        });
        
        effect_ctx.beginPath();
        effect_ctx.fillStyle = radialGradient;
        effect_ctx.arc(flashlight.x, flashlight.y, flashlight.power, 0, Math.PI*2, false);
        effect_ctx.fill();
        effect_ctx.closePath();
        
    }
    });
}
