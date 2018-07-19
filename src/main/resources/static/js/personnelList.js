var jobNaturesName = []
var jobNatureID = []
$(document).ready(function () {


    var activeDetailsBranch
    $('.details-branch').on('click', function (e) {
        if(!activeDetailsBranch){
            $('.details-branch.active').removeClass('active')
            activeDetailsBranch = $(this)
            activeDetailsBranch.addClass('active')
        }
        else{
            var preActiveDetailsBranch = activeDetailsBranch
            preActiveDetailsBranch.removeClass('active')
            activeDetailsBranch = $(this)
            activeDetailsBranch.addClass('active')
        }
    })



    $('.details-button').on('click', function () {
        $('#page-empolyee-list').addClass('hidden')
        $('#page-staffDetailsInformation').removeClass('hidden')
    })

    $('.path-arrow-left').on('click',function () {
        $('#page-staffDetailsInformation').addClass('hidden')
        $('#page-empolyee-list').removeClass('hidden')
    })

    $('#cancle-store').on('click',function () {
        $('#page-add-staff').addClass('hidden')
        $('#page-empolyee-list').removeClass('hidden')
    })

    $('.probation-menu-ul li a').on('click', function () {
        $('#probation-input').val($(this).text())
    })

    $('.sex-menu-ul li a').on('click', function () {
        $('#sex-input').val($(this).text())
    })

    $('.department-menu-ul li a').on('click', function () {
        $('#department-input').val($(this).text())
    })

    $('.leaveType-menu-ul li a').on('click', function () {
        $('#modal-leaveType').val($(this).text())
    })

    //document.getElementById("modal-leaveDate").valueAsDate = new Date()
    $('#modal-leaveDate').val(new Date().toLocaleDateString())

    /*
    添加员工modal/
     */
    var addStaffJobNatureA = $('.addStaffJobNature-menu-ul li a')
    getAllJobNaturesName(addStaffJobNatureA)
    $('#modal-addStaffJobNature').val($('.addStaffJobNature-menu-ul li a').eq(0).text())
    $('#modal-addStaffJobNature').attr('value', '')
    $('.addStaffJobNature-menu-ul li a').on('click', function () {
        $('#modal-addStaffJobNature').val($(this).text())
        $('#modal-addStaffJobNature').attr('value', $(this).attr('value'))
    })

    var addStaffPositionA = $('.addStaffPosition-menu-ul li a')
    getAllPositionName(addStaffPositionA)
    $('#modal-addStaffPosition').val($('.addStaffPosition-menu-ul li a').eq(0).text())
    $('#modal-addStaffPosition').attr('value', '')
    $('.addStaffPosition-menu-ul li a').on('click', function () {
        $('#modal-addStaffPosition').val($(this).text())
        $('#modal-addStaffPosition').attr('value', $(this).attr('value'))
    })

    // document.getElementById("modal-addStaffJoinDate").valueAsDate = new Date()
    $('#modal-addStaffJoinDate').val(new Date().toLocaleDateString())

    $('.addStaffInternshipCycle-menu-ul li a').on('click', function () {
        $('#modal-addStaffInternshipCycle').val($(this).text())
    })

    $('.addStaffInternshipCycle-menu-ul li a').on('click', function () {
        $('#modal-addStaffInternshipCycle').val($(this).text())
        $('#modal-addStaffInternshipCycle').attr('value', $(this).attr('value'))
    })
    $('#modal-addStaffInternshipCycle').val($('.addStaffInternshipCycle-menu-ul li a').eq(0).text())
    $('#modal-addStaffInternshipCycle').attr('value', 0)
    /*
    设置总结栏/
     */
    var details_branch = $('.details-branch')
    var details_span = $('.details-span')
    $.ajax({
        url:ipPort + '/jobNature/getAll',
        dataType:'json',
        success:function (obj) {
            for(var i = 0; i < obj.data.length; i++){
                jobNaturesName.push(obj.data[i].name)
                jobNatureID.push(obj.data[i].id)
            }
            for(var i = 1, j = 0; i < jobNaturesName.length + 1; i++, j++ ){
                details_branch.eq(i).removeClass('hidden')
                details_span.eq(j).text(jobNaturesName[j])
                details_span.eq(j).parent().parent().attr('value', jobNatureID[j])
            }
        },
        error:function (error) {
            console.log(error)
        }
    })

    /*
    设置table信息/
     */
    getAllStaffInformationByPage()
    /*
    离职面板/
     */
    var selectResignTypeA = $('.leaveType-menu-ul li a')
    getAllResignTypeName(selectResignTypeA)
    $('.leaveType-menu-ul li a').on('click', function () {
        $('#modal-leaveType').val($(this).text())
        $('#modal-leaveType').attr('value', $(this).attr('value'))
    })
    /*
    员工列表页面的选择部门下拉菜单/
     */
    var selectDepartmentA = $('.selectDepartment-dropdownMenu-ul li a')
    getAllDepartmentsName(selectDepartmentA)
    $('.selectDepartment-dropdownMenu-ul li a').on('click', function () {
        $('#selectDepartment-dropdownMenu').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#selectDepartment-dropdownMenu').attr('value', $(this).attr('value'))
    })
    /*
    详细信息人员信息/
     */
    $('.staffInformation-sex-menu-ul li a').on('click', function () {
        $('#staffInformation-sex').val($(this).text())
        $('#staffInformation-sex').attr('value', $(this).attr('value'))
    })
    $('.staffInformation-cycle-menu-ul li a').on('click', function () {
        $('#staffInformation-cycle').val($(this).text())
        $('#staffInformation-cycle').attr('value', $(this).attr('value'))
    })
    var staffInformationDepartmentA = $('.staffInformation-department-menu-ul li a')
    getAllDepartmentsName(staffInformationDepartmentA)
    $('.staffInformation-department-menu-ul li a').on('click', function () {
        $('#staffInformation-department').val($(this).text())
        $('#staffInformation-department').attr('value', $(this).attr('value'))
    })
    var staffInformationRoleA = $('.staffInformation-role-menu-ul li a')
    getAllPositionName(staffInformationRoleA)
    $('.staffInformation-role-menu-ul li a').on('click', function () {
        $('#staffInformation-role').val($(this).text())
        $('#staffInformation-role').attr('value', $(this).attr('value'))
    })
    var staffInformationJobNatureA = $('.staffInformation-jobNature-menu-ul li a')
    getAllJobNaturesName(staffInformationJobNatureA)
    $('.staffInformation-jobNature-menu-ul li a').on('click', function () {
        $('#staffInformation-jobNature').val($(this).text())
        $('#staffInformation-jobNature').attr('value', $(this).attr('value'))
    })
    var staffInformationResignTypeA = $('.staffInformation-resignType-menu-ul li a')
    getAllResignTypeName(staffInformationResignTypeA)
    $('.staffInformation-resignType-menu-ul li a').on('click', function () {
        $('#staffInformation-resignType').val($(this).text())
        $('#staffInformation-resignType').attr('value', $(this).attr('value'))
    })
    /*
    详细信息档案信息/
     */
    var archiveInformationNationA = $('.archiveInformation-nation-menu-ul li a')
    getAllNationName(archiveInformationNationA)
    $('.archiveInformation-nation-menu-ul li a').on('click', function () {
        $('#archiveInformation-nation').val($(this).text())
        $('#archiveInformation-nation').attr('value', $(this).attr('value'))
    })

    var archiveInformationMaritalStatusA = $('.archiveInformation-maritalStatus-menu-ul li a')
    getAllMaritalStatusName(archiveInformationMaritalStatusA)
    $('.archiveInformation-maritalStatus-menu-ul li a').on('click', function () {
        $('#archiveInformation-maritalStatus').val($(this).text())
        $('#archiveInformation-maritalStatus').attr('value', $(this).attr('value'))
    })

    var archiveInformationMilitaryStatusA = $('.archiveInformation-militaryStatus-menu-ul li a')
    getAllMilitaryStatusName(archiveInformationMilitaryStatusA)
    $('.archiveInformation-militaryStatus-menu-ul li a').on('click', function () {
        $('#archiveInformation-militaryStatus').val($(this).text())
        $('#archiveInformation-militaryStatus').attr('value', $(this).attr('value'))
    })

    var archiveInformationPoliticalStatusA = $('.archiveInformation-politicalStatus-menu-ul li a')
    getAllPoliticalStatusName(archiveInformationPoliticalStatusA)
    $('.archiveInformation-politicalStatus-menu-ul li a').on('click', function () {
        $('#archiveInformation-politicalStatus').val($(this).text())
        $('#archiveInformation-politicalStatus').attr('value', $(this).attr('value'))
    })

    var archiveInformationEducationA = $('.archiveInformation-education-menu-ul li a')
    getAllEducationName(archiveInformationEducationA)
    $('.archiveInformation-education-menu-ul li a').on('click', function () {
        $('#archiveInformation-education').val($(this).text())
        $('#archiveInformation-education').attr('value', $(this).attr('value'))
    })

    var archiveInformationHealthStatusA = $('.archiveInformation-healthStatus-menu-ul li a')
    getAllHealthStatusName(archiveInformationHealthStatusA)
    $('.archiveInformation-healthStatus-menu-ul li a').on('click', function () {
        $('#archiveInformation-healthStatus').val($(this).text())
        $('#archiveInformation-healthStatus').attr('value', $(this).attr('value'))
    })

    $('.archiveInformation-insurance-menu-ul li a').on('click', function () {
        $('#archiveInformation-insurance').val($(this).text())
        $('#archiveInformation-insurance').attr('value', $(this).attr('value'))
    })
    /*
    详细信息页面合同信息栏/
     */
    //正式合同
    var formalContractType = $('#formalContractType')
    setContractType(formalContractType, 2)

    var formalContractStatusA = $('.formalContractStatus-menu-ul li a')
    getAllContractStatusName(formalContractStatusA)
    $('.formalContractStatus-menu-ul li a').on('click', function () {
        $('#formalContractStatus').val($(this).text())
        $('#formalContractStatus').attr('value', $(this).attr('value'))
    })

    //临时合同
    var temporaryContractType = $('#temporaryContractType')
    setContractType(temporaryContractType, 0)

    var temporaryContractStatusA = $('.temporaryContractStatus-menu-ul li a')
    getAllContractStatusName(temporaryContractStatusA)
    $('.temporaryContractStatus-menu-ul li a').on('click', function () {
        $('#temporaryContractStatus').val($(this).text())
        $('#temporaryContractStatus').attr('value', $(this).attr('value'))
    })
    //实习协议
    var internshipAgreementType = $('#temporaryContractType')
    setContractType(internshipAgreementType, 1)

    var internshipAgreementStatusA = $('.internshipAgreementStatus-menu-ul li a')
    getAllContractStatusName(internshipAgreementStatusA)
    $('.internshipAgreementStatus-menu-ul li a').on('click', function () {
        $('#internshipAgreementStatus').val($(this).text())
        $('#internshipAgreementStatus').attr('value', $(this).attr('value'))
    })

    /*
    设置统计栏数字/
     */
    setSummaryNumber()

})

/*
添加员工/
 */
function addStaff() {
    var staffName = $('#modal-addStaffName').val()
    var staffSex = $('#modal-addStaffSex').attr('value')
    var IcID = $('#modal-addStaffICNumber').val()
    var department = $('#modal-addStaffDepartment').attr('value')
    var weChat = $('#modal-addStaffWeChat').val()
    var phoneNumber = $('#modal-addStaffPhoneNumber').val()
    var position = $('#modal-addStaffPosition').attr('value')
    var jobNature = $('#modal-addStaffJobNature').attr('value')
    var joinDate = new Date(($('#modal-addStaffJoinDate').val()))
    var period = joinDate
    joinDate = (joinDate.toLocaleDateString()).replace(/\//g, '-')
    var internshipCycle = $('#modal-addStaffInternshipCycle').attr('value')
    if(parseInt(internshipCycle) != 0){
        period = changeMonth(period, internshipCycle)
        period = (period.toLocaleDateString()).replace(/\//g, '-')
    }else {
        period = ""
    }
    if(!staffName || !phoneNumber){
        alert('姓名或者联系方式不能为空！')
        return
    }else {
        var urlStr = ipPort + '/user/add?name=' + staffName + '&sex=' + staffSex + '&ic=' + IcID + '&wechat=' + weChat + '&contact=' + phoneNumber
            + '&department=' + department + '&role=' + position + '&jobNature=' + jobNature + '&employDate=' + joinDate + '&practiceEndDate=' + period
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    alert(obj.message)
                    getAllStaffInformationByPage()
                }else{
                    alert(obj.message)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }
}
/*
获取员工的详细信息/
 */
function getDetailsInformation(thisObj) {
    var staffId = $(thisObj).parent().parent().parent().find('.staff-id').text()
    //人员信息
    var urlStr = ipPort + '/user/getById?id='+ staffId
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setDetailsStaffInformationColumn(obj)
            }
            else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
    //档案信息
    var urlStr = ipPort + '/archive/getByUser?user='+ staffId
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data != null){
                    setDetailsArchiveInformationColumn(obj)
                }else{
                    var input = $('.archiveInformation').find('input')
                    for(var i = 0; i < input.length; i++){
                        input.eq(i).val('')
                        input.eq(i).attr('value', '')
                    }
                }
            }
            else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
    //合同信息
    var input = $('.contractInformation').find('input')
    var textarea = $('.contractInformation').find('textarea')
    for(var i = 0; i < input.length; i++){
        input.eq(i).val('')
        input.eq(i).attr('value', '')
    }
    textarea.eq(0).val('')
    var formalContractType = $('#formalContractType')
    setContractType(formalContractType, 2)
    var temporaryContractType = $('#temporaryContractType')
    setContractType(temporaryContractType, 0)
    var internshipAgreementType = $('#internshipAgreementType')
    setContractType(internshipAgreementType, 1)
    var urlStr = ipPort + '/contract/getByUserByPage?user='+ staffId
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements != 0){
                    setDetailsContractInformationColumn(obj)
                }
            }
            else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取全部员工信息/
 */
function getAllStaffInformationByPage() {
    var page = 0
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/user/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setStaffTableInformation(obj)
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
设置员工table/
 */
function setStaffTableInformation(obj) {
    var table_tr = $('.table-tr')
    if(obj.data.numberOfElements != 0){
        var staff_box = $('.staff-checkBox')
        var staff_id = $('.staff-id')
        var staff_name = $('.staff-name')
        var staff_phoneNumber = $('.staff-phoneNumber')
        var staff_role = $('.staff-role')
        var staff_jobNature = $('.staff-jobNature')
        var staff_joinDate = $('.staff-joinDate')
        var staff_department = $('.staff-department')
        for(var i = 0; i < obj.data.numberOfElements; i++){
            table_tr.eq(i).removeClass('hidden')
            staff_box.eq(i).find('input').attr('value', obj.data.content[i].id)
            staff_name.eq(i).text(obj.data.content[i].name)
            staff_id.eq(i).text(obj.data.content[i].id)
            if(obj.data.content[i].department){
                staff_department.eq(i).text(obj.data.content[i].department.name)
            }
            if(obj.data.content[i].contact){
                staff_phoneNumber.eq(i).text(obj.data.content[i].contact)
            }
            if(obj.data.content[i].role){
                staff_role.eq(i).text(obj.data.content[i].role.name)
            }
            if(obj.data.content[i].jobNature){
                staff_jobNature.eq(i).text(obj.data.content[i].jobNature.name)
            }
            if(obj.data.content[i].employDate){
                staff_joinDate.eq(i).text(obj.data.content[i].employDate)
            }
        }
    }
    for (var i = obj.data.numberOfElements; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
}
/*
设置详细页面人员信息栏/
 */
function setDetailsStaffInformationColumn(obj) {
    if(obj.data){
        if(obj.data){
            $('#staffInformation-name').val(obj.data.name)
            $('#staffInformation-id').val(obj.data.id)
        }
    }
    if(obj.data.sex == 0){
        $('#staffInformation-sex').val("男")
        $('#staffInformation-sex').attr('value', 0)
    }else {
        $('#staffInformation-sex').val("女")
        $('#staffInformation-sex').attr('value', 1)
    }
    var staffInformationCycleA = $('.staffInformation-cycle-menu-ul li a')
    if(obj.data.period == null){
        $('#staffInformation-cycle').val(staffInformationCycleA.eq(0).text())
        $('#staffInformation-cycle').attr('value', 0)
    }else{
        $('#staffInformation-cycle').val(staffInformationCycleA.eq(parseInt(obj.data.period.months)).text())
        $('#staffInformation-cycle').attr('value', obj.data.period.months)
    }
    if(obj.data.department){
        $('#staffInformation-department').val(obj.data.department.name)
        $('#staffInformation-department').attr('value', obj.data.department.id)
    }else{
        $('#staffInformation-department').val('')
        $('#staffInformation-department').attr('value', '')
    }
    if(obj.data.role){
        $('#staffInformation-role').val(obj.data.role.name)
        $('#staffInformation-role').attr('value', obj.data.role.id)
    }else{
        $('#staffInformation-role').val('')
        $('#staffInformation-role').attr('value', '')
    }

    var joinDateSplit = obj.data.employDate
    if(joinDateSplit){
        var joinDate = new Date()
        joinDate.setFullYear(joinDateSplit.split('-')[0], joinDateSplit.split('-')[1] - 1, joinDateSplit.split('-')[2])
        $('#staffInformation-joinDate').val(joinDate.toLocaleDateString())
        // document.getElementById("staffInformation-joinDate").valueAsDate = joinDate
    }else{
        $('#staffInformation-resignDate').val('')
    }

    $('#staffInformation-icID').val(obj.data.ic)
    $('#staffInformation-weChat').val(obj.data.wechat)
    $('#staffInformation-phone').val(obj.data.contact)
    if(obj.data.jobNature){
        $('#staffInformation-jobNature').val(obj.data.jobNature.name)
        $('#staffInformation-jobNature').attr('value', obj.data.jobNature.id)
    } else{
        $('#staffInformation-jobNature').val('')
        $('#staffInformation-jobNature').attr('value', '')
    }
    if(obj.data.resignType){
        $('#staffInformation-resignType').val(obj.data.resignType.name)
        $('#staffInformation-resignType').attr('value', obj.data.resignType.id)
    }else{
        $('#staffInformation-resignType').val('')
        $('#staffInformation-resignType').attr('value', '')
    }

    var resignDateSplit = obj.data.resignDate
    if(resignDateSplit){
        var resignDate = new Date()
        resignDate.setFullYear(resignDateSplit.split('-')[0], resignDateSplit.split('-')[1] - 1, resignDateSplit.split('-')[2])
        $('#staffInformation-resignDate').val(resignDate.toLocaleDateString())
        //document.getElementById("staffInformation-resignDate").valueAsDate = resignDate
    }else{
        $('#staffInformation-resignDate').val('')
    }
}
/*
设置离职面板信息/
 */
function setQuitModalInformation(obj) {
    var td = $(obj).parent().parent().parent().parent().parent().find('td')
    $('#modal-staffID').val(td.eq(2).text())
    $('#modal-staffName').val(td.eq(1).text())
    $('#modal-department').val(td.eq(3).text())
}
/*
设置makeSureModal的value/
 */
function setMakeSureDeleteButtonValue(thisObj) {
    var staffID = $(thisObj).parent().parent().parent().parent().parent().find('.staff-id').text()
    $('#myModal-makeSureDelete').attr('value', staffID)
}
/*
删除员工信息/
 */
function deleteStaff() {
    var staffID = $('#myModal-makeSureDelete').attr('value')
    var urlStr = ipPort + '/user/deleteById?id='+ staffID
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert("删除员工信息成功！")
                getAllStaffInformationByPage()
            }else {
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
批量删除员工信息/
 */
function deleteStaffInBatch() {
    var select_sub_box = $('.select-sub-box')
    var jsonArr = []
    for(var i = 0; i < select_sub_box.length; i++){
        if(select_sub_box.eq(i).is(':checked') == true){
            var json = {}
            json['id'] = select_sub_box.eq(i).attr('value')
            jsonArr.push(json)
        }
    }
    let myjson = JSON.stringify(jsonArr)
    var urlStr = ipPort + '/user/deleteByIdBatch'
    $.ajax({
        url:urlStr,
        contentType:'application/json',
        data:myjson,
        dataType:'json',
        type:'post',
        success:function (obj) {
            if(obj.code == 0){
                alert("批量删除员工信息成功！")
                getAllStaffInformationByPage()
            }else {
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
通过部门和姓名搜索信息/
 */
function searchByDepartmentAndStaffName() {
    var departmentId = $('#selectDepartment-dropdownMenu').attr('value')
    var staffName = $('#staffName-searchInput').val()
    var urlStr = ipPort + "/user/getByDepartmentAndNameLikeByPage?id=" + departmentId + "&name=" + staffName
    console.log(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert("未搜索到信息")
                    return
                }
                setStaffTableInformation(obj)
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
通过工作性质查询员工/
 */
function searchByJobNature(thisObj) {
    var searchJobNatureID = $(thisObj).attr('value')
    var page = 0
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/user/getByJobNatureByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&id=' + searchJobNatureID
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert("未搜索到信息")
                    setStaffTableInformation(obj)
                    return
                }
                setStaffTableInformation(obj)
            }else {
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
员工离职/
 */
function leaveJob() {
    var leaveJobStaffID = $('#modal-staffID').val()
    var leaveJobID = ''
    $.ajax({
        url:ipPort + '/jobNature/getAll',
        dataType:'json',
        success:function (obj) {
            for(var i = 0; i < obj.data.length; i++ ){
                if(obj.data[i].name == '已离职'){
                    leaveJobID = obj.data[i].id
                    var urlStr = ipPort + "/user/updateJobNatureById?id=" + leaveJobStaffID + "&jobNatureId=" + leaveJobID
                    $.ajax({
                        url:urlStr,
                        dataType:'json',
                        success:function (obj) {
                            if(obj.code == 0){
                                var resignDate = new Date(($('#modal-leaveDate').val()))
                                resignDate = (resignDate.toLocaleDateString()).replace(/\//g, '-')
                                var resignTypeId = $('#modal-leaveType').attr('value')
                                $.ajax({
                                    url:ipPort + '/user/resign?resignDate=' +  resignDate + '&resignTypeId=' + resignTypeId + '&id=' + leaveJobStaffID,
                                    dataType:'json',
                                    success:function (obj) {
                                        if(obj.code == 0){
                                            alert(obj.message)
                                        }else {
                                            console.log(obj)
                                        }
                                    },
                                    error:function (error) {
                                        console.log(error)
                                    }
                                })
                            }else {
                                alert(obj.message)
                            }
                        },
                        error:function (error) {
                            console.log(error)
                        }
                    })
                    break
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
详细信息页面编辑按钮/
 */
function editButtonOnClick(thisObj){
    //人员信息和档案信息
    if($(thisObj).attr('value') == 'staff' || $(thisObj).attr('value') == 'archive'){
        var panelName = $(thisObj).attr('value')
        panelName = '.' + panelName + 'Information'
        var input = $(panelName).find('input')
        var button = $(panelName).find('button')
        var textarea = $(panelName).find('textarea')
        for(var i = 0; i < input.length; i++){
            if(($(thisObj).attr('value') == 'staff' && (i == 1 || i == 2 || i == 3 || i ==4 || i == 5 || i==10 || i==11))
                || ($(thisObj).attr('value') == 'archive' && (i == 0 || i == 1 || i == 3 || i ==4 || i == 5 || i==6 || i == 11 || i == 14)))continue
            input.eq(i).attr('disabled', false)
        }
        for(var i = 0; i < button.length; i++){
            button.eq(i).attr('disabled', false)
            button.eq(i).removeClass('disable')
        }
        for(var i = 0; i < textarea.length; i++){
            textarea.eq(i).attr('disabled', false)
            textarea.eq(i).removeClass('disable')
        }
        var cancelButton = '.' + $(thisObj).attr('value') + 'CancelButton'
        $(cancelButton).removeClass('hidden')
    }
    //合同信息
    else{
        var panelName = $(thisObj).attr('value')
        panelName = '#' + panelName + '-panel'
        var input = $(panelName).find('input')
        var button = $(panelName).find('button')
        var textarea = $(panelName).find('textarea')
        for(var i = 0; i < input.length; i++){
            if(i == 1 || i == 0 || i == 5 || i == 4)continue
            input.eq(i).attr('disabled', false)
        }
        for(var i = 0; i < button.length; i++){
            button.eq(i).attr('disabled', false)
            button.eq(i).removeClass('disable')
        }
        for(var i = 0; i < textarea.length; i++){
            textarea.eq(i).attr('disabled', false)
            textarea.eq(i).removeClass('disable')
        }
        var cancelButton = '.' + $(thisObj).attr('value') + 'CancelButton'
        $(cancelButton).removeClass('hidden')
    }

}
/*
详细信息页面取消编辑按钮/
 */
function cancelEditButtonOnClick(thisObj) {
    var cancelButton = '.' + $(thisObj).attr('value') + 'CancelButton'
    $(cancelButton).addClass('hidden')
    //人员信息和档案信息
    if($(thisObj).attr('value') == 'staff' || $(thisObj).attr('value') == 'archive'){
        var panelName = $(thisObj).attr('value')
        panelName = '.' + panelName + 'Information'
        var input = $(panelName).find('input')
        var button = $(panelName).find('button')
        var textarea = $(panelName).find('textarea')
        for(var i = 0; i < input.length; i++){
            input.eq(i).attr('disabled', 'disabled')
        }
        for(var i = 0; i < button.length; i++){
            button.eq(i).attr('disabled', 'disabled')
            button.eq(i).addClass('disable')
        }
        for(var i = 0; i < textarea.length; i++){
            textarea.eq(i).attr('disabled', 'disabled')
            textarea.eq(i).addClass('disable')
        }


        var staffID = $('#staffInformation-id').val()
        if($(thisObj).attr('value') == 'staff'){
            var urlStr = ipPort + '/user/getById?id='+ staffID
            $.ajax({
                url:urlStr,
                dataType:'json',
                success:function (obj) {
                    if(obj.code == 0){
                        if(obj.data != null){
                            setDetailsStaffInformationColumn(obj)
                        }
                    }
                    else{
                        console.log(obj)
                    }
                },
                error:function (error) {
                    console.log(error)
                }
            })
        }else if($(thisObj).attr('value') == 'archive'){
            var urlStr = ipPort + '/archive/getByUser?id='+ staffID
            $.ajax({
                url:urlStr,
                dataType:'json',
                success:function (obj) {
                    if(obj.code == 0){
                        if(obj.data != null){
                            setDetailsArchiveInformationColumn(obj)
                        }else{
                            for(var i = 0; i < input.length; i++){
                                input.eq(i).val('')
                                input.eq(i).attr('value', '')
                            }
                            textarea.eq(0).val('')
                        }
                    }
                    else{
                        console.log(obj)
                    }
                },
                error:function (error) {
                    console.log(error)
                }
            })
        }
    }
    //合同信息
    else{
        var contractName = $(thisObj).attr('value')
        var panelName = '#' + contractName + '-panel'
        var input = $(panelName).find('input')
        var button = $(panelName).find('button')
        var textarea = $(panelName).find('textarea')
        for(var i = 0; i < input.length; i++){
            input.eq(i).attr('disabled', 'disabled')
        }
        for(var i = 0; i < button.length; i++){
            button.eq(i).attr('disabled', 'disabled')
            button.eq(i).addClass('disable')
        }
        for(var i = 0; i < textarea.length; i++){
            textarea.eq(i).attr('disabled', 'disabled')
            textarea.eq(i).addClass('disable')
        }
        var contractID = $('#' + contractName + 'ID').val()
        if(contractID == ''){
            for(var i = 0; i < input.length; i++){
                if(i != 1){
                    input.eq(i).val('')
                    input.eq(i).attr('value', '')
                }
            }
            for(var i = 0; i < textarea.length; i++){
                textarea.eq(i).val('')
            }
        }else{
            var urlStr = ipPort + '/contract/getById?id='+ contractID
            $.ajax({
                url:urlStr,
                dataType:'json',
                success:function (obj) {
                    if(obj.code == 0){
                        setDetailsContractInformationColumnCancelButton(obj)
                    }
                    else{
                        console.log(obj)
                    }
                },
                error:function (error) {
                    console.log(error)
                }
            })
        }
    }
}
/*
设置详细页面合同信息栏/
 */
function setDetailsContractInformationColumn(obj) {
    for (var i = 0; i < obj.data.numberOfElements; i ++){
        if(obj.data.content[i].contractType.id == 3){
            $('#formalContractID').val(obj.data.content[i].id)

            var startDateSplit = obj.data.content[i].startDate
            if(startDateSplit){
                var startDate = new Date()
                startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
                $('#formalContractStartDate').val(startDate.toLocaleDateString())
                //document.getElementById("formalContractStartDate").valueAsDate = startDate
            }else {
                $('#formalContractStartDate').val('')
            }

            var endDateSplit = obj.data.content[i].endDate
            if(endDateSplit){
                var endDate = new Date()
                startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
                $('#formalContractEndDate').val(endDate.toLocaleDateString())
              //  document.getElementById("formalContractEndDate").valueAsDate = endDate
            }else {
                $('#formalContractEndDate').val('')
            }

            $('#formalContractPeriod').val(obj.data.content[i].period)
            if(obj.data.content[i].contractStatus){
                $('#formalContractStatus').attr('value', obj.data.content[i].contractStatus.id)
                $('#formalContractStatus').val(obj.data.content[i].contractStatus.name)
            }else {
                $('#formalContractStatus').attr('value', '')
                $('#formalContractStatus').val('')
            }
            $('#formalContractContent').val(obj.data.content[i].content)
            $('#formalContractScanningCopy').val(obj.data.content[i].scanningCopy)
        }else if (obj.data.content[i].contractType.id == 1) {
            $('#temporaryContractID').val(obj.data.content[i].id)

            var startDateSplit = obj.data.content[i].startDate
            if(startDateSplit){
                var startDate = new Date()
                startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
                $('#temporaryContractStartDate').val(startDate.toLocaleDateString())
                //document.getElementById("temporaryContractStartDate").valueAsDate = startDate
            }else {
                $('#temporaryContractStartDate').val('')
            }

            var endDateSplit = obj.data.content[i].endDate
            if(endDateSplit){
                var endDate = new Date()
                startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
                $('#temporaryContractEndDate').val(endDate.toLocaleDateString())
               // document.getElementById("temporaryContractEndDate").valueAsDate = endDate
            }else {
                $('#temporaryContractEndDate').val('')
            }

            $('#temporaryContractPeriod').val(obj.data.content[i].period)
            if(obj.data.content[i].contractStatus){
                $('#temporaryContractStatus').attr('value', obj.data.content[i].contractStatus.id)
                $('#temporaryContractStatus').val(obj.data.content[i].contractStatus.name)
            }else {
                $('#temporaryContractStatus').attr('value', '')
                $('#temporaryContractStatus').val('')
            }
            $('#temporaryContractContent').val(obj.data.content[i].content)
            $('#temporaryContractScanningCopy').val(obj.data.content[i].scanningCopy)
        }else if (obj.data.content[i].contractType.id == 2) {
            $('#internshipAgreementID').val(obj.data.content[i].id)

            var startDateSplit = obj.data.content[i].startDate
            if(startDateSplit){
                var startDate = new Date()
                startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
                $('#internshipAgreementStartDate').val(startDate.toLocaleDateString())
            //    document.getElementById("internshipAgreementStartDate").valueAsDate = startDate
            }else {
                $('#internshipAgreementStartDate').val('')
            }

            var endDateSplit = obj.data.content[i].endDate
            if(endDateSplit){
                var endDate = new Date()
                startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
                $('#internshipAgreementEndDate').val(endDate.toLocaleDateString())
             //   document.getElementById("internshipAgreementEndDate").valueAsDate = endDate
            }else {
                $('#internshipAgreementEndDate').val('')
            }

            $('#internshipAgreementPeriod').val(obj.data.content[i].period)
            if(obj.data.content[i].contractStatus){
                $('#internshipAgreementStatus').attr('value', obj.data.content[i].contractStatus.id)
                $('#internshipAgreementStatus').val(obj.data.content[i].contractStatus.name)
            }else {
                $('#internshipAgreementStatus').attr('value', '')
                $('#internshipAgreementStatus').val('')
            }
            $('#internshipAgreementContent').val(obj.data.content[i].content)
            $('#internshipAgreementScanningCopy').val(obj.data.content[i].scanningCopy)
        }
    }
}
/*
设置详细页面合同信息栏保存按钮/
 */
function setDetailsContractInformationColumnCancelButton(obj) {
    if(obj.data.contractType.id == 3){
        $('#formalContractID').val(obj.data.id)
        $('#formalContractStartDate').val(obj.data.startDate)
        $('#formalContractEndDate').val(obj.data.endDate)
        $('#formalContractPeriod').val(obj.data.period)
        if(obj.data.contractStatus != null){
            $('#formalContractStatus').attr('value', obj.data.contractStatus.id)
            $('#formalContractStatus').val(obj.data.contractStatus.name)
        }
        $('#formalContractContent').val(obj.data.content)
        $('#formalContractScanningCopy').val(obj.data.scanningCopy)
    }else if (obj.data.contractType.id == 1) {
        $('#temporaryContractID').val(obj.data.id)
        $('#temporaryContractStartDate').val(obj.data.startDate)
        $('#temporaryContractEndDate').val(obj.data.endDate)
        $('#temporaryContractPeriod').val(obj.data.period)
        if(obj.data.contractStatus != null){
            $('#temporaryContractStatus').attr('value', obj.data.contractStatus.id)
            $('#temporaryContractStatus').val(obj.data.contractStatus.name)
        }
        $('#temporaryContractContent').val(obj.data.content)
        $('#temporaryContractScanningCopy').val(obj.data.scanningCopy)
    }else if (obj.data.contractType.id == 2) {
        $('#internshipAgreementID').val(obj.data.id)
        $('#internshipAgreementStartDate').val(obj.data.startDate)
        $('#internshipAgreementEndDate').val(obj.data.endDate)
        $('#internshipAgreementPeriod').val(obj.data.period)
        if(obj.data.contractStatus != null){
            $('#internshipAgreementStatus').attr('value', obj.data.contractStatus.id)
            $('#internshipAgreementStatus').val(obj.data.contractStatus.name)
        }
        $('#internshipAgreementContent').val(obj.data.content)
        $('#internshipAgreementScanningCopy').val(obj.data.scanningCopy)
    }
}
/*
详细信息页面修改员工信息/
 */
function updateStaffInformation() {
    var staffID = $('#staffInformation-id').val()
    var staffName = $('#staffInformation-name').val()
    var staffSex = $('#staffInformation-sex').attr('value')
    var IcID = $('#staffInformation-icID').val()
    var department = $('#staffInformation-department').attr('value')
    var weChat = $('#staffInformation-weChat').val()
    var phoneNumber = $('#staffInformation-phone').val()
    var position = $('#staffInformation-role').attr('value')
    var jobNature = $('#staffInformation-jobNature').attr('value')
    var joinDate = new Date(($('#staffInformation-joinDate').val()))
    var period = joinDate
    joinDate = (joinDate.toLocaleDateString()).replace(/\//g, '-')
    var internshipCycle = $('#staffInformation-cycle').attr('value')
    if(parseInt(internshipCycle) != 0){
        period = changeMonth(period, internshipCycle)
        period = (period.toLocaleDateString()).replace(/\//g, '-')
    }else {
        period = ""
    }
    var archive = $('#staffInformation-archive').val()
    var resignType = $('#staffInformation-resignType').attr('value')
    var resignDate = new Date(($('#staffInformation-resignDate').val()))
    if(resignDate != 'Invalid Date'){
        resignDate = (resignDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        resignDate = ''
    }

    if(!staffName || !phoneNumber){
        alert('姓名或者联系方式不能为空！')
        return
    }else {
        var urlStr = ipPort + '/user/update?name=' + staffName + '&id=' + staffID + '&sex=' + staffSex + '&ic=' + IcID + '&wechat=' + weChat + '&contact=' + phoneNumber
            + '&department=' + department + '&role=' + position + '&jobNature=' + jobNature + '&employDate=' + joinDate + '&practiceEndDate=' + period + '&resignDate= ' + resignDate + '&resignType=' + resignType
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    alert(obj.message)
                }else{
                    console.log(obj)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }
}
/*
详细信息页面保存档案信息/
 */
function saveArchiveInformation() {
    var archiveID = $('#archiveInformation-archiveID').val()
    var staffID = $('#staffInformation-id').val()
    var nation = $('#archiveInformation-nation').attr('value')
    var identityNumber = $('#archiveInformation-identityNumber').val()
    var maritalStatus = $('#archiveInformation-maritalStatus').attr('value')
    var militaryStatus = $('#archiveInformation-militaryStatus').attr('value')
    var politicalStatus = $('#archiveInformation-politicalStatus').attr('value')
    var education = $('#archiveInformation-education').attr('value')
    var major = $('#archiveInformation-major').val()
    var firstWorkDate = new Date(($('#archiveInformation-firstWorkDate').val()))
    if(firstWorkDate != 'Invalid Date'){
        firstWorkDate = (firstWorkDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        firstWorkDate = ''
    }
    var height = $('#archiveInformation-height').val()
    var weight = $('#archiveInformation-weight').val()
    var healthStatus = $('#archiveInformation-healthStatus').attr('value')
    var domicilePlace = $('#archiveInformation-domicilePlace').val()
    var livePlace = $('#archiveInformation-livePlace').val()
    var insurance = $('#archiveInformation-insurance').attr('value')
    var familyMemberName = $('#archiveInformation-familyMemberName').val()
    var familyMemberContact = $('#archiveInformation-familyMemberContact').val()

    if(archiveID == ''){
        var urlStr = ipPort + '/archive/add?user=' + staffID + '&nation=' + nation + '&identityNumber=' + identityNumber + '&maritalStatus=' + maritalStatus
            + '&militaryStatus=' + militaryStatus + '&politicalStatus=' + politicalStatus + '&education=' + education + '&major=' + major
            + '&firstWorkDate=' + firstWorkDate + '&height=' + height + '&weight=' + weight + '&healthStatus=' + healthStatus + '&domicilePlace=' + domicilePlace
            + '&livePlace=' + livePlace + '&insurance=' + insurance + '&familyMemberName=' + familyMemberName + '&familyMemberContact=' + familyMemberContact
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    alert(obj.message)
                }else{
                    alert(obj.message)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }else{
        var urlStr = ipPort + '/archive/update?id=' + archiveID + '&user=' + staffID + '&nation=' + nation + '&identityNumber=' + identityNumber + '&maritalStatus=' + maritalStatus
            + '&militaryStatus=' + militaryStatus + '&politicalStatus=' + politicalStatus + '&education=' + education + '&major=' + major
            + '&firstWorkDate=' + firstWorkDate + '&height=' + height + '&weight=' + weight + '&healthStatus=' + healthStatus + '&domicilePlace=' + domicilePlace
            + '&livePlace=' + livePlace + '&insurance=' + insurance + '&familyMemberName=' + familyMemberName + '&familyMemberContact=' + familyMemberContact
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    alert(obj.message)
                }else{
                    alert(obj.message)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }
}
/*
详细页面设置档案信息栏/
 */
function setDetailsArchiveInformationColumn(obj) {
    $('#archiveInformation-archiveID').val(obj.data.id)
    if(obj.data.nation){
        $('#archiveInformation-nation').val(obj.data.nation.name)
        $('#archiveInformation-nation').attr('value', obj.data.nation.id)
    }else{
        $('#staffInformation-nation').val('')
        $('#staffInformation-nation').attr('value', '')
    }
    $('#archiveInformation-identityNumber').val(obj.data.identityNumber)
    if(obj.data.maritalStatus){
        $('#archiveInformation-maritalStatus').val(obj.data.maritalStatus.name)
        $('#archiveInformation-maritalStatus').attr('value', obj.data.maritalStatus.id)
    }else{
        $('#staffInformation-maritalStatus').val('')
        $('#staffInformation-maritalStatus').attr('value', '')
    }
    if(obj.data.militaryStatus){
        $('#archiveInformation-militaryStatus').val(obj.data.militaryStatus.name)
        $('#archiveInformation-militaryStatus').attr('value', obj.data.militaryStatus.id)
    }else{
        $('#staffInformation-militaryStatus').val('')
        $('#staffInformation-militaryStatus').attr('value', '')
    }
    if(obj.data.politicalStatus){
        $('#archiveInformation-politicalStatus').val(obj.data.politicalStatus.name)
        $('#archiveInformation-politicalStatus').attr('value', obj.data.politicalStatus.id)
    }else{
        $('#staffInformation-politicalStatus').val('')
        $('#staffInformation-politicalStatus').attr('value', '')
    }
    if(obj.data.education){
        $('#archiveInformation-education').val(obj.data.education.name)
        $('#archiveInformation-education').attr('value', obj.data.education.id)
    }else{
        $('#staffInformation-education').val('')
        $('#staffInformation-education').attr('value', '')
    }
    $('#archiveInformation-major').val(obj.data.major)

    var firstWorkDateSplit = obj.data.firstWorkDate
    if(firstWorkDateSplit){
        var firstWorkDate = new Date()
        firstWorkDate.setFullYear(firstWorkDateSplit.split('-')[0], firstWorkDateSplit.split('-')[1] - 1, firstWorkDateSplit.split('-')[2])
        $('#archiveInformation-firstWorkDate').val(firstWorkDate.toLocaleDateString())
        //document.getElementById("archiveInformation-firstWorkDate").valueAsDate = firstWorkDate
    }else {
        $('#archiveInformation-firstWorkDate').val('')
    }

    $('#archiveInformation-height').val(obj.data.height)
    $('#archiveInformation-weight').val(obj.data.weight)
    if(obj.data.healthStatus){
        $('#archiveInformation-healthStatus').val(obj.data.healthStatus.name)
        $('#archiveInformation-healthStatus').attr('value', obj.data.healthStatus.id)
    }else{
        $('#staffInformation-healthStatus').val('')
        $('#staffInformation-healthStatus').attr('value', '')
    }
    $('#archiveInformation-domicilePlace').val(obj.data.domicilePlace)
    $('#archiveInformation-livePlace').val(obj.data.livePlace)
    if(obj.data.insurance == 0){
        $('#archiveInformation-insurance').val("无")
        $('#archiveInformation-insurance').attr('value', 0)
    }else {
        $('#archiveInformation-insurance').val("有")
        $('#archiveInformation-insurance').attr('value', 1)
    }
    $('#archiveInformation-familyMemberName').val(obj.data.familyMemberName)
    $('#archiveInformation-familyMemberContact').val(obj.data.familyMemberContact)
}
/*
详细页面保存正式合同栏信息/
 */
function saveFormalContract() {
    var contractID = $('#formalContractID').val()
    var userID = $('#staffInformation-id').val()
    var contractType = $('#formalContractType').attr('value')
    var contractStartDate = new Date(($('#formalContractStartDate').val()))
    if(contractStartDate != 'Invalid Date'){
        contractStartDate = (contractStartDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractStartDate = ''
    }
    var contractEndDate = new Date(($('#formalContractEndDate').val()))
    if(contractEndDate != 'Invalid Date'){
        contractEndDate = (contractEndDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractEndDate = ''
    }
    var contractStatus = $('#formalContractStatus').attr('value')
    var contractContent = $('#formalContractContent').val()
    var contractScanningCopy = $('#formalContractScanningCopy').val()

    if(contractID == ''){
        var urlStr = ipPort + '/contract/add?user=' + userID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
            + '&contractStatus=' + parseInt(contractStatus) + '&content=' + contractContent + '&scanningCopy=' + contractScanningCopy
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    alert(obj.message)
                    setContractID('formalContract')
                }else{
                    console.log(obj)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }else{
        var urlStr = ipPort + '/contract/update?id=' + contractID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
            + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + contractScanningCopy + '&user=' + userID
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    alert(obj.message)
                    setContractID('formalContract')
                }else{
                    console.log(obj)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }
}
/*
详细页面保存临时合同栏信息/
 */
function saveTemporaryContract() {
    var contractID = $('#temporaryContractID').val()
    var userID = $('#staffInformation-id').val()
    var contractType = $('#temporaryContractType').attr('value')
    var contractStartDate = new Date(($('#temporaryContractStartDate').val()))
    if(contractStartDate != 'Invalid Date'){
        contractStartDate = (contractStartDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractStartDate = ''
    }
    var contractEndDate = new Date(($('#temporaryContractEndDate').val()))
    if(contractEndDate != 'Invalid Date'){
        contractEndDate = (contractEndDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractEndDate = ''
    }
    var contractStatus = $('#temporaryContractStatus').attr('value')
    var contractContent = $('#temporaryContractContent').val()
    var contractScanningCopy = $('#temporaryContractScanningCopy').val()

    if(contractID == ''){
        var urlStr = ipPort + '/contract/add?user=' + userID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
            + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + contractScanningCopy
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    alert(obj.message)
                    setContractID('temporaryContract')
                }else{
                    console.log(obj)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }else{
        var urlStr = ipPort + '/contract/update?id=' + contractID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
            + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + contractScanningCopy + '&user=' + userID
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    alert(obj.message)
                    setContractID('temporaryContract')
                }else{
                    console.log(obj)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }
}
/*
详细页面保存实习协议栏信息/
 */
function saveInternshipAgreement() {
    var contractID = $('#internshipAgreementID').val()
    var userID = $('#staffInformation-id').val()
    var contractType = $('#internshipAgreementType').attr('value')
    var contractStartDate = new Date(($('#internshipAgreementStartDate').val()))
    if(contractStartDate != 'Invalid Date'){
        contractStartDate = (contractStartDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractStartDate = ''
    }
    var contractEndDate = new Date(($('#internshipAgreementEndDate').val()))
    if(contractEndDate != 'Invalid Date'){
        contractEndDate = (contractEndDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractEndDate = ''
    }
    var contractStatus = $('#internshipAgreementStatus').attr('value')
    var contractContent = $('#internshipAgreementContent').val()
    var contractScanningCopy = $('#internshipAgreementScanningCopy').val()
    if(contractID == ''){
        var urlStr = ipPort + '/contract/add?user=' + userID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
            + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + contractScanningCopy
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    alert(obj.message)
                    setContractID('internshipAgreement')
                }else{
                    console.log(obj)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }else{
        var urlStr = ipPort + '/contract/update?id=' + contractID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
            + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + contractScanningCopy + '&user=' + userID
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    alert(obj.message)
                    setContractID('internshipAgreement')
                }else{
                    console.log(obj)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }
}
/*
设置合同编号/
 */
function setContractID(panelName) {
    var userID = $('#staffInformation-id').val()
    var urlStr = ipPort + '/contract/getByUserByPage?user=' + userID
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(panelName == 'formalContract'){
                    for (var i = 0; i < obj.data.numberOfElements; i ++){
                        if(obj.data.content[i].contractType.id == 3){
                            $('#formalContractID').val(obj.data.content[i].id)
                        }
                    }
                }else if(panelName == 'temporaryContract'){
                    for (var i = 0; i < obj.data.numberOfElements; i ++){
                        if(obj.data.content[i].contractType.id == 1){
                            $('#temporaryContractID').val(obj.data.content[i].id)
                        }
                    }
                }else if(panelName == 'internshipAgreement'){
                    for (var i = 0; i < obj.data.numberOfElements; i ++){
                        if(obj.data.content[i].contractType.id == 2){
                            $('#internshipAgreementID').val(obj.data.content[i].id)
                        }
                    }
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
设置统计栏的数字cllback函数/
 */
function setSummaryNumberCallback(details_numb, i, obj) {
    $.ajax({
        url: ipPort + '/user/getByJobNature?jobNature=' + obj.data[i].id,
        dataType:'json',
        success:function (obj_) {
            if(obj_.code == 0){
                details_numb.eq(i+1).text(obj_.data.length)
                i++
                if(obj.data.length != i){
                    setSummaryNumberCallback(details_numb, i, obj)
                }
            }else{
                console.log(obj_)
                i++
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置统计栏的数字/
 */
function setSummaryNumber() {
    $.ajax({
        url:ipPort + '/jobNature/getAll',
        dataType:'json',
        success:function (obj) {
            var i = 0
            $.ajax({
                url: ipPort + '/user/getByJobNature?jobNature=' + obj.data[i].id,
                dataType:'json',
                success:function (obj_) {
                    if(obj_.code == 0){
                        details_numb.eq(i+1).text(obj_.data.length)
                        i++
                        setSummaryNumberCallback(details_numb, i, obj)
                    }else{
                        console.log(obj_)
                        i++
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

    var details_numb = $('.details-numb')
    var urlStr = ipPort + '/user/getAll'
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                details_numb.eq(0).text(obj.data.length)
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
导出员工信息excel表格/
 */
function exportStaffInformationExcelTable(tableid) {
    if(getExplorer()=='ie')
    {
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;

        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = window.setInterval("Cleanup();", 1);
        }

    }
    else
    {
        tableToExcel(tableid)
    }
}
/*
月份加指定数/
 */
function changeMonth(period, number) {
    var month = period.getMonth();
    period.setMonth(month + parseInt(number))
    return period
}

