$(document).ready(function () {
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
    按姓名搜索modal/
     */
    $('#myModal-selectStaff .modal-searchInput input').on('input propertychange', function () {
        if($(this).val() == ''){
            $('#form-selectOneStaff .selectOneStaff-staff-ul2').addClass('hidden')
            $('#form-selectOneStaff .selectOneStaff-department-ul').removeClass('hidden')
        }
    })
})
function changeICNumber() {
    var staffID = $('#modal-staffNumber').val()
    var icNumber = $('#modal-cardNumberAfter').val()
    if(staffID == '' || icNumber == ''){
        alert('请输入员工编号和新ic卡号！')
    }
    var urlStr = ipPort + '/user/updateIcById?id=' + staffID + '&ic=' + icNumber
    console.log(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert(obj.message)
            }else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
function cancelChangeICNumber() {
    $('#modal-staffNumber').val('')
    $('#modal-staffName').val('')
    $('#modal-cardNumberBefore').val('')
    $('#modal-cardNumberAfter').val('')
}
/*
获取所有员工姓名/
 */
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
通过姓名搜索/
 */
function searchOneByName_modal(thisObj) {
    var name = $(thisObj).parent().find('input').val()
    if(name != ''){
        $.ajax({
            url:ipPort + '/user/getByNameLike?name=' + name,
            dataType:'json',
            success:function (obj) {
                $('#form-selectOneStaff .selectOneStaff-department-ul').addClass('hidden')
                $('#form-selectOneStaff .selectOneStaff-staff-ul2').removeClass('hidden')
                var staffUl = $('#form-selectOneStaff').find('.selectOneStaff-staff-ul2')
                staffUl.find('li').remove()
                for(var i = 0; i < obj.data.length; i++){
                    var appendStr = '<li data-dismiss="modal" onclick="selectedOneStaff(this)"><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span ' + 'value="' + obj.data[i].id + '">' + obj.data[i].name + '</span></li>'
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
选定人员/
 */
function selectedOneStaff(thisObj) {
    $('#modal-staffName').val( $(thisObj).find("span").text())
    $('#modal-staffName').attr('value', $(thisObj).find("span").attr("value"))
}