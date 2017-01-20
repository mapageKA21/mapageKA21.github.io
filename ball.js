let Ball = function() {
  this.radius = 1;
  this.position = [5, 55];
  this.velocity = [1.4, 1.4];
}

Ball.prototype.render = function(context) {
  context.beginPath();
  context.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();
}

Ball.prototype.move = function(height, width) {
  if (game.time === 0) {
    this.velocity = [0, 0];
    game.congratulateWinner(game.context);
    return;
  }

  let newXpos = this.position[0] + this.velocity[0];
  if (newXpos > width - this.radius) {
    game.player2.score ++;
    this.velocity[0] = -this.velocity[0];
  }
  if (newXpos < this.radius) {
    game.player1.score ++;
    this.velocity[0] = -this.velocity[0];
  }
  this.position[0] = newXpos;

  let newYpos = this.position[1] + this.velocity[1];
  if (newYpos < this.radius ) {
    this.velocity[1] = -this.velocity[1];
  }
  if (newYpos > height - this.radius) {
    this.velocity[1] = -this.velocity[1];
  }
  this.position[1] = newYpos;
}
