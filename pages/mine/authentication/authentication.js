var App = getApp();
var common = require('../../../utils/common.js');
// pages/mine/authentication/authentication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var user_id = options.userid;
    this.setData({
      user_id: user_id,
    });
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
  chooseImage: function(e) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // console.log(res.tempFilePaths)
        that.data.tempFilePaths.push(res.tempFilePaths[0])
        that.setData({
          tempFilePaths: that.data.tempFilePaths
        })
      }
    })
  },

  previewImage: function(res) {
    var that = this;
    wx.previewImage({
      urls: that.data.tempFilePaths,
      current: that.data.tempFilePaths[res.currentTarget.dataset.index]
    })
  },

  /**
   * 实名认证
   */
  formSubmit: function(e) {
    var that = this;
    console.log(e)
    var user_id = e.detail.value.hidden;
    var smrz_name = e.detail.value.smrz_name;
    var smrz_code = e.detail.value.smrz_code;
    var tempFilePaths = that.data.tempFilePaths
    // return null;
    if (smrz_name.length == 0 || smrz_code.length == 0 || tempFilePaths.length != 2) {
      wx.showToast({
        title: '请填写完整！',
        icon: 'none'
      })
    }
    for (var i = 0; i < tempFilePaths.length; i++) {
      console.log('正在上传第' + i + '张');
      console.log(tempFilePaths[i])
      wx.uploadFile({
        url: App.globalData.apiurl + 'usersmrz/imgupload',
        filePath: tempFilePaths[i],
        name: 'image',
        formData: {
          user_id: user_id,
          smrz_name: smrz_name,
          smrz_code: smrz_code
        },
        success: function(res) {
          wx.showToast({
            title: '已提交，等待审核！',
            icon: 'success',
          })
        }
      })
    }
    wx.navigateTo({
      url: "../nopersonal/nopersonal?userid=" + user_id,
    })
  },

})