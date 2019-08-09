import '@/common/styles/reset.css'
import Scene from './core/scene'
import Sprite from './core/sprite'
import Static from './core/static'

// 蝙蝠参数
let BAT_CELLS_HEIGHT = 34
let BAT_CELLS = [
  { left: 1,   top: 0, width: 32, height: BAT_CELLS_HEIGHT },
  { left: 38,  top: 0, width: 46, height: BAT_CELLS_HEIGHT },
  { left: 90,  top: 0, width: 32, height: BAT_CELLS_HEIGHT },
  { left: 129, top: 0, width: 46, height: BAT_CELLS_HEIGHT },
]
// 人物参数
let RUNNER_CELLS_HEIGHT = 60
let RUNNER_RIGHT = [
  { left: 414, top: 375, width: 47, height: RUNNER_CELLS_HEIGHT },
  { left: 362, top: 375, width: 44, height: RUNNER_CELLS_HEIGHT },
  { left: 314, top: 375, width: 39, height: RUNNER_CELLS_HEIGHT },
  { left: 265, top: 375, width: 46, height: RUNNER_CELLS_HEIGHT },
  { left: 205, top: 375, width: 49, height: RUNNER_CELLS_HEIGHT },
  { left: 150, top: 375, width: 46, height: RUNNER_CELLS_HEIGHT },
  { left: 96,  top: 375, width: 42, height: RUNNER_CELLS_HEIGHT },
  { left: 45,  top: 375, width: 35, height: RUNNER_CELLS_HEIGHT },
  { left: 0,   top: 375, width: 35, height: RUNNER_CELLS_HEIGHT }
]
let RUNNER_LEFT = [
  { left: 0,   top: 295, width: 47, height: RUNNER_CELLS_HEIGHT },
  { left: 55,  top: 295, width: 44, height: RUNNER_CELLS_HEIGHT },
  { left: 107, top: 295, width: 39, height: RUNNER_CELLS_HEIGHT },
  { left: 152, top: 295, width: 46, height: RUNNER_CELLS_HEIGHT },
  { left: 208, top: 295, width: 49, height: RUNNER_CELLS_HEIGHT },
  { left: 265, top: 295, width: 46, height: RUNNER_CELLS_HEIGHT },
  { left: 320, top: 295, width: 42, height: RUNNER_CELLS_HEIGHT },
  { left: 380, top: 295, width: 35, height: RUNNER_CELLS_HEIGHT },
  { left: 425, top: 295, width: 35, height: RUNNER_CELLS_HEIGHT }
]
let Game = new Scene({
  bgArtOpts: {
    src: require('@/assets/background.jpg')
  }
})

let runner = new Sprite({
  position: {
    left: 10,
    top: 300
  },
  velocity: 10,
  artistUrl: require('@/assets/spritesheet.png'),
  cells: RUNNER_RIGHT,
  actions: {
    left: RUNNER_LEFT,
    right: RUNNER_RIGHT
  }
})

let bat = new Sprite({
  position: {
    left: 10,
    top: 10
  },
  artistUrl: require('@/assets/spritesheet.png'),
  cells: BAT_CELLS
})
let platform = new Static({
  position: {
    left: 10,
    top: 360,
  },
  style: {
    width: 300,
    height: 10
  },
  borderStrokeStyle: 'black',
  borderStrokeWidth: 1,
  fillStyle: 'white'
})

Game.add(platform)
Game.add(bat)
Game.add(runner)
Game.start()
// window.Game = Game
window.bat = bat