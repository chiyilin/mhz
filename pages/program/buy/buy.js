// pages/program/buy/buy.js
var App = getApp();
var common = require('../../../utils/common.js');
var WxParse = require('../../../wxParse/wxParse.js');
/**
 * 单节公共的请求部分
 */
var request = function(that) {
  wx.showLoading({
    title: '加载中',
  });
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
    WxParse.emojisInit('[]', "/wxParse/emojis/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "11.gif",
      "12": "12.gif",
      "13": "13.gif",
      "14": "14.gif",
      "15": "15.gif",
      "16": "16.gif",
      "17": "17.gif",
      "18": "18.gif",
      "19": "19.gif",
    });
    WxParse.wxParse('details', 'html', data.product.product_introduce, that, 5);
    WxParse.wxParse('teacherInfo', 'html', data.product.teacher.teacher_introduce, that, 5);
    // data.product.product_introduce = JSON.parse(data.product.product_introduce)
    that.setData({
      product: data.product,
      dingynum: data.product.product_subscribe,
      productlistcomment: data.productlistcomment,
      usershouc: data.usershouc,
      userdingy: data.userdingy,
      isPay: data.isPay,
      show_money: data.show_money,
      experience_time: data.try_see_time * 60
    });
    that.data.videoBox = wx.createVideoContext('class-video');
    wx.hideLoading();
  });
}
/**
 * 加载判断单节还是套餐
 */
var onload = (that, current = 1) => {
  var showMode = current == 0;
  that.setData({
    taocanMoney: false,
    currentTab: current,
    isShow: showMode
  });
  var product_id = that.data.product_id;
  var taoc_id = that.data.taoc_id;
  if (current == 1) {
    common.PostMain('product/taoc', {
      taoc_id: taoc_id,
      product_id: product_id,
      user_id: wx.getStorageSync('userInfo').user_id
    }, function(data) {
      data.taocInfo.taoc_content = JSON.parse(data.taocInfo.taoc_content)
      console.log(data.taocInfo.taoc_content)
      that.setData({
        taocInfo: data.taocInfo,
        producttaoc: data.res,
        productlistcomment: data.ress,
        taocisPay: data.isPay,
      });

    })
  }
  request(that)

};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    currentTab: 0,
    user_id: wx.getStorageSync('userInfo').user_id,
    experience_time: 360,
    isEnd: false,
    filepath: getApp().globalData.filepath,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    common.onLoad(e);
    var that = this;
    if (e.taocid) {
      that.data.taoc_id = e.taocid;
      onload(that, 1);
    } else {
      that.data.product_id = e.productid;
      onload(that, 0);
    }
  },
  startvideo: function() {
    this.data.videoBox.play()
  },
  /**
   * 当开始/继续播放时触发play事件
   */
  bindplay: function(e) {
    var oldHistory = wx.getStorageSync('playerHistory') ? wx.getStorageSync('playerHistory') : [];
    oldHistory.push(this.data.product_id)
    wx.setStorageSync('playerHistory', oldHistory);
  },
  /**
   * 播放时间发生改变时触发
   */
  bindtimeupdate: function(e) {
    var that = this;
    if (that.data.isEnd) {
      return null;
    }
    if (that.data.isPay == false && e.detail.currentTime >= that.data.experience_time) {
      that.setData({
        isEnd: true
      })
      that.data.videoBox.stop();
      // return null;
      wx.showModal({
        title: '试看结束',
        content: '试看已经结束，如需继续观看请购买后继续观看。',
        cancelText: '返回',
        confirmText: '支付购买',
        success: function(res) {
          if (res.confirm) {
            that.payRequest(that);
          } else {
            wx.navigateBack({
              delta: -1
            })
          }
        },
      })

    }
    // wx.showLoading({
    //   title: '',
    // })
  },
  /**
   * 收藏/取消收藏
   */
  shouc: function(e) {
    wx.showNavigationBarLoading();
    var that = this;
    var dataset = e.currentTarget.dataset;
    common.PostMain('product/createshoucang', {
      shouckey: dataset.usershouc,
      product_id: dataset.productid,
      user_id: wx.getStorageSync('userInfo').user_id,
    }, function(e) {
      that.setData({
        usershouc: dataset.usershouc == 1 ? 0 : 1,
      });
      var title = dataset.usershouc == 1 ? '取消成功！' : '收藏成功！';
      wx.showToast({
        title: title,
        icon: 'none',
      });
      wx.hideNavigationBarLoading();
    });
  },
  /**
   * 订阅/取消订阅
   */
  dingy: function(e) {
    return;
    var that = this;
    var dataset = e.currentTarget.dataset;
    common.PostMain('product/createdingyue', {
      dingykey: dataset.userdingy,
      product_id: dataset.productid,
      user_id: wx.getStorageSync('userInfo').user_id,
    }, function(e) {
      var dingynum = that.data.product.product_subscribe
      if (dataset.userdingy == 1) {
        var dingy = 0;
        var dingynum = Number(dingynum);
      } else {
        var dingy = 1;
        var dingynum = Number(dingynum) + Number(1);
      }
      that.setData({
        dingynum: dingynum,
        userdingy: dingy
      });
    });
  },
  /**
   * 套餐/课程切换
   */
  swichNav: function(e) {
    var that = this;
    var current = e.target.dataset.current;
    onload(that, current);
  },
  /**
   * 更多评论
   */
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
  /**
   * 查看套餐内产品详情
   */
  looktaoc: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: "buy?productid=" + id,
    })
  },
  /**
   * 购买产品请求
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
          success: function(e) {
            wx.showToast({
              title: '购买成功！',
              icon: 'success',
              success: function() {
                setTimeout(function() {
                  // that.data.isPay = true;
                  // that.data.videoBox.play();
                  request(that);
                  // onload(that, that.data.currentTab);
                }, 500)
              }
            })
          },
          complete: function(e) {
            if (e.errMsg == "requestPayment:fail cancel") {
              that.setData({
                isEnd: false
              })
            }
            // request(that);
            // onload(that, that.data.currentTab);
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
    that.data.user_id = wx.getStorageSync('userInfo').user_id;
    that.payRequest(that);
    // wx.navigateBack({
    //   delta: 1,
    // })
  },
  /**
   * 返回首页
   */
  fanhui: function(e) {
    wx.switchTab({
      url: '/pages/index/index',
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
  onShow: function(e) {

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
  },
})