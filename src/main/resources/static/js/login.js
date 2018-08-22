
$(document).ready(function () {

    $('[data-toggle="popover"]').popover()
    $('#userName').on('input',  function () {
        $('#userName').attr('data-content','')
        $('#userName').popover('hide')
    })
    $('#password').on('input',  function () {
        $('#password').attr('data-content','')
        $('#password').popover('hide')
    })
})
/*
登录/
 */
function login() {
    var userName = $('#userName').val()
    if(!userName){
        $('#userName').attr('data-content','用户名不能为空！')
        $('#userName').popover('toggle')
        return
    }
    var password = $('#password').val()
    if(!password){
        $('#password').attr('data-content','密码不能为空！')
        $('#password').popover('toggle')
        return
    }
    var urlStr = ipPort + '/user/login?id=' + userName + '&password=' + password
    $.ajax({
        url: urlStr,
        type: 'post',
        success: function (obj) {
            if(obj.code == 0){
                var storage = window.localStorage
                storage.userName = obj.data.name
                storage.userID = obj.data.id
                document.location = 'personnelAnalysis.html'
            }else{
                alert(obj.message)
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}