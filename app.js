//app.js
App({
  onLaunch: function () {
    // console.log('first')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    if (!wx.getStorageSync('userInfo')) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log(res.code)
          wx.request({
            url: getApp().globalData.apiurl + 'login/login',
            method: 'post',
            data: {
              code: res.code
            },
            success: function (data) {
              console.log(JSON.parse(data.data.data))
              getApp().globalData.openid = JSON.parse(data.data.data).openid;
              // console.log(getApp().globalData.openid)
              wx.request({
                url: getApp().globalData.apiurl + 'login/authcheck',
                data: {
                  openid: getApp().globalData.openid
                },
                success: function (data) {
                  // console.log(data.data.data)
                  if (data.data.code == 200) {
                    if (data.data.data.user_is_lock == 1) {
                      console.log('power')
                      wx.setStorageSync('userInfo', data.data.data);
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    } else {

                    }
                    // wx.redirectTo({
                    //   url: '/pages/Login/Login',
                    // })

                  }
                }
              })
            }
          });
        }
      })
    }
  },
  globalData: {
    apiurl: 'https://class.chdmhz.com/api/',
    filepath: 'https://class.chdmhz.com/',
    userInfo: null,
    openid: null,
  }
})