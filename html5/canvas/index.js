class ExplodingParticle {
  constructor(x = 0, y = 0, colorData = [156, 39, 176]) {
    this.startX = x;
    this.startY = y;
    this.rgbArray = colorData;

    // Set the speed for particle
    this.speed = {
      x: -5 + Math.random() * 10,
      y: -5 + Math.random() * 10
    };

    // Size particle
    this.radius = 5 + Math.random() * 5;

    // Set how long particle to animate for X ms
    this.startTime = Date.now();
    this.animationDuration = 1000;

    // Set a max time to live for particle
    this.life = 30 + Math.random() * 10;
    this.remainingLife = this.life;
  }

  // This function will be called by animation logic
  draw(ctx) {
    const shouldDraw = this.radius > 0 && this.remainingLife > 0;

    if (shouldDraw) {
      // Draw a circle at the current location
      ctx.beginPath();
      ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.rgbArray[0]},${this.rgbArray[1]},${this.rgbArray[2]},1)`;
      ctx.fill();

      // Update the particle's location and life
      this.startX += this.speed.x;
      this.startY += this.speed.y;
      this.radius -= 0.25;
      this.remainingLife--;
    }
  }
}

class ParticleFactory {
  constructor() {
    this.particles = [];
  }

  getParticles() {
    return this.particles;
  }

  clearParticles() {
    while (this.particles.length) {
      this.particles.pop();
    }
  }

  emit(x = 0, y = 0, colorData = [156, 39, 176]) {
    const particle = new ExplodingParticle(x, y, colorData);
    this.particles.push(particle);
  }
}

class ParticleSystem {
  constructor(factor = 20) {
    this.factory = new ParticleFactory();
    this.buffer = document.createElement('canvas');
    this.context = this.buffer.getContext('2d');
    this.canvas = document.getElementById('canvas');
    this.screen = this.canvas.getContext('2d');
    this.factor = factor;

    this.init();
  }

  init() {
    this.resize();
    this.initStyle();
    this.handleClick();
  }

  resize() {
    // Size canvas
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.buffer.width = window.innerWidth;
    this.buffer.height = window.innerHeight;
  }

  initStyle() {
    // Position out canvas
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';

    // Make sure it's on top of other elements
    this.canvas.style.zIndex = '1001';
  }

  handleClick() {
    // bind click event to screen canvas
    this.canvas.addEventListener('click', (event) => {
      const x = event.clientX;
      const y = event.clientY;
      let count = this.factor;

      while (count) {
        particleSystem.emit(x, y);
        count--;
      }
    });
  }

  emit(x = 0, y = 0, colorData = [156, 39, 176]) {
    this.factory.emit(x, y, colorData);
  }

  draw() {
    // render particles to offscreen canvas
    const particles = this.factory.getParticles();

    particles.forEach((particle, index, particles) => {
      particle.draw(this.context);

      // Simple way to clean up if the last particle is done animating
      if (index === particles.length - 1) {
        let percent = (Date.now() - particle.startTime) / particle.animationDuration;

        if (percent > 1) {
          this.factory.clearParticles();
        }
      }
    });

    // render to screen canvas
    this.screen.drawImage(this.buffer, 0, 0);
  }

  clear() {
    this.context.clearRect(0, 0, this.buffer.width, this.buffer.height);
    this.screen.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.screen.drawImage(this.buffer, 0, 0);
  }
}

const particleSystem = new ParticleSystem();

const update = () => {
  particleSystem.clear();
  particleSystem.draw();
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
