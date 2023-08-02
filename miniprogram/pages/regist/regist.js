// miniprogram/pages/regist/regist.js
const db = wx.cloud.database()
var image_path = ""
var image_base64
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAddr : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 获得地址
   */
  getLocation: function (type) {
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        _this.setData({
          defaultAddr : res.name + res.address
        })
      },
      cancel: function() {
      },
      fail: function () {
        
      },
      complete(r){
      }
    })
  },

  /**
   * 注册 
   */
  regist: function (e) {
    if (e.detail.value.name == "") {
      wx.showModal({
        title: '错误',
        content: '请输入姓名',
        showCancel: false,
      })
      return
    }
    const regex = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    console.log(this.data)
    if (!regex.test(e.detail.value.phone)) {
      wx.showModal({
        title: '错误',
        content: '请填写正确的手机号',
        showCancel: false,
      })
      return
    }
    if (e.detail.value.address == "") {
      wx.showModal({
        title: '错误',
        content: '请填写默认地址',
        showCancel: false,
      })
      return
    }
    if (e.detail.value.address_detail == "") {
      wx.showModal({
        title: '错误',
        content: '请填写详细位置',
        showCancel: false,
      })
      return
    }
    wx.showLoading({
      title: '请稍后',
      mask: 'ture',
    })
    var that = this
    db.collection('user_info').add(
      {
        data: {
          name: e.detail.value.name,
          phone: e.detail.value.phone,
          address: e.detail.value.address,
          address_detail: e.detail.value.address_detail,
          createtime: db.serverDate(),
          ban_time: db.serverDate({
            offset: -60 * 60 * 1000
          }),
        },
        success: function () {
          wx.hideLoading()
          wx.showModal({
            title: '成功',
            content: '注册成功！欢迎使用趴活',
            showCancel: false,
            success: function () {
              wx.switchTab({
                url: '../index/index',
              })
            },
          })
        }
      }
    )
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
