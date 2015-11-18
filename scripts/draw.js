var colorTool = document.querySelector('.colorbar');
var drawSize = document.querySelector('.range');
var output = document.querySelector('.output');
var btn = document.querySelector('.button');
var canvas = document.querySelector('canvas');
var curX;
var curY;
var pressed = false;

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight-75;
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

let Drawpad = {
    degToRad: (degrees) => {
        return degrees * Math.PI / 180;
    },
    detectRange: () => {
        output.textContent = drawSize.value;
    },
    mousemove: (e) => {
        curX = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        curY = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    },
    mousedown: () => {
        pressed = true;
    },
    mouseup: () => {
        pressed = false;
    },
    eraseDrawing: () => {
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0,0,width,height);
    },
    draw: function() {
        if(pressed) {
          ctx.fillStyle = colorTool.value;
          ctx.beginPath();
          ctx.arc(curX, curY-85, drawSize.value, this.degToRad(0), this.degToRad(360), false);
          ctx.fill();
        }
        requestAnimationFrame(()=>{this.draw()});
    }
}

Drawpad.draw()
document.onmousemove = Drawpad.mousemove
drawSize.oninput = Drawpad.detectRange
canvas.onmousedown = Drawpad.mousedown
canvas.onmouseup = Drawpad.mouseup
btn.onclick = Drawpad.eraseDrawing