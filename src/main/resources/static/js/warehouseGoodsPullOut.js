/*
全局变量/
 */
var index = 0
var currentPage = 0
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
        $('#goOutPanel-applyStaffName').attr('value', '')
        $('#goOutPanel-applyStaffName').val('')
        $('#goOutPanel-staffNames').attr('value', '')
        $('#goOutPanel-staffNames').val('')
        $('#goOutPanel-staffNumbers').val('')
        $('#goOutPanel .table-selfDefine tbody').find('tr').remove()
    })
    /*
   左箭头/
    */
    $('.path-arrow-left').on('click', function () {
        $('#goOutPanel').addClass('hidden')
        getAllGoOutRecords()
        $('#goOutRecordsPanel').removeClass('hidden')
    })
    /*
    按姓名搜索modal/
     */
    $('.modal-searchInput input').on('input propertychange', function () {
        if($(this).val() == ''){
            $('#form-selectStaff1 .selectStaff-staff-ul2').addClass('hidden')
            $('#form-selectStaff1 .selectStaff-department-ul').removeClass('hidden')
        }
    })
    /*
    设置物品出库表的物品名称/
     */
    $('.table-selfDefine').on('click', 'ul.goOutTable-goodsName-ul li', function () {
        $(this).parent().parent().find('div').attr('value', $(this).attr('value'))
        $(this).parent().parent().find('div').text($(this).text())
        $(this).parent().parent().parent().parent().find('td').eq(2).text($(this).attr('unitValue'))
    })
    getAllGoOutRecords()
})

//*************************************************************出库记录****************************************************************
/*
获取出库记录/
 */
function getAllGoOutRecords() {
    currentPage = 0
    var page = currentPage
    $.ajax({
        url: ipPort + '/gooutHeader/getAllByPage' + '?page=' + page,
        success:function (obj) {
            if(obj.code == 0){
                setGoOutRecordsTable(obj)
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
设置出库记录表/
 */
function setGoOutRecordsTable(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var id = $('.goOutRecords-id')
    var applyName = $('.goOutRecords-applyStaffName')
    var time = $('.goOutRecords-applyTime')
    var staffNumber = $('.goOutRecords-staffNumbers')
    var operator = $('.goOutRecords-operator')
    var tr = $('.table-tr')
    var length = obj.data.numberOfElements
    for(var i = 0; i < length; i++){
        tr.eq(i).removeClass('hidden')
        id.eq(i).text('')
        applyName.eq(i).attr('value', '')
        applyName.eq(i).text('')
        time.eq(i).text('')
        staffNumber.eq(i).text('')
        operator.eq(i).attr('value', '')
        operator.eq(i).text('')
        id.eq(i).text(obj.data.content[i].id)
        applyName.eq(i).attr('value', obj.data.content[i].applyUser.id)
        applyName.eq(i).text(obj.data.content[i].applyUser.name)
        time.eq(i).text((new Date(obj.data.content[i].gooutTime).toLocaleString()))
        staffNumber.eq(i).text(obj.data.content[i].numPeople)
        operator.eq(i).attr('value', obj.data.content[i].operator.id)
        operator.eq(i).text( obj.data.content[i].operator.name)
    }
    for(var i = length; i < 10; i++){
        tr.eq(i).addClass('hidden')
    }
}
/*
设置出库记录详情modal/
 */
function setGoOutRecordsModal(thisObj) {
    $('#GoOutRecordsDetails-applyUser').text('')
    $('#GoOutRecordsDetails-operator').text('')
    $('#GoOutRecordsDetails-applyTime').text('')
    $('#GoOutRecordsDetails-numberPeople').text('')
    $('.GoOutRecordsDetails-table-selfDefine').find('.table-tr').remove()
    var id = $(thisObj).parent().parent().find('td').eq(0).text()
    $.ajax({
        url: ipPort + '/gooutHeader/getById?id=' + id,
        success: function (obj) {
            if(obj.code == 0) {
                $('#GoOutRecordsDetails-applyUser').text(obj.data.applyUser.name)
                $('#GoOutRecordsDetails-operator').text(obj.data.operator.name)
                $('#GoOutRecordsDetails-numberPeople').text(obj.data.numPeople)
                $('#GoOutRecordsDetails-applyTime').text((new Date(obj.data.gooutTime)).toLocaleString())

                var tbody = $('.GoOutRecordsDetails-table-selfDefine tbody')
                for (var i = 0; i < obj.data.goouts.length; i++) {
                    var appendStr = "<tr class='table-tr'><td>" + (i + 1) + "</td><td>" + obj.data.goouts[i].material.name + "</td>" +
                        "<td>" + obj.data.goouts[i].material.unit + "</td><td>" + obj.data.goouts[i].sum + "</td>"
                    if (obj.data.goouts[i].needReturn == 1) {
                        appendStr = appendStr + "<td style='border-right: none'>是</td></tr>"
                    } else if (obj.data.goouts[i].needReturn == 0) {
                        appendStr = appendStr + "<td style='border-right: none'>否</td></tr>"
                    }
                    tbody.append(appendStr)
                }
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}
//****************************************************************************************************************************************


//*************************************************************物品出库****************************************************************
/*
提交出库内容/
 */
function submitGoOutTable() {
    var operatorName = $('#goOutPanel-operatorName').val()
    if(!operatorName){
        alert('经办人不能为空！')
        return
    }
    var applyUser = $('#goOutPanel-applyStaffName').attr('value')
    if(!applyUser){
        alert('申请人不能为空！')
        return
    }
    var staffNames = $('#goOutPanel-staffNames').attr('value')
    if(!staffNames){
        alert('使用者不能为空！')
        return
    }
    var staffNumbers = $('#goOutPanel-staffNumbers').val()
    if(!staffNumbers){
        alert('人数不能为空！')
        return
    }
    var tr = $('.table-selfDefine .table-tr')
    if(tr.length == 0){
        alert('请选择出库物品！')
        return
    }
    var jsonArr = []
    for(var i = 0; i < tr.length; i++){
        var id = tr.eq(i).find('td').eq(1).find('.goOutTable-goodsName').attr('value')
        if(!id){
            alert('物品名称不能为空！')
            return
        }
        var json_ = {}
        json_['material'] = {
            "id": id
        }
        var numPerStaff = tr.eq(i).find('td').eq(3).find('input').val()
        json_['numPerPeople'] = numPerStaff
        var sum = staffNumbers * numPerStaff
        json_['sum'] = sum
        var needReturn = tr.eq(i).find('td').eq(4).find('.bootstrap-switch-on')
        if(needReturn.length == 1){
            json_['needReturn'] = 1
        }else {
            json_['needReturn'] = 0
        }
        jsonArr.push(json_)
    }
    var userId_jsonArr = []
    var userId = staffNames.split('_')
    for(var i = 0; i < userId.length; i++){
        userId_jsonArr.push(userId[i])
    }
    var json = {
        "applyUser":{
            "id": applyUser
        },
        "operator": {
            "id": operatorName
        },
        "numPeople": staffNumbers,
        "userIds": userId_jsonArr,
        "goouts": jsonArr
    }
    let myjson = JSON.stringify(json)
    $.ajax({
        url: ipPort + '/gooutHeader/add',
        contentType: 'application/json',
        data: myjson,
        dataType: 'json',
        type: 'post',
        success: function (obj) {
            if(obj.code == 0){
                alert('提交成功！')
            }else {
                alert(obj.message)
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}
/*
增加出库表内容/
 */
function addPullOutContent() {
    index++
    var tbody = $('.table-selfDefine tbody')
    var appendStr = "<tr class='table-tr'><td>" + index + "</td><td><div class='dropdown' style='width: 100%; height: 100%'>" +
        "<div class='goOutTable-goodsName dropdown-toggle' style='width: 100%; height: 26px' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>" +
        "</div><ul class='dropdown-menu goOutTable-goodsName-ul' style='width: 100%' aria-labelledby='alreadySigned'></ul></div></td>" +
        "<td></td><td><input class='numberPerStaff'></td><td>" + "<p style='margin: 0'><input class='bootstrapSwitch' type='checkbox' checked data-size='mini'></p></td>" +
        '<td style="border-right: none"> <a onclick="cleanRowPullOutContent(this)"><img style="width: 25px" src="imgs/minus-r.png"></a></td>'
    tbody.append(appendStr)
    $('.bootstrapSwitch').bootstrapSwitch('onText','是').bootstrapSwitch('offText','否').bootstrapSwitch("onColor",'info').bootstrapSwitch("offColor",'warning').bootstrapSwitch('state',true);
    getAllGoodsName()

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
获取所有物品名称/
 */
function getAllGoodsName() {
    $.ajax({
        url: ipPort + '/material/getAll',
        success: function (obj) {
            if(obj.code == 0){
                setGoOutTableGoodsNameUl(obj)
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}
/*
设置申请表物品名称下拉框/
 */
function setGoOutTableGoodsNameUl(obj) {
    var ul = $('ul.goOutTable-goodsName-ul')
    ul.find('li').remove()
    var appendStr = ''
    for(var i = 0; i < obj.data.length; i++){
        appendStr = "<li class='col-xs-6' value='" + obj.data[i].id + "'" + "unitValue='" + obj.data[i].unit + "'" + ">" + obj.data[i].name + "</li>"
        ul.append(appendStr)
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
    var selectedStaffUl = $('#form-selectStaff1 .selectedStaff-staff-ul')
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
                $('#form-selectStaff1 .selectStaff-department-ul').addClass('hidden')
                $('#form-selectStaff1 .selectStaff-staff-ul2').removeClass('hidden')
                var staffUl = $('#form-selectStaff1').find('.selectStaff-staff-ul2')
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
    var urlStr = ipPort + '/gooutHeader/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setStaffTableInformation(obj)
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
    var urlStr = ipPort + '/gooutHeader/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setStaffTableInformation(obj)
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
    var urlStr = ipPort + '/gooutHeader/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setStaffTableInformation(obj)
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
