// pages/home/home.js


const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleData: [],
    loading: true,
    loadingAgain: false,
    pageNum: 1,
    isAll: false
  },

  //查看文章详情
  handleContent: function (e) {
    console.log('点击成功')
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: `../article/article?id=${id}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    const _this = this
    //获取文章list
    wx.request({
      url: 'https://zhouyanli.lxzyl.cn/api/article/find',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        pageSize: 5,
        pageNum: 1
      },
      success(res) {
        console.log('success', res)
        let data = res.data.data.list.map(item => {
          return {
            content: app.towxml(item.content, 'markdown', {
              theme: 'dark',
            }),
            pageview: item.pageview,
            title: item.title,
            id: item._id
          }
        });
        _this.setData({
          articleData: data,
          loading: false
        })
      },
      fail(error) {
        console.log('请求失败', error)
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
    console.log('上拉触底')
    this.setData({
      loadingAgain: true,
      pageNum: this.data.pageNum + 1
    })
    const _this = this

    //获取文章list
    wx.request({
      url: 'https://zhouyanli.lxzyl.cn/api/article/find',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        pageSize: 5,
        pageNum: _this.data.pageNum
      },
      success(res) {
        let data = res.data.data.list.map(item => {
          return {
            content: app.towxml(item.content, 'markdown', {
              theme: 'dark',
            }),
            pageview: item.pageview,
            title: item.title,
            id: item._id
          }
        });
        _this.setData({
          articleData: _this.data.articleData.concat(data),
          loadingAgain: false
        })
        if (res.data.data.list.length === 0) {
          _this.setData({
            isAll: true
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})