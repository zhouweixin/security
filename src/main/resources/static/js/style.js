$(document).ready(function () {

    $('#select-all').on('click', function () {
        if(this.checked == true){
            $('.select-sub-box').prop('checked',true)
        }
        else{
            $('.select-sub-box').prop('checked',false)
        }
    })
    //一级菜单的事件处理
    var activeRow
    var subMenuActiveRow
    var subMenuFlag = 0
    $('.left-nav-menu').on('click', '.left-nav-menu-li',function (e) {
        if(!activeRow){
            //第一次处理激活的li
            activeRow = $(this)
            if(activeRow.find('.glyphicon').length == 0){
                activeRow.addClass('li-active')
            }
            else{
                var subMenu = activeRow.find('.sub-menu')
                subMenu.removeClass('none')
            }
            var imgItem = activeRow.find('img')
            var imgSrc = imgItem[0].src
            if(imgSrc.search("_fill") == -1){
                imgSrc = imgSrc.replace(".png","_fill.png")
                imgItem.attr('src', imgSrc)
            }
            var spanItem = activeRow.find('span')
            if(spanItem){
                spanItem.removeClass('glyphicon-triangle-right')
                spanItem.addClass('glyphicon-triangle-bottom')
            }
        }
        else {
            //处理上一个激活的li
            var prevActiveRow = activeRow
            activeRow = $(this)
            if(prevActiveRow.find('.glyphicon').length == 0){
                prevActiveRow.removeClass('li-active')
            }
            else{
                var subMenu = prevActiveRow.find('.sub-menu')
                subMenu.addClass('none')
            }
            var prevImgItem = prevActiveRow.find('img')
            var prevImgSrc = prevImgItem[0].src
            prevImgSrc = prevImgSrc.replace("_fill.png",".png")
            prevImgItem.attr('src', prevImgSrc)
            var prevSpanItem = prevActiveRow.find('span')
            if(prevSpanItem){
                prevSpanItem.removeClass('glyphicon-triangle-bottom')
                prevSpanItem.addClass('glyphicon-triangle-right')
            }

            //处理上一个subli
            var preSubMenuActiveRow = subMenuActiveRow
            if(preSubMenuActiveRow && !subMenuFlag){
                preSubMenuActiveRow.removeClass('sub-li-active')
            }
            subMenuFlag = 0

            //处理当前激活li
            if(activeRow.find('.glyphicon').length == 0){
                activeRow.addClass('li-active')
            }
            else{
                var subMenu = activeRow.find('.sub-menu')
                subMenu.removeClass('none')
            }
            var imgItem = activeRow.find('img')
            var imgSrc = imgItem[0].src
            imgSrc = imgSrc.replace(".png","_fill.png")
            imgItem.attr('src', imgSrc)
            var spanItem = activeRow.find('span')
            if(spanItem){
                spanItem.removeClass('glyphicon-triangle-right')
                spanItem.addClass('glyphicon-triangle-bottom')
            }
        }
    })

    // //二级菜单事件处理
    // $('.sub-menu').on('click', '.sub-menu-li', function (e) {
    //     subMenuFlag = 1
    //     //第一次处理subli
    //     if(!subMenuActiveRow){
    //         subMenuActiveRow = $(this)
    //         subMenuActiveRow.addClass('sub-li-active')
    //     }
    //     else{
    //         //处理上一个subli
    //         var preSubMenuActiveRow = subMenuActiveRow
    //         preSubMenuActiveRow.removeClass('sub-li-active')
    //         //处理当前subli
    //         subMenuActiveRow = $(this)
    //         subMenuActiveRow.addClass('sub-li-active')
    //     }
    // })

    /*
    modal选择部门全员/
     */
    $('.selectAllDepartmentStaffs').on('click', 'input', function () {
        if(this.checked == true){
            var selectedStaffUl = $('#form-selectStaff1 .selectedStaff-staff-ul')
            var li = $(this).parent().parent().find('ul').find('li')
            for(var i = 0; i < li.length; i++){
                var appendStr = '<li><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span class="selectedStaff-span" ' + 'value="' + li.eq(i).find("span").attr("value") + '">' + li.eq(i).find("span").text() + '</span><span class="cancel-span" onclick="cancelSelectStaff(this)" aria-hidden="true" style="display: block; float: right">&times;</span></li>'
                selectedStaffUl.append(appendStr)
            }
        }
    })
    /*
    选择下拉框/
     */
    $('.dropdown-menu li a').on('click', function () {
        var parent = $(this).parent().parent().parent()
        parent.find('button').attr('value', $(this).attr('value'))
        parent.find('button').html($(this).text() + "<span class='caret'></span>")
    })
    //部门
    var department = $('.dropdown-menu-department')
    getAllDepartmentsName(department)
    //职位
    var position = $('.dropdown-menu-position')
    getAllPositionName(position)
    //工作性质
    var jobNature = $('.dropdown-menu-jobNature')
    getAllJobNaturesName(jobNature)
    //离职类型
    var leaveType = $('.dropdown-menu-leaveType ')
    getAllResignTypeName(leaveType)
    //民族
    var nation = $('.dropdown-menu-nation ')
    getAllNationName(nation)
    //婚姻状况
    var maritalStatus = $('.dropdown-menu-maritalStatus ')
    getAllMaritalStatusName(maritalStatus)
    //兵役状况
    var militaryStatus = $('.dropdown-menu-militaryStatus ')
    getAllMilitaryStatusName(militaryStatus)
    //政治面貌
    var politicalStatus = $('.dropdown-menu-politicalStatus ')
    getAllPoliticalStatusName(politicalStatus)
    //学历
    var education = $('.dropdown-menu-education ')
    getAllEducationName(education)
    //健康状况
    var healthStatus = $('.dropdown-menu-healthStatus ')
    getAllHealthStatusName(healthStatus)
    //合同类型
    var personnelContractType = $('.dropdown-menu-personnelContractType ')
    getAllPersonnelContractTypeName(personnelContractType)
    //迟到类型
    var lateType = $('.dropdown-menu-lateType ')
    getAllLateTypeName(lateType)
    //合同状态
    var contractStatus = $('.dropdown-menu-contractStatus ')
    getAllContractStatusName(contractStatus)
    //项目状态
    var projectStatus = $('.dropdown-menu-projectStatus ')
    getAllProjectStatusName(projectStatus)
    //项目
    var project = $('.dropdown-menu-project')
    getAllProjectName(project)
})
function selectAllCheckButton(thisObj) {
    if(thisObj.checked == true){
        $('.select-sub-box').prop('checked',true)
    }
    else{
        $('.select-sub-box').prop('checked',false)
    }
}
