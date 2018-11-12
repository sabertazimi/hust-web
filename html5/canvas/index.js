class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this._canvas = document.getElementById('canvas');
    this.screen = this._canvas.getContext('2d');
  }

  init() {
    this.resize();

    // Position out canvas
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';

    // Make sure it's on top of other elements
    this.canvas.style.zIndex = '1001';

    // Make sure other elements under it are clickable
    this.canvas.style.pointerEvents = 'none';
  }

  resize() {
    // Size our canvas
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }

  draw() {
    // Add our canvas to the page
    this.screen.drawImage(this.canvas, 0, 0);
  }
}

const particleSystem = new ParticleSystem();
particleSystem.init();
particleSystem.draw();
