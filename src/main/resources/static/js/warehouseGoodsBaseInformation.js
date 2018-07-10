$(document).ready(function () {
    getAllGoodsBaseInformation()
})
/*
获取所有物品基本信息/
 */
function getAllGoodsBaseInformation() {
    $.ajax({
        url: ipPort + '/material/getAllByPage',
        success:function (obj) {
            if(obj.code == 0){
                setGoodsBaseInformationTable(obj)
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
设置物品基本信息表/
 */
function setGoodsBaseInformationTable(obj) {
    var id = $('.goods-id')
    var name = $('.goods-name')
    var unit = $('.goods-unit')
    var tr = $('.table-tr')
    var length = obj.data.numberOfElements
    for(var i = 0; i < length; i++){
        tr.eq(i).removeClass('hidden')
        id.eq(i).text('')
        name.eq(i).text('')
        unit.eq(i).text('')
        id.eq(i).text(obj.data.content[i].id)
        name.eq(i).text(obj.data.content[i].name)
        unit.eq(i).text(obj.data.content[i].unit)
    }
    for(var i = length; i < 10; i++){
        tr.eq(i).addClass('hidden')
    }
}
/*
清空添加物品基本信息modal/
 */
function cleanAddGoodsBaseInformationModal() {
    $('#modal-goodsName').val('')
    $('#modal-goodsUnit').val('')
}
/*
添加物品基本信息/
 */
function addGoodsBaseInformation() {
    var name = $('#modal-goodsName').val()
    if(!name){
        alert('物品名称不为空！')
        return
    }
    var unit = $('#modal-goodsUnit').val()
    if(!unit){
        alert('单位不为空！')
        return
    }
    $.ajax({
        url: ipPort + '/material/add?name=' + name + '&unit=' + unit,
        success:function (obj) {
            if(obj.code == 0){
                alert('添加物品信息成功')
                getAllGoodsBaseInformation()
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
设置修改物品基本信息modal
 */
function setModifyGoodsBaseInformationModal(thisObj) {
    $('#modal-modifyGoodsID').val('')
    $('#modal-modifyGoodsName').val('')
    $('#modal-modifyGoodsUnit').val('')
    var td = $(thisObj).parent().parent().parent().find('td')
    $('#modal-modifyGoodsID').val(td.eq(1).text())
    $('#modal-modifyGoodsName').val(td.eq(2).text())
    $('#modal-modifyGoodsUnit').val(td.eq(3).text())
}
/*
修改物品基本信息/
 */
function modifyGoodsBaseInformation() {
    var name = $('#modal-modifyGoodsName').val()
    if(!name){
        alert('物品名称不能为空！')
        return
    }
    var unit = $('#modal-modifyGoodsUnit').val()
    if(!unit){
        alert('单位不能为空！')
        return
    }
    var id = $('#modal-modifyGoodsID').val()
    $.ajax({
        url: ipPort + '/material/update?id=' + id + '&name=' + name + '&unit=' + unit,
        success:function (obj) {
            if(obj.code == 0){
                alert('修改成功')
                getAllGoodsBaseInformation()
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
function getGoodsBaseInformationByName() {
    var name = $('#goodsName-input').val()
    $.ajax({
        url: ipPort + '/material/getByNameLikeByPage?name=' + name,
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert('未搜索到相关信息')
                    setGoodsBaseInformationTable(obj)
                    return
                }else{
                    setGoodsBaseInformationTable(obj)
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
    console.log(ipPort + '/material/deleteById?id=' + id)
    $.ajax({
        url: ipPort + '/material/deleteById?id=' + id,
        success: function (obj) {
            if (obj.code == 0) {
                alert('删除成功！')
                getAllGoodsBaseInformation()
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
    var urlStr = ipPort + '/material/deleteByIdBatch'
    $.ajax({
        url:urlStr,
        contentType:'application/json',
        data:myjson,
        dataType:'json',
        type:'post',
        success:function (obj) {
            if(obj.code == 0){
                alert("批量删除成功！")
                getAllGoodsBaseInformation()
            }else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}