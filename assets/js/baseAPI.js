$.ajaxPrefilter(function(e) {
    // 在发起Ajax请求前，统一拼接请求的根路径
    e.url = 'http://ajax.frontend.itheima.net' + e.url;
    // console.log(e.url);
    //统一为有权限的接口设置headers请求头
    if(e.url.indexOf('/my/') !== -1) {
        e.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete回调函数,优化权限控制
    e.complete = function(res) {
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})