var App = getApp();
var common = require('../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //星星数量
    star: 0,
    //
    tempFilePaths: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    common.PostMain('prodlist/pingjiafb', {   //prodlist/productListDetails
      list_id: options.list_id,
    }, function(data) {
      console.log(data)
      that.setData({
        filepath: App.globalData.filepath,
        pingjia: data,
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
    })
  },
  /**
   * 表单提交
   */
  bindFormSubmit: function (e) {
    var that = this;
    if (!e.detail.value.textarea) {
      common.tips('请填写评价哦~');
      return null;
    }
    var user_id = wx.getStorageSync('userinfo').user_id;
    var pingjia = this.data.pingjia;
    var data = {
      product_id: pingjia.product_id,
      taoc_id: pingjia.taoc_id,
      list_id: pingjia.list_id,
      user_id: user_id,
      list_comment_content: e.detail.value.textarea,
    };
    common.PostMain('ProdListComment/addcomment', data, function(res) {
      var uploadfiledone = [];
      var tempFilePaths = that.data.tempFilePaths;
      if (tempFilePaths) {
        //循环上传图片
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (tempFilePaths[i]) {
            var uploadFile = wx.uploadFile({
              url: App.globalData.apiurl + 'ProdListComment/imgupload',
              filePath: tempFilePaths[i],
              name: 'image',
              formData: {
                'list_comment_id': res.list_comment_id,
                'user_id': res.user_id,
              },
              success(res) {
                const data = res.data
                //do something
              }
            });
            uploadFile.onProgressUpdate((res) => {
              console.log('上传进度', res.progress)
              wx.showLoading({
                title: res.progress + '%',
              });
              if (res.progress == 100) {
                uploadfiledone.push(1);
                if (uploadfiledone.length == tempFilePaths.length) {
                  that.successTips();
                }
              }
            })
          }
        }
      } else {
        that.successTips();
      }
    });
  },
})