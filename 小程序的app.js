//app.js
App({
    data:{
        str:null
    },
    onLaunch: function (cb) {
        wx.login({
            success: function (res) {
                var code = res['code'];
                //2.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
                if (code) {
                    console.log('获取code成功！code:' + code);
                    wx.getUserInfo({
                        success: function (info) {
                            console.log('获得用户信息成功');
                            var encryptedData = info['encryptedData']; //注意是encryptedData不是encryptData
                            var iv = info['iv'];

                            wx.request({
                                //注意url一定是用https协议的
                                url: 'https请求地址',
                                data: {
                                    "code": code,
                                    'iv': iv,
                                    'encryptedData': encryptedData
                                },
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                method: 'POST',
                                success: function (res) {
                        
                                    console.log('发送成功');
                                    //写入缓存
                                        wx.setStorage({
                                            key: "userInfo",
                                            data: {
                                                userInfo: res['data']
                                            },
                                            success: function (res) {
                                                console.log('写入缓存成功！');
                                                console.log(res);
                                            },
                                            fail: function (res) {
                                                console.log('写入缓存失败！');
                                                console.log(res);
                                            }
                                        })

                                },
                                fail: function (res) {
                                    console.log('刷新session失败！');
                                    console.log(res)
                                }
                            });

                        },
                        fail: function (res) {
                            console.log('获取用户信息失败！' + res)
                        }
                    });
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    },
    globalData: {
        userInfo: null,
    },
  
})
