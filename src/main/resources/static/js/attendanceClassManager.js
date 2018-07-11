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
    getAllClassInformation()
    /*
    班次类型modal/
     */
    //获取迟到类型
    var addClassTypeSelectLateTypeA = $('.SelectLateType-menu-ul li a')
    getAllLateTypeName(addClassTypeSelectLateTypeA)
    var modifyClassTypeSelectLateTypeA = $('.modifyLateType-menu-ul li a')
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
获取所有班次信息/
 */
function getAllClassInformation() {
    var page = 0
    var size = 10;
    var sortFieldName = 'id';
    var asc = 1;
    var urlStr = ipPort +  '/schedule/getAllByPage?page= '+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc;
    $.ajax({
        url:urlStr,
        dataType:'json',
        cache:false,
        success:function (obj) {
            if(obj.code == 0){
                setAllClassTable(obj)
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
设置班次Table/
 */
function setAllClassTable(obj) {
    var table_tr = $('.table-tr');
    if(obj.data.numberOfElements != 0){
        var class_name = $('.class-name');
        var class_classTypeName = $('.class-classTypeName');
        var class_lateTypeName = $('.class-lateTypeName');
        for(var i = 0; i < obj.data.numberOfElements; i++){
            table_tr.eq(i).removeClass('hidden');

            class_name.eq(i).attr('value','');
            class_name.eq(i).attr('value',obj.data.content[i].id);
            class_name.eq(i).text('');
            class_name.eq(i).text(obj.data.content[i].name);

            var classTypeIds = ''
            var classTypeName = '<span>'
            for(var j = 0; j < obj.data.content[i].scheduleTypes.length; j++){
                if(j != obj.data.content[i].scheduleTypes.length - 1){
                    classTypeIds = classTypeIds + obj.data.content[i].scheduleTypes[j].id + '_'
                    classTypeName = classTypeName + obj.data.content[i].scheduleTypes[j].name + '<br>'
                }else{
                    classTypeIds = classTypeIds + obj.data.content[i].scheduleTypes[j].id
                    classTypeName = classTypeName + obj.data.content[i].scheduleTypes[j].name + '</span>'
                }
            }
            class_classTypeName.eq(i).attr('value', '')
            class_classTypeName.eq(i).attr('value', classTypeIds)
            class_classTypeName.eq(i).html('')
            class_classTypeName.eq(i).html(classTypeName)

            var lateTypeIds = ''
            var lateTypeName = '<span>'
            for(var j = 0; j < obj.data.content[i].lateTypes.length; j++){
                if(j != obj.data.content[i].lateTypes.length - 1){
                    lateTypeIds = lateTypeIds + obj.data.content[i].lateTypes[j].id + '_'
                    lateTypeName = lateTypeName + obj.data.content[i].lateTypes[j].name + '<br>'
                }else{
                    lateTypeIds = lateTypeIds + obj.data.content[i].lateTypes[j].id
                    lateTypeName = lateTypeName + obj.data.content[i].lateTypes[j].name + '</span>'
                }
            }
            class_lateTypeName.eq(i).attr('value', '')
            class_lateTypeName.eq(i).attr('value', lateTypeIds)
            class_lateTypeName.eq(i).html('')
            class_lateTypeName.eq(i).html(lateTypeName)

            //调整table中内容的格式
            var td = table_tr.eq(i).find('td')
            var tr_height = table_tr.eq(i).outerHeight(true)
            var margin_top = (tr_height - 18)/2 - 5
            td.eq(0).find('input').css('marginTop', margin_top)
            var padding_top = (tr_height - 14)/2
            td.eq(1).css('paddingTop', padding_top)
            var span_height = td.eq(2).find('span').height()
            padding_top = (tr_height - span_height)/2
            td.eq(2).css('paddingTop', padding_top)
            span_height = td.eq(3).find('span').height()
            padding_top = (tr_height - span_height)/2
            td.eq(3).css('paddingTop', padding_top)
            var div_height = td.eq(4).find('div').height()
            padding_top = (tr_height - div_height)/2
            td.eq(4).css('paddingTop', padding_top)
            var a_height = td.eq(5).find('a').height() + 4
            padding_top = (tr_height - a_height)/2
            td.eq(5).css('paddingTop', padding_top)
        }
        for (var i = obj.data.numberOfElements; i < 10; i++) {
            table_tr.eq(i).addClass('hidden')
        }
    }else{
        for (var i = 0; i < 10; i++) {
            table_tr.eq(i).addClass('hidden')
        }
    }
}
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
        + '&endTime=' + endTime + '&startBreakTime=' + startBreakTime + '&endBreakTime=' + endBreakTime
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
        + '&endTime=' + endTime + '&startBreakTime=' + startBreakTime + '&endBreakTime=' + endBreakTime + '&id=' + id
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
/*********************************************班次*******************************************************/
/*
添加班次/
 */
function addMyClass() {
    var className = $('#modal-className').val()
    if(!className){
        alert("请输入班次名称！")
        return
    }
    if(!$('#modal-selectClassType').val()){
        alert("请选择班次类型！")
        return
    }
    var classType = $('#modal-selectClassType').attr('value').split('_')

    var li = $('.SelectLateType-menu-ul').find('li')
    var li_hidden = $('.SelectLateType-menu-ul').find('li.hidden')
    var lateType = []
    for(var i = 0; i < li.length - li_hidden.length; i++){
        if(li.eq(i).find('.select-sub-box-add').is(':checked') == true){
            lateType.push(li.eq(i).find('a').attr('value'))
        }
    }
    var urlStr = ipPort + '/schedule/add?name=' + className + '&scheduleTypeIds=' + classType + '&lateTypeIds=' + lateType
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            console.log(obj)
            if(obj.code == 0){
                alert('添加班次成功')
                getAllClassInformation()
            }
            else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
清空添加班次Modal/
 */
function emptyAddClassModal() {
    $('#modal-className').val('')
    $('#modal-selectClassType').attr('value', '')
    $('#modal-selectClassType').val('')
    $('#select-all-lateType-add').prop('checked',false)
    $('.select-sub-box-add').prop('checked',false)
}
/*
设置修改班次Modal/
 */
function setModifyClassModal(thisObj) {
    $('#modal-modifyClassID').val('')
    $('#modal-modifyClassName').val('')
    $('#modal-modifyClassType').attr('value', '')
    $('#modal-modifyClassType').val('')
    $('#select-all-lateType-modify').prop('checked',false)
    $('.select-sub-box-modify').prop('checked',false)
    var classID = $(thisObj).parent().parent().parent().find('td').eq(1).attr('value')
    $.ajax({
        url:ipPort + '/schedule/getById?id=' + classID,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                $('#modal-modifyClassID').val(obj.data.id)
                $('#modal-modifyClassName').val(obj.data.name)
                var scheduleTypeIds = ''
                var scheduleTypeName = ''
                for(var i = 0; i < obj.data.scheduleTypes.length; i++){
                    if(i != obj.data.scheduleTypes.length - 1){
                        scheduleTypeIds = scheduleTypeIds + obj.data.scheduleTypes[i].id + '_'
                        scheduleTypeName = scheduleTypeName + obj.data.scheduleTypes[i].name + '、'
                    }else{
                        scheduleTypeIds = scheduleTypeIds + obj.data.scheduleTypes[i].id
                        scheduleTypeName = scheduleTypeName + obj.data.scheduleTypes[i].name
                    }
                }
                $('#modal-modifyClassType').attr('value', scheduleTypeIds)
                $('#modal-modifyClassType').val(scheduleTypeName)

                var li = $('.modifyLateType-menu-ul').find('li')
                var li_hidden = $('.modifyLateType-menu-ul').find('li.hidden')
                for(var j = 0; j < obj.data.lateTypes.length; j++){
                    for(var i = 1; i < li.length - li_hidden.length; i++){
                        if(obj.data.lateTypes[j].id == li.eq(i).find('a').attr('value')){
                            li.eq(i).find('.select-sub-box-modify').prop('checked',true)
                            break
                        }
                    }
                }
            }else{
                alert('获取当前班次信息失败！')
                console.log(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
修改班次/
 */
function modifyMyClass() {
    var classID = $('#modal-modifyClassID').val()
    var className = $('#modal-modifyClassName').val()
    if(!className){
        alert("请输入班次名称！")
        return
    }
    if(!$('#modal-modifyClassType').val()){
        alert("请选择班次类型！")
        return
    }
    var classType = $('#modal-modifyClassType').attr('value').split('_')

    var li = $('.modifyLateType-menu-ul').find('li')
    var li_hidden = $('.modifyLateType-menu-ul').find('li.hidden')
    var lateType = []
    for(var i = 0; i < li.length - li_hidden.length; i++){
        if(li.eq(i).find('.select-sub-box-modify').is(':checked') == true){
            lateType.push(li.eq(i).find('a').attr('value'))
        }
    }
    var urlStr = ipPort + '/schedule/update?name=' + className + '&scheduleTypeIds=' + classType + '&lateTypeIds=' + lateType + '&id=' + classID
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert('修改班次成功')
                getAllClassInformation()
            }
            else {
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取全部班次类型/
 */
function getAllClassType_class(str) {
    $('#myModal-selectClassType').attr('value', str)
    $('.selectClassType-ul').find('li').remove()
    $('.selectedClassType-ul').find('li').remove()
    $.ajax({
        url:ipPort + '/scheduleType/getAll',
        dataType:'json',
        success:function (obj_) {
            if(obj_.data.length != 0){
                var ul = $('.selectClassType-ul')
                for(var j = 0; j < obj_.data.length; j++){
                    var appendStr = '<li onclick="setSelectedClassType(this)"><img src="imgs/coordinates.png" height="20px" style="margin-top: -2px"><span ' + 'value="' + obj_.data[j].id + '">' + obj_.data[j].name + '</span></li>'
                    ul.append(appendStr)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
选取班次类型/
 */
function setSelectedClassType(thisObj) {
    var ul = $('.selectedClassType-ul')
    var appendStr = '<li><img src="imgs/coordinates.png" height="20px" style="margin-top: -2px"><span class="selectedClassType-span" ' + 'value="' + $(thisObj).find("span").attr("value") + '">' + $(thisObj).find("span").text() + '</span><span class="cancel-span" onclick="cancelSelectClassType(this)" aria-hidden="true" style="display: block; float: right">&times;</span></li>'
    ul.append(appendStr)
}
/*
取消选取/
 */
function cancelSelectClassType(thisObj) {
    $(thisObj).parent().remove()
}
/*
选定班次类型/
 */
function selectedClassType() {
    var str = $('#myModal-selectClassType').attr('value')
    var span = $('.selectedClassType-span')
    var strID = ''
    var strName = ''
    for(var i = 0; i < span.length; i++){
        strID = strID + span.eq(i).attr('value')
        strName = strName + span.eq(i).text()
        if(i != span.length - 1){
            strID = strID + '_'
            strName = strName + '、'
        }
    } if(str == 'add'){
        $('#modal-selectClassType').attr('value', strID)
        $('#modal-selectClassType').val(strName)
    }else if(str == 'modify'){
        $('#modal-modifyClassType').attr('value', strID)
        $('#modal-modifyClassType').val(strName)
    }
}
/*
设置确定删除Modal/
 */
function setMakeSureDeleteModal(thisObj, str) {
    var td = $(thisObj).parent().parent().find('td')
    var id = td.eq(1).attr('value')
    var name = td.eq(1).text()
    $('#myModal-makeSureDelete').attr('value', id)
    $('#myModal-makeSureDelete').attr('data-value', str)
    $('#myModal-makeSureDelete').find('.modal-body').find('span').text('是否确认要删除 ' + name + ' ？')
}
/*
确定删除/
 */
function makeSureDelete() {
    var id = $('#myModal-makeSureDelete').attr('value')
    if(!id){
        alert('id为空，请重新确定id！')
        return
    }
    var str =  $('#myModal-makeSureDelete').attr('data-value')
    var urlStr = ''
    if(str == '班次'){
        urlStr = ipPort + '/schedule/deleteById?id=' + id
        $.ajax({
            url: urlStr,
            dataType: 'json',
            success: function (obj) {
                if (obj.code == 0) {
                    alert('删除成功！')
                    getAllClassInformation()
                } else {
                    alert(obj.message);
                }
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}
/*
根据班次名称搜索/
 */
function searchsByName() {
    var name = $('#className-input').val()
    $.ajax({
        url: ipPort + '/schedule/getByNameLikeByPage?name=' + name,
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert('无相关信息！')
                    setAllClassTable(obj)
                }else{
                    setAllClassTable(obj)
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