var App = getApp();
var common = require('../../utils/common.js');
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
    console.log(options)
    common.onLoad(options);
    wx.hideShareMenu();
    var that = this;
    common.PostMain('prodlist/CommentInfo', {
      id: options.id,
    }, function(data) {
      console.log(data)
      that.setData({
        filepath: App.globalData.filepath,
        data: data,
      })
    });
  },
  /**
   * 选择图片
   */
  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        var oldTempFilePaths = that.data.tempFilePaths;
        var newTempFilePaths = oldTempFilePaths.concat(tempFilePaths);
        that.data.tempFilePaths = newTempFilePaths;
        that.setData({
          tempFilePaths: newTempFilePaths.splice(0, 9),
        })
      }
    })
  },

  /**
   * 删除图片
   */
  closeimg: function(res) {
    var index = res.currentTarget.dataset.index;
    var tempFilePaths = this.data.tempFilePaths
    tempFilePaths.splice(index, 1);
    console.log(this.data.tempFilePaths)
    this.setData({
      tempFilePaths: tempFilePaths
    })
  },
  /**
   * 预览已经上传的图片
   */
  previewImage: function(res) {
    var that = this;
    wx.previewImage({
      urls: that.data.tempFilePaths,
      current: that.data.tempFilePaths[res.currentTarget.dataset.index]
    })
  },
  /**
   * success
   */
  successTips: function() {
    wx.hideLoading();
    wx.showToast({
      title: '发布成功~',
      success: function() {
        setTimeout(function() {
          // wx.redirectTo({
          //   url: '/pages/User-Centre/Services-purchased/Services-purchased',
          // })
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    });
  },
  /**
   * 表单提交
   */
  bindFormSubmit: function(e) {
    var that = this;
    if (!e.detail.value.textarea) {
      common.tips('请填写评价哦~');
      return null;
    }
    var data = that.data.data;
    var param = {
      user_id: wx.getStorageSync('userInfo').user_id,
      list_comment_id: data.list_comment_id,
      list_id: data.list_id,
      product_id: data.product_id,
      taoc_id: data.taoc_id,
      list_comment_fid: data.list_comment_fid,
      list_comment_content: e.detail.value.textarea,
    };
    console.log(param);
    common.PostMain('product/pinglun', param, function(e) {
      wx.showToast({
        title: '评论成功',
        icon: 'success',
        success: function(e) {
          setTimeout(function() {
            wx.navigateBack({
              delta:-1
            })
          }, 1500);
        }
      })
    });
  },
})