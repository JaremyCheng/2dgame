// 基类: 物体
class Obj {
  type = 'Obj'
  // 是否显示(关乎是否需要渲染和更新)
  isVisable
  // 物体位置
  position = {
    left: 0,
    top: 0
  }
  style = {
    // 宽度
    width: 0,
    // 高度
    height: 0,
    // 描边颜色
    borderColor: 'transparent',
    // 描绘颜色
    color: 'transparent'
  }
  // 构造器
  constructor(opts = {}) {
    if (opts.position) {
      this.position = Object.assign({}, this.position, opts.position)
    }
    if (opts.style) {
      this.style = Object.assign({}, this.style, opts.style)
    }
  }
}

export default Obj
