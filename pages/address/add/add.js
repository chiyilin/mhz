var common = require('../../../utils/common.js');
var checkForm = function(e) {
  // console.log(e)
  if (!e.name) {
    var tips = '请填写姓名！';
  } else if (!e.phone) {
    var tips = "请填写电话！";
  } else if (!e.addr) {
    var tips = '请填写地址！'
  } else if (!e.moreAddr) {
    var tips = "请填写详细地址！";
  }
  if (tips) {
    common.tips(tips);
    return false;
  } else {
    return 1;
  }
}
Page({
  data: {
    currentCity: ['北京市', '北京市', '朝阳区']
  },
  onLoad: function(options) {
    common.onLoad();
    var userInfo = wx.getStorageSync('userInfo');
    var that = this;
    // this.getLocation();
  },
  /**
   * 选择邮箱地址
   */
  changeMail: function(e) {
    var mailDefaultIndex = e.detail.value;
    this.setData({
      mailDefaultIndex: mailDefaultIndex,
      mailDefaultdesc: this.data.mailDeatilsList[mailDefaultIndex].mail_name + '-' + this.data.mailDeatilsList[mailDefaultIndex].mail_addr
    });
  },
  /**
   * 表单提交
   */
  submit: function(e) {
    var that = this;
    var input = e.detail.value;
    var userInfo = wx.getStorageSync('userInfo');
    //表单验证
    if (!checkForm(input)) {
      return null;
    }

    var data = {
      user_id: userInfo.user_id,
      address_name: input.name,
      address_phone: input.phone,
      sheng: input.addr[0],
      shi: input.addr[1],
      qu: input.addr[2],
      address_more_addr: input.moreAddr,
      address_default: input.default ? 2 : 1,
    };
    console.log(data)
    // CREATE TABLE`mhz_user_address`(
    //   `address_id` tinyint(4) NOT NULL AUTO_INCREMENT COMMENT '地址编号',
    //   `userid` int(11) DEFAULT NULL COMMENT '用户id',
    //   `sheng` char(20) DEFAULT NULL COMMENT '地址省',
    //   `shi` char(20) DEFAULT NULL COMMENT '地址市',
    //   `qu` char(20) DEFAULT NULL COMMENT '地址区',
    //   `addxiang` text COMMENT '区级下详细地址',
    //   PRIMARY KEY(`address_id`)
    // ) ENGINE = MyISAM AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8;
    common.PostMain('user/createAddr', data, function(e) {
      wx.showToast({
        title: '新增成功！',
        success: function() {
          setTimeout(function(e) {
            wx.navigateBack({
              delta: 1
            })
          }, 2000);
        }
      })
    })
  },
  /**
   * 获取城市信息
   */
  getLocation: function() {
    var page = this
    wx.getLocation({
      //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      type: 'wgs84',
      success: function(res) {
        // console.log(res.latitude);
        // console.log(res.longitude);
        // success  
        var longitude = res.longitude
        var latitude = res.latitude
        // page.loadCity(longitude, latitude);
        // page.tencentLoadCity(longitude, latitude);
      }
    })
  },
  /**
   * 腾讯地图
   */
  tencentLoadCity: function(longitude, latitude) {
    var that = this;
    common.PostMain('Invoice/location', {
      longitude: longitude,
      latitude: latitude
    }, function(e) {
      var addr = JSON.parse(e).result.ad_info.name;
      console.log(addr)
      var newAddr = addr.substr(3)
      var addrArr = newAddr.split(',');
      that.setData({
        newAddr: newAddr,
        currentCity: addrArr,
        moreAddr: JSON.parse(e).result.address
      });
    });
  },
  /**
   * 百度地图API
   * [偶尔会报错]
   */
  loadCity: function(longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=tBBrq19tbY61YOIxTNKWGGHERGKaD5x1&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // success  
        console.log(res.data);
        var city = res.data.result.addressComponent.city;
        page.setData({
          currentCity: city
        });
      },
      fail: function() {
        console.log('获取定位失败');
        page.setData({
          currentCity: "获取定位失败"
        });
      },

    })
  }
})