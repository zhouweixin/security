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
                console.log(obj)
            }else{
                alert(obj.message)
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}