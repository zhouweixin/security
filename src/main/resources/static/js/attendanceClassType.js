$(document).ready(function () {
    var activeNumbersOfWork;
    $('.numbersOfWork').on('click', function () {
        if(!activeNumbersOfWork){
            activeNumbersOfWork = $(this);
            activeNumbersOfWork.addClass('active')
        }else{
            var previousNumbersOfWork = activeNumbersOfWork;
            previousNumbersOfWork.removeClass('active');
            activeNumbersOfWork = $(this);
            activeNumbersOfWork.addClass('active')
        }

    });

    $('#select-all').on('click', function () {
        if(this.checked == true){
            $('.select-sub-box').prop('checked',true)
        }
        else{
            $('.select-sub-box').prop('checked',false)
        }
    });
    getAllScheduleInformation()
});


function getClassType(){
    if($('#page_num').val()==''){
      var  page=0;
    }else page = $('#page_num').val()
    var size = 5
    var sortFieldName = 'id'
    var asc = 1
    var urlStr =  'http://39.108.89.212:8080/security/scheduleType/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
   // alert(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            setScheduleType(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })
}
function setScheduleType(obj) {
    var table_tr = $('.table-tr');
    var st_id = $('.id');
    var st_name = $('.name');
    var worktime1 = $('.startWorkTime');
    var worktime2 = $('.endWorkTime');
    var btime = $('.beforeTime');
    var atime = $('.afterTime');
    var breaktime1 = $('.startBreakTime');
    var breaktime2 = $('.endBreakTime');
    var s_id= $('.schedule');
    for(var i = 0; i < obj.data.numberOfElements; i++){
        table_tr.eq(i).removeClass('hidden');
        st_id.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" + obj.data.content[i].id + "'" + ">"+obj.data.content[i].id);
        st_name.eq(i).text(obj.data.content[i].name);
        worktime1.eq(i).text(obj.data.content[i].startTime);
        worktime2.eq(i).text(obj.data.content[i].endTime);
        breaktime1.eq(i).text(obj.data.content[i].startBreakTime);
        breaktime2.eq(i).text(obj.data.content[i].endBreakTime);
        btime.eq(i).text(obj.data.content[i].beforeMinute);
        atime.eq(i).text(obj.data.content[i].afterMinute);
        s_id.eq(i).text(obj.data.content[i].schedule.id);

    }
    for (var i = obj.data.numberOfElements; i < 5; i++){
        table_tr.eq(i).addClass('hidden')
    }
}

function deleteClass(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var classID = td.eq(0).text()
    var urlStr =  'http://39.108.89.212:8080/security/scheduleType/deleteById?id='+ classID
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert("删除成功！")
                getClassType()
            }else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}

function searchCByName() {
    if($('#page_num').val()==''){
        var page=0
    }else page =$('#page_num').val();
    var size = 5;
    var sortFieldName = 'id';
    var asc = 1;
    var name =$('#Cname').val();
    var urlStr = 'http://39.108.89.212:8080/security/scheduleType/getByNameLikeByPage?page='+ page +'&name='+ name + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
   // alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setScheduleType(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })
}