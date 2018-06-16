/*
获取所有员工姓名/
 */
function getAllStaff() {
    var staffInformationDepartmentA = $('.selectStaff-department-ul .selectStaff-department-li .departmentName-span')
    $.ajax({
        url:ipPort + '/department/getAll',
        dataType:'json',
        success:function (obj) {
            $('.selectedStaff-staff-ul').find('li').remove()
            for(var i = 0; i < obj.data.length; i++){
                staffInformationDepartmentA.eq(i).parent().removeClass('hidden')
                staffInformationDepartmentA.eq(i).text(obj.data[i].name)
                staffInformationDepartmentA.eq(i).attr('value', obj.data[i].id)
                staffInformationDepartmentA.eq(i).parent().find('li').remove()
            }
            $.ajax({
                url:ipPort + '/user/getAll',
                dataType:'json',
                success:function (obj_) {
                    if(obj_.data.length != 0){
                        for(var j = 0; j < obj_.data.length; j++){
                            for(var m = 0; m < obj.data.length; m++){
                                if(obj_.data[j].department.id == obj.data[m].id){
                                    var staffUl = staffInformationDepartmentA.eq(m).parent().find('.selectStaff-staff-ul')
                                    var appendStr = '<li onclick="selectedStaff(this)"><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span ' + 'value="' + obj_.data[j].id + '">' + obj_.data[j].name + '</span></li>'
                                    staffUl.append(appendStr)
                                    break
                                }
                            }
                        }
                    }
                },
                error:function (error) {
                    console.log(error)
                }
            })
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
选区人员/
 */
function selectedStaff(thisObj) {
    var selectedStaffUl = $('.selectedStaff-staff-ul')
    var appendStr = '<li><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span class="selectedStaff-span" ' + 'value="' + $(thisObj).find("span").attr("value") + '">' + $(thisObj).find("span").text() + '</span><span class="cancel-span" onclick="cancelSelectStaff(this)" aria-hidden="true" style="display: block; float: right">&times;</span></li>'
    selectedStaffUl.append(appendStr)
}
/*
取消选区/
 */
function cancelSelectStaff(thisObj) {
    $(thisObj).parent().remove()
}






/*
选择员工Modal/
*/
$('.selectStaff-department-li img').on('click', function () {
    if($(this).parent().find('.hidden').length == 0){
        $(this).parent().find('.selectStaff-staff-ul').addClass('hidden')
        $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
    }else{
        $(this).parent().find('.selectStaff-staff-ul').removeClass('hidden')
        $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
    }
})
$('.departmentName-span').on('click', function () {
    if($(this).parent().find('.hidden').length == 0){
        $(this).parent().find('.selectStaff-staff-ul').addClass('hidden')
        $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
    }else{
        $(this).parent().find('.selectStaff-staff-ul').removeClass('hidden')
        $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
    }
})



