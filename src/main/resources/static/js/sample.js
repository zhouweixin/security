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



<div class="modal fade" id="myModal-selectStaff" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
<h4 class="modal-title" id="myModalLabel">选择员工</h4>
    </div>
    <div class="modal-body" style="padding: 0px 20px;font-size: 14px">
    <form class="form-horizontal">
    <div class="form-group " style="margin-bottom: 0px;">
    <ul class="selectStaff-department-ul col-xs-6" style="height: 200px;overflow-y: scroll">
    <li class="selectStaff-department-li hidden" style="cursor: pointer">
    <img class="departmentName-img" src="imgs/addition.png" height="20px" style="margin-top: -4px">
    <span class="departmentName-span"></span>
    <ul class="selectStaff-staff-ul hidden">
    </ul>
    </li>
    <li class="selectStaff-department-li hidden" style="cursor: pointer">
    <img class="departmentName-img" src="imgs/addition.png" height="20px" style="margin-top: -4px">
    <span class="departmentName-span"></span>
    <ul class="selectStaff-staff-ul hidden">
    </ul>
    </li>
    <li class="selectStaff-department-li hidden" style="cursor: pointer">
    <img class="departmentName-img" src="imgs/addition.png" height="20px" style="margin-top: -4px">
    <span class="departmentName-span"></span>
    <ul class="selectStaff-staff-ul hidden">
    </ul>
    </li>
    <li class="selectStaff-department-li hidden" style="cursor: pointer">
    <img class="departmentName-img" src="imgs/addition.png" height="20px" style="margin-top: -4px">
    <span class="departmentName-span"></span>
    <ul class="selectStaff-staff-ul hidden">
    </ul>
    </li>
    <li class="selectStaff-department-li hidden" style="cursor: pointer">
    <img class="departmentName-img" src="imgs/addition.png" height="20px" style="margin-top: -4px">
    <span class="departmentName-span"></span>
    <ul class="selectStaff-staff-ul hidden">
    </ul>
    </li>
    <li class="selectStaff-department-li hidden" style="cursor: pointer">
    <img class="departmentName-img" src="imgs/addition.png" height="20px" style="margin-top: -4px">
    <span class="departmentName-span"></span>
    <ul class="selectStaff-staff-ul hidden">
    </ul>
    </li>
    <li class="selectStaff-department-li hidden" style="cursor: pointer">
    <img class="departmentName-img" src="imgs/addition.png" height="20px" style="margin-top: -4px">
    <span class="departmentName-span"></span>
    <ul class="selectStaff-staff-ul hidden">
    </ul>
    </li>
    <li class="selectStaff-department-li hidden" style="cursor: pointer">
    <img class="departmentName-img" src="imgs/addition.png" height="20px" style="margin-top: -4px">
    <span class="departmentName-span"></span>
    <ul class="selectStaff-staff-ul hidden">
    </ul>
    </li>
    <li class="selectStaff-department-li hidden" style="cursor: pointer">
    <img class="departmentName-img" src="imgs/addition.png" height="20px" style="margin-top: -4px">
    <span class="departmentName-span"></span>
    <ul class="selectStaff-staff-ul hidden">
    </ul>
    </li>
    <li class="selectStaff-department-li hidden" style="cursor: pointer">
    <img class="departmentName-img" src="imgs/addition.png" height="20px" style="margin-top: -4px">
    <span class="departmentName-span"></span>
    <ul class="selectStaff-staff-ul hidden">
    </ul>
    </li>
    </ul>
    <div class="col-xs-6" style="border-left: 1px solid #E5E5E5; height: 200px;overflow-y: scroll">
    <ul class="selectedStaff-staff-ul">
    </ul>
    </div>
    </div>
    </form>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
    <button type="button" class="btn btn-primary selectedStaffs-button" value="" onclick="selected" data-dismiss="modal">确认</button>
    </div>
    </div>
    </div>
    </div>






        .departmentName-span{
    font-size: 16px;
}
.selectStaff-staff-ul li{
    margin-left: 22px;
    margin-top: 2px;
    color: #4EB1E4;
    width: 60%;
}
.selectStaff-department-li{
    margin-top: 5px;
}
.departmentName-span:hover{
    color: #7D7D7D;
}
.selectedStaff-staff-ul{
    margin-top: 10px;
    color: #4EB1E4;
}
.selectStaff-staff-ul li:hover{
    font-size: 16px;
    background-color: #CECECE;
    border-radius: 5px 5px;
}
.selectedStaff-staff-ul li{
    margin-top: 2px;
    width: 80%;
}
.selectedStaff-staff-ul li:hover{
    cursor: pointer;
    font-size: 16px;
    background-color: #CECECE;
    border-radius: 5px 5px;
}