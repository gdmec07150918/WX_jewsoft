// pages/grid/grid.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid:1,
    loadsize: 0,
    gssize:20,
    allgoods: [],
    column: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadPage()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.gssize === this.data.loadsize) {
      this.setData({ pid: this.data.pid + 1 })
      this.loadPage()
    }
  },
  sortTypeChange: function(){
    this.setData({ column: !this.data.column})
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  loadPage: function () {
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: 'https://gs.jewsoft.com/ASHX/ItemServer.ashx?m=itemList1',
      method: "POST",
      data: {
        "cno": "", "pid": this.data.pid, "psize": this.data.gssize, "ord": 6, "txt": "", "prop": "",
        "it": "", "fgt": "", "xsk": "", "lpmin": "", "lpmax": "", "wpmin": "",
        "wpmax": "", "swmin": "", "swmax": "", "gwmin": "", "gwmax": "", "t": Math.round(Math.random() * 10000)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.ReturnID === 1) {
          var length = that.data.allgoods.length
          var gsarr = that.data.allgoods
          for (var i = 0; i < res.data.Items.length; i++) {
            gsarr[length + i] = res.data.Items[i]
          }
          that.setData({
            loadsize: res.data.Items.length,
            allgoods: gsarr
          })
        }
      },
      complete: function (){
        wx.hideLoading()
      }
    })
  }
})