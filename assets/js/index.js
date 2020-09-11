var alertMsg = layui.layer;
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if(res.status === 1) {
                return alertMsg.msg('获取用户信息失败！');
            }
        }
    })
}

function renderAvatar(res) {
    // 获取用户名称
    var uname = res.nickname || res.username;
    var time = new Date();
    console.log(time);
    
}