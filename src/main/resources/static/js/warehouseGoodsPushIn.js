/*
全局变量/
 */
var index = 0
var currentPage = 0
/*
currentSearch == -1 全部搜索
currentSearch == -2 条件搜索/
 */
var currentSearch = -1

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
    选择状态下拉框/
     */
    $('.selectStatus-dropdownMenu-ul li a').on('click', function () {
        $('#selectStatus-dropdownMenu').attr('value', $(this).attr('value'))
        $('#selectStatus-dropdownMenu').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
    })
    getAllPurchaseApply()
    /*
    搜索添加回车绑定事件/
     */
    $('#applyStaffId-input').on('keypress', function (event) {
        if(event.keyCode == '13'){
            searchByParas()
        }
    })
})
/*
获取所有申请/
 */
function getAllPurchaseApply(page_ = 0) {
    currentSearch = -1
    currentPage = page_
    var page = currentPage
    var size = 10
    var sortFieldName = 'applyTime'
    var asc = 0
    var urlStr = ipPort + '/purchaseHeader/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url: urlStr,
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
设置入库表/
 */
function setPurchaseApplyTable(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var id = $('.purchaseApply-id')
    var name = $('.purchaseApply-staffName')
    var department = $('.purchaseApply-department')
    var time = $('.purchaseApply-applyTime')
    var price = $('.purchaseApply-price')
    var status = $('.purchaseApply-status')
    var pushIn =  $('.purchaseApply-pushIn').find('a')
    var tr = $('.table-tr')
    var length = obj.data.numberOfElements
    for(var i = 0; i < length; i++){
        tr.eq(i).removeClass('hidden')
        id.eq(i).text('')
        name.eq(i).attr('value', '')
        name.eq(i).text('')
        department.text('')
        time.eq(i).text('')
        price.eq(i).text('')
        status.eq(i).attr('value', '')
        status.eq(i).text('')
        pushIn.eq(i).attr('onclick', 'setPushInDetaisModal(this)')
        pushIn.eq(i).attr('data-toggle', 'modal')
        pushIn.eq(i).attr('data-target', '#myModal-pushInDetails')
        pushIn.eq(i).css('color', '#337ab7')
        pushIn.eq(i).css('cursor', 'pointer')
        id.eq(i).text(obj.data.content[i].id)
        name.eq(i).attr('value', obj.data.content[i].applyUser.id)
        name.eq(i).text(obj.data.content[i].applyUser.name)
        department.text(obj.data.content[i].department.name)
        time.eq(i).text((new Date(obj.data.content[i].applyTime).toLocaleString()))
        price.eq(i).text(obj.data.content[i].price)
        status.eq(i).attr('value', obj.data.content[i].status)
        if(obj.data.content[i].status == 0){
            status.eq(i).text('未审核')
            pushIn.eq(i).removeAttr('onclick')
            pushIn.eq(i).removeAttr('data-toggle')
            pushIn.eq(i).removeAttr('data-target')
            pushIn.eq(i).css('color', '#5A5A5A')
            pushIn.eq(i).css('cursor', 'default')
        } else if(obj.data.content[i].status == 1){
            status.eq(i).text('通过（未入库）')
        }else if(obj.data.content[i].status == 2){
            status.eq(i).text('未通过')
            pushIn.eq(i).removeAttr('onclick')
            pushIn.eq(i).removeAttr('data-toggle')
            pushIn.eq(i).removeAttr('data-target')
            pushIn.eq(i).css('color', '#5A5A5A')
            pushIn.eq(i).css('cursor', 'default')
        }else if(obj.data.content[i].status == 3){
            status.eq(i).text('通过（已入库）')
            pushIn.eq(i).removeAttr('onclick')
            pushIn.eq(i).removeAttr('data-toggle')
            pushIn.eq(i).removeAttr('data-target')
            pushIn.eq(i).css('color', '#5A5A5A')
            pushIn.eq(i).css('cursor', 'default')
        }

    }
    for(var i = length; i < 10; i++){
        tr.eq(i).addClass('hidden')
    }
}
/*
设置入库详情modal/
 */
function setPushInDetaisModal(thisObj) {
    $('#pushInDetails-department').text('')
    $('#pushInDetails-applyUserName').attr('value', '')
    $('#pushInDetails-applyUserName').text('')
    $('#pushInDetails-applyHeaderId').text('')
    $('#pushInDetails-applyTime').text('')
    $('#pushInDetails-reason').text('')
    $('#pushInDetails-sumPrice').text('')
    $('#pushInDetails-status').text('')
    $('.pushInDetails-table-selfDefine').find('.table-tr').remove()
    $('#pushInDetails-note1').text('')
    $('#pushInDetails-auditor1').text('')
    $('#pushInDetails-auditTime1').text('')
    $('#pushInDetails-note2').text('')
    $('#pushInDetails-auditor2').text('')
    $('#pushInDetails-auditTime2').text('')
    var id = $(thisObj).parent().parent().find('td').eq(0).text()
    $.ajax({
        url: ipPort + '/purchaseHeader/getById?id=' + id,
        success: function (obj) {
            if(obj.code == 0){
                $('#pushInDetails-department').text(obj.data.department.name)
                $('#pushInDetails-applyUserName').attr('value', obj.data.applyUser.id)
                $('#pushInDetails-applyUserName').text(obj.data.applyUser.name)
                $('#pushInDetails-applyHeaderId').text(obj.data.id)
                $('#pushInDetails-applyTime').text((new Date(obj.data.applyTime)).toLocaleString())
                $('#pushInDetails-reason').text(obj.data.reason)
                if(obj.data.status == 0){
                    $('#pushInDetails-status').text('未审核')
                }else if(obj.data.status == 1){
                    $('#pushInDetails-status').text('通过（未入库）')
                }else if(obj.data.status == 2){
                    $('#pushInDetails-status').text('未通过')
                }else if(obj.data.status == 3){
                    $('#pushInDetails-status').text('通过（已入库）')
                }
                $('#pushInDetails-sumPrice').text(obj.data.price)
                var tbody = $('.pushInDetails-table-selfDefine tbody')
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
                                $('#pushInDetails-note1').text(obj_.data[0].note)
                                $('#pushInDetails-auditor1').text(obj_.data[0].auditor.name)
                                $('#pushInDetails-auditTime1').text((new Date(obj_.data[0].auditTime)).toLocaleDateString())
                                $('#pushInDetails-note2').text(obj_.data[1].note)
                                $('#pushInDetails-auditor2').text(obj_.data[1].auditor.name)
                                $('#pushInDetails-auditTime2').text((new Date(obj_.data[1].auditTime)).toLocaleDateString())
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
物品入库/
 */
function pushInGoods() {
    var purchaseId = $('#pushInDetails-applyHeaderId').text()
    var applyUserId = $('#pushInDetails-applyUserName').attr('value')
    var operatorId = 'zy00001'
    $.ajax({
        url: ipPort + '/godownHeader/add?purchaseHeader.id=' + purchaseId + '&applyUser.id=' + applyUserId + '&operator.id=' + operatorId,
        success: function (obj) {
            if(obj.code == 0){
                alert('入库成功！')
                getAllPurchaseApply()
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
通过参数搜索/
 */
function searchByParas(page_ = 0) {
    currentSearch = -2
    currentPage = page_
    var sortFieldName = 'applyTime'
    var asc = 0
    var status = $('#selectStatus-dropdownMenu').attr('value')
    var staffId = $('#applyStaffId-input').val()
    if(status == '' && staffId != ''){
        $.ajax({
            url: ipPort + '/purchaseHeader/getByApplyUserByPage?id=' + staffId +
                '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&page=' + currentPage,
            success:function (obj) {
                if(obj.code == 0){
                    if(obj.data.content.numberOfElements == 0){
                        alert('无相关信息！')
                        setPurchaseApplyTable(obj)
                    }else{
                        setPurchaseApplyTable(obj)
                    }
                }else{
                    alert(obj.message)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }else if(status != '' && staffId == ''){
        $.ajax({
            url: ipPort + '/purchaseHeader/getByStatueByPage?status=' + status +
                '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&page=' + currentPage,
            success:function (obj) {
                if(obj.code == 0){
                    if(obj.data.content.numberOfElements == 0){
                        alert('无相关信息！')
                        setPurchaseApplyTable(obj)
                    }else{
                        setPurchaseApplyTable(obj)
                    }
                }else{
                    alert(obj.message)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }else if(status != '' && staffId != ''){
        $.ajax({
            url: ipPort + '/purchaseHeader/getByApplyUserAndStatusByPage?id=' + staffId + '&status=' + status +
                '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&page=' + currentPage,
            success:function (obj) {
                if(obj.code == 0){
                    if(obj.data.content.numberOfElements == 0){
                        alert('无相关信息！')
                        setPurchaseApplyTable(obj)
                    }else{
                        setPurchaseApplyTable(obj)
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
    if(currentSearch == -1){
        getAllPurchaseApply(currentPage)
    }else  if(currentSearch == -2){
        searchByParas(currentPage)
    }
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
    if(currentSearch == -1){
        getAllPurchaseApply(currentPage)
    }else  if(currentSearch == -2){
        searchByParas(currentPage)
    }
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
    if(currentSearch == -1){
        getAllPurchaseApply(currentPage)
    }else  if(currentSearch == -2){
        searchByParas(currentPage)
    }
}