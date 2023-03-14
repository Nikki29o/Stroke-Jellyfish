function yiran_jellyfish() {
  this.init();
}
yiran_jellyfish.prototype =
{
  prevX: null, prevY: null,
  points: null, count: null,

  init: function () {
    this.points = new Array();
    this.count = 0;
  },

  destroy: function () {
  },
  strokeStart: function (x, y) {
    this.prevX = x;
    this.prevY = y;
  },
  stroke: function (x, y) {
    strokeContext.globalCompositeOperation = 'source-over';
    strokeContext.lineCap = 'round';
    strokeContext.lineWidth = BRUSH_SIZE;
    strokeContext.strokeStyle = "rgba(" + BRUSH_COLOR[0] + ", " + BRUSH_COLOR[1] + ", " + BRUSH_COLOR[2] + ", " + 0.5 * BRUSH_PRESSURE + ")";

    strokeContext.beginPath();
    var dist = Math.sqrt((x - this.prevX) * (x - this.prevX) + (y - this.prevY) * (y - this.prevY));
    var dt = 1 / dist;

    for (var t = 0; t <= 1; t += dt) {
      var xx = this.prevX * (1 - t) + x * t;
      var yy = this.prevY * (1 - t) + y * t;
      strokeContext.moveTo(this.prevX, this.prevY);
      strokeContext.lineTo(xx, yy);
      strokeContext.stroke();
      strokeContext.moveTo(this.prevX, this.prevY - 100);
      strokeContext.lineTo(xx, yy - 100);
      strokeContext.stroke();
      strokeContext.moveTo(this.prevX, this.prevY + 100);
      strokeContext.lineTo(xx, yy + 100);
      strokeContext.stroke();

    }


    //draw dash lines
    this.points.push([x, y]);
    for (var i = 0; i < this.points.length; i++) {
      w = 5;
      n = w - i % w;
      d = (i + n) / w;
      if (d % 2 == 0) {
        strokeContext.beginPath();
        strokeContext.moveTo(this.points[i - 1][0], this.points[i - 1][1] - 120);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] - 120);
        strokeContext.stroke()
        strokeContext.moveTo(this.points[i - 1][0], this.points[i - 1][1] - 80);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] - 80);
        strokeContext.stroke();
        strokeContext.moveTo(this.points[i - 1][0], this.points[i - 1][1] + 80);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] + 80);
        strokeContext.stroke();
        strokeContext.moveTo(this.points[i - 1][0], this.points[i - 1][1] + 120);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] + 120);
        strokeContext.stroke();
        strokeContext.moveTo(this.points[i - 1][0], this.points[i - 1][1] + 20);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] + 20);
        strokeContext.stroke();
        strokeContext.moveTo(this.points[i - 1][0], this.points[i - 1][1] - 20);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] - 20);
        strokeContext.stroke();

        for (var r = 1; r < 30; r++) {
          len = Math.random()*100+20;
          if (i >= len) {
            strokeContext.moveTo(this.points[i - 1][0], this.points[i - 1][1] - 150 + r * 10);
            strokeContext.lineTo(this.points[i][0], this.points[i][1] - 150 + r * 10);
            strokeContext.stroke();
          }
        }

      }
      if (i > 0 && i % 2 == 0) {
        strokeContext.beginPath();
        strokeContext.moveTo(this.points[i][0], this.points[i][1] - 100);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] - 120);
        strokeContext.stroke();
        strokeContext.moveTo(this.points[i][0], this.points[i][1] - 100);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] - 80);
        strokeContext.stroke();
        strokeContext.moveTo(this.points[i][0], this.points[i][1] + 100);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] + 80);
        strokeContext.stroke();
        strokeContext.moveTo(this.points[i][0], this.points[i][1] + 100);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] + 120);
        strokeContext.moveTo(this.points[i][0], this.points[i][1]);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] - 20);
        strokeContext.stroke();
        strokeContext.moveTo(this.points[i][0], this.points[i][1]);
        strokeContext.lineTo(this.points[i][0], this.points[i][1] + 20);
        strokeContext.stroke();
      }
    }
    this.prevX = x;
    this.prevY = y;
    this.count++;

  },

  strokeEnd: function () {

  }
}