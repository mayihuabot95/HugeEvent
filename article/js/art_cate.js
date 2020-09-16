var form = layui.form;
var alertMsg = layui.layer;
$(function() {
    var addCatePromptBox;
    $('#btn-addCate').on('click',function() {
        addCatePromptBox = alertMsg.open({
            title: '添加文章分类',
            type: 1, 
            area: ['500px', '250px'],
            content: $('#promptBox').html()
        })
    })
initArtCate();
    $('body').on('submit','#promptBoxForm',function(e) {
        console.log($(this).serialize());
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return alertMsg.msg('添加文章分类失败！');
                }
                initArtCate();
                alertMsg.msg('添加文章分类成功！');
                alertMsg.close(addCatePromptBox)
            }
        })
    })
})
function initArtCate() {
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            if(res.status !== 0) {
                return '获取文章列表失败！';
            }
            console.log(res);
            var tableStr = template('tpl-table', res);
            $('tbody').html(tableStr);
        }
    })
}
