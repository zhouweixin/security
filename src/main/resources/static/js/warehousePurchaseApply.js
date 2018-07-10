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
        $(this).parent().parent().find('.priceOfGoods').text(price)
    })
    $('.table-selfDefine').on('input', '.numberOfGoods', function () {
        var number = $(this).val()
        var unitPrice = $(this).parent().parent().find('.unitPriceOfGoods').val()
        var price = unitPrice * number
        $(this).parent().parent().find('.priceOfGoods').text(price)
    })
    /*
    金额改变事件/
     */
    $('.table-selfDefine').on('DOMNodeInserted', '.priceOfGoods', function () {
        var tr = $('.table-selfDefine .table-tr')
        var sumPrice = 0
        for(var i = 0; i < tr.length; i++){
            sumPrice = parseInt(sumPrice) + parseInt(tr.eq(i).find('.priceOfGoods').text())
        }
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
})

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
    var applayUser = $('#applyStaff').attr('value')
    var reason = $('#applyReason').val()
    var process = $('#applyProcess').attr('value')
    var price = $('#allGoodsPrice').text()
    var tr = $('.table-selfDefine .table-tr')
    for(var i = 0; i < tr.length; i++){

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