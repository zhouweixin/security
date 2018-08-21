/*
全局变量/
 */
var index = 0
var currentPage = 0
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
   选择状态下拉框/
    */
    $('.selectStatus-dropdownMenu-ul li a').on('click', function () {
        $('#selectStatus-dropdownMenu').attr('value', $(this).attr('value'))
        $('#selectStatus-dropdownMenu').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
    })
    getPurchaseApplyinit()
})
/*
初始化/
 */
function getPurchaseApplyinit() {
    currentPage = 0
    var id = 'zy00002'
    $.ajax({
        url: ipPort + '/purchaseHeader/getByAuditorByPage?id=' + id,
        success:function (obj) {
            if(obj.code == 0){
                setMainTable(obj, id)
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
通过审核人编码查询/
 */
function getPurchaseApplyByAuditId() {
    currentPage = 0
    var id = $('#auditorId-input').val()
    var status = $('#selectStatus-dropdownMenu').attr('value')
    console.log(ipPort + '/purchaseHeader/getByAuditorByPage?id=' + id + '&status=' + status)
    $.ajax({
        url: ipPort + '/purchaseHeader/getByAuditorByPage?id=' + id + '&status=' + status,
        success:function (obj) {
            console.log(obj)
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert('无相关信息！')
                    setMainTable(obj, id)
                }else{
                    setMainTable(obj, id)
                }
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
function setMainTable(obj, auditId) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var id = $('.purchaseApply-id')
    var name = $('.purchaseApply-staffName')
    var time = $('.purchaseApply-applyTime')
    var price = $('.purchaseApply-price')
    var auditor = $('.purchaseApply-auditor')
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
        auditor.eq(i).text('')
        status.eq(i).attr('value', '')
        status.eq(i).text('')
        id.eq(i).text(obj.data.content[i].id)
        name.eq(i).attr('value', obj.data.content[i].applyUser.id)
        name.eq(i).text(obj.data.content[i].applyUser.name)
        time.eq(i).text((new Date(obj.data.content[i].applyTime).toLocaleString()))
        price.eq(i).text(obj.data.content[i].price)
        auditor.eq(i).text(auditId)
        status.eq(i).attr('value', obj.data.content[i].status)
        if(obj.data.content[i].status == 0){
            status.eq(i).text('未审核')
        } else if(obj.data.content[i].status == 1 || obj.data.content[i].status == 3){
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
    $('#purchaseApplyDetails-auditor').text('')
    $('.purchaseApplyDetails-table-selfDefine').find('.table-tr').remove()
    $('#myModal-PurchaseAuditDetails').attr('value', '')
    var id = $(thisObj).parent().parent().find('td').eq(0).text()
    var auditorId = $(thisObj).parent().parent().find('td').eq(4).text()
    $.ajax({
        url: ipPort + '/purchaseHeader/getById?id=' + id,
        success: function (obj) {
            if(obj.code == 0){
                $('#myModal-PurchaseAuditDetails').attr('value', id)
                $('#purchaseApplyDetails-department').text(obj.data.department.name)
                $('#purchaseApplyDetails-applyUserName').text(obj.data.applyUser.name)
                $('#purchaseApplyDetails-process').text(obj.data.purchaseAuditProcess.name)
                $('#purchaseApplyDetails-applyTime').text((new Date(obj.data.applyTime)).toLocaleString())
                $('#purchaseApplyDetails-reason').text(obj.data.reason)
                $('#purchaseApplyDetails-auditor').text(auditorId)
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
提交审核/
 */
function submitPurchaseAudit(thisObj) {
    var applyId = $('#myModal-PurchaseAuditDetails').attr('value')
    var auditor = $('#purchaseApplyDetails-auditor').text()
    var note = $('#purchaseApplyDetails-note').val()
    console.log(auditor)
    $.ajax({
        url: ipPort + '/purchaseHeader/audit?curAuditorId=' + auditor + '&purchaseHeaderId=' + applyId + '&status=' + thisObj + '&note=' + note,
        success: function (obj) {
            if(obj.code == 0){
                alert('审核成功！')
                getPurchaseApplyinit()
            }else{
                alert(obj.message)
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}
/**********************************************************888/
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
    var id = 'zy00002'
    var urlStr = ipPort + '/purchaseHeader/getByAuditorByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + id
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setMainTable(obj, id)
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
    var id = 'zy00002'
    var urlStr = ipPort + '/purchaseHeader/getByAuditorByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + id
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setMainTable(obj, id)
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
    var id = 'zy00002'
    var urlStr = ipPort + '/purchaseHeader/getByAuditorByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + id
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setMainTable(obj, id)
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}