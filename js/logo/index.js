class LogoSystem {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.init();
  }

  init() {
    this.resize();
    this.initStyle();
  }

  resize() {
    // Size canvas
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initStyle() {
    // Position out canvas
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';

    // Make sure it's on top of other elements
    this.canvas.style.zIndex = '1001';
  }

  getContext() {
    return this.context;
  }

  drawLine(fromX, fromY, toX, toY) {
    const context = this.getContext();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  }

  drawCircle(x, y, radius, color = 'black') {
    const context = this.getContext();
    context.fillStyle = color;
    context.strokeStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.stroke();
  }

  drawArc(fromX, fromY, radius, color= 'black') {
    const context = this.getContext();
    context.fillStyle = color;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.arcTo(fromX, fromY-radius, fromX-radius, fromY-radius, radius);
    context.stroke();
  }

  changeColor(color) {
    const context = this.getContext();
    context.fillStyle = color;
    context.fill();
  }

  draw() {
    this.drawArc(400, 400, 100);
    this.drawLine(300, 300, 300, 500);
    this.drawLine(300, 500, 400, 400);
  }
}

const logoSystem = new LogoSystem();
logoSystem.draw();
