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

/* ---------------------------------------------获取所有班次类型的信息------------------------------------------------------------------------- */
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
        st_id.eq(i).text(obj.data.content[i].id);
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

/* ---------------------------------------------通过 ID删除班次类型------------------------------------------------------------------------- */
function deleteClassType(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var classTypeID = td.eq(0).text()
    var urlStr =  'http://39.108.89.212:8080/security/scheduleType/deleteById?id='+ classTypeID
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

/* ---------------------------------------------通过名称查询班次类型------------------------------------------------------------------------- */
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

/* ---------------------------------------------修改班次班次类型信息------------------------------------------------------------------------- */
function setModifyModalInformation(obj){
    var td = $(obj).parent().parent().find('td')
    $('#modal-classTypeID').val(td.eq(0).text())
    $('#modal-classTypeName').val(td.eq(1).text())
    $('#modal-startWorkTime').val(td.eq(2).text())
    $('#modal-goOffWorkTime').val(td.eq(3).text())
    $('#modal-startPunchTime').val(td.eq(4).text())
    $('#modal-goOffPunchTime').val(td.eq(5).text())
    $('#modal-startBreakTime').val(td.eq(6).text())
    $('#modal-goOffBreakTime').val(td.eq(7).text())
    $('#modal-classId').val(td.eq(8).text())
}

function modifyScheduleType(){
    var classTypeId =$('#modal-classTypeID').val();
    var classTypeName = $('#modal-classTypeName').val();
    var classId = $('#modal-classId').val();
    var  punchTime1= $('#modal-startPunchTime').val();;
    var punchTime2 = $('#modal-goOffPunchTime').val();
    var workTime1= $('#modal-startWorkTime').val();
    var workTime2= $('#modal-goOffWorkTime').val();
    var  breakTime1= $('#modal-startBreakTime').val();
    var breakTime2 = $('#modal-goOffBreakTime').val();

    if(!classTypeName){
        alert("请输入班次类型名称！");

    }else {
        var urlStr = 'http://39.108.89.212:8080/security/scheduleType/update?name=' + classTypeName + '&id='+ classTypeId + '&startTime=' + workTime1 + '&endTime=' + workTime2 + '&beforeMinute=' + punchTime1 + '&afterMinute=' + punchTime2
            + '&startBreakTime=' + breakTime1 + '&endBreakTime=' + breakTime2 + '&schedule=' + classId;
         //alert(urlStr);
        $.ajax({
            url: urlStr,
            dataType: 'json',
            success: function (obj) {
                    alert(obj.message);
                    getClassType()
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}