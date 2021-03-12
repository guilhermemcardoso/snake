function Snake(context, size) {
  this.context = context
  this.size = size
  const headPosition = size * 15
  this.body = [
    { x: headPosition, y: headPosition },
    { x: headPosition - size * 1, y: headPosition },
    { x: headPosition - size * 2, y: headPosition },
    { x: headPosition - size * 3, y: headPosition },
    { x: headPosition - size * 4, y: headPosition }
  ]

  this.drawPart = function (snakePart, index) {
    const snakeColor = 'lightgreen'
    const snakeHeadColor = 'green'
    const snakeBorderColor = 'darkgreen'

    this.context.fillStyle = index > 0 ? snakeColor : snakeHeadColor
    this.context.strokestyle = snakeBorderColor
    this.context.fillRect(snakePart.x, snakePart.y, this.size, this.size)
    this.context.strokeRect(snakePart.x, snakePart.y, this.size, this.size)
  }

  this.draw = function () {
    this.body.forEach((snakePart, index) => this.drawPart(snakePart, index))
  }

  this.move = function () {
    let headX = this.body[0].x + dx
    let headY = this.body[0].y + dy

    // headX = headX < 0 ? snakeboard.width - this.size : headX
    // headX = headX > snakeboard.width - this.size ? 0 : headX

    // headY = headY < 0 ? snakeboard.height - this.size : headY
    // headY = headY > snakeboard.height - this.size ? 0 : headY

    const head = { x: headX, y: headY }

    this.body.unshift(head)
  }
}
