var App = getApp();
var common = require('../../../utils/common.js');
// pages/mine/nopersonal/nopersonal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '朝阳区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.onLoad(options);

  },
  member: function() {
    wx.navigateTo({
      url: '/pages/memberCenter/memberCenter',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var user_id = wx.getStorageSync('userInfo').user_id;
    wx.showNavigationBarLoading();
    var that = this;
    common.PostMain('user/userinfo', {
      user_id: user_id
    }, function(data) {
      console.log(data)
      that.setData({
        userinfo: data,
        region: [data.useraddress.sheng, data.useraddress.shi, data.useraddress.qu],
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

  },
  addr: function() {
    wx.navigateTo({
      url: "../../address/address/address",
    })
  },
  renzheng: function(e) {
    var userid = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: "../authentication/authentication?userid=" + userid,
    })
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function(e) {
    var user_id = e.detail.value.hidden
    wx.request({
      url: App.globalData.apiurl + 'user/edit',
      method: "POST",
      data: {
        user_id: user_id,
        smrz_name: e.detail.value.smrz_name,
        user_sex: e.detail.value.user_sex,
        user_mobile: e.detail.value.user_mobile,
        sheng: e.detail.value.region['0'],
        shi: e.detail.value.region['1'],
        qu: e.detail.value.region['2'],
        addxiang: e.detail.value.addxiang
      },
      success: function(res) {
        wx.showToast({
          title: '修改成功',
          icon: 'success',
        })
      }
    });
    this.setData({
      smrz_name: e.detail.value.smrz_name,
      user_sex: e.detail.value.user_sex,
      user_mobile: e.detail.value.user_mobile,
      sheng: e.detail.value.region['0'],
      shi: e.detail.value.region['1'],
      qu: e.detail.value.region['2'],
      addxiang: e.detail.value.addxiang
    });
  },
})