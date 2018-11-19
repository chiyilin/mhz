// https://blog.csdn.net/yqxllwy/article/details/79112390
var app = getApp();
// 成功
function showSuccess(message) {
  wx.showToast({
    title: message,
    duration: 2000,
    image: "/images/Common/Success.png",
  })
}
// 错误      
function showError(message) {
  wx.showToast({
    title: message,
    duration: 2000,
    image: "/images/Common/Error.png",
  })
}
// 警告   
function showWarn(message) {
  wx.showToast({
    title: message,
    duration: 2000,
    image: "/images/Common/Warn.png",
  })
}
// 第一个是路由，第二个则是判断是否是tabbar的路由，跳这两个路由是不一致的
function completeOperating(to, isTabbar) {
  var time = setTimeout(function() {
    if (isTabbar === true) {
      wx.switchTab({
        url: to
      })
    } else {
      wx.navigateTo({
        url: to
      })
    }
    clearTimeout(time);
  }, 2000)
}
//POST请求
function Post(api, params, callback) {
  if (!module.exports.globalData.apiurl) {
    wx.getExtConfig({
      success: function(res) {
        module.exports.globalData = res.extConfig;
        PostMain(api, params, callback);
      }
    })
  } else {
    PostMain(api, params, callback);
  }
}

function PostMain(api, params, callback) {
  var apiurl = app.globalData.apiurl + api;
  wx.request({
    url: apiurl,
    data: params,
    method: 'POST',
    dataType: 'json',
    success: function(data) {
      //wx.hideLoading();
      switch (data.data.code) {
        case 100:
          break;
        case 101:
          break;
        case 200:
          callback(data.data.data);
          break
        default:
          wx.showToast({
            title: data.data.msg,
            icon: 'none',
          });
          break;
      }
    },
    fail: function(data) {
      wx.hideLoading();
      wx.showToast({
        title: '请求接口超时',
      })
    }
  })
}

function updateUserInfo() {
  var userInfo = wx.getStorageSync('userInfo');
  if (userInfo) {
    PostMain('user/userinfo', {
      user_id: userInfo.user_id
    }, function(data) {
      // console.log(data)
      wx.setStorageSync('userInfo', data);

    });
  }
  var userInfo = wx.getStorageSync('userInfo');
  if (userInfo.user_is_lock == 2) {
    return true;
  } else {
    wx.switchTab({
      url: '/pages/index/index',
    })

  }

}

function showToast(tips) {
  wx.showToast({
    title: tips,
    image: '/imgs/close2.png',
  })
}

function tips(message) {
  wx.showToast({
    title: message,
    icon: 'none',
  })
}
/**
 * 邀请携带额外的参数
 */
function share() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  var options = currentPage.options //如果要获取url中所带的参数可以查看options
  var param = '';
  for (var key in options) {
    param += '&' + key + '=' + options[key]
  }
  var path = '/' + url + "?scene=" + wx.getStorageSync('userInfo').user_id + param;
  return {
    // title: '弹出分享时显示的分享标题',
    // desc: '分享页面的内容',
    // 路径，传递参数到指定页面。
    path: path
  }
}
module.exports = {
  completeOperating: completeOperating,
  showWarn: showWarn,
  showError: showError,
  showSuccess,
  showSuccess,
  PostMain: PostMain,
  Post: Post,
  updateUserInfo: updateUserInfo,
  showToast: showToast,
  tips: tips,
  share: share,
}