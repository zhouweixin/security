var currentPage = 0
var deleteID = ''
/*
currentSearch == -1 库存全部搜索
currentSearch == -2 库存条件搜索
currentSearch == -3 报损表全部搜索
currentSearch == -4 报损表条件搜索/
 */
var currentSearch = -1

$(document).ready(function () {
    /*
    申请报损按钮/
     */
    $('.applyReportSpoiledButton').on('click',function () {
        $('#allWarehouseGoodsInformationPanel').addClass('hidden')
        $('#reportSpoiledPanel').removeClass('hidden')
    })
    /*
    左箭头按钮/
     */
    $('.path-arrow-left').on('click', function () {
        $('#reportSpoiledPanel').addClass('hidden')
        $('#reportSpoiledTablePanel').addClass('hidden')
        $('#allWarehouseGoodsInformationPanel').removeClass('hidden')
    })
    /*
    查看报损表/
     */
    $('.lookReportSpoiledTable').on('click', function () {
        $('#allWarehouseGoodsInformationPanel').addClass('hidden')
        $('#reportSpoiledPanel').addClass('hidden')
        $('#reportSpoiledTablePanel').removeClass('hidden')
    })
    getAllStock()
    /*
    搜索添加回车绑定事件/
     */
    $('#allWarehouseGoodsInformation-goodsName-input').on('keypress', function (event) {
        if(event.keyCode == '13'){
            searchByName()
        }
    })
    $('#reportSpoiledTablePanel-goodsName').on('keypress', function (event) {
        if(event.keyCode == '13'){
            searchLossEntryByParas()
        }
    })
})
/*
获取所有库存/
 */
function getAllStock(page_ = 0) {
    currentSearch = -1
    currentPage = page_
    var page = currentPage
    $.ajax({
        url: ipPort + '/stock/getAllByPage?page=' + page,
        success: function (obj) {
            if(obj.code == 0){
                setAllStockTable(obj)
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
设置所有库存表/
 */
function setAllStockTable(obj) {
    $('#allWarehouseGoodsInformationPanel .currentPage').text(currentPage + 1)
    $('#allWarehouseGoodsInformationPanel .totalPage').text(obj.data.totalPages)
    var id = $('.allWarehouseGoodsInformation-goodsId')
    var name = $('.allWarehouseGoodsInformation-goodsName')
    var unit = $('.allWarehouseGoodsInformation-unit')
    var number = $('.allWarehouseGoodsInformation-goodsNumber')
    var tr = $('#allWarehouseGoodsInformationPanel .table-tr')
    for(var i = 0; i < obj.data.numberOfElements; i++){
        tr.eq(i).removeClass('hidden')
        id.eq(i).text('')
        id.eq(i).attr('value', '')
        name.eq(i).text('')
        unit.eq(i).text('')
        number.eq(i).text('')
        id.eq(i).text(obj.data.content[i].material.id)
        id.eq(i).attr('value', obj.data.content[i].id)
        name.eq(i).text(obj.data.content[i].material.name)
        unit.eq(i).text(obj.data.content[i].material.unit)
        number.eq(i).text(obj.data.content[i].number)
    }
    for(var i = obj.data.numberOfElements; i < 10; i++){
        tr.eq(i).addClass('hidden')
    }
}
/*
通过物品名称搜索/
 */
function searchByName(page_ = 0) {
    currentSearch = -2
    currentPage = page_
    var page = currentPage
    var name = $('#allWarehouseGoodsInformation-goodsName-input').val()
    $.ajax({
        url:ipPort + '/stock/getByMaterialNameLikeByPage?name=' + name + '&page=' + page,
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert('无相关信息！')
                    setAllStockTable(obj)
                }else{
                    setAllStockTable(obj)
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
设置报损单/
 */
function setReportSpoiledPanel(thisObj) {
    var parent = $(thisObj).parent().parent()
    $('#reportSpoiledPanel-applyName').text('李四')
    $('#reportSpoiledPanel-applyName').attr('value', 'zy00001')
    var td = $('#reportSpoiledPanel table tbody').find('td')
    td.eq(0).text(parent.find('.allWarehouseGoodsInformation-goodsId').text())
    td.eq(1).text(parent.find('.allWarehouseGoodsInformation-goodsName').text())
    td.eq(2).text(parent.find('.allWarehouseGoodsInformation-goodsNumber').text())
    td.eq(0).attr('value', parent.find('.allWarehouseGoodsInformation-goodsId').attr('value'))
}
/*
提交报损单/
 */
function submitReportSpoiled() {
    var td = $('#reportSpoiledPanel table tbody').find('td')
    var storeId = td.eq(0).attr('value')
    var goodsId = td.eq(0).text()
    var applyId = $('#reportSpoiledPanel-applyName').attr('value')
    var lossNum = td.eq(3).find('input').val()
    var restNum = td.eq(2).text()
    var stockNum = parseInt(lossNum) + parseInt(restNum)
    var reason = $('#reportSpoiledPanel-reason').val()

    var urlStr = ipPort + '/lossEntry/add?stock.id='+ storeId + '&material.id=' + goodsId + '&applyUser.id=' + applyId
        + '&stockNumber=' + stockNum + '&lossNumber=' + lossNum + '&restNumber=' + restNum + '&reason=' + reason
    console.log(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert('提交成功！')
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
获取所有报损表/
 */
function getAllLossEntry(page_ = 0) {
    currentSearch = -3
    currentPage = page_
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/lossEntry/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            console.log(obj)
            if(obj.code == 0){
                setAllLossEntryTable(obj)
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
通过参数搜索报损表/
 */
function searchLossEntryByParas(page_ = 0) {
    currentSearch = -4
    currentPage = page_
    var page = currentPage
    var status = $('#selectStatus-dropdownMenu').attr('value')
    var name = $('#reportSpoiledTablePanel-goodsName').val()
    if(status == '' && name != ''){
        $.ajax({
            url: ipPort + '/lossEntry/getByMaterialNameLikeByPage?name=' + name + '&page=' + page,
            success:function (obj) {
                if(obj.code == 0){
                    if(obj.data.content.numberOfElements == 0){
                        alert('无相关信息！')
                        setAllLossEntryTable(obj)
                    }else{
                        setAllLossEntryTable(obj)
                    }
                }else{
                    alert(obj.message)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }else {
        $.ajax({
            url: ipPort + '/lossEntry/getByStatusAndMaterialNameLikeByPage?status=' + status + '&name=' + name + '&page=' + page,
            success:function (obj) {
                if(obj.code == 0){
                    if(obj.data.content.numberOfElements == 0){
                        alert('无相关信息！')
                        setAllLossEntryTable(obj)
                    }else{
                        setAllLossEntryTable(obj)
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
/*
设置报损table/
 */
function setAllLossEntryTable(obj) {
    $('#reportSpoiledTablePanel .currentPage').text(currentPage + 1)
    $('#reportSpoiledTablePanel .totalPage').text(obj.data.totalPages)
    var id = $('.reportSpoiledTablePanel-goodsID')
    var name = $('.reportSpoiledTablePanel-goodsName')
    var applyUserName = $('.reportSpoiledTablePanel-applyUserName')
    var stockNumber = $('.reportSpoiledTablePanel-stockNumber')
    var lossNumber = $('.reportSpoiledTablePanel-lossNumber')
    var applyTime = $('.reportSpoiledTablePanel-applyTime')
    var reason = $('.reportSpoiledTablePanel-reason')
    var status = $('.reportSpoiledTablePanel-status')
    var deleteA = $('.reportSpoiledTablePanel-delete').find('a')
    var tr = $('#reportSpoiledTablePanel .table-tr')
    for(var i = 0; i < obj.data.numberOfElements; i++){
        tr.eq(i).removeClass('hidden')
        deleteA.eq(i).attr('onclick', 'setMakeSureDeleteModal(this)')
        deleteA.eq(i).css('color', '#337ab7')
        deleteA.eq(i).css('cursor', 'pointer')
        id.eq(i).text(obj.data.content[i].material.id)
        id.eq(i).attr('value', obj.data.content[i].id)
        name.eq(i).text(obj.data.content[i].material.name)
        applyUserName.eq(i).text(obj.data.content[i].applyUser.name)
        applyUserName.eq(i).attr('value', obj.data.content[i].id)
        stockNumber.eq(i).text(obj.data.content[i].stockNumber)
        lossNumber.eq(i).text(obj.data.content[i].lossNumber)
        applyTime.eq(i).text(new Date(obj.data.content[i].applyTime).toLocaleDateString())
        reason.eq(i).text(obj.data.content[i].reason)
        switch (obj.data.content[i].status) {
            case 0:status.eq(i).text('未审核');break;
            case 1:status.eq(i).text('通过');
                deleteA.eq(i).removeAttr('onclick');
                deleteA.eq(i).css('color', '#5A5A5A');
                deleteA.eq(i).css('cursor', 'default');
                break;
            case 2:status.eq(i).text('未通过');break;
            case 3:status.eq(i).text('无需审核');
                deleteA.eq(i).removeAttr('onclick');
                deleteA.eq(i).css('color', '#5A5A5A');
                deleteA.eq(i).css('cursor', 'default');
                break;
            break;
        }
    }
    for(var i = obj.data.numberOfElements; i < 10; i++){
        tr.eq(i).addClass('hidden')
    }
}
/*
设置报损详情modal/
 */
function setReportSpoiledDetailsModal(thisObj) {
    var parent = $(thisObj).parent().parent()
    var id = parent.find('.reportSpoiledTablePanel-goodsID').attr('value')
    $('#myModal-reportSpoiledDetails').modal('toggle')
    $.ajax({
        url: ipPort + '/lossEntry/getById?id=' + id,
        success: function (obj) {
            console.log(obj)

            $('#myModal-reportSpoiledDetails .applyUserName').text('')
            $('#myModal-reportSpoiledDetails .applyTime').text('')
            $('#myModal-reportSpoiledDetails .applyReason').val('')
            $('#myModal-reportSpoiledDetails .applyStatus').val('')
            $('#myModal-reportSpoiledDetails table tbody').find('td').eq(0).text('')
            $('#myModal-reportSpoiledDetails table tbody').find('td').eq(1).text('')
            $('#myModal-reportSpoiledDetails table tbody').find('td').eq(2).text('')
            $('#myModal-reportSpoiledDetails .note').val('')
            $('#myModal-reportSpoiledDetails .auditor').text('')
            $('#myModal-reportSpoiledDetails .auditTime').text('')

            if (obj.code == 0) {
                $('#myModal-reportSpoiledDetails .applyUserName').text(obj.data.applyUser.name)
                $('#myModal-reportSpoiledDetails .applyTime').text(new Date(obj.data.applyTime).toLocaleDateString())
                $('#myModal-reportSpoiledDetails .applyReason').val(obj.data.reason)
                switch (obj.data.status) {
                    case 0:  $('#myModal-reportSpoiledDetails .applyStatus').text('未审核');break;
                    case 1:  $('#myModal-reportSpoiledDetails .applyStatus').text('通过');break;
                    case 2:  $('#myModal-reportSpoiledDetails .applyStatus').text('未通过');break;
                    case 3:  $('#myModal-reportSpoiledDetails .applyStatus').text('无需审核');break;
                    break;
                }
               var td = $('#myModal-reportSpoiledDetails table tbody').find('td')
                td.eq(0).text(obj.data.material.id)
                td.eq(1).text(obj.data.material.name)
                td.eq(2).text(obj.data.lossNumber)
                $('#myModal-reportSpoiledDetails .note').val(obj.data.note)
                if(obj.data.auditor){
                    $('#myModal-reportSpoiledDetails .auditor').text(obj.data.auditor.name)
                }
                if(obj.data.auditTime){
                    $('#myModal-reportSpoiledDetails .auditTime').text(new Date(obj.data.auditTime).toLocaleDateString())
                }
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
设置删除modal/
 */
function setMakeSureDeleteModal(thisObj) {
    var parent = $(thisObj).parent().parent()
    deleteID = parent.find('.reportSpoiledTablePanel-goodsID').attr('value')
    $('#myModal-makeSureDelete').modal('toggle')
}
/*
确认删除/
 */
function makeSureDelete() {
    $.ajax({
        url: ipPort + '/lossEntry/deleteById?id=' + deleteID,
        success: function (obj) {
            if (obj.code == 0) {
                alert('删除成功！')
                getAllLossEntry()
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
上一页/
 */
function previousPage(str) {
    var currentPage_ = $(str).find('.currentPage').text()
    if(currentPage_ == 1){
        alert("已经是第一页！")
        return
    }
    currentPage--
    if(currentPage < 0){
        currentPage = 0
    }
    if(currentSearch == -1){
        getAllStock(currentPage)
    }else  if(currentSearch == -2){
        searchByName(currentPage)
    }else  if(currentSearch == -3){
        getAllLossEntry(currentPage)
    }else  if(currentSearch == -4){
        searchLossEntryByParas(currentPage)
    }
}
/*
下一页/
 */
function nextPage(str) {
    var currentPage_ = $(str).find('.currentPage').text()
    var totalPage_ = $(str).find('.totalPage').text()
    if(currentPage_ == totalPage_){
        alert("已经是最后一页！")
        return
    }
    currentPage++
    if(currentSearch == -1){
        getAllStock(currentPage)
    }else  if(currentSearch == -2){
        searchByName(currentPage)
    }else  if(currentSearch == -3){
        getAllLossEntry(currentPage)
    }else  if(currentSearch == -4){
        searchLossEntryByParas(currentPage)
    }
}
/*
跳转页/
 */
function skipPage(str) {
    var skipPage_ = parseInt( $(str).find('.skipPage').val())
    var totalPage_ = parseInt( $(str).find('.totalPage').text())
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
        getAllStock(currentPage)
    }else  if(currentSearch == -2){
        searchByName(currentPage)
    }else  if(currentSearch == -3){
        getAllLossEntry(currentPage)
    }else  if(currentSearch == -4){
        searchLossEntryByParas(currentPage)
    }
}