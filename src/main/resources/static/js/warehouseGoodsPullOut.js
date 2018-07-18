/*
全局变量/
 */
var index = 0
$(document).ready(function () {
    index = 0
    /*
    选择多个员工/
    */
    $('.selectStaff-department-li img').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
            $(this).parent().find('.selectAllDepartmentStaffs').empty()
        }else{
            $(this).parent().find('.selectStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
            $(this).parent().find('.selectAllDepartmentStaffs').append("全选<input type='checkbox'>")
        }
    })
    $('.selectStaff-department-li .departmentName-span').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
            $(this).parent().find('.selectAllDepartmentStaffs').empty()
        }else{
            $(this).parent().find('.selectStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
            $(this).parent().find('.selectAllDepartmentStaffs').append("全选<input type='checkbox'>")
        }
    })
    /*
    选择one员工/
     */
    $('.selectOneStaff-department-li img').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectOneStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
        }else{
            $(this).parent().find('.selectOneStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
        }
    })
    $('.selectOneStaff-department-li .departmentName-span').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectOneStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
        }else{
            $(this).parent().find('.selectOneStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
        }
    })
    /*
  物品出库/
   */
    $('#addGoOutButton').on('click', function () {
        $('#goOutRecordsPanel').addClass('hidden')
        $('#goOutPanel').removeClass('hidden')
    })
    /*
   左箭头/
    */
    $('.path-arrow-left').on('click', function () {
        $('#goOutPanel').addClass('hidden')
        $('#goOutRecordsPanel').removeClass('hidden')
    })
    addPullOutContent()
    /*
    按姓名搜索modal/
     */
    $('.modal-searchInput input').on('input propertychange', function () {
        if($(this).val() == ''){
            $('#form-selectStaff2').addClass('hidden')
            $('#form-selectStaff1').removeClass('hidden')
        }
    })
})

//*************************************************************出库记录****************************************************************

//****************************************************************************************************************************************


//*************************************************************物品出库****************************************************************
/*
增加出库表内容/
 */
function addPullOutContent() {
    index++
    var tbody = $('.table-selfDefine tbody')
    var appendStr = "<tr class='table-tr'><td>" + index + "</td><td><input></td><td><input></td><td>" +
        "<p style='margin: 0'><input class='bootstrapSwitch' type='checkbox' checked data-size='mini'></p></td>" +
        '<td style="border-right: none"> <a onclick="cleanRowPullOutContent(this)"><img style="width: 25px" src="imgs/minus-r.png"></a></td>'
    tbody.append(appendStr)
    $('.bootstrapSwitch').bootstrapSwitch('onText','是').bootstrapSwitch('offText','否').bootstrapSwitch("onColor",'info').bootstrapSwitch("offColor",'warning').bootstrapSwitch('state',true);

}
/*
清除申请表内容一行/
 */
function cleanRowPullOutContent(thisObj) {
    $(thisObj).parent().parent().remove()
    index--
    var tr = $('.table-selfDefine').find('.table-tr')
    for(var i = 1; i <= tr.length; i++){
        tr.eq(i-1).find('td').eq(0).text(i)
    }
}
/*
获取所有员工姓名/
 */
function getAllStaff_multi() {
    $('.selectAllDepartmentStaffs input').prop('checked',false)
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
function selectedPeople() {
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
    }
    $('#goOutPanel-staffNames').attr('value', strID)
    $('#goOutPanel-staffNames').val(strName)
}
/*
通过姓名搜索/
 */
function searchByName_modal(thisObj) {
    var name = $(thisObj).parent().find('input').val()
    if(name != ''){
        $.ajax({
            url:ipPort + '/user/getByNameLike?name=' + name,
            dataType:'json',
            success:function (obj) {
                $('#form-selectStaff1').addClass('hidden')
                $('#form-selectStaff2').removeClass('hidden')
                var staffUl = $('#form-selectStaff2').find('.selectStaff-staff-ul')
                staffUl.find('li').remove()
                for(var i = 0; i < obj.data.length; i++){
                    var appendStr = '<li onclick="selectedStaff(this)"><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span ' + 'value="' + obj.data[i].id + '">' + obj.data[i].name + '</span></li>'
                    staffUl.append(appendStr)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }
}
/*
获取所有员工/
 */
function getAllStaff() {
    var staffInformationDepartmentA = $('.selectOneStaff-department-ul .selectOneStaff-department-li .departmentName-span')
    $.ajax({
        url:ipPort + '/department/getAll',
        dataType:'json',
        success:function (obj) {
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
                                    var staffUl = staffInformationDepartmentA.eq(m).parent().find('.selectOneStaff-staff-ul')
                                    var appendStr = '<li data-dismiss="modal" onclick="selectedOneStaff(this)"><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span ' + 'value="' + obj_.data[j].id + '">' + obj_.data[j].name + '</span></li>'
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
选定人员/
 */
function selectedOneStaff(thisObj) {
    $('#goOutPanel-applyStaffName').val( $(thisObj).find("span").text())
    $('#goOutPanel-applyStaffName').attr('value', $(thisObj).find("span").attr("value"))
}