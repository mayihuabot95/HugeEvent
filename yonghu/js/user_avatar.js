$(function() {
// 1. 实现基本裁剪效果
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image');
var alertMsg = layui.layer;
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);
$('#btnChooseImage').on('click',function() {
    $('#file').click();
})

// 2. 为文件选择框绑定chang事件, 给裁剪区域设置新的图片路径
$('#file').on('change',function(e) {
// 2.1. 获取用户选择的文件
    var filelist = e.target.files;
    if(filelist.length === 0) {
        return alertMsg.msg('请选择照片！');
    }
    // 2.2.1. 拿到用户选择的文件
    var file = filelist[0];
    // 2.2.2. 将文件转化为路径
    var imgURL = URL.createObjectURL(file);
    // 2.2.3. 重新初始化裁剪区域
    $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgURL) // 重新设置图片路径
    .cropper(options) // 重新初始化裁剪区域
})

$('#btnUpload').on('click',function() {
    // 3. 将裁剪后的头像上传到服务器
    // 3.1. 创建一个Canvas画布 
    // 3.2. 将Canvas画布上的内容，转化为 `base64` 格式的字符串
    var imgURL = $image.cropper('getCroppedCanvas', {width: 100,height: 100}).toDataURL('image/png');
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: imgURL
        },
        success: function(res) {
            if(res.status !== 0) {
                return alertMsg.msg('更换头像失败！');
            }
            alertMsg.msg('更换头像成功！');
            window.parent.getUserInfo();
        }
    })
})
})