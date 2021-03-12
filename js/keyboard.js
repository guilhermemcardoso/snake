function Keyboard() {
  this.listenInput = function (event) {
    const LEFT_KEY = 37
    const RIGHT_KEY = 39
    const UP_KEY = 38
    const DOWN_KEY = 40
    const W_KEY = 87
    const A_KEY = 65
    const S_KEY = 83
    const D_KEY = 68
    const ESC_KEY = 27
    const ENTER_KEY = 13

    if (isReadingInput) return
    isReadingInput = true

    const keyPressed = event.keyCode

    const goingUp = dy === -snakePartSize
    const goingDown = dy === snakePartSize
    const goingRight = dx === snakePartSize
    const goingLeft = dx === -snakePartSize

    if (keyPressed === ENTER_KEY && menu.opened) {
      
      if (gameState === 'idle') gameState = 'running'
      menu.show(false)
    }

    if ((keyPressed === LEFT_KEY || keyPressed === A_KEY) && !goingRight) {
      dx = -snakePartSize
      dy = 0
    }

    if ((keyPressed === UP_KEY || keyPressed === W_KEY) && !goingDown) {
      dx = 0
      dy = -snakePartSize
    }

    if ((keyPressed === RIGHT_KEY || keyPressed === D_KEY) && !goingLeft) {
      dx = snakePartSize
      dy = 0
    }

    if ((keyPressed === DOWN_KEY || keyPressed === S_KEY) && !goingUp) {
      dx = 0
      dy = snakePartSize
    }
  }
}
