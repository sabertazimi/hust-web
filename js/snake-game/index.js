class Part {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Snake {
  constructor(game, x, y, seg) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.xspeed = 1;
    this.yspeed = 0;
    this.canChange = true;
    this.parts = [];

    for (let i = 0; i < seg; ++i) {
      this.parts.push(new Part(x - i, y));
    }

    document.addEventListener('keydown', (event) => {
      this.controller(event.key);
    });
  }

  controller(key) {
    switch (key) {
      case 'ArrowLeft': {
        if (this.yspeed !== 0 && this.canChange) {
          this.canChange = false;
          this.xspeed = -1;
          this.yspeed = 0;
        }

        break;
      }
      case 'ArrowRight': {
        if (this.yspeed !== 0 && this.canChange) {
          this.canChange = false;
          this.xspeed = 1;
          this.yspeed = 0;
        }

        break;
      }
      case 'ArrowUp': {
        if (this.xspeed !== 0 && this.canChange) {
          this.canChange = false;
          this.xspeed = 0;
          this.yspeed = -1;
        }

        break;
      }
      case 'ArrowDown': {
        if (this.xspeed !== 0 && this.canChange) {
          this.canChange = false;
          this.xspeed = 0;
          this.yspeed = 1;
        }

        break;
      }
      default:
        break;
    }
  }

  addPart() {
    const lastPart = this.parts[this.parts.length - 1];
    this.parts.push(new Part(lastPart.x, lastPart.y));
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;

    if (this.x < 0 || this.y < 0 || this.x > this.game.width - 1 || this.y > this.game.height - 1) {
      this.die();
    }

    for (let i = this.parts.length - 1; i >= 0; --i) {
      const part = this.parts[i];

      if (i != 0) {
        part.x = this.parts[i - 1].x;
        part.y = this.parts[i - 1].y;

        if (this.x === part.x && this.y === part.y) {
          this.die();
        }
      } else {
        part.x = this.x;
        part.y = this.y;
      }

      this.game.board.fillBoard(part.x, part.y);
    }

    this.canChange = true;
  }

  die() {
    this.parts = [];
  }
}

class Food {
  constructor(game) {
    this.game = game;
    this.placeFood();
  }

  placeFood() {
    this.x = Math.floor(Math.random() * this.game.width);
    this.y = Math.floor(Math.random() * this.game.height);
  }

  update() {
    this.game.board.fillBoard(this.x, this.y);
  }
}

class Board {
  constructor(game) {
    this.game = game;
    this.board = [];
    this.buildBoard();
  }

  buildBoard() {
    for (let x = 0; x < this.game.width; ++x) {
      this.board[x] = [];

      for (let y = 0; y < this.game.height; ++y) {
        const node = document.createElement('div');
        node.style.position = 'absolute';
        node.style.width = node.style.height = this.game.size + 'px';
        node.style.left = x * this.game.size + 'px';
        node.style.top = y * this.game.size + 'px';
        node.style.border = '1px solid #777';

        this.game.$stage.appendChild(node);
        this.board[x][y] = {
          node: node,
          val: false
        };
      }
    }
  }

  fillBoard(x, y) {
    if (this.board[x] && this.board[x][y]) {
      this.board[x][y].val = true;
    }
  }

  update() {
    for (let x = 0; x < this.game.width; ++x) {
      for (let y = 0; y < this.game.height; ++y) {
        const bp = this.board[x][y];

        if (bp.val) {
          bp.node.style.background = 'black';
        } else {
          bp.node.style.background = 'white';
        }

        bp.val = false;
      }
    }
  }
}

class Game {
  constructor(width, height, size, fps) {
    this.width = width;
    this.height = height;
    this.size = size;
    this.fps = fps;
    this.$stage = document.querySelector('.stage');
    this.$score = document.querySelector('.score');
    this.score = 0;
    this.board = new Board(this);
    this.food = new Food(this);
    this.snake = new Snake(this, 5, 2, 3);

    // start game loop
    this.interval = setInterval(() => {
      this.update();
    }, 1000 / this.fps);
  }

  update() {
    this.$score.textContent = this.score;
    this.food.update();
    this.snake.update();

    if (this.snake.x === this.food.x && this.snake.y === this.food.y)  {
      this.food.placeFood();
      this.snake.addPart();
      ++this.score;
    }

    this.board.update();
  }
}

const game = new Game(25, 25, 25, 10);
