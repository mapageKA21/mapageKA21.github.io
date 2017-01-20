let Player = function(name, position, width, height) {
  this.name = name;
  this.position = position === 'LEFT' ? [2, 2] : [width - 4.5, height - 15];
  this.width = 2.5;
  this.height = 13;
  this.score = 0;
}

Player.prototype.render = function(context) {
  context.fillStyle = 'white';
  context.fillRect(this.position[0], this.position[1], this.width, this.height);
}

Player.prototype.move = function(direction, height) {
    if (direction === 'up') {
      if (this.position[1] <= 1) return;
      this.position[1] = this.position[1] - 2.5;
    }
    if (direction === 'down') {
      if (this.position[1] > height - 13.5) return;
      this.position[1] = this.position[1] + 2.5;
    }
  }
  