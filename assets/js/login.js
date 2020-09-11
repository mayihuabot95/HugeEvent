$(function() {
    $('#reg_link').on('click', function() {
        $('.loginbox').hide();
        $('.regbox').show();
    })
    $('#login_link').on('click', function() {
            $('.loginbox').show();
            $('.regbox').hide();
        })
        // 从layUI中获取form对象
        var newForm = layui.form;
        var alertMsg = layui.layer;
        // 通过form.verify()方法自定义校验密码的规则——value：表单的值；item：表单的DOM对象
        newForm.verify({
            // 自定义一个校验输入的密码是否合法的规则
            pwdInput: [/^[\S]{6,12}$/, '密码必须为6到12位的数字，且不能有空格！'],
            // 自定义一个校验两次输入密码是否一致的规则
            pwdConfirm: function(value) {
                var pwd = $('.regbox [name=password]').val()
                if(pwd !== value) {
                    return '两次输入的密码不一致！';
                }
            },
            // 自定义一个校验输入的用户名是否合法的规则
            unameInput: function(value, item){
                if(/^\d{1,12}$/.test(value)){
                    return '用户名不能为纯数字!';
                }
                if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                    return '用户名不能有特殊字符';
                }
            }
        })
        
        $('#reg_form').on('submit', function(e) {
            e.preventDefault();
            var data = {
                username: $('#reg_form [name=username]').val(),
                password: $('#reg_form [name=password]').val()
            }
            $.ajax({
                url: '/api/reguser',
                type: 'POST',
                data,
                success: function(res) {
                    if(res.status !== 0) {
                       alertMsg.msg(res.message);
                       $('#reg_form').find('input').val('');
                       return;
                }
                    alertMsg.msg('注册成功，请登录！');
                    $('#login_link').click();
                    $('#reg_form').find('input').val('');
                }
            })
        })
        
        $('#login_form').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/api/login',
                type: 'POST',
                data: $(this).serialize(),
                success: function(res) {
                    if(res.status !== 0) {
                        alertMsg.msg('用户名或密码错误，请重试！');
                        $('#login_form').find('input').val('');
                        return;
                    } else {
                        alertMsg.msg('登录成功！');
                    }
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                    $('#login_form').find('input').val('');
                }
            })
        })
})