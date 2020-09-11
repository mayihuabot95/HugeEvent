$.ajaxPrefilter(function(e) {
    e.url = 'http://ajax.frontend.itheima.net' + e.url;
    // console.log(e.url);
})