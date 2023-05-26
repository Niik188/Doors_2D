import { canv } from "../utils.js";
import { ctx } from "../utils.js";

//Отображение logo
class Button{
    constructor(color,text,text_x,text_y,x,y){
        this.color = color
        this.text = text,
        this.text_x = text_x,
        this.text_y = text_y,
        this.x = x,
        this.y = y
    }
    draw(){
        ctx.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        ctx.fillRect(this.x,this.y,300,100);
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.font = "35pt img_Font";
        ctx.fillText(this.text, this.x+this.text_x, this.y+this.text_y);
    }
    update(){
        this.draw()
        if (collision(page,this)) {
            this.color = {
                r: 150,
                g: 150,
                b: 150
            }
        }else{
            this.color = {
                r: 256,
                g: 256,
                b: 256
            }
        }
    }
}
document.title = "Doors 2D|MENU"
document.body.style.cursor = "default"
console.log("ctx")
var logo = new Image();
var background = new Image();

var fullscreen = new Button({
    r: 256,
    g: 256,
    b: 256
},"fullscreen", 50, 60, 0, canv.height-120)

var btn_play = new Button({
    r: 256,
    g: 256,
    b: 256
},"play", 50, 60, 10, 200)

var btn_option = new Button({
    r: 256,
    g: 256,
    b: 256
},"option", 50, 60, 10, 350)

var page = {
    x: 0,
    y: 0
}
logo.src = './sprites/logo.png'
background.src = './sprites/background_menu.png'
function draw() {
    requestAnimationFrame(draw)
    ctx.drawImage(background, 500, 10, canv.width-500, canv.height)
    ctx.drawImage(logo, 10, 10)
    btn_play.update()
    btn_option.update()
    fullscreen.update()
}

addEventListener('click', (e)=>{
    if (collision(page,btn_play)) {
        import('./game.js') 
    }
    if (collision(page,fullscreen)&&fullscreen.text == "fullscreen") {
        document.body.requestFullscreen()
        fullscreen.text = "close"
    }else if (collision(page,fullscreen)&&fullscreen.text == "close") {
        document.exitFullscreen();
        fullscreen.text = "fullscreen"
    }

})

addEventListener('mousemove', (e)=>{
    page.x = e.pageX
    page.y = e.pageY
})

function collision(mouse, object) {
    return object.x < mouse.x &&object.x+300 > mouse.x&&
            object.y < mouse.y&&object.y+100 > mouse.y
}
draw()
