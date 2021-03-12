function initialConfig() {
  snakeboard = document.getElementById('snakeboard')
  
  gameVelocity = 100
  boardBackgroundColor = '#41424A'
  
  const canvasSize = getCanvasSize()
  snakePartSize = Math.floor(canvasSize / 30)
  menu = new Menu(document.getElementById('menu'), canvasSize)
  snakeboard.width = canvasSize
  snakeboard.height = canvasSize
}

function Menu(element, size) {

  this.element = element
  this.element.style.width = size + 'px'
  this.element.style.height = size + 'px'
  this.element.style.top = '2px'
  this.opened = true

  document.getElementById('init').setAttribute('style', 'display:flex')

  this.show = function(show) {
    
    this.element.setAttribute('style', 'display:' + (show ? 'flex' : 'none'))
    this.opened = show
  }

  this.updateMenuType = function(type) {
    if(type === 'init') {
        document.getElementById('init').setAttribute('style', 'display:flex')
        document.getElementById('paused').setAttribute('style', 'display:none')
        document.getElementById('finish').setAttribute('style', 'display:none')
    }

    if(type === 'paused') {
        document.getElementById('init').setAttribute('style', 'display:none')
        document.getElementById('paused').setAttribute('style', 'display:flex')
        document.getElementById('finish').setAttribute('style', 'display:none')
    }

    if(type === 'finish') {
        document.getElementById('init').setAttribute('style', 'display:none')
        document.getElementById('paused').setAttribute('style', 'display:none')
        document.getElementById('finish').setAttribute('style', 'display:flex')
    }
  }
}
