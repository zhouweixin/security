$(document).ready(function () {

});

function getCLateType(){
    if($('#page_num').val()==''){
        var  page=0;
    }else page = $('#page_num').val()
    var size = 5
    var sortFieldName = 'id'
    var asc = 1
    var urlStr =  'http://39.108.89.212:8080/security/scheduleLteType/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    // alert(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            setCLateType(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })

}
function setCLateType(){
    var table_tr = $('.table-tr');
    var slt_name = $('.name');
    var class_id = $('.schedule');
    var late_id =$('.late-type');

    for(var i = 0; i < obj.data.numberOfElements; i++){
        table_tr.eq(i).removeClass('hidden');
        slt_name.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" + obj.data.content[i].id + "'" + ">"+obj.data.content[i].id);
        class_id.eq(i).text(obj.data.content[i].name);
        late_id.eq(i).text(obj.data.content[i].name);

    }
    for (var i = obj.data.numberOfElements; i < 5; i++){
        table_tr.eq(i).addClass('hidden')
    }
}


function searchById(){

}