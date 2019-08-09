import Obj from './obj.js'
// 静态物体 目前支持矩形
// TODO 支持其他形状及静态贴图物体
class Static extends Obj {
  static name = 'Static'
  // 静态物体类型
  type = 'rect'
  borderStrokeWidth = 0
  borderStrokeStyle = '#000000'
  fillStyle = '#FFFFFF'

  constructor(opts = {}) {
    super(opts)
    this.borderStrokeStyle = opts.borderStrokeStyle || this.borderStrokeStyle
    this.borderStrokeWidth = opts.borderStrokeWidth || this.borderStrokeWidth
    this.fillStyle = opts.fillStyle || this.fillStyle
  }

  draw(context) {
    context.save()

    context.fillStyle = this.fillStyle
    context.lineWidth = this.borderStrokeWidth
    context.strokeStyle = this.borderStrokeStyle
    context.strokeRect(this.position.left, this.position.top, this.style.width, this.style.height)
    context.fillRect(this.position.left, this.position.top, this.style.width, this.style.height)

    context.restore()
  }
}

export default Static
