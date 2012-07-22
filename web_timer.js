// requires to include full_canvas.css
function updateCanvasSize() {
  var canvas = document.getElementById('canvas')
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function getCanvasContext() {
  var canvas = document.getElementById("canvas");
  return canvas.getContext("2d");
}

function parseGetParameters() {
  var args = location.href.split("?")[1];
  var params = {};
  if (args != undefined) {
    var arg_list = args.split("&");
    for(i in arg_list) {
      arg = arg_list[i].split("=");
      params[arg[0]] = arg[1];
    }
  }
  return params;
}

function Timer(sec) {
  this.msec = sec * 1000;
  this.start = new Date();
  console.log("start = " + this.start);

  this.getTime = function() {
    var now = new Date();
    return this.msec - Math.floor(now.getTime() - this.start.getTime());
  }

  this.getIntAbsTime = function() {
    return Math.abs(Math.ceil(this.getTime() / 1000));
  }

  this.getMin = function() {
    return Math.floor((this.getIntAbsTime() / 60) % 60);
  }

  this.getSec = function() {
    return Math.floor(this.getIntAbsTime() % 60);
  }

  this.getTimeString = function() {
    return ("0" + this.getMin()).substr(-2) + ":" + ("0" + this.getSec()).substr(-2);
  }

  this.getTimeStringMetrics = function(ctx) {
    return ctx.measureText("00:00");
  }
}

(function() {
  updateCanvasSize();

  var ctx = getCanvasContext();

  var params = parseGetParameters();
  var sec = 'sec' in params ? params['sec'] : 5 * 60;

  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;

  var audio = new Audio("GONG.wav");
  var isFirst = true;
  var timer = new Timer(sec);

  size = WIDTH / 3;
  ctx.font = size + "px sans-serif";
  ctx.lineWidth = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;

  var metrics = timer.getTimeStringMetrics(ctx);

  var initFontX = (WIDTH - metrics.width) / 2;
  var initFontY = (HEIGHT - (metrics.width / 5)) / 2 + (metrics.width / 5);

  setInterval(function() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    var remainingTime = timer.getTime();
//    console.log("remainingTime = " + remainingTime);

    if (remainingTime < 0 && isFirst) {
      audio.play();
      isFirst = false;
    }

    if (remainingTime > 0) {
      ctx.fillStyle = "Black";
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    } else {
      ctx.fillStyle = "Red";
      ctx.shadowColor = "rgba(255, 0, 0, 0.5)";
    }
    ctx.fillText(timer.getTimeString(), initFontX, initFontY);
  }, 100);
})();
