// requires to include full_canvas.css
function updateCanvasSize() {
    var canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

(function() {
    var args = location.href.split("?")[1];
    var sec = 5 * 60
    if (args != undefined) {
        var arg_list = args.split("&");
        for(i in arg_list) {
            arg = arg_list[i].split("=");
            if (arg[0] == 'sec') {
                sec = arg[1]
            }
        }
    }

    updateCanvasSize();

    var audio = new Audio("GONG.wav");
    var isFirst = true
    var start = null

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    var MAX = sec * 10 

    size = WIDTH / 3;
    ctx.font = size + "px sans-serif";  
    var metrics = ctx.measureText("00:00");

    var initFontX = (WIDTH - metrics.width) / 2;
    var initFontY = (HEIGHT - (metrics.width / 5)) / 2 + (metrics.width / 5)

    setInterval(function() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        var now = new Date();
        
        if (start == null)
            start = now;

        var diffSec = MAX - Math.floor(now.getTime() - start.getTime()) / 100

        var delta = Math.abs(Math.ceil(diffSec / 10));
        var min = Math.floor((delta / 60) % 60);
        var sec = Math.floor(delta % 60);

        if (diffSec < 0 && isFirst) {
            audio.play();
            isFirst = false;
        }

        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.shadowOffsetX = 2;  
        ctx.shadowOffsetY = 2;  
        ctx.shadowBlur = 2;  

        if (diffSec > 0) {
            ctx.fillStyle = "Black";
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";  
        } else {
            ctx.fillStyle = "Red";  
            ctx.shadowColor = "rgba(255, 0, 0, 0.5)";  
        }
        ctx.shadowOffsetX = 4;  
        ctx.shadowOffsetY = 4;  
        ctx.shadowBlur = 4;  

        ctx.fillText(("0" + min).substr(-2) + ":" + ("0" + sec).substr(-2), initFontX, initFontY);
    }, 100);
})();
