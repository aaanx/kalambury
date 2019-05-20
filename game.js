var canvas = document.getElementById('play_box');
var clearBtn = document.getElementById('clear_btn');
var c = canvas.getContext('2d'); //contex

var mouseX;
var mouseY;
var paint;

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

canvas.addEventListener('mousedown', function(e) {
    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(mouseX, mouseY, false);
    redraw();
});

canvas.addEventListener('mousemove', function(e) {
    if(paint) {
        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

        addClick(mouseX, mouseY, true);
        redraw();
    }
});

canvas.addEventListener('mouseup', function(e) {
    paint = false;
});

canvas.addEventListener('mouseleave', function(e) {
    paint = false;
});

clearBtn.addEventListener('click', clearCanvas);

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function clearCanvas() {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height); // clears the canvas 

    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
}

function redraw() {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height); // clears the canvas 

    c.strokeStyle = "#000";
    c.lineWidth = 1;

    for (let i = 0; i < clickX.length; i++) {
        c.beginPath();

        if (clickDrag[i] && i) {
            c.moveTo(clickX[i-1], clickY[i-1]);
        } else {
            c.moveTo(clickX[i]-1, clickY[i]);
        }
        c.lineTo(clickX[i], clickY[i]);
        c.closePath();
        c.stroke();
    }
}

