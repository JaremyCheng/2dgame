import Obj from './obj'
class Sprite extends Obj {
  static name = 'Sprite'
  // 类型
  type = 'sprite'
  // 图片
  artist
  // 图片链接
  artistUrl
  // 当前单元idx
  cellIdx = 0
  // 单元
  cells = [
    // 数据范例
    {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }
  ]
  // 多动作动画 对应cells
  actions = {}
  // 刷新频率 velocity次/秒
  velocity = 4
  // 记录上次修改时间
  lastAdvanceTime = 0
  // 构造器
  constructor(opts = {}) {
    super(opts)
    this.artistUrl = opts.artistUrl || ''
    this.actions = opts.actions || {}
    for(let key in this.actions) {
      this[`set${key}`] = () => {
        this.cells = this.actions[key] || []
      }
    }
    if (opts.cells) {
      this.actions.default = opts.cells || []
      this.cells = opts.cells || []
    }
    this.cellIdx = opts.cellIdx || this.cellIdx
    this.velocity = opts.velocity || this.velocity
  }
  resetCells() {
    this.cells = this.actions.default
    this.cellIdx = 0
  }
  initArtist() {
    this.artist = new Image()
    this.artist.src = this.artistUrl
    return new Promise((reslove, reject) => {
      this.artist.onload = () => {
        reslove()
      }
      this.artist.onerror = (err) => {
        reject(err)
      }
    })
  }
  
  // 动画帧前进
  advance(time) {
    // 限制动画帧速度
    if (!(time - this.lastAdvanceTime >= 1000/this.velocity)) return
    this.lastAdvanceTime = time
    this.cellIdx ++
    this.cellIdx >= this.cells.length ? this.cellIdx = 0 : ''
  }

  // 绘画
  draw(context) {
    context.save()
    let cell = this.cells[this.cellIdx]
    context.drawImage(this.artist, cell.left, cell.top, cell.width, cell.height, this.position.left, this.position.top, cell.width, cell.height)
    context.restore()
  }
}

export default Sprite
