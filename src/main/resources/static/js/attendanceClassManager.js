$(document).ready(function () {
    var activeNumbersOfWork
    $('.numbersOfWork').on('click', function () {
        if(!activeNumbersOfWork){
            activeNumbersOfWork = $(this)
            activeNumbersOfWork.addClass('active')
        }else{
            var previousNumbersOfWork = activeNumbersOfWork
            previousNumbersOfWork.removeClass('active')
            activeNumbersOfWork = $(this)
            activeNumbersOfWork.addClass('active')
        }

    })

    $('#select-all').on('click', function () {
        if(this.checked == true){
            $('.select-sub-box').prop('checked',true)
        }
        else{
            $('.select-sub-box').prop('checked',false)
        }
    })
    getAllScheduleInformation()
})

function getAllScheduleInformation() {
    if($('#page_num').val()==''){
        var page=0
    }else page =$('#page_num').val();
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr =  'http:127.0.0.1:9000/security/schedule/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    alert(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success: function (obj) {
           // setScheduleTableInformation(obj)
          alert(obj.message)
        },
        error:function (error) {
            console.log(error)
            alert("error")
        }
    })
}

function setScheduleTableInformation(obj) {
    var table_tr = $('.table-tr')
    var schedule_id = $('.class-id')
    var schedule_name = $('.class-name')
    for(var i = 0; i < obj.data.numberOfElements; i++){
        table_tr.eq(i).removeClass('hidden');
        schedule_id.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" + obj.data.content[i].id + "'" + ">"+obj.data.content[i].id);
        schedule_name.eq(i).text(obj.data.content[i].name);

    }
    for (var i = obj.data.numberOfElements; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
}


function deleteSchedule(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var scheduleID = td.eq(0).text()
    var urlStr = ipPort + '/schedule/deleteById?id='+ scheduleID
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert("删除班次信息成功！")
                getAllDepartmentInformation()
            }else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}

