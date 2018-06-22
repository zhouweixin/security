$(document).ready(function () {
    $('#select-all').on('click', function () {
        if(this.checked == true){
            $('.select-sub-box').prop('checked',true)
        }
        else{
            $('.select-sub-box').prop('checked',false)
        }
    })

    getAllResignTypeInformation()
})
/*
/添加离职类型
 */
function addResignType() {
    var ResignTypeName = $('#modal-ResignTypeName').val()
    if(!ResignTypeName){
        alert("请输入离职类型名称！")
        return
    }else{
        var urlStr = ipPort + '/resignType/add?name=' + ResignTypeName
        console.log(urlStr)
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 8){
                    alert(obj.message)
                }else{
                    alert(obj.message)
                    getAllResignTypeInformation()
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }
}
/*
设置修改面板信息/
 */
function setModifyModalInformation(obj) {
    var td = $(obj).parent().parent().find('td')
    $('#modal-modifyResignTypeID').val(td.eq(0).text())
    $('#modal-modifyResignTypeName').val(td.eq(1).text())
}
/*
修改离职类型信息/
 */
function modifyResignType() {
    var ResignTypeID = $('#modal-modifyResignTypeID').val()
    var ResignTypeName = $('#modal-modifyResignTypeName').val()
    if(!ResignTypeName){
        alert("名称不可为空！")
        return
    }
    var urlStr = ipPort + '/resignType/update?id='+ ResignTypeID + "&name=" + ResignTypeName
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert("修改离职类型信息成功！")
                getAllResignTypeInformation()
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
删除离职类型信息/
 */
function deleteResignType(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var ResignTypeID = td.eq(0).text()
    var urlStr = ipPort + '/resignType/deleteById?id='+ ResignTypeID
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert("删除离职类型信息成功！")
                getAllResignTypeInformation()
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
批量删除离职类型信息/
 */
function deleteResignTypeInBatch() {
    var select_sub_box = $('.select-sub-box')
    var jsonArr = []
    for(var i = 0; i < select_sub_box.length; i++){
        if(select_sub_box.eq(i).is(':checked') == true){
            var json = {}
            json['id'] = parseInt(select_sub_box.eq(i).attr('value'));
            jsonArr.push(json)
        }
    }
    let myjson = JSON.stringify(jsonArr)
    var urlStr = ipPort + '/resignType/deleteByIdBatch'
    $.ajax({
        url:urlStr,
        contentType:'application/json',
        data:myjson,
        dataType:'json',
        type:'post',
        success:function (obj) {
            if(obj.code == 0){
                alert("批量删除离职类型信息成功！")
                getAllResignTypeInformation()
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
通过名称搜索离职类型信息/
 */
function searchResignTypeByName() {
    var ResignTypeName = $('#search-ResignTypeName').val()
    if(!ResignTypeName){
        alert('请输入离职类型名称')
        return
    }
    var page = 0
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/resignType/getByNameLikeByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&name=' + ResignTypeName
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert("未搜索到信息")
                    return
                }
                setResignTypeTableInformation(obj)
            }else {
                alert("请输入离职类型名称")
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取全部离职类型信息/
 */
function getAllResignTypeInformation() {
    var page = 0
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/resignType/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            setResignTypeTableInformation(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置离职类型table信息/
 */
function setResignTypeTableInformation(obj) {
    var table_tr = $('.table-tr')
    var ResignType_id = $('.resignType-id')
    var ResignType_name = $('.resignType-name')
    for(var i = 0; i < obj.data.numberOfElements; i++){
        table_tr.eq(i).removeClass('hidden')
        ResignType_id.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value=\"" + obj.data.content[i].id + "\"" + ">" + obj.data.content[i].id)
        ResignType_name.eq(i).text(obj.data.content[i].name)
    }
    for (var i = obj.data.numberOfElements; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
}