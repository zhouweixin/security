$(document).ready(function () {
    var activeNumbersOfWork;
    $('.numbersOfWork').on('click', function () {
        if(!activeNumbersOfWork){
            activeNumbersOfWork = $(this);
            activeNumbersOfWork.modifyClass('active')
        }else{
            var previousNumbersOfWork = activeNumbersOfWork;
            previousNumbersOfWork.removeClass('active');
            activeNumbersOfWork = $(this);
            activeNumbersOfWork.modifyClass('active')
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
   // getAllScheduleInformation()

    /*
    班次类型modal/
     */
    //获取迟到类型
    var addClassTypeSelectLateTypeA = $('.SelectLateType-menu-ul li a')
    getAllLateTypeName(addClassTypeSelectLateTypeA)
    var modifyClassTypeSelectLateTypeA = $('.modifyClassTypeSelectLateType-menu-ul li a')
    getAllLateTypeName(modifyClassTypeSelectLateTypeA)
    //全选checkBox
    $('#select-all-lateType-add').on('click', function () {
        if(this.checked == true){
            $('.select-sub-box-add').prop('checked',true)
        }
        else{
            $('.select-sub-box-add').prop('checked',false)
        }
    })
    $('#select-all-lateType-modify').on('click', function () {
        if(this.checked == true){
            $('.select-sub-box-modify').prop('checked',true)
        }
        else{
            $('.select-sub-box-modify').prop('checked',false)
        }
    })
});

// function getAllScheduleInformation() {
//     if($('#page_num').val()==''){
//         var page=0
//     }else page =$('#page_num').val();
//     var size = 10;
//     var sortFieldName = 'id';
//     var asc = 1;
//     var urlStr =  'http://39.108.89.212:8080/security/schedule/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
//   //  alert(urlStr)
//     $.ajax({
//         url:urlStr,
//         dataType:'json',
//         cache:false,
//         success: function (obj) {
//             setScheduleTableInformation(obj)
//         },
//         error:function (error) {
//             console.log(error);
//             alert("error")
//         }
//     })
// }
//
// function setScheduleTableInformation(obj) {
//     var table_tr = $('.table-tr');
//     var schedule_id = $('.class-id');
//     var schedule_name = $('.class-name');
//     for(var i = 0; i < obj.data.numberOfElements; i++){
//         table_tr.eq(i).removeClass('hidden');
//         schedule_id.eq(i).html("<input class=\"select-box select-sub-box\" type=\"checkbox\"" +  "value='" + obj.data.content[i].id + "'" + ">"+obj.data.content[i].id);
//         schedule_name.eq(i).text(obj.data.content[i].name);
//
//     }
//     for (var i = obj.data.numberOfElements; i < 10; i++){
//         table_tr.eq(i).modifyClass('hidden')
//     }
// }
//
//
// function deleteSchedule(thisObj) {
//     var td = $(thisObj).parent().parent().find('td');
//     var scheduleID = td.eq(0).text();
//    // alert(scheduleID)
//     var urlStr =  'http://39.108.89.212:8080/security/schedule/deleteById?id='+ scheduleID;
//    // alert(urlStr)
//     $.ajax({
//         url:urlStr,
//         dataType:'json',
//         success:function (obj) {
//             if(obj.code == 0){
//                 alert("删除班次信息成功！");
//                 getAllScheduleInformation()
//             }else {
//                 alert(obj.message)
//             }
//         },
//         error:function (error) {
//             console.log(error)
//         }
//     })
// }
//
// function modifySchedule() {
//     var className = $('#modal-className').val();
//     if(!className){
//         alert("请输入班次名称！");
//
//     }else {
//         var urlStr = 'http://39.108.89.212:8080/security/schedule/modify?name=' + className;
//       //  alert(urlStr)
//         $.ajax({
//             url: urlStr,
//             dataType: 'json',
//             success: function (obj) {
//                 if (obj.code == 8) {
//                     alert('新增失败, 部门简称只能是唯一的2位字母！')
//                 } else {
//                     alert(obj.message);
//                     getAllScheduleInformation()
//                 }
//             },
//             error: function (error) {
//                 console.log(error)
//             }
//         })
//     }
// }
//
// function modifyScheduleType() {
//     var classTypeName = $('#modal-classTypeName').val();
//     var classId = $('#modal-classId').val();
//     var  punchTime1= $('#modal-startPunchTime').val();;
//     var punchTime2 = $('#modal-goOffPunchTime').val();
//
//     $('#modal-startWorkTime').change(function(){
//
//         $('#modal-startWorkTime').attr("value",$(this).val()); //赋值
//     });
//
//     $('#modal-goOffWorkTime').change(function(){
//
//         $('#modal-goOffWorkTime').attr("value",$(this).val()); //赋值
//     });
//
//     $('#modal-startBreakTime').change(function(){
//
//         $('#modal-startBreakTime').attr("value",$(this).val()); //赋值
//     });
//
//     $('#modal-goOffBreakTime').change(function(){
//
//         $('#modal-goOffBreakTime').attr("value",$(this).val()); //赋值
//     });
//
//     var workTime1= $('#modal-startWorkTime').val();
//     var workTime2= $('#modal-goOffWorkTime').val();
//     var  breakTime1= $('#modal-startBreakTime').val();
//     var breakTime2 = $('#modal-goOffbreakTime').val();
//     if(!classTypeName){
//         alert("请输入班次类型名称！");
//
//     }else {
//         var urlStr = 'http://39.108.89.212:8080/security/scheduleType/modify?name=' + classTypeName + '&startTime=' + workTime1 + '&endTime=' + workTime2 + '&beforeMinute=' + punchTime1 + '&afterMinute=' + punchTime2
//             + '&startBreakTime=' + breakTime1 + '&endBreakTime=' + breakTime2 + '&schedule=' + classId;
//         // http://39.108.89.212:8080/security/scheduleType/modify?name=%E7%99%BD%E7%8F%AD&startTime=08:00&endTime=12:00&beforeMinute=5&afterMinute=5&startBreakTime=10:00&endBreakTime=10:30&schedule=1
//         alert(urlStr);
//         $.ajax({
//             url: urlStr,
//             dataType: 'json',
//             success: function (obj) {
//                 if (obj.code == 8) {
//                     alert('新增失败, 部门简称只能是唯一的2位字母！')
//                 } else {
//                     alert(obj.message);
//                     getAllScheduleInformation()
//                 }
//             },
//             error: function (error) {
//                 console.log(error)
//             }
//         })
//     }
// }
/*
获取所有迟到类型/
 */
function getAllLateType() {
    $.ajax({
        url: ipPort + '/lateType/getAll',
        dataType: 'json',
        success: function (obj) {
            if (obj.code == 0) {
                setLateTypeTable(obj)
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
设置迟到类型Table/
 */
function setLateTypeTable(obj) {
    if(obj.data.length != 0){
        var table_tr = $('#myModal-lateType').find('.table-tr')
        var lateType_name = $('.lateType-name')
        var lateType_minutes = $('.lateType-minutes')
        for(var  i = 0; i < obj.data.length; i++){
            table_tr.eq(i).removeClass('hidden')
            lateType_name.eq(i).attr('value', obj.data[i].id )
            lateType_name.eq(i).text(obj.data[i].name )
            lateType_minutes.eq(i).text(obj.data[i].minute)
        }
        for (var i = obj.data.length; i < 10; i++){
            table_tr.eq(i).addClass('hidden')
        }
    }
}
/*
设置修改迟到类型modal信息/
 */
function setModifyLateTypeModalInformation(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    $('#modal-modifyLateTypeID').val(td.eq(0).attr('value'))
    $('#modal-modifyLateTypeName').val(td.eq(0).text())
    $('#modal-modifyLateTypeMinutes').val(td.eq(1).text())
}
/*
添加迟到类型/
 */
function addLateType() {
    var name = $('#modal-addLateTypeName').val()
    if(!name){
        alert('请输入名称')
        return
    }
    var minutes = $('#modal-addLateTypeMinutes').val()
    if(!minutes){
        alert('请输入分钟数')
        return
    }
    var urlStr = ipPort + '/lateType/add?name=' + name + '&minute=' + minutes
    $.ajax({
        url: urlStr,
        dataType: 'json',
        success: function (obj) {
            if (obj.code == 0) {
                alert('添加成功！')
                getAllLateType()
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
修改迟到类型/
 */
function modifyLateType() {
    var id = $('#modal-modifyLateTypeID').val()
    var name = $('#modal-modifyLateTypeName').val()
    if(!name){
        alert('请输入名称')
        return
    }
    var minutes = $('#modal-modifyLateTypeMinutes').val()
    if(!minutes){
        alert('请输入分钟数')
        return
    }
    var urlStr = ipPort + '/lateType/update?name=' + name + '&minute=' + minutes + '&id=' + id
    $.ajax({
        url: urlStr,
        dataType: 'json',
        success: function (obj) {
            if (obj.code == 0) {
                alert('修改成功！')
                getAllLateType()
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
设置makeSureDeleteLateTypeModal的value/
 */
function setMakeSureDeleteLateTypeValue(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var id = td.eq(0).attr('value')
    $('#myModal-makeSureDeleteLateType').attr('value', id)
}
/*
删除迟到类型/
 */
function deleteLateType() {
    var id = $('#myModal-makeSureDeleteLateType').attr('value')
    if(!id){
        alert('id为空，请重新确定id！')
        return
    }
    var urlStr = ipPort + '/lateType/deleteById?id=' + id
    $.ajax({
        url: urlStr,
        dataType: 'json',
        success: function (obj) {
            if (obj.code == 0) {
                alert('删除成功！')
                getAllLateType()
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
获取所有班次类型/
 */
function getAllClassType() {
    $.ajax({
        url: ipPort + '/scheduleType/getAll',
        dataType: 'json',
        success: function (obj) {
            if (obj.code == 0) {
                setClassTypeTable(obj)
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
设置班次类型Table/
 */
function setClassTypeTable(obj) {
    if(obj.data.length != 0){
        var table_tr = $('#myModal-classType').find('.table-tr')
        var classType_name = $('.classType-name')
        var classType_startTime = $('.classType-startTime')
        var classType_endTime = $('.classType-endTime')
        var classType_beforeMinute = $('.classType-beforeMinute')
        var classType_afterMinute = $('.classType-afterMinute')
        var classType_startBreakTime = $('.classType-startBreakTime')
        var classType_endBreakTime = $('.classType-endBreakTime')
        var classType_breakPeriod = $('.classType-breakPeriod')
        var classType_workPeriod = $('.classType-workPeriod')
        for(var  i = 0; i < obj.data.length; i++){
            table_tr.eq(i).removeClass('hidden')
            classType_name.eq(i).attr('value', obj.data[i].id )
            classType_name.eq(i).text(obj.data[i].name)
            classType_startTime.eq(i).text(obj.data[i].startTime)
            classType_endTime.eq(i).text(obj.data[i].endTime )
            classType_beforeMinute.eq(i).text(obj.data[i].beforeMinute)
            classType_afterMinute.eq(i).text(obj.data[i].afterMinute )
            classType_startBreakTime.eq(i).text(obj.data[i].startBreakTime )
            classType_endBreakTime.eq(i).text(obj.data[i].endBreakTime)
            classType_breakPeriod.eq(i).text(obj.data[i].breakPeriod )
            classType_workPeriod.eq(i).text(obj.data[i].workPeriod)
        }
        for (var i = obj.data.length; i < 10; i++){
            table_tr.eq(i).addClass('hidden')
        }
    }
}
/*
设置修改班次类型modal信息/
 */
function setModifyClassTypeModalInformation(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    $('#modal-modifyClassTypeID').val(td.eq(0).attr('value'))
    $('#modal-modifyClassTypeName').val(td.eq(0).text())
    $('#modal-modifyClassTypeBeforeMinute').val(td.eq(3).text())
    $('#modal-modifyClassTypeAfterMinute').val(td.eq(4).text())
    $('#modal-modifyClassTypeStartTime').attr('value', td.eq(1).text())
    $('#modal-modifyClassTypeEndTime').attr('value', td.eq(2).text())
    $('#modal-modifyClassTypeStartBreakTime').attr('value', td.eq(5).text())
    $('#modal-modifyClassTypeEndBreakTime').attr('value', td.eq(6).text())
}
/*
添加班次类型/
 */
function addClassType() {
    var name = $('#modal-addClassTypeName').val()
    if(!name){
        alert('请输入名称')
        return
    }
    var classID = $('#modal-addClassID').val()
    if(!classID){
        alert('请输入班次')
        return
    }
    var beforeMinutes = $('#modal-addClassTypeBeforeMinute').val()
    if(!beforeMinutes){
        alert('请输入打卡时间')
        return
    }
    var afterMinutes = $('#modal-addClassTypeAfterMinute').val()
    if(!afterMinutes){
        alert('请输入打卡时间')
        return
    }
    var startTime = $('#modal-addClassTypeStartTime').val()
    if(!startTime){
        alert('请输入上下班时间')
        return
    }
    var endTime = $('#modal-addClassTypeEndTime').val()
    if(!endTime){
        alert('请输入上下班时间')
        return
    }
    var startBreakTime = $('#modal-addClassTypeStartBreakTime').val()
    if(!startBreakTime){
        alert('请输入休息时间')
        return
    }
    var endBreakTime = $('#modal-addClassTypeEndBreakTime').val()
    if(!endBreakTime){
        alert('请输入休息时间')
        return
    }
    var urlStr = ipPort + '/scheduleType/add?name=' + name + '&beforeMinute=' + beforeMinutes + '&afterMinute=' + afterMinutes + '&startTime=' + startTime
        + '&endTime=' + endTime + '&startBreakTime=' + startBreakTime + '&endBreakTime=' + endBreakTime + '&schedule=' + classID
    $.ajax({
        url: urlStr,
        dataType: 'json',
        success: function (obj) {
            if (obj.code == 0) {
                alert('添加成功！')
                getAllClassType()
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
修改班次类型/
 */
function modifyClassType() {
    var id = $('#modal-modifyClassTypeID').val()
    var name = $('#modal-modifyClassTypeName').val()
    if(!name){
        alert('请输入名称')
        return
    }
    var classID = $('#modal-modifyClassID').val()
    if(!classID){
        alert('请输入班次')
        return
    }
    var beforeMinutes = $('#modal-modifyClassTypeBeforeMinute').val()
    if(!beforeMinutes){
        alert('请输入打卡时间')
        return
    }
    var afterMinutes = $('#modal-modifyClassTypeAfterMinute').val()
    if(!afterMinutes){
        alert('请输入打卡时间')
        return
    }
    var startTime = $('#modal-modifyClassTypeStartTime').val()
    if(!startTime){
        alert('请输入上下班时间')
        return
    }
    var endTime = $('#modal-modifyClassTypeEndTime').val()
    if(!endTime){
        alert('请输入上下班时间')
        return
    }
    var startBreakTime = $('#modal-modifyClassTypeStartBreakTime').val()
    if(!startBreakTime){
        alert('请输入休息时间')
        return
    }
    var endBreakTime = $('#modal-modifyClassTypeEndBreakTime').val()
    if(!endBreakTime){
        alert('请输入休息时间')
        return
    }
    var urlStr = ipPort + '/scheduleType/update?name=' + name + '&beforeMinute=' + beforeMinutes + '&afterMinute=' + afterMinutes + '&startTime=' + startTime
        + '&endTime=' + endTime + '&startBreakTime=' + startBreakTime + '&endBreakTime=' + endBreakTime + '&schedule=' + classID + '&id=' + id
    console.log(urlStr)
    $.ajax({
        url: urlStr,
        dataType: 'json',
        success: function (obj) {
            if (obj.code == 0) {
                alert('修改成功！')
                getAllClassType()
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
设置makeSureDeleteClassTypeModal的value/
 */
function setMakeSureDeleteClassTypeValue(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var id = td.eq(0).attr('value')
    $('#myModal-makeSureDeleteClassType').attr('value', id)
}
/*
删除班次类型/
 */
function deleteClassType() {
    var id = $('#myModal-makeSureDeleteClassType').attr('value')
    if(!id){
        alert('id为空，请重新确定id！')
        return
    }
    var urlStr = ipPort + '/scheduleType/deleteById?id=' + id
    $.ajax({
        url: urlStr,
        dataType: 'json',
        success: function (obj) {
            if (obj.code == 0) {
                alert('删除成功！')
                getAllClassType()
            } else {
                alert(obj.message);
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}