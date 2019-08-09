import { resolve } from "path";

// 场景生成
class Scene {
  // canvas画布
  canvas
  // 画布上下文
  context
  // 背景图
  bgArtOpts = {
    // 背景图连接
    src: '',
    startVelocity: 0,
    // 每1000ms移动位置
    moveVelocity: 42
  }
  bgVelocity = 0
  // 背景前进速度
  advanceVelocity
  // 背景图图片
  backgroundArtsit
  // spirits {Array} 场景内元素
  sprites = []
  // statics {Array} 场景内静态元素
  statics = []
  // 主循环记录(用于关闭主循环)
  stopMain
  // 初始化fps
  fps = 60
  // 上次绘画循环时间
  lastAnimationFrameTime = 0
  // 上次fps更新时间
  lastFpsUpdateTime = 0
  // 更新fps函数
  calculateFps(now) {
    this.fps = 1000 / (now - this.lastAnimationFrameTime)
    this.lastAnimationFrameTime = now
    if (now - this.lastFpsUpdateTime > 1000) {
      this.lastFpsUpdateTime = now
      // TODO refresh fps dom
   }
    // console.log(this.fps)
  }
  // 构造器
  constructor(opts = {}) {
    if (opts.bgArtOpts) {
      this.bgArtOpts = Object.assign({}, this.bgArtOpts, opts.bgArtOpts)
      this.advanceVelocity = this.bgArtOpts.advanceVelocity
    }
    if (!opts.canvasId) {
      return this.createCanvas(opts.el)
    }
    this.canvas = document.body.querySelector(`#${canvasId}`)
    this.context = this.canvas.getContext('2d')
  }
  // 创建Canvas
  createCanvas(el) {
    el = el || '#app'
    let canvasDom = document.createElement('canvas')
    // canvasDom.style.width = document.body.clientWidth + 'px'
    // canvasDom.style.height = document.body.clientHeight + 'px'
    canvasDom.setAttribute('width', 800)
    canvasDom.setAttribute('height', 400)
    this.canvas = document.body.querySelector(el).appendChild(canvasDom)
    this.context = this.canvas.getContext('2d')
  }
  // 初始化
  init() {
    let promises = []
    // 初始化背景图
    promises.push(this.initBackgroundArtist())
    // 初始化所有元素的图片
    // for (let i = 0, len = this.sprites.length; i < len; i++) {
    //   promises.push(this.sprites[i].initinitArtist())
    // }
    this.sprites.map((item) => {
      promises.push(item.initArtist())
    })
    console.log(promises)
    Promise.all(promises).then(() => {
      this.draw(window.performance.now())
    })
  }
  // 初始化背景图
  initBackgroundArtist() {
    this.backgroundArtsit = new Image()
    this.backgroundArtsit.src = this.bgArtOpts.src
    return new Promise((reslove, reject) => {
      this.backgroundArtsit.onload = () => {
        reslove()
      }
      this.backgroundArtsit.onerror = (err) => {
        reject(err)
      }
    })
  }
  // 绘画
  draw(now) {
    this.calculateFps(now)
    // 绘画背景
    this.setBackgroundOffset()
    this.drawBackground()
    // 绘画sprites类
    this.sprites.map((item) => {
      item.advance(now)
      item.draw(this.context)
    })
    this.statics.map((item) => {
      item.draw(this.context)
    })
    window.requestAnimationFrame((time) => this.draw(time))
  }
  // 背景位置
  backgroundOffset = 0
  // 背景动画
  drawBackground() {
    this.context.save()

    this.context.translate(-this.backgroundOffset, 0)
    this.context.drawImage(this.backgroundArtsit, 0, 0, this.backgroundArtsit.width, this.backgroundArtsit.height)
    this.context.drawImage(this.backgroundArtsit, this.backgroundArtsit.width, 0, this.backgroundArtsit.width + 1, this.backgroundArtsit.height)

    this.context.restore()
  }
  // 设置背景位置(位置变化来行程动画)
  setBackgroundOffset() {
    let advance = this.bgVelocity / this.fps
    let backgroundOffset = this.backgroundOffset
    backgroundOffset += advance
    backgroundOffset > 0 && backgroundOffset < this.backgroundArtsit.width
      ? this.backgroundOffset = backgroundOffset
      : this.backgroundOffset = 0
  }
  // 加入物体
  add(obj) {
    if (!obj) return
    // 注入场景
    obj._scene = this
    // 区别不同对象进行记录
    if (obj.constructor.name === 'Sprite') {
      return this.sprites.push(obj)
    }
    if (obj.constructor.name === 'Static') {
      return this.statics.push(obj)
    }
  }
  // 物体是否在场景内
  spriteInView() {}
  // 启动
  start() {
    this.init()
  }
  // 停止
  stop() {
    window.cancelAnimationFrame(this.stopMain)
  }
  // 重启处理
  restart() {}
}

export default Scene
