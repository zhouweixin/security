$(document).ready(function () {

    $('#select-allu').on('click', function () {
        if(this.checked == true){
            $('.select-sub-box1').prop('checked',true)
        }
        else{
            $('.select-sub-box1').prop('checked',false)
        }
    })

    $('#select-alls').on('click', function () {
        if(this.checked == true){
            $('.select-sub-box2').prop('checked',true)
        }
        else{
            $('.select-sub-box2').prop('checked',false)
        }
    })


})

/* *******************************************添加考勤组信息************************************************ */
function addGroup(){
    var groupName=$('#modal-groupName').val();  // 获取考勤组名称
    //alert(groupName)
    var num1 = $('#lt tr').length
  //  alert(num1)
    var num2 = $('#ut tr').length
  //  alert(num2)
    var num3 = $('#st tr').length
  // alert(num3)

    var select_sub_box1 = $('.select-sub-box');
    var jsonArr1=''
    for(var i = 0; i < num1-1; i++){
        if(select_sub_box1.eq(i).is(':checked') == true){
            jsonArr1=jsonArr1+select_sub_box1.eq(i).attr('value')+',';
        }
    }
   var leaders=jsonArr1.substring(0,jsonArr1.length-1)      //获取负责人 IDS
    alert(leaders)

    var select_sub_box2 = $('.select-sub-box');
    var jsonArr2 =''
    for(var i = num1-1; i < num1+ num2-2; i++){
        if(select_sub_box2.eq(i).is(':checked') == true){
            jsonArr2=jsonArr2+select_sub_box2.eq(i).attr('value')+',';
        }
    }
    var users=jsonArr2.substring(0,jsonArr2.length-1)  //获取员工 IDS
    alert(users)

    var select_sub_box3 = $('.select-sub-box')
    var jsonArr3
    for(var i = num1+ num2-3; i < num1+ num2 + num3-3; i++){
        if(select_sub_box3.eq(i).is(':checked') == true){
            jsonArr3 = select_sub_box3.eq(i).attr('value');  // 获取班次编号（ID）
        }
    }
   alert(jsonArr3)

    var urlStr = 'http://39.108.89.212:8080/security/attendanceGroup/add?name= '+ groupName + '&ids=' + users + '&leaderIds=' + leaders + '&schedule.id=' + jsonArr3;
    alert(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',

        success:function (obj) {
            if(obj.code == 0){
                alert("新增考勤组成功！")
                getAllGroupInformation()
            }else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}

/* *****************************************获取所有考勤组信息（分页）************************************************** */
function getAllGroupInformation() {
    if($('#page_num').val()==''){
        var page=0
    }else page =$('#page_num').val();
    var size = 10;
    var sortFieldName = 'id';
    var asc = 1;
    var urlStr = 'http://39.108.89.212:8080/security/attendanceGroup/getAllByPage?page= '+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
   //  alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setAllGroupInformation(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })
}
function setAllGroupInformation(obj) {    //  将考勤组信息填入表中
    var table_tr = $('.table-tr');
    var group_id = $('.group-id');
    var group_name = $('.group-name');
    var enable = $('.enable');
    var schedule_name = $('.schedule-name');
    for(var i = 0; i < obj.data.numberOfElements; i++){
        table_tr.eq(i).removeClass('hidden');
        group_id.eq(i).html(obj.data.content[i].id);
        group_name.eq(i).text(obj.data.content[i].name);
        enable.eq(i).html(obj.data.content[i].enableOut);
        schedule_name.eq(i).text(obj.data.content[i].schedule.name);


    }
    for (var i = obj.data.numberOfElements; i < 10; i++) {
        table_tr.eq(i).addClass('hidden')
    }

}

/* ******************************通过名称获取考勤组信息（模糊搜索）****************************** */
function searchByName() {
    if($('#page_num').val()==''){
        var page=0
    }else page =$('#page_num').val();
    var size = 10;
    var sortFieldName = 'id';
    var asc = 1;
    var name =$('#search-groupName').val();
    var urlStr = 'http://39.108.89.212:8080/security/attendanceGroup/getByNameLikeByPage?page='+ page +'&name='+ name + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
    //  alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setAllGroupInformation(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })
}

/* ******************************添加考勤组----获取所有（员工）负责人的信息（分页 ）****************************** */
function getAllUserInformation1() {
    if($('#page_num1').val()==''){
        var page=0
    }else page =$('#page_num1').val();
    var size = 5;
    var sortFieldName = 'id';
    var asc = 1;
    var urlStr = 'http://39.108.89.212:8080/security/user/getAllByPage?page= '+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
   // alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setUserInformation1(obj)

        },
        error:function (error) {
            console.log(error)
        }
    })
}
function setUserInformation1(obj) {  // 将员工信息填入表中
    var table_tr = $('.table-tr1');
    var leader_id = $('.leader-id1');
    var leader_name = $('.leader-name1');

    for (var i = 0; i < obj.data.numberOfElements; i++) {
        table_tr.eq(i).removeClass('hidden');
        leader_id.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" + obj.data.content[i].id + "'" + ">"+obj.data.content[i].id);
        leader_name.eq(i).text(obj.data.content[i].name);
    }
    for (var i = obj.data.numberOfElements; i < 5; i++) {
        table_tr.eq(i).addClass('hidden')
    }
}

/* ********************************************添加考勤组----获取所有员工的信息（分页 ）******************************************* */
function getAllUserInformation2() {
    if($('#page_num2').val()==''){
        var page=0
    }else page =$('#page_num2').val();
    var size = 5;
    var sortFieldName = 'id';
    var asc = 1;
    var urlStr = 'http://39.108.89.212:8080/security/user/getAllByPage?page= '+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
   // alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setUserInformation2(obj)

        },
        error:function (error) {
            console.log(error)
        }
    })
}
function setUserInformation2(obj) {  // 将员工信息填入表中
    var table_tr = $('.table-tr2');
    var user_id = $('.user-id1');
    var user_name = $('.user-name1');
    for (var i = 0; i < obj.data.numberOfElements; i++) {
        table_tr.eq(i).removeClass('hidden');
        user_id.eq(i).html( "<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" +obj.data.content[i].id + "'" + ">"+obj.data.content[i].id)
        user_name.eq(i).text(obj.data.content[i].name);
    }
    for (var i = obj.data.numberOfElements; i < 5; i++) {
        table_tr.eq(i).addClass('hidden')
    }
}

/* **********************************************添加考勤组----获取所有的班次信息（分页 ）******************************************* */
function getAllschedules(){
    if($('#page_num3').val()==''){
        var page=0
    }else page =$('#page_num3').val();
    var size = 4;
    var sortFieldName = 'id';
    var asc = 1;
    var urlStr = 'http://39.108.89.212:8080/security/schedule/getAllByPage?page= '+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
    // alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setAllschedules(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })
}
function setAllschedules(obj){
    var table_tr = $('.table-tr4');
    var s_id = $('.s-id');
    var s_name = $('.s-name');
    for (var i = 0; i < obj.data.numberOfElements; i++) {
        table_tr.eq(i).removeClass('hidden');
        s_id.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" +obj.data.content[i].id + "'" + ">"+obj.data.content[i].id);
        s_name.eq(i).text(obj.data.content[i].name);

    }
    for (var i = obj.data.numberOfElements; i < 4; i++) {
        table_tr.eq(i).addClass('hidden')
    }
}


/* ***********************************************通过ID删除考勤组**************************************************** */
function deleteGroup(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var groupId = td.eq(0).text()
    var urlStr = 'http://39.108.89.212:8080/security/attendanceGroup/deleteById?id='+ groupId;
    alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert("删除信息成功！");
                setAllGroupInformation(obj)
            }else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })

}

/* ******************************修改考勤组----获取所有（员工）负责人的信息（分页 ）****************************** */
function getAllgUserInformation1() {
    if($('#page_num4').val()==''){
        var page=0
    }else page =$('#page_num4').val();
    var size = 5;
    var sortFieldName = 'id';
    var asc = 1;
    var urlStr = 'http://39.108.89.212:8080/security/user/getAllByPage?page= '+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
    // alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setgUserInformation1(obj)

        },
        error:function (error) {
            console.log(error)
        }
    })
}
function setgUserInformation1(obj) {  // 将员工信息填入表中
    var table_tr = $('.table-tr5');
    var leader_id = $('.leader-id2');
    var leader_name = $('.leader-name2');

    for (var i = 0; i < obj.data.numberOfElements; i++) {
        table_tr.eq(i).removeClass('hidden');
        leader_id.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" + obj.data.content[i].id + "'" + ">"+obj.data.content[i].id);
        leader_name.eq(i).text(obj.data.content[i].name);
    }
    for (var i = obj.data.numberOfElements; i < 5; i++) {
        table_tr.eq(i).addClass('hidden')
    }
}

/* ********************************************修改考勤组----获取所有员工的信息（分页 ）******************************************* */
function getAllgUserInformation2() {
    if($('#page_num5').val()==''){
        var page=0
    }else page =$('#page_num5').val();
    var size = 5;
    var sortFieldName = 'id';
    var asc = 1;
    var urlStr = 'http://39.108.89.212:8080/security/user/getAllByPage?page= '+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
    // alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setgUserInformation2(obj)

        },
        error:function (error) {
            console.log(error)
        }
    })
}
function setgUserInformation2(obj) {  // 将员工信息填入表中
    var table_tr = $('.table-tr6');
    var user_id = $('.user-id2');
    var user_name = $('.user-name2');
    for (var i = 0; i < obj.data.numberOfElements; i++) {
        table_tr.eq(i).removeClass('hidden');
        user_id.eq(i).html( "<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" +obj.data.content[i].id + "'" + ">"+obj.data.content[i].id)
        user_name.eq(i).text(obj.data.content[i].name);
    }
    for (var i = obj.data.numberOfElements; i < 5; i++) {
        table_tr.eq(i).addClass('hidden')
    }
}


/* ******************************修改考勤组----通过考勤组ID获取所有负责人的信息****************************** */
function getGroupLeaders(){
    var td = $(obj).parent().parent().find('td')
    $('#modal-modifygroupID').val(td.eq(0).text())
    var groupid= $('#modal-modifygroupId');
    var urlStr = 'http://39.108.89.212:8080/security/attendanceGroup/getLeaders?id='+ groupid ;
    alert(urlStr);
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
    var table_tr = $('.table-tr5');
    var user_id = $('.user-id2');
    var user_name = $('.user-name2');
    for (var i = 0; i < obj.data.length; i++) {
        table_tr.eq(i).removeClass('hidden');
        user_id.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" +obj.data[i].leader.id + "'" + ">"+obj.data[i].leader.id);
        user_name.eq(i).text(obj.data[i].leader.name);

    }
    for (var i = obj.data.length; i < 5; i++) {
        table_tr.eq(i).addClass('hidden')
    }
}

/* ******************************修改考勤组----通过考勤组ID获取所有员工的信息（分页 ）****************************** */
function getGroupUsers(){
    var groupid= $('#modal-modifygroupId');
    var urlStr = 'http://39.108.89.212:8080/security/attendanceGroup/getUsers?id='+ groupid ;
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
    var user_id = $('.user-id2');
    var user_name = $('.user-name2');
    for (var i = 0; i < obj.data.length; i++) {
        table_tr.eq(i).removeClass('hidden');
        user_id.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" +obj.data[i].id + "'" + ">"+obj.data[i].id);
        user_name.eq(i).text(obj.data[i].name);

    }
    for (var i = obj.data.length; i < 15; i++) {
        table_tr.eq(i).addClass('hidden')
    }
}

/* ******************************修改考勤组----获取被修改考勤组的某些关键信息****************************** */
function setmodifyGroupInformation(obj) {
    var td = $(obj).parent().parent().find('td')
    $('#modal-modifygroupId').val(td.eq(0).text())
    $('#modal-modifygroupName').val(td.eq(1).text())
  //  getGroupLeaders(obj)
  //  getGroupUsers(obj)

}

/* ******************************修改考勤组----重新调整考勤组信息并交后台处理****************************** */
function modifyGroup() {
    var groupID = $('#modal-modifygroupId').val()
    alert(groupID)
    var groupName=$('#modal-groupName').val();  // 获取考勤组名称
    alert(groupName)
    var num1 = $('#lt tr').length
    alert(num1)
    var num2 = $('#ut tr').length
    alert(num2)


    var select_sub_box1 = $('.select-sub-box');
    var jsonArr1=''
    for(var i = 0; i < num1-1; i++){
        if(select_sub_box1.eq(i).is(':checked') == true){
            jsonArr1=jsonArr1+select_sub_box1.eq(i).attr('value')+',';
        }
    }
    var leaders=jsonArr1.substring(0,jsonArr1.length-1)      //获取负责人 IDS
    alert(leaders)

    var select_sub_box2 = $('.select-sub-box');
    var jsonArr2 =''
    for(var i = num1-1; i < num1+ num2-2; i++){
        if(select_sub_box2.eq(i).is(':checked') == true){
            jsonArr2=jsonArr2+select_sub_box2.eq(i).attr('value')+',';
        }
    }
    var users=jsonArr2.substring(0,jsonArr2.length-1)  //获取员工 IDS
    alert(users)


    var urlStr = 'http://39.108.89.212:8080/attendanceGroup/update?id='+ groupID + "&ids=" + users + "&leadersId=" + leaders
    alert(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 8){
                alert('修改失败!')
            }
            else if(obj.code == 0){
                alert("修改部门信息成功！")
                getAllDepartmentInformation()
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}





