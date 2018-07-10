/*
获取所有物品基本信息/
 */
function getAllGoodsBaseInformation() {
    $.ajax({
        url: ipPort + '/material/getAllByPage',
        success:function (obj) {
            if(obj.code == 0){
                console.log(obj)
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
function setGoodsBaseInformation() {
    
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