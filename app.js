const canvas = document.getElementById('canvas');
const parent = document.getElementById("main");
canvas.width = parent.offsetWidth;
canvas.height = parent.offsetHeight;

let Game = function(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  const scale = 8;
  this.context.scale(scale, scale);
  this.height = canvas.height/scale;
  this.width = canvas.width/scale;
  this.ball = new Ball();
  this.player1 = new Player('Josh', 'RIGHT', this.width, this.height);
  this.player2 = new Player('Manel', 'LEFT', this.width, this.height);
  this.time = 90;
  this.hour = Date.now();
}

Game.prototype.resultat = function(context) {
  let player1 = game.player1.score;
  let player2 = game.player2.score;
  context.font = '5.5pt Calibri';
  context.fillStyle = 'white';
  context.fillText(`${player2}   ${player1}`,this.width/2 - 6, 6);
}

Game.prototype.line = function(context) {
  context.fillStyle = 'white';
  context.fillRect(this.width/2, 0, 0.4, this.height);
}

Game.prototype.clock = function(context) {
  if (this.time === 0) return;
  let actualTime = Date.now();
  if (actualTime >= this.hour + 1000) {
    this.time--;
    this.hour = Date.now();
    } 
  let min = Math.floor(this.time/60);
  let sec = ('0' + this.time % 60).slice(-2);
  context.font = '3.5pt Calibri';
  context.fillStyle = 'white';
  context.fillText(`${min}: ${sec}`, this.width/2 + 12, 5);
}

Game.prototype.congratulateWinner = function(context) {
  let winner;
  if (game.player1.score > game.player2.score) winner = `${game.player1.name} WINS!`;
  else if (game.player1.score < game.player2.score) winner = `${game.player2.name} WINS!`;
  else winner = 'Draw!';
  context.font = '5.5pt Calibri';
  context.fillStyle = 'white';
  context.fillText(`${winner}`,this.width/2 -14, this.height/2);
}

Game.prototype.checkCollision = function() {
  let ballX = game.ball.position[0];
  let ballY = game.ball.position[1];

  if ((ballY >= game.player1.position[1]) && 
     (ballY <= game.player1.position[1] + 13) &&
     (ballX >= game.player1.position[0] - 0.5)) {
       game.ball.velocity[0] = -game.ball.velocity[0];
       return;
  }

  if ((ballY >= game.player2.position[1]) && 
     (ballY <= game.player2.position[1] + 13) &&
     (ballX <= game.player2.position[0] + 3)) {
       game.ball.velocity[0] = -game.ball.velocity[0];
       return;
  }

}

Game.prototype.play = function() {
  let that = this;
  setInterval(function() {
    game.reset();
    game.ball.move(that.height, that.width);
    game.ball.render(that.context);
    game.clock(that.context);
    game.checkCollision();
    game.player1.render(that.context);
    game.player2.render(that.context);
    game.resultat(that.context);
    game.line(that.context);
  }, 20);
  setInterval(function() {
    that.ball.velocity[0] > 0 ? that.ball.velocity[0] += 0.02 : that.ball.velocity[0] -= 0.01;
    that.ball.velocity[1] > 0 ? that.ball.velocity[1] += 0.02 : that.ball.velocity[1] -= 0.01;
  }, 900);
}

Game.prototype.reset = function() {
  this.context.fillStyle = 'black';
  this.context.fillRect(0, 0, this.width, this.height);
}

let game = new Game(canvas)
game.play();

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 38) game.player1.move('up', game.height);
  if (event.keyCode === 40) game.player1.move('down', game.height);
  if (event.keyCode === 65) game.player2.move('up', game.height);
  if (event.keyCode === 90) game.player2.move('down', game.height);
});
