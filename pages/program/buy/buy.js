// pages/program/buy/buy.js
var App = getApp();
var common = require('../../../utils/common.js');
/**
 * 公共的请求部分
 */
var request = function(that) {
  var param = {
    user_id: that.data.user_id
  }
  if (that.data.taoc_id) {
    param.taoc_id = that.data.taoc_id
  } else {
    param.product_id = that.data.product_id
  }
  common.PostMain('product/details', param, function(data) {
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
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    currentTab: 0,
    user_id: wx.getStorageSync('userinfo').user_id,
    experience_time: 360,
    isEnd: false
  },
  /**
   * 分享按钮
   */
  share: function() {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中~',
    })
    var that = this;
    var data = {
      flag: true,
    };
    if (!that.data.shareImage) {
      common.PostMain('share/getwxacodeunlimit', {
        user_id: wx.getStorageInfoSync('userInfo').user_id
      }, function(e) {
        data['shareImage'] = e.resUrl
        that.setData(data)
      });
    } else {
      that.setData(data)
    }
    wx.hideNavigationBarLoading();
    wx.hideLoading();
  },
  // 遮罩层隐藏
  conceal: function() {
    this.setData({
      flag: false
    })
  },
  /**
   * 保存二维码
   */
  saveShareImage: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['保存至相册'],
      success: function(res) {
        wx.downloadFile({
          url: that.data.shareImage,
          success: function(res) {
            if (res.statusCode == 200) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function() {
                  wx.showToast({
                    title: '已保存到相册！',
                  })
                }
              })
            }
          }
        })
      }
    })
    return null;

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this;
    if (e.taocid) {
      that.data.taoc_id = e.taocid;
    } else {
      that.data.product_id = e.productid;
    }
    wx.showLoading({
      title: '加载中',
    });
    request(that)
  },
  /**
   * 播放时间发生改变时触发
   */
  bindtimeupdate: function(e) {
    console.log(e.detail.currentTime)
    var that = this;
    if (e.detail.currentTime >= that.data.experience_time) {
      wx.showModal({
        title: '试看结束',
        content: '试看6分钟已经结束，如需继续观看请购买后继续观看。',
      })
      that.setData({
        isEnd: true
      })
    }
    // wx.showLoading({
    //   title: '',
    // })
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
  swichNav: function(e) {
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
    } else {
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
  toTalk: function(e) {
    var product_id = e.currentTarget.dataset.id;
    var taoc_id = e.currentTarget.dataset.taocid;
    if (e.currentTarget.dataset.current) {
      wx.navigateTo({
        url: "../talk/talk?taoc_id=" + taoc_id,
      })
    } else {
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
  /**
   * 购买产品公告请求
   */
  payRequest: function(that) {
    var param = {
      user_id: that.data.user_id,
    };
    if (that.data.current == 1) {
      param.taoc_id = that.data.taoc_id
    } else {
      param.product_id = that.data.product_id
    }
    // console.log(param)
    // return null;
    wx.request({
      url: App.globalData.apiurl + 'product/goumai',
      method: "POST",
      data: param,
      success: function(result) {
        var res = result.data.data;
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonce_str,
          package: 'prepay_id=' + res.prepay_id,
          signType: 'MD5',
          paySign: res.sign,
          success: function() {
            console.log('支付成功！')
            wx.showToast({
              title: '购买成功',
              icon: 'success',
            })
          }
        })
      }
    });
  },
  /**
   * 购买产品、套餐
   */
  goumai: function(e) {
    var that = this;
    that.data.current = e.currentTarget.dataset.current;
    that.data.taoc_id = e.currentTarget.dataset.taocid;
    that.data.product_id = e.currentTarget.dataset.id;
    that.data.user_id = wx.getStorageSync('userinfo').user_id;
    that.payRequest(that);
    // wx.navigateBack({
    //   delta: 1,
    // })
  }
})