//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    left: '',
    bottom: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  onShow: function () {
    let _this = this;
    wx.startAccelerometer({
      success: (res) => {
        console.log(res)
        wx.onAccelerometerChange(res => {
          console.log('x', res.x)
        })
      }
    })
    // wx.onAccelerometerChange(function(res) {
    //   console.log('x',res.x)
    //   console.log('y',res.y)
    //   //y <0  bottom +
    //   let startX=0;
    //   let startY=-1;
    //   _this.setData({
    //     bottom:_this.data.bottom+100
    //   })
    // })

  }
})