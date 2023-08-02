const db = wx.cloud.database()
const app= getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    company: "",
    reach_address: "",
    remark: "",
    targart_address: "",
    deliver_address: "",
    fee: '',
  },


  /**
   * 获得地址
   */
  getPackLocation: function (type) {
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        _this.setData({
          reach_address : res.name + res.address
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
  getTargartLocation: function (type) {
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        _this.setData({
          targart_address : res.name + res.address
        })
      },
      complete(r){
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('user_info').where({
      _openid: app.globalData.openid
    }).get().then(res => {
      that.setData(
        {
          phone:res.data[0].phone,
          targart_address:res.data[0].address,
          deliver_address: res.data[0].address_detail,
        }
      )
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
  update_company: function (e) {
    this.setData({
      company: e.detail.detail.value
    })
  },
  update_phone: function (e) {
    this.setData({
      phone: e.detail.detail.value
    })
  },
  update_reach_address: function (e) {
    this.setData({
      reach_address: e.detail.detail.value
    })
  },
  update_remark: function (e) {
    this.setData({
      remark: e.detail.detail.value
    })
  },
  update_deliver_address: function (e) {
    this.setData({
      deliver_address: e.detail.detail.value
    })
  },
  update_fee: function (e) {
    this.setData({
      fee: e.detail.detail.value
    })
  },
  order_submit: function (e) {
    console.log(this.data)
    const that=this
    if (app.globalData.login == false) {
      wx.showModal({
        title: '未注册',
        content: '注册后才能创建任务',
        showCancel: false,
      })
      return
    }
    if ( this.data.company== "") {
      wx.showModal({
        title: '错误',
        content: '请填写快递公司',
        showCancel: false,
      })
      return
    }
    if ( that.data.reach_address== "") {
      wx.showModal({
        title: '错误',
        content: '请填写取件地址',
        showCancel: false,
      })
      return
    }
    const regex = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if (!regex.test(that.data.phone)) {
      wx.showModal({
        title: '错误',
        content: '请填写正确电话',
        showCancel: false,
      })
      return
    }
    if (that.data.targart_address == "") {
      wx.showModal({
        title: '错误',
        content: '请选择所在地区',
        showCancel: false,
      })
      return
    }
    if (that.data.deliver_address == "") {
      wx.showModal({
        title: '错误',
        content: '请填写送货地址',
        showCancel: false,
      })
      return
    }
    if (that.data.fee == "" ) {
      wx.showModal({
        title: '错误',
        content: '请填写跑腿小费',
        showCancel: false,
      })
      return
    }
    wx.showLoading({
      title: '请稍后',
      mask: 'true',
    })
    db.collection('order').add(
      {
        data: {
          product: that.data.company,
          reach_address: that.data.reach_address,
          address:that.data.deliver_address,
          address_detail:that.data.address_detail,
          fee: that.data.fee,
          phone: that.data.phone,
          remarks: that.data.remark,
          createtime: db.serverDate(),
          reserved_time: db.serverDate({
            offset: 60 * 60 * 1000 * 24,
          }),
          type:1,
          status: "0",
          complete: "0",
          form_id: e.detail.formId
        },
        success: function () {
          wx.hideLoading()
          wx.showModal({
            title: '下单成功',
            content: '您已成功下单，快递订单保留时间为一天，您也可以手动取消',
            showCancel: false,
            success: function () {
              wx.switchTab({
                url: '../order_list/order_list',
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