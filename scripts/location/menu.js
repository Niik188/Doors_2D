import { canv } from "../utils.js";
import { ctx } from "../utils.js";
//Отображение logo
var logo = new Image();
logo.src = './sprites/icon.png'
ctx.drawImage(logo, 10, 10)