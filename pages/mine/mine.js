var App = getApp();
var common = require('../../utils/common.js');
// pages/mine/mine.js
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  myhome: function() {
    wx.navigateTo({
      url: "MyHomework/MyHomework",
    })
  },
  mypro: function() {
    wx.navigateTo({
      url: "MySubject/MySubject",
    })
  },
  mycl: function() {
    var user_id = wx.getStorageSync('userInfo').user_id
    wx.navigateTo({
      url: "MyCollection/MyCollection?user_id=" + user_id,
    })
  },
  history: function() {
    wx.navigateTo({
      url: "history/history",
    })
  },
  center: function() {
    wx.navigateTo({
      url: "../PromotionCenter/PromotionCenter",
    })
  },
  dizi: function(e) {
    var user_id = e.currentTarget.dataset.userid;
    var usersmrz = e.currentTarget.dataset.usersmrz;
    if (usersmrz == 0) {
      wx.navigateTo({
        url: "privilege/privilege?user_id=" + user_id,
      })
    } else {
      wx.request({
        url: App.globalData.apiurl + 'user/userInfo',
        method: "POST",
        data: {
          user_id: user_id,
        },
        success: function(res) {
          console.log(res)
          var smrzstate = res.data.data.usersmrz.smrz_state;
          var dizibstate = res.data.data.usersmrz.dizib_state;
          if (smrzstate == 1) {
            wx.navigateTo({
              url: "privilege/privilege?user_id=" + user_id,
            })
          } else {
            if (dizibstate == 1) {
              wx.navigateTo({
                url: "privilege/privilege?user_id=" + user_id,
              })
            } else {
              wx.navigateTo({
                url: "DiscipleClass/DiscipleClass?user_id=" + user_id,
              })
            }
          }
        },
      });
    }
  },
  message: function() {
    wx.navigateTo({
      url: "MyMessage/MyMessage",
    })
  },
  Registration: function() {
    var user_id = wx.getStorageSync('userInfo').user_id;
    wx.navigateTo({
      url: "Registration/Registration?user_id=" + user_id,
    })
  },
  person: function(e) {
    var userid = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: "nopersonal/nopersonal?userid=" + userid,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   * 每次点击我的按钮拉去最新的用户状态，存至小程序缓存中
   */
  onShow: function() {
    var user_id = wx.getStorageSync('userInfo').user_id;
    wx.showNavigationBarLoading();
    var that = this;
    common.PostMain('user/userInfo', {
      user_id: user_id
    }, function(data) {
      console.log(data)
      wx.setStorageSync('userInfo', data);
      that.setData({
        userinfo: data,
      });
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

  }
})