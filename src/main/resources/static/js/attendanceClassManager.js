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

/*-----------------------------------------获取所有的班次信息-------------------------------------------------------------*/
function getAllScheduleInformation() {
    if($('#page_num').val()==''){
        var page=0
    }else page =$('#page_num').val();
    var size = 10;
    var sortFieldName = 'id';
    var asc = 1;
    var urlStr =  'http://39.108.89.212:8080/security/schedule/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
  //  alert(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success: function (obj) {
            setScheduleTableInformation(obj)
         // alert(obj.message)
        },
        error:function (error) {
            console.log(error);
            alert("error")
        }
    })
}

function setScheduleTableInformation(obj) {
    var table_tr = $('.table-tr');
    var schedule_id = $('.class-id');
    var schedule_name = $('.class-name');
    for(var i = 0; i < obj.data.numberOfElements; i++){
        table_tr.eq(i).removeClass('hidden');
        schedule_id.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" + obj.data.content[i].id + "'" + ">"+obj.data.content[i].id);
        schedule_name.eq(i).text(obj.data.content[i].name);

    }
    for (var i = obj.data.numberOfElements; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
}

/*-----------------------------------------通过ID删除班次信息-------------------------------------------------------------*/
function deleteSchedule(thisObj) {
    var td = $(thisObj).parent().parent().find('td');
    var scheduleID = td.eq(0).text();
   // alert(scheduleID)
    var urlStr =  'http://39.108.89.212:8080/security/schedule/deleteById?id='+ scheduleID;
   // alert(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert("删除班次信息成功！");
                getAllScheduleInformation()
            }else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}

/*-----------------------------------------添加班次信息-------------------------------------------------------------*/
function addSchedule() {
    var className = $('#modal-className').val();
    if(!className){
        alert("请输入班次名称！");

    }else {
        var urlStr = 'http://39.108.89.212:8080/security/schedule/add?name=' + className;
      //  alert(urlStr)
        $.ajax({
            url: urlStr,
            dataType: 'json',
            success: function (obj) {
                if (obj.code == 8) {
                    alert('新增失败, 部门简称只能是唯一的2位字母！')
                } else {
                    alert(obj.message);
                    getAllScheduleInformation()
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}

/*-----------------------------------------添加班次类型-------------------------------------------------------------*/
function addScheduleType() {
    var classTypeName = $('#modal-classTypeName').val();
    var classId = $('#modal-classId').val();
    var  punchTime1= $('#modal-startPunchTime').val();
    var punchTime2 = $('#modal-goOffPunchTime').val();

    $('#modal-startWorkTime').change(function(){

        $('#modal-startWorkTime').attr("value",$(this).val()); //赋值
    });

    $('#modal-goOffWorkTime').change(function(){

        $('#modal-goOffWorkTime').attr("value",$(this).val()); //赋值
    });

    $('#modal-startBreakTime').change(function(){

        $('#modal-startBreakTime').attr("value",$(this).val()); //赋值
    });

    $('#modal-goOffBreakTime').change(function(){

        $('#modal-goOffBreakTime').attr("value",$(this).val()); //赋值
    });

    var workTime1= $('#modal-startWorkTime').val();
    var workTime2= $('#modal-goOffWorkTime').val();
    var  breakTime1= $('#modal-startBreakTime').val();
    var breakTime2 = $('#modal-goOffBreakTime').val();
    if(!classTypeName){
        alert("请输入班次类型名称！");

    }else {
        var urlStr = 'http://39.108.89.212:8080/security/scheduleType/add?name=' + classTypeName + '&startTime=' + workTime1 + '&endTime=' + workTime2 + '&beforeMinute=' + punchTime1 + '&afterMinute=' + punchTime2
            + '&startBreakTime=' + breakTime1 + '&endBreakTime=' + breakTime2 + '&schedule=' + classId;
        // http://39.108.89.212:8080/security/scheduleType/add?name=%E7%99%BD%E7%8F%AD&startTime=08:00&endTime=12:00&beforeMinute=5&afterMinute=5&startBreakTime=10:00&endBreakTime=10:30&schedule=1
      //  alert(urlStr);
        $.ajax({
            url: urlStr,
            dataType: 'json',
            success: function (obj) {
                if (obj.code == 8) {
                    alert('新增失败, 部门简称只能是唯一的2位字母！')
                } else {
                    alert(obj.message);
                    getAllScheduleInformation()
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}

/*-----------------------------------------通过名称查询班次信息-------------------------------------------------------------*/
function searchScheduleByName() {
    if($('#page_num').val()==''){
        var page=0
    }else page =$('#page_num').val();
    var size = 5;
    var sortFieldName = 'id';
    var asc = 1;
    var name =$('#schedule_name').val();
    var urlStr = 'http://39.108.89.212:8080/security/schedule/getByNameLikeByPage?page='+ page +'&name='+ name + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
  //  alert(urlStr);
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            setScheduleTableInformation(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })

}

/*-----------------------------------------修改班次信息-------------------------------------------------------------*/
function setModifyClass(obj){
    var td = $(obj).parent().parent().find('td')
    $('#modal-modifyClassID').val(td.eq(0).text())
    $('#modal-modifyClassName').val(td.eq(1).text())
}

function modifyClass(){
    var classID = $('#modal-modifyClassID').val()
    var className = $('#modal-modifyClassName').val()
    var urlStr = 'http://39.108.89.212:8080/security/schedule/update?id='+ classID + "&name=" + className
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
                alert(obj.message)
                getAllScheduleInformation()
        },
        error:function (error) {
            console.log(error)
        }
    })
}