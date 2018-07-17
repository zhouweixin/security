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
    $.ajax({
        url: ipPort + '/stock/getAllByPage',
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
    console.log(obj)
    var id = $('.allWarehouseGoodsInformation-goodsId')
    var name = $('.allWarehouseGoodsInformation-goodsName')
    var unit = $('.allWarehouseGoodsInformation-unit')
    var number = $('.allWarehouseGoodsInformation-goodsNumber')
    var tr = $('#allWarehouseGoodsInformationPanel .table-tr')
    for(var i = 0; i < obj.data.numberOfElements; i++){
        tr.eq(i).removeClass('hidden')
        id.eq(i).text('')
        name.eq(i).text('')
        unit.eq(i).text('')
        number.eq(i).text('')
        id.eq(i).text(obj.data.content[i].material.id)
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
    var name = $('#allWarehouseGoodsInformation-goodsName-input').val()
    $.ajax({
        url:ipPort + '/stock/getByMaterialNameLikeByPage?name=' + name,
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

}