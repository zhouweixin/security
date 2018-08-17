/*
全局变量/
 */
var index = 0
var currentPage = 0
var materialUserIds_global = []
var userIds_global = []
$(document).ready(function () {
    index = 0
    /*
    选择员工/
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
    $('.departmentName-span').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectOneStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
        }else{
            $(this).parent().find('.selectOneStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
        }
    })

    getAllMaterialUserBypage()
})
/*
获取所有物品用户关系/
 */
function getAllMaterialUserBypage() {
    currentPage = 0
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/gooutMaterialUser/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setAllMaterialUserTable(obj)
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
设置物品用户关系table/
 */
function setAllMaterialUserTable(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var table_tr = $('.table-tr')
    if(obj.data.numberOfElements != 0){
        var id = $('.giveBack-id')
        var name = $('.giveBack-staffName')
        var goods = $('.giveBack-goods')
        var goodsNumber = $('.giveBack-goodsNumber')
        var gooutTime = $('.giveBack-gooutTime')
        var gooutOperator = $('.giveBack-gooutOperator')
        var returnTime = $('.giveBack-returnTime')
        var returnOperator = $('.giveBack-returnOperator')
        var status = $('.giveBack-status')
        var giveBack = $('.giveBack-giveBack').find('a')
        for(var i = 0; i < obj.data.numberOfElements; i++){
            table_tr.eq(i).removeClass('hidden')
            giveBack.eq(i).attr('onclick', 'setGiveBackMaterialModal(this)')
            giveBack.eq(i).css('color', '#337ab7')
            giveBack.eq(i).css('cursor', 'pointer')

            id.eq(i).text(obj.data.content[i].id)
            name.eq(i).text(obj.data.content[i].user.name)
            name.eq(i).attr('value', obj.data.content[i].user.id)
            goods.eq(i).text(obj.data.content[i].material.name)
            goodsNumber.eq(i).text(obj.data.content[i].number)
            if(obj.data.content[i].gooutTime){
                gooutTime.eq(i).text(new Date(obj.data.content[i].gooutTime).toLocaleDateString())
            }else{
                gooutTime.eq(i).text('')
            }
            if(obj.data.content[i].gooutOperator){
                gooutOperator.eq(i).text(obj.data.content[i].gooutOperator.name)
            }else{
                gooutOperator.eq(i).text('')
            }

            if(obj.data.content[i].returnTime){
                returnTime.eq(i).text(new Date(obj.data.content[i].returnTime).toLocaleDateString())
            }else{
                returnTime.eq(i).text('')
            }
            if(obj.data.content[i].returnOperator){
                returnOperator.eq(i).text(obj.data.content[i].returnOperator.name)
            }else{
                returnOperator.eq(i).text('')
            }
            switch (obj.data.content[i].status) {
                case 0: status.eq(i).text('未归还');break;
                case 1: status.eq(i).text('已归还');
                    giveBack.eq(i).removeAttr('onclick');
                    giveBack.eq(i).css('color', '#5A5A5A');
                    giveBack.eq(i).css('cursor', 'default');
                    break;
                case 2: status.eq(i).text('无需归还');
                    giveBack.eq(i).removeAttr('onclick');
                    giveBack.eq(i).css('color', '#5A5A5A');
                    giveBack.eq(i).css('cursor', 'default');
                    break;
                break;
            }
        }
    }
    for (var i = obj.data.numberOfElements; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
}
/*
设置归还modal/
 */
function setGiveBackMaterialModal(thisObj) {
    $('#myModal-makeSureGiveBack').modal('toggle')
    var materialID = $(thisObj).parent().parent().find('.giveBack-id').text()
    var userID = $(thisObj).parent().parent().find('.giveBack-staffName').attr('value')
    $('#myModal-makeSureGiveBack').attr('material-value', materialID)
    $('#myModal-makeSureGiveBack').attr('user-value', userID)
    $('#myModal-makeSureGiveBack').find('button').eq(2).attr('onclick', 'giveBackMaterial()')
}
/*
归还物品/
 */
function giveBackMaterial() {
    var materialID = []
    materialID.push($('#myModal-makeSureGiveBack').attr('material-value'))
    var userID = []
    userID.push($('#myModal-makeSureGiveBack').attr('user-value'))
    $.ajax({
        url: ipPort + '/gooutMaterialUser/returnMaterials?gooutMaterialUserIds=' + materialID + '&userIds=' + userID + '&operatorId=' + 'zy00001',
        success:function (obj) {
            if(obj.code == 0){
                alert(obj.message)
                getAllMaterialUserBypage()
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
设置批量归还modal/
 */
function setGiveBackMaterialInBatchModal() {
    var select_sub_box = $('.select-sub-box')
    var table_tr = $('.table-tr')
    materialUserIds_global = []
    userIds_global = []
    for(var i = 0; i < select_sub_box.length; i++){
        if(select_sub_box.eq(i).is(':checked') == true){
            materialUserIds_global.push(table_tr.eq(i).find('.giveBack-id').text())
            userIds_global.push(table_tr.eq(i).find('.giveBack-staffName').attr('value'))
        }
    }
    if(!materialUserIds_global){
        alert('前选择需要归还的物品！')
    }else{
        $('#myModal-makeSureGiveBack').modal('toggle')
        $('#myModal-makeSureGiveBack').find('button').eq(2).attr('onclick', 'giveBackMaterialInBatch()')
    }
}
/*
批量归还物品/
 */
function giveBackMaterialInBatch() {
    $.ajax({
        url: ipPort + '/gooutMaterialUser/returnMaterials?gooutMaterialUserIds=' + materialUserIds_global + '&userIds=' + userIds_global + '&operatorId=' + 'zy00001',
        success:function (obj) {
            if(obj.code == 0){
                alert(obj.message)
                getAllMaterialUserBypage()
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
增加申请表内容/
 */
function addApplyContent() {
    index++
    var tbody = $('.table-selfDefine tbody')
    var appendStr = "<tr class='table-tr'><td>" + index + "</td><td><input></td><td><input></td>" +
        "<td style='border-right: none'><a onclick='cleanRowApplyContent(this)'><img src='imgs/minus-r.png'></a></td></tr>"
    tbody.append(appendStr)
}
/*
清除申请表内容一行/
 */
function cleanRowApplyContent(thisObj) {
    $(thisObj).parent().parent().remove()
    index--
    var tr = $('.table-selfDefine').find('.table-tr')
    for(var i = 1; i <= tr.length; i++){
        tr.eq(i-1).find('td').eq(0).text(i)
    }
}
/*
获取所有部门/
 */
function getAllDepartment() {
    $('.selectDepartment-ul li').remove()
    $.ajax({
        url: ipPort + '/department/getAll',
        success:function (obj) {
            if(obj.code == 0){
                for(var j = 0; j < obj.data.length; j++){
                    var ul = $('.selectDepartment-ul')
                    var appendStr = '<li data-dismiss="modal" onclick="selectedOneDepartment(this)"><img src="imgs/tips_department_up.png" height="20px" style="margin-top: -2px;margin-right: 5px"><span ' + 'value="' + obj.data[j].id + '">' + obj.data[j].name + '</span></li>'
                    ul.append(appendStr)
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
选定部门/
 */
function selectedOneDepartment(thisObj) {
    $('#applyDepartment').val( $(thisObj).find("span").text())
    $('#applyDepartment').attr('value', $(thisObj).find("span").attr("value"))
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
    $('#applyStaff').val( $(thisObj).find("span").text())
    $('#applyStaff').attr('value', $(thisObj).find("span").attr("value"))
}

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
    var urlStr = ipPort + '/gooutMaterialUser/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setAllMaterialUserTable(obj)
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
    var urlStr = ipPort + '/gooutMaterialUser/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setAllMaterialUserTable(obj)
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
    var urlStr = ipPort + '/gooutMaterialUser/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setAllMaterialUserTable(obj)
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}