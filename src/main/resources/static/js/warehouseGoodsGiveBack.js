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
    /*
    搜索添加回车绑定事件/
     */
    $('#giveBack-name').on('keypress', function (event) {
        if(event.keyCode == '13'){
            searchByParas()
        }
    })
})
/*
获取所有物品用户关系/
 */
function getAllMaterialUserBypage(page_ = 0) {
    currentSearch = -1
    currentPage = page_
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
通过参数获取物品用户关系/
 */
function searchByParas(page_ = 0) {
    currentSearch = -2
    var name = $('#giveBack-name').val()
    var status = $('#giveBack-status').attr('value')
    currentPage = page_
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/gooutMaterialUser/getByStatusAndNameLikeByPage?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc + '&status=' + status + '&userName=' + name
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            console.log(obj)
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
        url: ipPort + '/gooutMaterialUser/returnMaterials?gooutMaterialUserIds=' + materialID + '&userIds=' + userID + '&operatorId=' + window.localStorage.userID,
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
        getAllMaterialUserBypage(currentPage)
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
        getAllMaterialUserBypage(currentPage)
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
        getAllMaterialUserBypage(currentPage)
    }else  if(currentSearch == -2){
        searchByParas(currentPage)
    }
}