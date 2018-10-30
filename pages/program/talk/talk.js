var App = getApp();
var common = require('../../../utils/common.js');
// pages/program/talk/talk.js
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
    var that = this;
    var taoc_id = options.taoc_id;
    var product_id = options.product_id;
    if (taoc_id) {
      common.PostMain('product/talk', {
        taoc_id: taoc_id
      }, function(data) {
        console.log(data)
        that.setData({
          filepath: App.globalData.filepath,
          producttalk: data.producttalk,
          current: 1,
        });
      });
    } else {
      common.PostMain('product/talk', {
        product_id: product_id
      }, function(data) {
        console.log(data)
        that.setData({
          filepath: App.globalData.filepath,
          producttalk: data.producttalk,
          current: 1,
        });
      });
    }
  },
  onChangeShowState: function() {

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
  pinglun: function(e) {
    var that = this;
    console.log(e)
    var list_comment_id = e.currentTarget.dataset.listcommentid;
    var list_id = e.currentTarget.dataset.listid;
    var product_id = e.currentTarget.dataset.productid;
    var taoc_id = e.currentTarget.dataset.taocid;
    var list_comment_fid = e.currentTarget.dataset.fid;
    that.setData({
      listcommentid: list_comment_id,
      listid: list_id,
      productid: product_id,
      taocid: taoc_id,
      listcommentfid: list_comment_fid,
      current: 0,
    });
  },
  formSubmit: function(e) {
    console.log(e);
    var that = this;
    wx.request({
      url: App.globalData.apiurl + 'product/pinglun',
      method: "POST",
      data: {
        user_id: wx.getStorageSync('userinfo').user_id,
        list_comment_id: that.data.listcommentid,
        list_id: that.data.listid,
        product_id: that.data.productid,
        taoc_id: that.data.taocid,
        list_comment_fid: that.data.listcommentfid,
        list_comment_content: e.detail.value.content,
      },
      success: function(res) {
        wx.showToast({
          title: '评论成功',
          icon: 'success',
        })
      }
    });
    that.setData({
      current: 1,
    })
  },
  huifu: function(e) {
    var that = this;
    var listcommentfid = e.currentTarget.dataset.fid;
    var listcommentid = e.currentTarget.dataset.listcommentid;
    var listid = e.currentTarget.dataset.listid;
    var productid = e.currentTarget.dataset.productid;
    var taocid = e.currentTarget.dataset.taocid;
    that.setData({
      listcommentid: listcommentid,
      listid: listid,
      productid: productid,
      taocid: taocid,
      listcommentfid: listcommentfid,
      current: 0,
    });
  }
})