import { check, renderHUD } from "./hud.js";
import { player } from "./player.js";
import { gravity, collision } from "./physics.js";
import { objects } from "./objects.js";
import { background, checkStage, roomsMass } from "./map.js";
import { sounds, distanceSound } from "./sounds.js";
import { canv, ctx, effect_canv, getRandomInt, mapBounds } from "./utils.js";
import { lighting } from "./lighting.js";
import { camera, cameraMoving } from "./camera.js"
import { animateBackground } from "./animation.js";

var objecti = new Object("dresser", 70, 460, 0, 0, "none", "physics", "./sprites/objects/dresser_1.png", false, false, 0)

//Зарисовка обьектов на холсте
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
  animateBackground(background)
  for (let i = 0; i < sounds.length; i++) {
    distanceSound(sounds[i])
    //Удаление звука, если звук прекратился
    if (sounds[i].audio.paused&&sounds[i].loop != true) {
      sounds.splice(i, 1)
    }
  }
  check.visible = false
  ctx.drawImage(background.img, background.source_x, background.source_y, background.source_w, background.source_h, getRandomInt(100,600)+camera.x, camera.y, 1000, 500)
  roomsMass.forEach(stage => {
    ctx.drawImage(stage.img, stage.x, stage.y-stage.img.height-110, stage.img.width*2, stage.img.height*2);
  });
  checkStage()
  objects.forEach(object => {
    object.draw()
    object.update()
    // if (objects.length > 70) {
    //   objects.splice(0, 30)
    // }
  });
  player.draw()
  renderHUD()
}

draw()
