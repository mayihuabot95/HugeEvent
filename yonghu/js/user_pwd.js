$(function() {
var form = layui.form;
var alertMsg = layui.layer; 
//利用 `form.verify()`  来定义规则
form.verify({
// - 长度必须是6到12位
    password: [/^[\S]{6,12}$/, '密码必须为6~12位的字符，且不能出现空格！'],
// - 不能与旧密码一致
    samePwd: function(value) {
        if(value === $('[name=oldPwd]').val()) {
            return '新旧密码不能相同！';
        }
    },
// - 两次密码是否相同
    confirmPwd: function(value) {
        if(value !== $('[name=newPwd]').val()) {
            return '两次所输入的密码不一致！';
        }
    }
}) 
// 发起提交表单的请求，实现修改密码的功能
$('.layui-form').on('submit',function(e) {
    // console.log($('.layui-form').serialize());
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function(res) {
            if(res.status !== 0) {
                return alertMsg.msg('修改密码失败！');
            }
            alertMsg.msg('修改密码成功！');
            $('.layui-form')[0].reset();
        }
    })
})
})