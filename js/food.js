function Food(context, size) {
  this.context = context
  this.size = size
  this.position = {}

  this.random = function (max) {
    const value = Math.round((Math.random() * (max - this.size)) / this.size) * this.size
    return value
  }

  this.generate = function (snake) {
    const { width, height } = document.getElementById('snakeboard')
    let foodX = this.random(width)
    let foodY = this.random(height)

    snake.forEach(part => {
      const hasEaten = part.x == foodX && part.y == foodY
      if (hasEaten) return this.generate(snake)
    })

    this.position = { x: foodX, y: foodY }
  }

  this.draw = function () {
    const foodColor = 'red'
    const foodBorderColor = 'darkred'

    this.context.fillStyle = foodColor
    this.context.strokestyle = foodBorderColor
    this.context.fillRect(this.position.x, this.position.y, this.size, this.size)
    this.context.strokeRect(this.position.x, this.position.y, this.size, this.size)
  }
}
