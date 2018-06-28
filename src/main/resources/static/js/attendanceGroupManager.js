var map
var geoc
var markersArray = [];
var geolocation
var point

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
    /*
    选择员工Modal/
     */
    $('.selectStaff-department-li img').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
        }else{
            $(this).parent().find('.selectStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
        }
    })
    $('.departmentName-span').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
        }else{
            $(this).parent().find('.selectStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
        }
    })
    /*
    地图/
     */
    map = new BMap.Map("allmap");
    geoc = new BMap.Geocoder();   //地址解析对象
    markersArray = [];
    geolocation = new BMap.Geolocation();
    point = new BMap.Point(116.331398, 39.897445);

    $('#modal-addMap').on('click', function () {
        $('#modal-selectMap-address').val('')
        $('#modal-selectMap-address').attr('value', '')
        if (document.getElementById('allmap').style.display == 'none') {
            document.getElementById('allmap').style.display = 'block';
        }
    })
    map.centerAndZoom(point, 12); // 中心点
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            map.enableScrollWheelZoom(true);
        }
        else {
            alert('failed' + this.getStatus());
        }
    }, {enableHighAccuracy: true})
    map.addEventListener("click", function (e) {
        $('#modal-selectMap-address').attr('value', e.point.lng + '_' + e.point.lat)
        geoc.getLocation(e.point, function (rs) {
            var addComp = rs.addressComponents;
            var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
            $('#modal-selectMap-address').val(address)
        });
        addMarker(e.point);
    });
})
/* **************************地图*********************************************** */
//清除标识
function clearOverlays() {
    if (markersArray) {
        for (i in markersArray) {
            map.removeOverlay(markersArray[i])
        }
    }
}
//地图上标注
function addMarker(point) {
    var marker = new BMap.Marker(point);
    markersArray.push(marker);
    clearOverlays();
    map.addOverlay(marker);
}
/*
设置考勤地址table/
 */
function setAttendanceAddressTable() {
    var address = $('#modal-selectMap-address').val()
    var address_ = $('#modal-selectMap-address').attr('value').split('_')//经纬度
    $('#modal-attendanceAddressTable tbody').find('tr').eq(0).find('td').eq(0).text(address)
    $('#modal-attendanceAddressTable tbody').find('tr').eq(0).find('td').eq(0).attr('value',address_)
}
/* ************************************************************************* */

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
    var urlStr = ipPort +  '/attendanceGroup/getAllByPage?page= '+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
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
        group_id.eq(i).text('');
        group_id.eq(i).text(obj.data.content[i].id);
        group_name.eq(i).text('');
        group_name.eq(i).text(obj.data.content[i].name);
        enable.eq(i).text('');
        enable.eq(i).text(obj.data.content[i].enableOut);
        schedule_name.eq(i).text('');
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
    var urlStr =ipPort + '/attendanceGroup/getByNameLikeByPage?page='+ page +'&name='+ name + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
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

/* ***********************选人员（班次）弹出框********************************* */
/*
获取所有员工姓名/
 */
function getAllStaff(thisObj) {
    $('.selectedStaffs-button').attr('value', $(thisObj).attr('data-value'))
    var staffInformationDepartmentA = $('.selectStaff-department-ul .selectStaff-department-li .departmentName-span')
    $.ajax({
        url:ipPort + '/department/getAll',
        dataType:'json',
        success:function (obj) {
            $('.selectedStaff-staff-ul').find('li').remove()
            for(var i = 0; i < obj.data.length; i++){
                staffInformationDepartmentA.eq(i).parent().removeClass('hidden')
                staffInformationDepartmentA.eq(i).text(obj.data[i].name)
                staffInformationDepartmentA.eq(i).attr('value', obj.data[i].id)
                staffInformationDepartmentA.eq(i).parent().find('li').remove()
            }
            $.ajax({
                url:ipPort + '/user/getAll',
                dataType:'json',
                success:function (obj_) {
                    if(obj_.data.length != 0){
                        for(var j = 0; j < obj_.data.length; j++){
                            for(var m = 0; m < obj.data.length; m++){
                                if(obj_.data[j].department.id == obj.data[m].id){
                                    var staffUl = staffInformationDepartmentA.eq(m).parent().find('.selectStaff-staff-ul')
                                    var appendStr = '<li onclick="selectedStaff(this)"><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span ' + 'value="' + obj_.data[j].id + '">' + obj_.data[j].name + '</span></li>'
                                    staffUl.append(appendStr)
                                    break
                                }
                            }
                        }
                    }
                },
                error:function (error) {
                    console.log(error)
                }
            })
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
选区人员/
 */
function selectedStaff(thisObj) {
    var selectedStaffUl = $('.selectedStaff-staff-ul')
    var appendStr = '<li><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span class="selectedStaff-span" ' + 'value="' + $(thisObj).find("span").attr("value") + '">' + $(thisObj).find("span").text() + '</span><span class="cancel-span" onclick="cancelSelectStaff(this)" aria-hidden="true" style="display: block; float: right">&times;</span></li>'
    selectedStaffUl.append(appendStr)
}
/*
取消选区/
 */
function cancelSelectStaff(thisObj) {
    $(thisObj).parent().remove()
}
/*
选定人员/
 */
function selectedPeople(thisObj) {
    var selectedStaff_span = $('.selectedStaff-span')
    var strID = ''
    var strName = ''
    for(var i = 0; i < selectedStaff_span.length; i++){
        strID = strID + selectedStaff_span.eq(i).attr('value')
        strName = strName + selectedStaff_span.eq(i).text()
        if(i != selectedStaff_span.length - 1){
            strID = strID + '_'
            strName = strName + '、'
        }
    } if($(thisObj).attr('value') == 'attendanceGroupLeads'){
        $('#modal-leadersName').attr('value', strID)
        $('#modal-leadersName').val(strName)
    }else if($(thisObj).attr('value') == 'attendanceGroupUsers'){
        $('#modal-usersName').attr('value', strID)
        $('#modal-usersName').val(strName)
    }else if($(thisObj).attr('value') == 'modifyAttendanceGroupLeads'){
        $('#modal-modify-leadersName').attr('value', strID)
        $('#modal-modify-leadersName').val(strName)
    }
    else if($(thisObj).attr('value') == 'modifyAttendanceGroupUsers'){
        $('#modal-modify-usersName').attr('value', strID)
        $('#modal-modify-usersName').val(strName)
    }
}

/*
获取所有班次/
 */
function getAllSchedule(thisObj) {
    $('.selectSchedule-button').attr('value', $(thisObj).attr('data-value'))
    $('.selectSchedule-schedule-ul').find('li').remove()
    $.ajax({
        url:ipPort + '/schedule/getAll',
        dataType:'json',
        success:function (obj) {
            console.log(obj)
            if(obj.data.length != 0){
                for(var j = 0; j < obj.data.length; j++){
                    var staffUl = $('.selectSchedule-schedule-ul')
                    var appendStr = '<li data-dismiss="modal" onclick="selectedOneSchedule(this)"><img src="imgs/workbench.png" height="20px" style="margin-top: -2px"><span ' + 'value="' + obj.data[j].id + '">' + obj.data[j].name + '</span></li>'
                    staffUl.append(appendStr)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
选取班次/
 */
function selectedOneSchedule(thisObj) {
    if($('.selectSchedule-button').attr('value') == 'addSelectSchedule'){
        $('#modal-scheduleName').val( $(thisObj).find("span").text())
        $('#modal-scheduleName').attr('value', $(thisObj).find("span").attr("value"))
    }else if($('.selectSchedule-button').attr('value') == 'modifySelectSchedule'){
        $('#modal-modify-scheduleName').val( $(thisObj).find("span").text())
        $('#modal-modify-scheduleName').attr('value', $(thisObj).find("span").attr("value"))
    }
}
/* ****************************************************************************** */
/*
添加考勤组/
 */
function addAttendanceGroup() {
    var attendanceGroupName = $('#modal-attendanceGroupName').val()
    if(!attendanceGroupName){
        alert("请输入考勤组名称！")
        return
    }
    if(!$('#modal-leadersName').val()){
        alert("请选择考勤组负责人！")
        return
    }
    var attendanceLeaders = $('#modal-leadersName').attr('value').split('_')

    if(!$('#modal-usersName').val()){
        alert("请选择考勤人员！")
        return
    }
    var attendanceUsers = $('#modal-usersName').attr('value').split('_')

    if(!$('#modal-scheduleName').val()){
        alert("请选择班次！")
        return
    }
    var attendanceSchedule= $('#modal-scheduleName').attr('value')

    var urlStr = ipPort + '/addAttendanceGroup/add?name=' + attendanceGroupName + '&users=' + attendanceUsers + '&leaders=' + attendanceLeaders + '&shedule=' + attendanceSchedule
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            console.log(obj)
            if(obj.code == 0){
                alert('添加考勤组成功')
            }
            else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
修改考勤组/
 */
function setUpdateModalInformation(thisObj) {
    //清空modal内容
    $('#modal-modify-attendanceGroupID').val('')
    $('#modal-modify-attendanceGroupName').val('')
    $('#modal-modify-leadersName').val('')
    $('#modal-modify-leadersName').attr('value', '')
    $('#modal-modify-usersName').val('')
    $('#modal-modify-usersName').attr('value', '')
    $('#modal-modify-scheduleName').val('')
    $('#modal-modify-scheduleName').attr('value', '')

    var td = $(thisObj).parent().parent().find('td')
    var attendanceGroupID = td.eq(0).text()
    $.ajax({
        url:ipPort + '/attendanceGroup/getById?id=' + attendanceGroupID,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                $('#modal-modify-attendanceGroupID').val(obj.data.id)
                $('#modal-modify-attendanceGroupName').val(obj.data.name)
                $('#modal-modify-scheduleName').attr('value', obj.data.schedule.id)
                $('#modal-modify-scheduleName').val(obj.data.schedule.name)
            }
            else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
    $.ajax({
        url:ipPort + '/attendanceGroup/getUsers?id=' + attendanceGroupID,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                var usersName = ''
                var userID = ''
                for(var i = 0; i < obj.data.length; i++){
                    if(i != obj.data.length - 1){
                        usersName = usersName + obj.data[i].user.name + '、'
                        userID = userID + obj.data[i].user.id + '_'
                    }else {
                        usersName = usersName + obj.data[i].user.name
                        userID = userID + obj.data[i].user.id
                    }
                }
                $('#modal-modify-usersName').attr('value', userID)
                $('#modal-modify-usersName').val(usersName)
            }
            else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
    $.ajax({
        url:ipPort + '/attendanceGroup/getLeaders?id=' + attendanceGroupID,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                var leadersName = ''
                var leadersID = ''
                for(var i = 0; i < obj.data.length; i++){
                    if(i != obj.data.length - 1){
                        leadersName = leadersName + obj.data[i].leader.name + '、'
                        leadersID = leadersID + obj.data[i].leader.id + '_'
                    }else {
                        leadersName = leadersName + obj.data[i].leader.name
                        leadersID = leadersID + obj.data[i].leader.id
                    }
                }
                $('#modal-modify-leadersName').attr('value', leadersID)
                $('#modal-modify-leadersName').val(leadersName)
            }
            else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
清空添加考勤组modal/
 */
function emptyAddGroupModal() {
    $('#modal-attendanceGroupName').val('')
    $('#modal-leadersName').val('')
    $('#modal-leadersName').attr('value', '')
    $('#modal-usersName').val('')
    $('#modal-usersName').attr('value', '')
    $('#modal-scheduleName').val('')
    $('#modal-scheduleName').attr('value', '')
}
/*
设置makeSureModal的value/
 */
function setMakeSureDeleteButtonValue(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var attendanceGroupID = td.eq(0).text()
    $('#myModal-makeSureDelete').attr('value', attendanceGroupID)
}
/*
确认删除考勤组/
 */
function deleteAttendanceGroup() {
    var ID = $('#myModal-makeSureDelete').attr('value')
    var urlStr = ipPort + '/attendanceGroup/deleteById?id='+ ID
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert('删除成功!')
                getAllGroupInformation()
            }
            else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}