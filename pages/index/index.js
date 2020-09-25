//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    lists: [{
        color: '#426666',
        font: '写',
        fontsize: '30px sans-serif',
        radius: 20,
        defaultPosition: {
          x: 100,
          y: 0,
          vx: 6,
          vy: 6
        }
      },
      {
        color: '#a98175',
        font: '代',
        fontsize: '25px sans-serif',
        radius: 25,
        defaultPosition: {
          x: 150,
          y: 0,
          vx: 6,
          vy: 6
        }
      },
      {
        color: '#75878a',
        font: '码',
        fontsize: '10px sans-serif',
        radius: 30,
        defaultPosition: {
          x: 50,
          y: 0,
          vx: 4,
          vy: 4
        }
      },
      {
        color: '#a78e44',
        font: '的',
        fontsize: '30px sans-serif',
        radius: 26,
        defaultPosition: {
          x: 250,
          y: 0,
          vx: 4,
          vy: 4
        }
      },
      {
        color: '#493131',
        font: '小',
        fontsize: '10px sans-serif',
        radius: 20,
        defaultPosition: {
          x: 350,
          y: 0,
          vx: 2,
          vy: 2
        }
      },
      {
        color: '#6b6882',
        font: '胖',
        fontsize: '30px sans-serif',
        radius: 30,
        defaultPosition: {
          x: 350,
          y: 0,
          vx: 2,
          vy: 2
        }
      },
      {
        color: '#808080',
        font: '墩',
        fontsize: '25px sans-serif',
        radius: 25,
        defaultPosition: {
          x: 380,
          y: 0,
          vx: 1,
          vy: 1
        }
      },
    ],
    height:''
    
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
    this.setData({
      height:this.systemHeight
    })
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
    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    let requestId;
    const renderLoop = (gravityX, gravityY ) => {
      this.render(canvas, ctx, gravityX, gravityY)
      requestId=canvas.requestAnimationFrame(renderLoop)
    }
   //监听手机速度计
    wx.onAccelerometerChange(({
      x,
      y,
      z
    }) => {
      canvas.cancelAnimationFrame(requestId)
      renderLoop(0, y)
     
    })
  },
  //渲染每个球
  render(canvas, ctx, gravityX, gravityY) {
    ctx.clearRect(0, 0, this.systemWidth, this.systemHeight)
    this.data.lists.forEach((item, index) => {
      this.drawBall(ctx, item, index, gravityX, gravityY)
    })
  },
  //绘制球球
  drawBall(ctx, config, index, gravityX, gravityY) {
    const {
      radius,
      color,
      font,
      defaultPosition: position,
      fontsize
    } = config;
    const p = position
    p.y += p.vy
    p.x += p.vx
    this.getTrack(p, radius, index, gravityX, gravityY)
    ctx.beginPath()
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.strokeText(font, p.x - radius/2, p.y + radius/2-5)
    ctx.strokeStyle = 'yellow'
    ctx.font = '20px sans-serif'
  },

  //判断下落轨迹 
  getTrack(p, radius, index, gravityX, gravityY) {
    
    if( 0 <= gravityY && gravityY < 1 ){
      if ( p.y <= radius ) {
        p.vy = 2
       
      }else{
        p.vy = -2
      }
      this.data.lists[index].defaultPosition.y = p.y
      this.data.lists[index].defaultPosition.vy = p.vy
      this.setData({
        lists: this.data.lists
      })
      
    }
    if(-1 <= gravityY && gravityY < 0){
      if (p.y >= this.systemHeight - radius) {
        p.vy = -1
      }else{
        p.vy = 1
      }
      this.data.lists[index].defaultPosition.y = p.y
      this.data.lists[index].defaultPosition.vy = p.vy
      this.setData({
        lists: this.data.lists
      })
    }

   
    
    // if(-1 <= gravityX && gravityX <= 0){
    //   // console.log(gravityX)

    //   if (p.x >= this.systemWidth - radius) {
    //     console.log(1111)
    //     p.vx = -2
    //   }else{
    //     // console.log(22222)
    //     p.vx = 2
    //   }
    //   this.data.lists[index].defaultPosition.x = p.x
    //   this.data.lists[index].defaultPosition.vx = p.vx
    //   this.setData({
    //     lists: this.data.lists
    //   })
    // }
   
    if (p.x >= this.systemWidth - radius || p.x <= radius) {
      p.vx = -p.vx
      this.data.lists[index].defaultPosition.x = p.x
      this.setData({
        lists: this.data.lists
      })
    }

  

  },


  //判断两个球球是否碰撞  两个圆心的距离是否大于 两个圆半径之和
  getCrash(circle1, circle2) {
    let {
      x1,
      y1,
      r1
    } = circle1;
    let {
      x2,
      y2,
      r2
    } = circle2;
    let distance = Math.sqrt(Math.pow(x1 - x2) + Math.pow(y1 - y2))
    if (distance <= r1 + r2) {
      //碰撞了
      this.setData({
        isCrash: true
      })
    }
    if (distance > r1 + r2) {
      //没有碰撞
      this.setData({
        isCrash: false
      })
    }

  },

  // 实现小圆自由落体运动
  fall(height, a = 98) {
    let time = Math.sqrt(2 * height / a)
    this.animate(time, y => {
      this.drawCircle(this.x, this.radius + y, this.radius)
    }, passedTime => 1 / 2 * a * Math.pow(passedTime, 2))
  },



  onShow: function () {

  }



})