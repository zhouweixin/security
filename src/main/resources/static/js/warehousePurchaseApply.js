/*
全局变量/
 */
var index = 0
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
    /*
    新增申请按钮/
     */
    $('#addApplyButton').on('click', function () {
        $('#applyRecordsPanel').addClass('hidden')
        $('#purchaseApplyPanel').removeClass('hidden')
    })
    /*
    左箭头/
     */
    $('.path-arrow-left').on('click', function () {
        $('#purchaseApplyPanel').addClass('hidden')
        $('#applyRecordsPanel').removeClass('hidden')
    })
    /*
    设置申请表物品名称/
     */
    $('.table-selfDefine').on('click', 'ul.applyTable-goodsName-ul li', function () {
        $(this).parent().parent().find('div').attr('value', $(this).attr('value'))
        $(this).parent().parent().find('div').text($(this).text())
        $(this).parent().parent().parent().parent().find('td').eq(2).text($(this).attr('unitValue'))
    })
    /*
    单价和数量改变事件/
     */
    $('.table-selfDefine').on('input', '.unitPriceOfGoods', function () {
        var unitPrice = $(this).val()
        var number = $(this).parent().parent().find('.numberOfGoods').val()
        var price = unitPrice * number
        price = price.toFixed(2)
        $(this).parent().parent().find('.priceOfGoods').text(price)
    })
    $('.table-selfDefine').on('input', '.numberOfGoods', function () {
        var number = $(this).val()
        var unitPrice = $(this).parent().parent().find('.unitPriceOfGoods').val()
        var price = unitPrice * number
        price = price.toFixed(2)
        $(this).parent().parent().find('.priceOfGoods').text(price)
    })
    /*
    金额改变事件/
     */
    $('.table-selfDefine').on('DOMNodeInserted', '.priceOfGoods', function () {
        var tr = $('.table-selfDefine .table-tr')
        var sumPrice = 0
        for(var i = 0; i < tr.length; i++){
            sumPrice = parseFloat(sumPrice) + parseFloat(tr.eq(i).find('.priceOfGoods').text())
        }
        sumPrice = sumPrice.toFixed(2)
        $('#allGoodsPrice').text(sumPrice)
    })
    /*
    审核流程/
     */
    getAllProcessName()
    $('.applyProcess-menu-ul').on('click', ' li a', function () {
        $('#applyProcess').text($(this).text())
        $('#applyProcess').attr('value', $(this).attr('value'))
    })

    getAllPurchaseApply()
})
/*
获取所有申请/
 */
function getAllPurchaseApply() {
    $.ajax({
        url: ipPort + '/purchaseHeader/getAllByPage',
        success:function (obj) {
            if(obj.code == 0){
                setPurchaseApplyTable(obj)
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
设置申请表/
 */
function setPurchaseApplyTable(obj) {
    var id = $('.purchaseApply-id')
    var name = $('.purchaseApply-staffName')
    var time = $('.purchaseApply-applyTime')
    var price = $('.purchaseApply-price')
    var status = $('.purchaseApply-status')
    var tr = $('.table-tr')
    var length = obj.data.numberOfElements
    for(var i = 0; i < length; i++){
        tr.eq(i).removeClass('hidden')
        id.eq(i).text('')
        name.eq(i).attr('value', '')
        name.eq(i).text('')
        time.eq(i).text('')
        price.eq(i).text('')
        status.eq(i).attr('value', '')
        status.eq(i).text('')
        id.eq(i).text(obj.data.content[i].id)
        name.eq(i).attr('value', obj.data.content[i].applyUser.id)
        name.eq(i).text(obj.data.content[i].applyUser.name)
        time.eq(i).text((new Date(obj.data.content[i].applyTime).toLocaleString()))
        price.eq(i).text(obj.data.content[i].price)
        status.eq(i).attr('value', obj.data.content[i].status)
        if(obj.data.content[i].status == 0){
            status.eq(i).text('未审核')
        } else if(obj.data.content[i].status == 1){
            status.eq(i).text('通过')
        }else if(obj.data.content[i].status == 2){
            status.eq(i).text('未通过')
        }

    }
    for(var i = length; i < 10; i++){
        tr.eq(i).addClass('hidden')
    }
}
/*
设置审核记录modal/
 */
function setPurchaseApplyRecordModal(thisObj) {
    $('#purchaseApplyDetails-department').text('')
    $('#purchaseApplyDetails-applyUserName').text('')
    $('#purchaseApplyDetails-process').text('')
    $('#purchaseApplyDetails-applyTime').text('')
    $('#purchaseApplyDetails-reason').text('')
    $('#purchaseApplyDetails-sumPrice').text('')
    $('#purchaseApplyDetails-status').text('')
    $('.purchaseApplyDetails-table-selfDefine').find('.table-tr').remove()
    $('#purchaseApplyDetails-note1').text('')
    $('#purchaseApplyDetails-auditor1').text('')
    $('#purchaseApplyDetails-auditTime1').text('')
    $('#purchaseApplyDetails-note2').text('')
    $('#purchaseApplyDetails-auditor2').text('')
    $('#purchaseApplyDetails-auditTime2').text('')
    var id = $(thisObj).parent().parent().find('td').eq(0).text()
    $.ajax({
        url: ipPort + '/purchaseHeader/getById?id=' + id,
        success: function (obj) {
            if(obj.code == 0){
                $('#purchaseApplyDetails-department').text(obj.data.department.name)
                $('#purchaseApplyDetails-applyUserName').text(obj.data.applyUser.name)
                $('#purchaseApplyDetails-process').text(obj.data.purchaseAuditProcess.name)
                $('#purchaseApplyDetails-applyTime').text((new Date(obj.data.applyTime)).toLocaleString())
                $('#purchaseApplyDetails-reason').text(obj.data.reason)
                if(obj.data.status == 0){
                    $('#purchaseApplyDetails-status').text('未审核')
                }else if(obj.data.status == 1 || obj.data.status == 3){
                    $('#purchaseApplyDetails-status').text('通过')
                }else if(obj.data.status == 2){
                    $('#purchaseApplyDetails-status').text('未通过')
                }
                $('#purchaseApplyDetails-sumPrice').text(obj.data.price)
                var tbody = $('.purchaseApplyDetails-table-selfDefine tbody')
                for(var i = 0; i < obj.data.purchases.length; i++){
                    var appendStr ="<tr class='table-tr'><td>" + (i+1) +"</td><td>" + obj.data.purchases[i].material.name +"</td>" +
                        "<td>" + obj.data.purchases[i].material.unit + "</td><td>" + obj.data.purchases[i].unitPrice +"</td>" +
                        "<td>" + obj.data.purchases[i].number + "</td><td style='border-right: none'>" + obj.data.purchases[i].price + "</td></tr>"
                    tbody.append(appendStr)
                }
                $.ajax({
                    url: ipPort + '/purchaseAuditRecord/getByPurchaseHeader?id=' + id,
                    success: function (obj_) {
                        if(obj_.code == 0){
                            if(obj_.data.length > 0){
                                for(var i = 0; i < obj_.data.length; i++){
                                    var note = '#purchaseApplyDetails-note' + (i+1)
                                    var auditor = '#purchaseApplyDetails-auditor' + (i+1)
                                    var time = '#purchaseApplyDetails-auditTime' + (i+1)
                                    $(note).text(obj_.data[i].note)
                                    $(auditor).text(obj_.data[i].auditor.name)
                                    $(time).text((new Date(obj_.data[i].auditTime)).toLocaleDateString())
                                }
                            }
                        }else{
                            alert(obj_.message)
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            }else{
                alert(obj.message)
            }
        },
        error: function (error) {
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
    var appendStr = "<tr class='table-tr'><td>" + index + "</td><td><div class='dropdown' style='width: 100%; height: 100%'>" +
        "<div id='alreadySigned' class='applyTable-goodsName dropdown-toggle' style='width: 100%; height: 26px' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>" +
        "</div><ul class='dropdown-menu applyTable-goodsName-ul' style='width: 100%' aria-labelledby='alreadySigned'></ul></div></td>" +
        "<td></td><td><input class='unitPriceOfGoods'></td><td><input class='numberOfGoods'></td><td class='priceOfGoods'></td>" +
        "<td style='border-right: none'><a onclick='cleanRowApplyContent(this)'><img src='imgs/minus-r.png'></a></td></tr>"
    tbody.append(appendStr)
    getAllGoodsName()
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
提交采购申请表/
 */
function submitPurchaseApplyTable() {
    var department = $('#applyDepartment').attr('value')
    if(!department){
        alert('申请部门不能为空！')
        return
    }
    var applayUser = $('#applyStaff').attr('value')
    if(!applayUser){
        alert('申请人不能为空！')
        return
    }
    var reason = $('#applyReason').val()
    var process = $('#applyProcess').attr('value')
    if(!process){
        alert('审核流程不能为空！')
        return
    }
    var price = $('#allGoodsPrice').text()
    if(!price){
        alert('总计金额不能为空！')
        return
    }
    var tr = $('.table-selfDefine .table-tr')
    if(tr.length == 0){
        alert('请选择采购物品！')
        return
    }
    var jsonArr = []
    for(var i = 0; i < tr.length; i++){
        var id = tr.eq(i).find('td').eq(1).find('.applyTable-goodsName').attr('value')
        if(!id){
            alert('物品名称不能为空！')
            return
        }
        var json_ = {}
        json_['material'] = {
            "id": id
        }
        var unitPrice = tr.eq(i).find('td').eq(3).find('input').val()
        json_['unitPrice'] = parseFloat(unitPrice).toFixed(2)
        var number = tr.eq(i).find('td').eq(4).find('input').val()
        json_['number'] = parseInt(number)
        var price_ = tr.eq(i).find('td').eq(5).text()
        json_['price'] = parseFloat(price_).toFixed(2)
        jsonArr.push(json_)
    }
    var json = {
        "applyUser":{
            "id": applayUser
        },
        "department": {
            "id": department
        },
        "purchaseAuditProcess":{
            "id":  process
        },
        "reason": reason,
        "price": parseFloat(price).toFixed(2),
        "purchases": jsonArr
    }
    let myjson = JSON.stringify(json)
    $.ajax({
        url: ipPort + '/purchaseHeader/add',
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
获取所有物品名称/
 */
function getAllGoodsName() {
    $.ajax({
        url: ipPort + '/material/getAll',
        success: function (obj) {
            if(obj.code == 0){
                setApplyTableGoodsNameUl(obj)
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
function setApplyTableGoodsNameUl(obj) {
    var ul = $('ul.applyTable-goodsName-ul')
    ul.find('li').remove()
    var appendStr = ''
    for(var i = 0; i < obj.data.length; i++){
        appendStr = "<li class='col-xs-6' value='" + obj.data[i].id + "'" + "unitValue='" + obj.data[i].unit + "'" + ">" + obj.data[i].name + "</li>"
        ul.append(appendStr)
    }
}
/*
获取所有流程名称/
 */
function getAllProcessName() {
    $.ajax({
        url: ipPort + '/purchaseAuditProcess/getAll',
        success: function (obj) {
            if(obj.code == 0){
                setApplyTableProcessNameUl(obj)
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}
/*
设置申请表流程名称下拉框/
 */
function setApplyTableProcessNameUl(obj) {
    var ul = $('ul.applyProcess-menu-ul')
    var appendStr = ''
    for(var i = 0; i < obj.data.length; i++){
        appendStr = "<li><a value='" + obj.data[i].id + "'>" + obj.data[i].name + "</a></li>"
        ul.append(appendStr)
    }
}
/*
通过申请人编号搜索/
 */
function searchByStaffId() {
    var id = $('#applyUserId-input').val()
    $.ajax({
        url:ipPort + '/purchaseHeader/getByApplyUserByPage?id=' + id,
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert('无相关信息！')
                    setPurchaseApplyTable(obj)
                }else {
                    setPurchaseApplyTable(obj)
                }
            }else{
                alert(obj.message)
            }
        },
        error:function (error) {
            consle.log(error)
        }
    })
}