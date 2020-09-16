var form = layui.form;
var alertMsg = layui.layer;
$(function() {
   initUserInfo();
   // 自定义一个判断昵称合法性的表单校验规则
    form.verify({
        nickname: function(value) {
            if(value.trim().length > 6) {
                return '昵称的长度必须在1~6个字符之间！';
            }
        }
    })
    // 监听form表单的提交事件，更新用户信息
    $('.layui-form').on('submit',function(e) {
        e.preventDefault();
        var userinfo = form.val("UserInfoForm"); 
        console.log(userinfo);
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: userinfo,
            success: function(res) {
                if(res.status !== 0) {
                    return alertMsg.msg('修改用户信息失败！');
                }
                // console.log(res);
                alertMsg.msg('修改用户信息成功！');
                window.parent.getUserInfo();
            }
        })
    })
    // 监听重置按钮的点击事件，重置表单的数据
    $('.layui-btn-primary').on('click',function(e) {
        e.preventDefault();
        initUserInfo();
    })
})

//初始化用户的基本信息
function initUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if(res.status !== 0) {
                return alertMsg.msg('获取用户信息失败！');
            }
            // console.log(res);
            form.val('UserInfoForm', res.data);
        }
    })
}

