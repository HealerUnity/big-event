$(function(){

    getuserinfo()

})

// 点击退出按钮实现退出功能
var layer = layui.layer

$('#btnLogOut').click(function(){
    layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index);
      });
})

// 获取用户基本信息
function getuserinfo(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function(res) { 
            if (res.status !== 0) { 
                return layui.layer.msg('获取用户信息失败！')
             }// 调用 renderAvatar 渲染用户的头像 
                renderAvatar(res.data) 
             }
        // complete: function(res){
           
        //     if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！'){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }   
            
    })

}


function renderAvatar(user){
    var name = user.nickname || user.username

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if(user.user_pic !==null){

        $('.layui-nav-img')
        .attr('src',user.user_pic)
        .show()
        $('.text-avatar').hide()

    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()

        $('.text-avtar')
        .html(first)
        .show()
    }

}