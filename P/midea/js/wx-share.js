/**
 * Created by jtun02 on 15/4/22.
 */

//http://api.jtuntech.com/event/2015/roewe/jssdk.php?act=config
$.getJSON('http://api.jtuntech.com/event/2015/roewe/jssdk.php?act=config', function(data){
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.AppId, // 必填，公众号的唯一标识
        timestamp: data.Stamp, // 必填，生成签名的时间戳
        nonceStr: data.NonceStr, // 必填，生成签名的随机串
        signature: data.Signature,// 必填，签名，见附录1
        jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage"
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
});

var WXREADY = false;

try {
    wx.ready(function() {
        wxShare();

        var te = document.createEvent('Event');
        te.initEvent('wxready', true, true);
        document.querySelector('body').dispatchEvent(te);
        WXREADY = true;
    });
} catch (e) {
    console.log('not wechat');
}



function wxShare(_title, _desc, _link, _img, callback) {

    var _share = {
        title: _title||'一笑倾“臣”怪我咯？',
        desc:_desc||'Apple Watch和超多电影票豪礼等你赢',
        link: _link || 'http://m.jtuntech.com/event/2015/Q3/watsons/index.html',
        imgUrl:_img||'http://m.jtuntech.com/event/2015/Q3/watsons/img/default-share.jpg',
        callback: callback || function(){}
    };


    shareTL(_share.desc, _share.link, _share.imgUrl, _share.callback);
    shareAM(_share.title, _share.desc, _share.link, _share.imgUrl, _share.callback);
}


function shareTL(title, link, url, callback) {

    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: url, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            if (callback) {
                callback();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

function shareAM(title, desc, link, url, callback) {

    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: url, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            if (callback) {
                callback();
            }
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}