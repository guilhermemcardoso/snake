let menu
let snakeboard
let snakePartSize
let gameVelocity
let boardBorderColor
let boardBackgroundColor
let snake
let food
let score
let isReadingInput
let dx
let dy
let interval
let gameState
let eatAudio
let loseGameAudio

initialConfig()
const snakeboardContext = snakeboard.getContext('2d')
eatAudio = new Audio('assets/eat_food.mp3')
loseGameAudio = new Audio('assets/lose_game.mp3')
initializeGame()

function initializeGame() {
  resetGame()
  runGame()

  const keyboard = new Keyboard()
  document.addEventListener('keydown', keyboard.listenInput)
}

function runGame() {
  interval = setInterval(function onTick() {
    if (menu.opened) return
    if (gameState === 'idle') gameState = 'running'
    if (hasGameEnded()) {
      finishGame()
      resetGame()
      menu.updateMenuType('finish')
      menu.show(true)
    }

    if (gameState === 'running') {
      isReadingInput = false
      clearBoard()
      food.draw()
      snake.move()
      const foodWasEaten = hasEatenFood()
      if (foodWasEaten) {
        increaseScore()
        food.generate(snake.body)
      } else {
        snake.body.pop()
      }

      snake.draw()
    }
  }, gameVelocity)
}

function resetGame() {
  clearBoard()
  document.getElementById('game-score').innerHTML = score
  score = 0
  document.getElementById('score-points').innerHTML = score
  snake = new Snake(snakeboardContext, snakePartSize)
  food = new Food(snakeboardContext, snakePartSize)
  food.generate(snake.body)
  gameState = 'idle'
  dx = snakePartSize
  dy = 0
  isReadingInput = false
}

function finishGame() {
    loseGameAudio.play()
  document.getElementById('game-score').innerHTML = score
}

function increaseScore() {
  score += 1
  document.getElementById('score-points').innerHTML = score
}

function hasEatenFood() {
  const hasEaten =
    snake.body[0].x === food.position.x && snake.body[0].y === food.position.y
  if (hasEaten) {
      eatAudio.load()
      eatAudio.play()
  }
  return hasEaten
}

function clearBoard() {
  snakeboardContext.fillStyle = boardBackgroundColor
  snakeboardContext.strokestyle = boardBorderColor
  snakeboardContext.fillRect(0, 0, snakeboard.width, snakeboard.height)
}

function hasGameEnded() {
  for (let i = 4; i < snake.body.length; i++) {
    const hasCollided =
      snake.body[i].x === snake.body[0].x && snake.body[i].y === snake.body[0].y
    if (hasCollided) return true
  }

  const hitLeftWall = snake.body[0].x < 0
  const hitRightWall = snake.body[0].x > snakeboard.width - snakePartSize
  const hitToptWall = snake.body[0].y < 0
  const hitBottomWall = snake.body[0].y > snakeboard.height - snakePartSize

  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function getCanvasSize() {
  const w = window.innerWidth
  const h = window.innerHeight

  const max = h > w ? w : h
  const value = parseInt(max) - (max % 100)
  let dimen = 0
  const maxSize = h > w ? value - 30 : value - 200
  while (dimen < maxSize) {
    dimen += 30
  }
  return dimen
}
