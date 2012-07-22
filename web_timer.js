// requires to include full_canvas.css
function updateCanvasSize() {
  var canvas = document.getElementById('canvas')
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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

function getCanvasContext() {
  var canvas = document.getElementById("canvas");
  return canvas.getContext("2d");
}


function convertTime(msec) {
  var delta = Math.abs(Math.ceil(msec / 1000));
  var min_part = Math.floor((delta / 60) % 60);
  var sec_part = Math.floor(delta % 60);
  return [min_part, sec_part]
}

function getTimeString(t) {
  return ("0" + t[0]).substr(-2) + ":" + ("0" + t[1]).substr(-2);
}

function getTimeStringMetrics(ctx) {
  return ctx.measureText("00:00");
}


(function() {
  updateCanvasSize();

  var ctx = getCanvasContext();

  var params = parseGetParameters()

  var TIME_MSEC = 'sec' in params ? params['sec'] * 1000 : 5 * 60 * 1000;
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;

  var audio = new Audio("GONG.wav");
  var isFirst = true
  var start = null

  size = WIDTH / 3;
  ctx.font = size + "px sans-serif";
  ctx.lineWidth = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;

  var metrics = getTimeStringMetrics(ctx)

  var initFontX = (WIDTH - metrics.width) / 2;
  var initFontY = (HEIGHT - (metrics.width / 5)) / 2 + (metrics.width / 5)

  setInterval(function() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    var now = new Date();

    if (start == null)
      start = now;

    var remainingTime = TIME_MSEC - Math.floor(now.getTime() - start.getTime())

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
    ctx.fillText(getTimeString(convertTime(remainingTime)), initFontX, initFontY);
  }, 100);
})();
