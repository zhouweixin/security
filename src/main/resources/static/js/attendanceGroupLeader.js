$(document).ready(function () {


})

/* ******************************通过考勤组ID获取所有负责人的信息****************************** */
function getGroupLeaders(){
    var groupId= $('#GroupId').val();
    var urlStr = 'http://39.108.89.212:8080/security/attendanceGroup/getLeaders?id='+ groupId
   // alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setGroupLeaders(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })
}
function setGroupLeaders(obj){
    var table_tr = $('.table-tr');
    var group_id = $('.group-id');
    var class_id = $('.class-id');
    var leader_id = $('.group-leader');
    var leader_name=$('.leader-name');
    for (var i = 0; i < obj.data.length; i++) {
        table_tr.eq(i).removeClass('hidden');
        group_id.eq(i).text(obj.data[i].attendanceGroup.id);
        class_id.eq(i).text(obj.data[i].attendanceGroup.schedule.id);
        leader_id.eq(i).text(obj.data[i].leader.id);
        leader_name.eq(i).text(obj.data[i].leader.name);

    }
    for (var i = obj.data.length; i < 5; i++) {
        table_tr.eq(i).addClass('hidden')
    }
}

/* ******************************通过考勤组ID获取所有员工的信息（分页 ）****************************** */
/*function getGroupUsers(){
    var groupId= $('#GroupId1').val();
    var urlStr = 'http://39.108.89.212:8080/security/attendanceGroup/getUsers?id='+ groupId ;
    alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setGroupUsers(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })
}
function setGroupUsers(obj){
    var table_tr = $('.table-tr6');
    var group_id1 = $('.group-id');
    var class_id1 = $('.class-id');
    var user_id = $('.user-id2');
    var user_name = $('.user-name2');
    for (var i = 0; i < obj.data.length; i++) {
        table_tr.eq(i).removeClass('hidden');
        group_id1.eq(i).text(obj.data[i].attendanceGroup.id);
        class_id1.eq(i).text(obj.data[i].attendanceGroup.schedule.id);
        user_id.eq(i).text(obj.data[i].id);
        user_name.eq(i).text(obj.data[i].name);

    }
    for (var i = obj.data.length; i < 5; i++) {
        table_tr.eq(i).addClass('hidden')
    }
}
*/