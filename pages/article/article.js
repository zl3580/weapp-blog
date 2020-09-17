// pages/article.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    title: '',
loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const _this = this
    let id=options.id
    //获取文章详情
    wx.request({
      url: 'https://zhouyanli.lxzyl.cn/api/article/details',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        _id: id
      },
      success(res) {
        let content=app.towxml(res.data.data.content,'markdown',{theme:'dark'});
        let title=res.data.data.title;
        _this.setData({
         content,
         title,
         loading:false
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})