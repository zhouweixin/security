var currentPage = 0
$(document).ready(function () {
    $('.select-department-ul li a').on('click', function () {
        $('#all-dropdownMenu1').val($(this).text())
        $('#all-dropdownMenu1').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#employeesLeft-dropdownMenu1').val($(this).text())
        $('#employeesLeft-dropdownMenu1').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#employeesLeaving-dropdownMenu1').val($(this).text())
        $('#employeesLeaving-dropdownMenu1').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#employeesLeftAndBan-dropdownMenu1').val($(this).text())
        $('#employeesLeftAndBan-dropdownMenu1').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
    })

    var leavingTabSelectDepartmentA = $('.leavingTab-selectDepartment-ul')
    getAllDepartmentsName(leavingTabSelectDepartmentA)
    $('.leavingTab-selectDepartment-ul li a').on('click', function () {
        $('#leavingTab-selectDepartment').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#leavingTab-selectDepartment').attr('value', $(this).attr('value'))
    })

    var leftTabSelectDepartmentA = $('.leftTab-selectDepartment-ul')
    getAllDepartmentsName(leftTabSelectDepartmentA)
    $('.leftTab-selectDepartment-ul li a').on('click', function () {
        $('#leftTab-selectDepartment').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#leftTab-selectDepartment').attr('value', $(this).attr('value'))
    })

    var allTabSelectDepartmentA = $('.allTab-selectDepartment-ul')
    getAllDepartmentsName(allTabSelectDepartmentA)
    $('.allTab-selectDepartment-ul li a').on('click', function () {
        $('#allTab-selectDepartment').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#allTab-selectDepartment').attr('value', $(this).attr('value'))
    })

    var leftAndBanTabSelectDepartmentA = $('.leftAndBanTab-selectDepartment-ul')
    getAllDepartmentsName(leftAndBanTabSelectDepartmentA)
    $('.leftAndBanTab-selectDepartment-ul li a').on('click', function () {
        $('#leftAndBanTab-selectDepartment').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#leftAndBanTab-selectDepartment').attr('value', $(this).attr('value'))
    })
    getLeftStaffInformationByPage()
})
/*
获取已离职员工信息/
 */
function getLeftStaffInformationByPage() {
    currentPage = 0
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 8
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setLeftLeaveStaffTableInformation(obj)
            }else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取待离职员工信息/
 */
function getLeavingStaffInformationByPage() {
    currentPage = 0
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 4
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setLeavingLeaveStaffTableInformation(obj)
            }else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取离职禁用员工信息/
 */
function getLeftAndBanStaffInformationByPage() {
    currentPage = 0
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 9
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setLeftAndBanLeaveStaffTableInformation(obj)
            }else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
已离职panel通过部门和姓名搜索信息/
 */
function leftTabSearchByDepartmentAndStaffName() {
    var departmentId = $('#leftTab-selectDepartment').attr('value')
    var staffName = $('#staffName-searchInput-leftTab').val()
    var urlStr = ipPort + "/user/getByDepartmentAndNameLikeByPage?id=" + departmentId + "&name=" + staffName
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setLeftLeaveStaffTableInformation(obj)
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
待离职panel通过部门和姓名搜索信息/
 */
function leavingTabSearchByDepartmentAndStaffName() {
    var departmentId = $('#leavingTab-selectDepartment').attr('value')
    var staffName = $('#staffName-searchInput-leavingTab').val()
    var urlStr = ipPort + "/user/getByDepartmentAndNameLikeByPage?id=" + departmentId + "&name=" + staffName
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setLeavingLeaveStaffTableInformation(obj)
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
离职禁用panel通过部门和姓名搜索信息/
 */
function leftAndBanTabSearchByDepartmentAndStaffName() {
    var departmentId = $('#leftAndBanTab-selectDepartment').attr('value')
    var staffName = $('#staffName-searchInput-leftAndBanTab').val()
    var urlStr = ipPort + "/user/getByDepartmentAndNameLikeByPage?id=" + departmentId + "&name=" + staffName
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setLeftAndBanLeaveStaffTableInformation(obj)
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
设置已离职table/
 */
function setLeftLeaveStaffTableInformation(obj) {
    console.log(obj)
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var table_tr = $('.table-tr-left')
    var number = 0
    if(obj.data.numberOfElements > 0){
        var staffName = $('.leftTab-staff-name')
        var staffID = $('.leftTab-staff-number')
        var staffDepartment = $('.leftTab-staff-department')
        var staffRole = $('.leftTab-staff-position')
        var staffJobNature = $('.leftTab-staff-jobNature')
        var staffJoinDate = $('.leftTab-staff-joinDate')
        var staffLeaveDate = $('.leftTab-staff-LeaveDate')
        for(var i = 0, j = 0; j < obj.data.numberOfElements; j++ ){
            if(obj.data.content[j].jobNature.name == '已离职'){
                table_tr.eq(i).removeClass('hidden')
                staffName.eq(i).text(obj.data.content[j].name)
                staffName.eq(i).attr('value', obj.data.content[j].id)
                staffID.eq(i).text(obj.data.content[j].id)
                if(obj.data.content[j].department){
                    staffDepartment.eq(i).text(obj.data.content[j].department.name)
                }
                if(obj.data.content[j].role){
                    staffRole.eq(i).text(obj.data.content[j].role.name)
                }
                if(obj.data.content[j].jobNature){
                    staffJobNature.eq(i).text(obj.data.content[j].jobNature.name)
                    staffJobNature.eq(i).attr('value', obj.data.content[j].jobNature.id)
                }
                staffJoinDate.eq(i).text(obj.data.content[j].employDate)
                staffLeaveDate.eq(i).text(obj.data.content[j].resignDate)
                i++
                number++
            }
        }
    }
    for (var i = number; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
    if(number == 0){
        alert('未搜索到相关信息！')
    }
}
/*
设置待离职table/
 */
function setLeavingLeaveStaffTableInformation(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var table_tr = $('.table-tr-leaving')

    var number = 0
    if(obj.data.numberOfElements > 0){
        var staffName = $('.leavingTab-staff-name')
        var staffID = $('.leavingTab-staff-number')
        var staffDepartment = $('.leavingTab-staff-department')
        var staffRole = $('.leavingTab-staff-position')
        var staffJobNature = $('.leavingTab-staff-jobNature')
        var staffJoinDate = $('.leavingTab-staff-joinDate')
        var staffLeaveDate = $('.leavingTab-staff-LeaveDate')
        for(var i = 0, j = 0; j < obj.data.numberOfElements; j++ ){
            if(obj.data.content[j].jobNature.name == '待离职'){
                table_tr.eq(i).removeClass('hidden')
                staffName.eq(i).text(obj.data.content[j].name)
                staffName.eq(i).attr('value', obj.data.content[j].id)
                staffID.eq(i).text(obj.data.content[j].id)
                if(obj.data.content[j].department){
                    staffDepartment.eq(i).text(obj.data.content[j].department.name)
                }
                if(obj.data.content[j].role){
                    staffRole.eq(i).text(obj.data.content[j].role.name)
                }
                if(obj.data.content[j].jobNature){
                    staffJobNature.eq(i).text(obj.data.content[j].jobNature.name)
                    staffJobNature.eq(i).attr('value', obj.data.content[j].jobNature.id)
                }
                staffJoinDate.eq(i).text(obj.data.content[j].employDate)
                staffLeaveDate.eq(i).text(obj.data.content[j].resignDate)
                i++
                number++
            }

        }
    }
    for (var i = number; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
    if(number == 0){
        alert('未搜索到相关信息！')
    }
}
/*
设置离职禁用table/
 */
function setLeftAndBanLeaveStaffTableInformation(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var table_tr = $('.table-tr-leftAndBan')
    var number = 0
    if(obj.data.numberOfElements > 0){
        var staffName = $('.leftAndBanTab-staff-name')
        var staffID = $('.leftAndBanTab-staff-number')
        var staffDepartment = $('.leftAndBanTab-staff-department')
        var staffRole = $('.leftAndBanTab-staff-position')
        var staffJobNature = $('.leftAndBanTab-staff-jobNature')
        var staffJoinDate = $('.leftAndBanTab-staff-joinDate')
        var staffLeaveDate = $('.leftAndBanTab-staff-LeaveDate')
        for(var i = 0, j = 0; j < obj.data.numberOfElements; j++ ){
            if(obj.data.content[j].jobNature.name == '离职禁用'){
                table_tr.eq(i).removeClass('hidden')
                staffName.eq(i).text(obj.data.content[j].name)
                staffName.eq(i).attr('value', obj.data.content[j].id)
                staffID.eq(i).text(obj.data.content[j].id)
                if(obj.data.content[j].department){
                    staffDepartment.eq(i).text(obj.data.content[j].department.name)
                }
                if(obj.data.content[j].role){
                    staffRole.eq(i).text(obj.data.content[j].role.name)
                }
                if(obj.data.content[j].jobNature){
                    staffJobNature.eq(i).text(obj.data.content[j].jobNature.name)
                    staffJobNature.eq(i).attr('value', obj.data.content[j].jobNature.id)
                }
                staffJoinDate.eq(i).text(obj.data.content[j].employDate)
                staffLeaveDate.eq(i).text(obj.data.content[j].resignDate)
                i++
                number++
            }

        }
    }
    for (var i = number; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
    if(number == 0){
        alert('未搜索到相关信息！')
    }
}
/*
禁用/
 */
function forbiddenLeftButton(thisObj) {
    var staffID = $(thisObj).parent().parent().parent().parent().parent().find('td').eq(1).text()
    var urlStr = ipPort + '/user/updateJobNatureById?jobNatureId=8' + '&id=' + staffID
    console.log(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert(obj.message)
               // getAllStaffInformationByPage()
            }else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
离职恢复/
 */
function recoveryJobButton(thisObj) {
    var staffID = $(thisObj).parent().parent().parent().parent().parent().find('td').eq(1).text()
    var urlStr = ipPort + '/user/updateJobNatureById?jobNatureId=' + 1 + '&id=' + staffID
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert(obj.message)
             //   getAllStaffInformationByPage()
            }else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
离职证明/
 */
function leftToProveButton(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var staffName = td.eq(0).text()
    var department = td.eq(2).text()
    var role = td.eq(3).text()
    var joinDate = td.eq(5).text()
    var joinDateArr = joinDate.split('-')
    var leftDate = td.eq(6).text()
    var date = new Date()
    $('.leave-name-inp').val(staffName)
    $('.entry-year-inp').val(joinDateArr[0])
    $('.entry-month-inp').val(joinDateArr[1])
    $('.entry-day-inp').val(joinDateArr[2])
    $('.leave-department-inp').val(department)
    $('.leave-position-inp').val(role)
    $('.leave-year-inp').val(leftDate.split('-')[0])
    $('.leave-month-inp').val(leftDate.split('-')[1])
    $('.leave-day-inp').val(leftDate.split('-')[2])
    $('.now-year-inp').val(date.getFullYear())
    $('.now-month-inp').val(date.getMonth() + 1)
    $('.now-day-inp').val(date.getDate())
}
/*
上一页/
 */
function previousPage(str) {
    var currentPage_ = $(str).find('.currentPage').text()
    if(currentPage_ == 1){
        alert("已经是第一页！")
        return
    }
    currentPage--
    if(currentPage < 0){
        currentPage = 0
    }
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ''
    if(str == '#employeesLeft-panel'){
        urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 8
    }
    else if(str == '#employeesLeaving-panel'){
        urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 4
    }
    else if(str =='#employeesLeftAndBan-panel'){
        urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 9
    }
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(str == '#employeesLeft-panel'){
                    setLeftLeaveStaffTableInformation(obj)
                }
                else if(str == '#employeesLeaving-panel'){
                    setLeavingLeaveStaffTableInformation(obj)
                }
                else if(str =='#employeesLeftAndBan-panel'){
                    setLeftAndBanLeaveStaffTableInformation(obj)
                }
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
下一页/
 */
function nextPage(str) {
    var currentPage_ = $(str).find('.currentPage').text()
    var totalPage_ = $(str).find('.totalPage').text()
    if(currentPage_ == totalPage_){
        alert("已经是最后一页！")
        return
    }
    currentPage++
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    if(str == '#employeesLeft-panel'){
        urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 8
    }
    else if(str == '#employeesLeaving-panel'){
        urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 4
    }
    else if(str =='#employeesLeftAndBan-panel'){
        urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 9
    }    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(str == '#employeesLeft-panel'){
                    setLeftLeaveStaffTableInformation(obj)
                }
                else if(str == '#employeesLeaving-panel'){
                    setLeavingLeaveStaffTableInformation(obj)
                }
                else if(str =='#employeesLeftAndBan-panel'){
                    setLeftAndBanLeaveStaffTableInformation(obj)
                }
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
跳转页/
 */
function skipPage(str) {
    var skipPage_ = parseInt( $(str).find('.skipPage').val())
    var totalPage_ = parseInt( $(str).find('.totalPage').text())
    if(skipPage_ - totalPage_ > 0){
        alert("没有此页！")
        return
    }
    if(skipPage_ < 1){
        alert("没有此页！")
        return
    }
    currentPage = skipPage_ - 1
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    if(str == '#employeesLeft-panel'){
        urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 8
    }
    else if(str == '#employeesLeaving-panel'){
        urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 4
    }
    else if(str =='#employeesLeftAndBan-panel'){
        urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + 9
    }    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(str == '#employeesLeft-panel'){
                    setLeftLeaveStaffTableInformation(obj)
                }
                else if(str == '#employeesLeaving-panel'){
                    setLeavingLeaveStaffTableInformation(obj)
                }
                else if(str =='#employeesLeftAndBan-panel'){
                    setLeftAndBanLeaveStaffTableInformation(obj)
                }
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
