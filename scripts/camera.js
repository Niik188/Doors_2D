import { canv } from "./utils.js"
import { ctx } from "./utils.js"
import { player } from "./player.js"
import { cursor } from "./cursor.js"
import { page } from "./cursor.js"
import { mapBounds } from "./utils.js"
export var camera = {
    x:0,
    y:0
}
export function cameraMoving() {
    camera.x = clamp(player.x - canv.width/2, mapBounds.minX, mapBounds.maxX - canv.width);
    camera.y = clamp(player.y - canv.height/2, mapBounds.minY, mapBounds.maxY - canv.height);
    ctx.translate(-camera.x, -camera.y);
    cursor.x = page.x + camera.x
    cursor.y = page.y + camera.y
}

function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}