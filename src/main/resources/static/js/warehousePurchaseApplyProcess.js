var currentPage = 0
/*
currentModal == 0 添加审核人1
currentModal == 1 添加审核人2
currentModal == 2 修改审核人1
currentModal == 3 修改审核人2/
 */
var currentModal = 0
$(document).ready(function () {
    getAllProcess()
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
    $('#myModal-selectOneStaff .modal-searchInput input').on('input propertychange', function () {
        if($(this).val() == ''){
            $('#form-selectOneStaff .selectOneStaff-staff-ul2').addClass('hidden')
            $('#form-selectOneStaff .selectOneStaff-department-ul').removeClass('hidden')
        }
    })
})
/*
获取所有流程/
 */
function getAllProcess() {
    currentPage = 0
    $.ajax({
        url: ipPort + '/purchaseAuditProcess/getAllByPage',
        success:function (obj) {
            if(obj.code == 0){
                setProcessTable(obj)
            }else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置流程表/
 */
function setProcessTable(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var id = $('.process-id')
    var name = $('.process-name')
    var auditor1 = $('.process-auditor1')
    var auditor2 = $('.process-auditor2')
    var tr = $('.table-tr')
    var length = obj.data.numberOfElements
    for(var i = 0; i < length; i++){
        tr.eq(i).removeClass('hidden')
        id.eq(i).text('')
        name.eq(i).text('')
        auditor1.eq(i).attr('value', '')
        auditor1.eq(i).text('')
        auditor2.eq(i).attr('value', '')
        auditor2.eq(i).text('')
        id.eq(i).text(obj.data.content[i].id)
        name.eq(i).text(obj.data.content[i].name)
        auditor1.eq(i).attr('value', obj.data.content[i].auditor1.id)
        auditor1.eq(i).text(obj.data.content[i].auditor1.name)
        auditor2.eq(i).attr('value', obj.data.content[i].auditor2.id)
        auditor2.eq(i).text(obj.data.content[i].auditor2.name)
    }
    for(var i = length; i < 10; i++){
        tr.eq(i).addClass('hidden')
    }
}
/*
清空添加流程modal/
 */
function cleanProcessModal() {
    $('#modal-processName').val('')
    $('#modal-processAuditor1').attr('value', '')
    $('#modal-processAuditor1').val('')
    $('#modal-processAuditor2').attr('value', '')
    $('#modal-processAuditor2').val('')
}
/*
添加流程/
 */
function addProcess() {
    var name = $('#modal-processName').val()
    if(!name){
        alert('流程名称不为空！')
        return
    }
    var auditor1 = $('#modal-processAuditor1').val()
    if(!auditor1){
        alert('审核人不能为空！')
        return
    }
    auditor1 = $('#modal-processAuditor1').attr('value')

    var auditor2 = $('#modal-processAuditor2').val()
    if(!auditor2){
        alert('审核人不能为空！')
        return
    }
    auditor2 = $('#modal-processAuditor2').attr('value')

    $.ajax({
        url: ipPort + '/purchaseAuditProcess/add?name=' + name + '&auditor1.id=' + auditor1 + '&auditor2.id=' + auditor2,
        success:function (obj) {
            if(obj.code == 0){
                alert('添加流程成功')
                getAllProcess()
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
/*
设置修改流程modal
 */
function setModifyProcessModal(thisObj) {
    $('#modal-modifyProcessID').val('')
    $('#modal-modifyProcessName').val('')
    $('#modal-modifyProcessAuditor1').attr('value', '')
    $('#modal-modifyProcessAuditor1').val('')
    $('#modal-modifyProcessAuditor2').attr('value', '')
    $('#modal-modifyProcessAuditor2').val('')
    var td = $(thisObj).parent().parent().parent().find('td')
    $('#modal-modifyProcessID').val(td.eq(1).text())
    $('#modal-modifyProcessName').val(td.eq(2).text())
    $('#modal-modifyProcessAuditor1').attr('value', td.eq(3).attr('value'))
    $('#modal-modifyProcessAuditor1').val(td.eq(3).text())
    $('#modal-modifyProcessAuditor2').attr('value', td.eq(4).attr('value'))
    $('#modal-modifyProcessAuditor2').val(td.eq(4).text())
}
/*
修改流程/
 */
function modifyProcess() {
    var name = $('#modal-modifyProcessName').val()
    if(!name){
        alert('流程名称不能为空！')
        return
    }
    var auditor1 = $('#modal-modifyProcessAuditor1').val()
    if(!auditor1){
        alert('审核人不能为空！')
        return
    }
    auditor1 = $('#modal-modifyProcessAuditor1').attr('value')
    var auditor2 = $('#modal-modifyProcessAuditor2').val()
    if(!auditor2){
        alert('审核人不能为空！')
        return
    }
    auditor2 = $('#modal-modifyProcessAuditor2').attr('value')

    var id = $('#modal-modifyProcessID').val()
    $.ajax({
        url: ipPort + '/purchaseAuditProcess/update?id=' + id + '&name=' + name + '&auditor1.id=' + auditor1 + '&auditor2.id=' + auditor2,
        success:function (obj) {
            if(obj.code == 0){
                alert('修改成功')
                getAllProcess()
            }else{
                alert(obj.message)
            }
        },
        error:function (error) {
            alert(error)
        }
    })
}
/*
通过物品名称搜索/
 */
function getProcessByName() {
    currentPage = 0
    var name = $('#processName-input').val()
    $.ajax({
        url: ipPort + '/purchaseAuditProcess/getByNameLikeByPage?name=' + name,
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert('未搜索到相关信息')
                    setProcessTable(obj)
                    return
                }else{
                    setProcessTable(obj)
                }
            }else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置确认删除按钮/
 */
function setMakeSureDeleteButtonValue(thisObj) {
    var id = $(thisObj).parent().parent().parent().find('td').eq(1).text()
    $('#myModal-makeSureDelete').attr('value', id)
}
/*
确定删除/
 */
function makeSureDelete() {
    var id = $('#myModal-makeSureDelete').attr('value')
    if(!id){
        alert('id为空，请重新确定id！')
        return
    }
    $.ajax({
        url: ipPort + '/purchaseAuditProcess/deleteById?id=' + id,
        success: function (obj) {
            if (obj.code == 0) {
                alert('删除成功！')
                getAllProcess()
            } else {
                alert(obj.message);
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}
/*
批量删除/
 */
function deleteInBatch() {
    var select_sub_box = $('.select-sub-box')
    var tr = $('.table-selfDefine .table-tr')
    var jsonArr = []
    for(var i = 0; i < select_sub_box.length; i++){
        if(select_sub_box.eq(i).is(':checked') == true){
            var json = {}
            json['id'] = parseInt(tr.eq(i).find('td').eq(1).text());
            jsonArr.push(json)
        }
    }
    let myjson = JSON.stringify(jsonArr)
    return
    var urlStr = ipPort + '/purchaseAuditProcess/deleteByIdBatch'
    $.ajax({
        url:urlStr,
        contentType:'application/json',
        data:myjson,
        dataType:'json',
        type:'post',
        success:function (obj) {
            if(obj.code == 0){
                alert("批量删除成功！")
                getAllProcess()
            }else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*************************************选取一个员工modal*****************************************/
/*
获取所有员工/
 */
function getAllStaff_one(str) {
    currentModal = str
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
    if(currentModal == 0){
        $('#modal-processAuditor1').val( $(thisObj).find("span").text())
        $('#modal-processAuditor1').attr('value', $(thisObj).find("span").attr("value"))
    }else if(currentModal == 1){
        $('#modal-processAuditor2').val( $(thisObj).find("span").text())
        $('#modal-processAuditor2').attr('value', $(thisObj).find("span").attr("value"))
    }else if(currentModal == 2){
        $('#modal-modifyProcessAuditor1').val( $(thisObj).find("span").text())
        $('#modal-modifyProcessAuditor1').attr('value', $(thisObj).find("span").attr("value"))
    }else if(currentModal == 3){
        $('#modal-modifyProcessAuditor2').val( $(thisObj).find("span").text())
        $('#modal-modifyProcessAuditor2').attr('value', $(thisObj).find("span").attr("value"))
    }
}
/******************************************************************************/

 /*
 上一页/
 */
function previousPage() {
    var currentPage_ = $('.currentPage').text()
    if(currentPage_ == 1){
        alert("已经是第一页！")
        return
    }
    currentPage--
    if(currentPage < 0){
        currentPage = 0
    }
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/purchaseAuditProcess/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setProcessTable(obj)
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
下一页/
 */
function nextPage() {
    var currentPage_ = $('.currentPage').text()
    var totalPage_ = $('.totalPage').text()
    if(currentPage_ == totalPage_){
        alert("已经是最后一页！")
        return
    }
    currentPage++
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/purchaseAuditProcess/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setProcessTable(obj)
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
跳转页/
 */
function skipPage() {
    var skipPage_ = parseInt($('.skipPage').val())
    var totalPage_ = parseInt($('.totalPage').text())
    if(skipPage_ - totalPage_ > 0){
        alert("没有此页！")
        return
    }
    if(skipPage_ < 1){
        alert("没有此页！")
        return
    }
    currentPage = skipPage_ - 1
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/purchaseAuditProcess/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setProcessTable(obj)
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}