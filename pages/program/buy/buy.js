var App = getApp();
var common = require('../../../utils/common.js');
// pages/program/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    if(e.taocid){
      var taoc_id = e.taocid;
    }else{
      var product_id = e.productid;
    }
    var user_id = wx.getStorageSync('userinfo').user_id;
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    if(taoc_id){
      common.PostMain('product/details', {
        taoc_id: taoc_id,
        user_id: user_id
      }, function (data) {
        console.log(data)
        that.setData({
          product: data.product,
          dingynum: data.product.product_subscribe,
          productlistcomment: data.productlistcomment,
          usershouc: data.usershouc,
          userdingy: data.userdingy,
          filepath: getApp().globalData.filepath,
        });
        wx.hideLoading();
      });
    }else{
      common.PostMain('product/details', {
        product_id: product_id,
        user_id: user_id
      }, function (data) {
        console.log(data)
        that.setData({
          product: data.product,
          dingynum: data.product.product_subscribe,
          productlistcomment: data.productlistcomment,
          productlistcomments: data.productlistcomment,
          usershouc: data.usershouc,
          userdingy: data.userdingy,
          filepath: getApp().globalData.filepath,
        });
        wx.hideLoading();
      });
    }
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
  shouc: function(e) {
    var shouckey = e.currentTarget.dataset.usershouc;
    var product_id = e.currentTarget.dataset.productid;
    var user_id = wx.getStorageSync('userinfo').user_id;
    console.log(e)
    wx.request({
      url: App.globalData.apiurl + 'usershouc/index',
      method: "POST",
      data: {
        shouckey: shouckey,
        product_id: product_id,
        user_id: user_id,
      },
      success: function(res) {
        wx.showToast({
          title: '操作成功',
          icon: 'success',
        })
      },
    });
    if (shouckey == 1) {
      var shouc = 0
    } else {
      var shouc = 1
    }
    this.setData({
      usershouc: shouc,
    })
  },
  dingy: function(e) {
    console.log(e)
    var dingykey = e.currentTarget.dataset.userdingy;
    var product_id = e.currentTarget.dataset.productid;
    var user_id = wx.getStorageSync('userinfo').user_id;
    var dingynum = e.currentTarget.dataset.dingynum;
    wx.request({
      url: App.globalData.apiurl + 'userdingy/index',
      method: "POST",
      data: {
        dingykey: dingykey,
        product_id: product_id,
        user_id: user_id,
        dingynum: dingynum,
      },
      success: function(res) {
        wx.showToast({
          title: '操作成功',
          icon: 'success',
        })
      },
    });
    if (dingykey == 1) {
      var dingy = 0;
      var dingynum = Number(dingynum) - Number(1);
    } else {
      var dingy = 1;
      var dingynum = Number(dingynum) + Number(1);
    }
    this.setData({
      dingynum: dingynum,
      userdingy: dingy
    });
  },
  swichNav: function (e) {
    var that = this;
    var current = e.target.dataset.current;
    var product_id = e.currentTarget.dataset.productid;
    console.log(e)
    if (current == 1) {
      var product_id = product_id;
      common.PostMain('product/taoc', {
        product_id: product_id
      }, function(data) {
        console.log(data)
        that.setData({
          producttaoc: data.res,
          productlistcomment: data.ress
        })
      })
    }else{
      that.setData({
        productlistcomment: that.data.productlistcomments,
      })
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  toTalk: function (e) {
    var product_id = e.currentTarget.dataset.id;
    var taoc_id = e.currentTarget.dataset.taocid;
    if(e.currentTarget.dataset.current){
      wx.navigateTo({
        url: "../talk/talk?taoc_id=" + taoc_id,
      })
    }else{
      wx.navigateTo({
        url: "../talk/talk?product_id=" + product_id,
      })
    }
  },
  looktaoc: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "buy?productid=" + id,
    })
  },
  goumai: function(e){
    var current=e.currentTarget.dataset.current;
    var taoc_id=e.currentTarget.dataset.taocid;
    var product_id=e.currentTarget.dataset.id;
    var user_id = wx.getStorageSync('userinfo').user_id;
    if(current==1){
      wx.request({
        url: App.globalData.apiurl + 'product/goumai',
        method: "POST",
        data: {
          user_id: user_id,
          taoc_id: taoc_id,
        },
        success: function (res) {
          wx.showToast({
            title: '购买成功',
            icon: 'success',
          })
        }
      });
    }else{
      wx.request({
        url: App.globalData.apiurl + 'product/goumai',
        method: "POST",
        data: {
          user_id: user_id,
          product_id: product_id,
        },
        success: function (res) {
          wx.showToast({
            title: '购买成功',
            icon: 'success',
          })
        }
      });
    }
    
    // wx.navigateBack({
    //   delta: 1,
    // })
  }
})