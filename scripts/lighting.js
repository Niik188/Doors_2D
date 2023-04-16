import { stage } from "./stage.js"; 
import { effect_canv } from "./utils.js";
import { effect_ctx } from "./utils.js";
import { cursor } from "./cursor.js";
var radialGradient;



export function lighting() {
    if (stage.type == "dark") {
        effect_ctx.fillStyle = '#000';
        effect_ctx.clearRect(0, 0, effect_canv.width, effect_canv.height);
        effect_ctx.fillRect(0, 0, effect_canv.width, effect_canv.height);
        // first reset the gCO
        effect_ctx.globalCompositeOperation = 'source-over';
        // Paint the canvas black.
        effect_ctx.fillStyle = '#000';
        effect_ctx.fillRect(0, 0, effect_canv.width, effect_canv.height);
        
        effect_ctx.beginPath();
        radialGradient = effect_ctx.createRadialGradient(cursor.x, cursor.y, 1, cursor.x, cursor.y, 500);
        radialGradient.addColorStop(0, 'rgba(255,255,255,1)');
        radialGradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        effect_ctx.globalCompositeOperation = "destination-out";
        
        effect_ctx.fillStyle = radialGradient;
        effect_ctx.arc(cursor.x, cursor.y, 500, 0, Math.PI*2, false);
        effect_ctx.fill();
        effect_ctx.closePath();
    }
}
