import { renderHUD } from "./hud.js";
import { player, checkCeilling, setPicture } from "./player.js";
import { gravity, collision } from "./physics.js";
import { objects } from "./objects.js";
import { checkStage, roomsMass } from "./map.js";
import { sounds, distanceSound } from "./sounds.js";
import { canv, ctx, effect_canv } from "./utils.js";
import { lighting } from "./lighting.js";
import { cameraMoving } from "./camera.js"

//Размер отдельных кадров игрока
const PLAYER_PICTURE_Y_SIZE = 188

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
    roomsMass.forEach(stage => {
      ctx.drawImage(stage.img, stage.x, stage.y-stage.img.height-110, stage.img.width*2, stage.img.height*2);
    });
    checkStage()
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
    if (!player.sit&&player.ground&&!player.moving) {
        setPicture(0, 0, 90, 223)
    }
    if (player.sit&&player.ground&&!player.moving) {
        setPicture(0, 448,92,195)
    }
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