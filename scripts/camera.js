import { canv, ctx, effect_ctx, mapBounds } from "./utils.js"
import { player } from "./player.js"
import { cursor, page } from "./cursor.js"
export var camera = {
    x:0,
    y:0
}
export function cameraMoving() {
    camera.x = clamp(player.x - canv.width/2, mapBounds.minX, mapBounds.maxX - canv.width);
    camera.y = clamp(player.y - canv.height/1.5, mapBounds.minY, mapBounds.maxY - canv.height);
    effect_ctx.translate(-camera.x, -camera.y);
    ctx.translate(-camera.x, -camera.y);
    cursor.x = page.x + camera.x
    cursor.y = page.y + camera.y
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    effect_ctx.webkitImageSmoothingEnabled = false;
    effect_ctx.mozImageSmoothingEnabled = false;
    effect_ctx.imageSmoothingEnabled = false;
}

function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}