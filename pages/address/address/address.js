// pages/mail/mail.js
var common = require('../../../utils/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.onLoad(options)
  },
  /**
   * 编辑邮箱
   */
  edit: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/address/edit/edit?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 删除邮箱
   */
  del: function(e) {
    var that = this;
    wx.showModal({
      title: '确定？',
      content: '确定要删除此地址吗？',
      success: function(res) {
        if (res.confirm) {
          common.PostMain('user/delAddr', {
            id: e.currentTarget.dataset.id
          }, function(result) {
            wx.showToast({
              title: '已删除！',
              success: function(e) {
                setTimeout(function(e) {
                  that.onShow()
                }, 1500)
              }
            });
          });
        }
      }
    })
  },
  /**
   * 新增
   */
  creatAddr: function() {
    wx.navigateTo({
      url: '/pages/address/add/add',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  radioChange: function(e) {
    var that = this;
    console.log(e.detail.value.length)
    if (e.detail.value.length) {
      var address_id = e.currentTarget.dataset.id
    }
    var address_id = e.currentTarget.dataset.id
    common.PostMain('user/defaultAddr', {
      address_id: address_id,
      address_default: e.detail.value.length + 1,
    }, function(res) {
      wx.showToast({
        title: '操作成功！',
        success: function() {
          setTimeout(function() {
            that.onShow()
          }, 1500)
        }
      })
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showNavigationBarLoading();
    var that = this;
    common.PostMain('user/addrList', {
      user_id: wx.getStorageSync('userInfo').user_id
    }, function(e) {
      console.log(e)
      that.setData({
        data: e
      })
      wx.hideNavigationBarLoading();
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return common.share();
  }
})