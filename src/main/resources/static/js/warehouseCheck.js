var currentPage = 0
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
})
/*
获取所有库存/
 */
function getAllStock() {
    currentPage = 0
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
function searchByName() {
    currentPage = 0
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
function getAllLossEntry() {
    currentPage = 0
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
                //setAllLossEntryTable(obj)
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
设置报损table/
 */
function setAllLossEntryTable(obj) {
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
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/contract/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setContractTableInformation(obj)
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
function nextPage(str) {
    var currentPage_ = $(str).find('.currentPage').text()
    var totalPage_ = $(str).find('.totalPage').text()
    if(currentPage_ == totalPage_){
        alert("已经是最后一页！")
        return
    }
    currentPage++
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/contract/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setContractTableInformation(obj)
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
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/contract/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setContractTableInformation(obj)
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}