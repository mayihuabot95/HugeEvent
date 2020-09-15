// 一. 获取用户基本信息
var alertMsg = layui.layer;
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if(res.status === 1) {
                return alertMsg.msg('获取用户信息失败！');
            }
            renderAvatar(res.data);
        } 
    })
}
getUserInfo();
// 二. 渲染用户头像和名称
function renderAvatar(res) {
    // 获取用户名称
    var name = res.nickname || res.username;
    console.log(name);
    // 设置欢迎的文本
    var time = new Date(),
      h = time.getHours();
    if (h >= 12 && h < 18) {
        $('#welcome').html('下午好&nbsp;&nbsp;'+ name);
    } else if (h >= 6 && h < 12) {
        $('#welcome').html('早上好&nbsp;&nbsp;'+ name);
    } else {
        $('#welcome').html('晚上好&nbsp;&nbsp;'+ name);
    }
    // console.log(h);
    // 按需渲染用户的头像
    if(res.user_pic !== null) {
        $('.layui-nav-img').attr('src', res.user_pic).show();
        $('.text-avatar').hide();
    } else {
        var firstletter = name[0].toUpperCase();
        $('.text-avatar').html(firstletter).show();
        $('.layui-nav-img').hide();
    }
}

// 三. 实现退出功能
$('#btnLogout').on('click',function() {
    layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token');
        // 2. 重新跳转到登录页面
        location.href = '/login.html';
       // 关闭 confirm 询问框
        layer.close(index);
      })
    })
