import { renderHUD } from "./hud.js";
import { player } from "./player.js";
import { gravity } from "./physics.js";
import { collision } from "./physics.js";
import { objects } from "./objects.js";
import { checkCeilling } from "./player.js";
import { stage } from "./stage.js";
import { sounds } from "./sounds.js";
import { canv } from "./utils.js";
import { ctx } from "./utils.js";
import { effect_canv } from "./utils.js";
import { lighting } from "./lighting.js";
import { distanceSound } from "./sounds.js";
import { cameraMoving } from "./camera.js";


//Размер отдельных кадров игрока
const PLAYER_PICTURE_SIZE = 70

//Зарисовка обьектов на холст
function draw() {
    canv.width = effect_canv.width = window.innerWidth
    canv.style.width = effect_canv.style.width = window.innerWidth
    canv.height = effect_canv.height = window.innerHeight
    canv.style.height = effect_canv.style.height = window.innerHeight
    ctx.setTransform(1,0,0,1,0,0);
    requestAnimationFrame(draw)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    collision()
    gravity()
    lighting()
    cameraMoving()
    ctx.drawImage(stage.img, 0, stage.y-stage.img.height-110, stage.img.width*2, stage.img.height*2);
    objects.forEach(object => {
      ctx.drawImage(object.main, object.x, object.y, object.main.width, object.main.height)
    });
    for (let i = 0; i < sounds.length; i++) {
      distanceSound(sounds[i])
      //Удаление звука, если звук прекратился
      if (sounds[i].main.paused) {
        sounds.splice(i, 1)
      }
    }
    if (!player.hide) {
    if (player.flip) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(player.img, player.pictureX, player.pictureY, player.pictureW, player.pictureH, player.x*-1, player.y, player.w*-1, player.h);
      ctx.restore();
    }else{
      ctx.drawImage(player.img, player.pictureX, player.pictureY, player.pictureW, player.pictureH, player.x, player.y, player.w, player.h);
    }
    }
    renderHUD()
}

draw()