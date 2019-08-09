### 2D游戏

#### 主要知识

- Canvas及context

```javascript
   createCanvas(el) {
    el = el || '#app'
    let canvasDom = document.createElement('canvas')
    canvasDom.setAttribute('width', 800)
    canvasDom.setAttribute('height', 400)
    this.canvas = document.body.querySelector(el).appendChild(canvasDom)
    this.context = this.canvas.getContext('2d')
  }
```

- drawImage

```javascript
  var ctx = canvas.getContext('2d')
  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```
- image
> 图片源(如: CSSImageValue，HTMLImageElement，SVGImageElement，HTMLVideoElement，HTMLCanvasElement，ImageBitmap, OffscreenCanvas)

- sx
> 绘制图片的左上角x坐标轴

- sy
> 绘制图片的左上角y坐标轴

- sWidth
> 绘画图片宽度, 不足图片原宽度时会进行裁切

- sHeight
> 绘画图片高度, 不足图片原宽度时会进行裁切

- dx
> 绘制图片中, 左上角位置的x坐标轴

- dy
> 绘制图片中, 左上角位置的y坐标轴

- dWidth
> 绘画图片在canvas上的宽度, 超过或小于图片宽度时对图片进行缩放

- dHeight
> 绘画图片在canvas上的高度, 超过或小于图片高度时对图片进行缩放

#### 几大模块

1. 主循环

- requestAnimationFrame

2. 场景

- 处理背景, 背景贴图, 背景移动速度等
- 增加物体
- 判断物体渲染与否

3. 物体

- 记录大小,位置等
- 静态物体或带贴图物体
- 播放贴图动画
- 控制物体移动速度

4. 操作

- 控制背景移动
- 控制物体移动, 触发物体贴图动画

5. 体积碰撞

- 判断物体之间是否有碰撞及碰撞交互回调