//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    isCancelAnimal: false,
    lists: [{
        color: '#426666',
        font: '写',
        fontsize: '30px sans-serif',
        radius: 50,
        translateX: 200,
        count: 1,
        position: {
          x: 100,
          y: 150,
          vx: 2,
          vy: 15
        }
      },
      {
        color: '#a98175',
        font: '代',
        fontsize: '30px sans-serif',
        radius: 25,
        count: 1,
        translateX: 280,
        position: {
          x: 200,
          y: 150,
          vx: 2,
          vy: 15
        }
      }
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  onLoad: function () {
    //可使用窗口宽度、高度，单位px
    this.systemWidth = wx.getSystemInfoSync().windowWidth
    this.systemHeight = wx.getSystemInfoSync().windowHeight
    // 通过 SelectorQuery 获取 Canvas 节点
    wx.createSelectorQuery()
      .select('#canvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this))
  },
  //初始化画布
  init(res) {
    console.log(res)
    const width = res[0].width
    const height = res[0].height
    const canvas = res[0].node
    const ctx = canvas.getContext('2d')
    console.log('ctx', ctx.font)
    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    const renderLoop = () => {
      this.render(canvas, ctx)
      canvas.requestAnimationFrame(renderLoop)
    }
    canvas.requestAnimationFrame(renderLoop)
  },
  render(canvas, ctx) {
    ctx.clearRect(0, 0, this.systemWidth, this.systemHeight)
    this.data.lists.forEach((item, index) => {
      this.drawBall(ctx, item, index)
    })

  },
  //绘制球球
  drawBall(ctx, config, index) {
    const {
      radius,
      color,
      font,
      position,
      count,
      translateX,
      fontsize
    } = config;
    const p = position
    p.y += p.vy
    //第一次下落  触底了  
    if (p.y >= this.systemHeight - radius && count === 1) {
      p.vy = -10
      this.data.lists[index].count = 2
      this.setData({
        lists: this.data.lists
      })
      console.log(this.data.lists)
    }
    //第一次回弹  距离顶部高度达到500  
    if (p.y <= this.systemHeight - 200 && count === 2) {
      p.vy = 8
      this.data.lists[index].count = 3
      this.setData({
        lists: this.data.lists
      })

    }
    // //第二次下落  
    if (p.y >= this.systemHeight - radius && count === 3) {
      p.vy = -5
      this.data.lists[index].count = 4
      this.setData({
        lists: this.data.lists
      })
    }
    //第二次回弹
    if (p.y < this.systemHeight - 80 && count === 4) {
      p.vy = 3
      this.data.lists[index].count = 5
      this.setData({
        lists: this.data.lists
      })
    }
    // //第三次下落  
    if (p.y >= this.systemHeight - radius && count === 5) {
      p.vy = 0
      p.x += p.vx
      if (p.x >= translateX) {
        p.vx = 0
      }
    }
    ctx.beginPath()
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.strokeText(font, p.x - 15, p.y + 13)
    ctx.strokeStyle = 'yellow'
    ctx.font = fontsize
  },

  onShow: function () {
  
  }



})