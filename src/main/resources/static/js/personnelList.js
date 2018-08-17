var jobNaturesName = []
var jobNatureID = []
var currentPage = 0
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
    var selectDepartmentA = $('.selectDepartment-dropdownMenu-ul')
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
    /*
    保安证事件/
     */
    $('#archiveInformation-secuCert').parent().find('li a').on('click', function () {
        if($(this).attr('value') == 1){
            $('#archiveInformation-secuCertNum').attr('disabled', false)
        }else{
            $('#archiveInformation-secuCertNum').val('')
            $('#archiveInformation-secuCertNum').attr('disabled', 'disabled')
        }
    })
    /*
    选择图片/
     */
    $('input[class=bussinessInsuranceFile]').change(function() {
        $(this).parent().find('.input-append input').val($(this).val())
    });
    $('input[class=socialSecurityContractFile]').change(function() {
        $(this).parent().find('.input-append input').val($(this).val())
    });
    /*
    选择多个员工/
    */
    $('.selectStaff-department-li img').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
            $(this).parent().find('.selectAllDepartmentStaffs').empty()
        }else{
            $(this).parent().find('.selectStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
            $(this).parent().find('.selectAllDepartmentStaffs').append("全选<input type='checkbox'>")
        }
    })
    $('.selectStaff-department-li .departmentName-span').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
            $(this).parent().find('.selectAllDepartmentStaffs').empty()
        }else{
            $(this).parent().find('.selectStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
            $(this).parent().find('.selectAllDepartmentStaffs').append("全选<input type='checkbox'>")
        }
    })
    /*
   按姓名搜索modal/
    */
    $('.modal-searchInput input').on('input propertychange', function () {
        if($(this).val() == ''){
            $('#form-selectStaff1 .selectStaff-staff-ul2').addClass('hidden')
            $('#form-selectStaff1 .selectStaff-department-ul').removeClass('hidden')
        }
    })

})

/*
添加员工/
 */
function addStaff() {
    var staffName = $('#modal-addStaffName').val()
    var staffSex = $('#modal-addStaffSex').attr('value')
    var bornDate = new Date(($('#modal-addStaffBornDate').val()))
    bornDate = (bornDate.toLocaleDateString()).replace(/\//g, '-')
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
    var bankCardNum = $('#modal-addStaffBankCardNum').val()
    var baseWage = $('#modal-addStaffBaseWage').val()
    var foundation = $('#modal-addStaffFoundation').val()
    var socialSecuritySubsidyWage = $('#modal-addStaffSocialSecuritySubsidyWage').val()
    if(!staffName || !phoneNumber){
        alert('姓名或者联系方式不能为空！')
        return
    }else {
        var urlStr = ipPort + '/user/add?name=' + staffName + '&sex=' + staffSex + '&ic=' + IcID + '&wechat=' + weChat + '&contact=' + phoneNumber
            + '&department=' + department + '&role=' + position + '&jobNature=' + jobNature + '&employDate=' + joinDate + '&practiceEndDate=' + period
        + '&bornDate=' + bornDate + '&bankCardNum=' + bankCardNum + '&baseWage=' + baseWage + '&foundation=' + foundation
            + '&socialSecuritySubsidyWage=' + socialSecuritySubsidyWage
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
                    var button =  $('.archiveInformation').find('button')
                    for(var i = 0; i < button.length; i++){
                        button.eq(i).html("请选择" + "<span class='caret'></span>")
                        button.eq(i).attr('value', '')
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
    var textArea = $('.contractInformation').find('textarea')
    for(var i = 0; i < input.length; i++){
        input.eq(i).val('')
        input.eq(i).attr('value', '')
    }
    var button =  $('.contractInformation').find('button')
    for(var i = 0; i < button.length; i++){
        button.eq(i).html("请选择" + "<span class='caret'></span>")
        button.eq(i).attr('value', '')
    }
    textArea.eq(0).val('')
    //初始化合同信息panel的合同类型
    var formalContractType = $('#formalContractType')
    setContractType(formalContractType, 2)
    var temporaryContractType = $('#temporaryContractType')
    setContractType(temporaryContractType, 0)
    var internshipAgreementType = $('#internshipAgreementType')
    setContractType(internshipAgreementType, 1)
    var businessInsuranceType = $('#businessInsuranceType')
    setContractType(businessInsuranceType, 3)
    var socialSecurityContractType = $('#socialSecurityContractType')
    setContractType(socialSecurityContractType, 4)

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
    currentPage = 0
    var page = currentPage
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
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
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
    currentPage = 0
    var departmentId = $('#selectDepartment-dropdownMenu').attr('value')
    var staffName = $('#staffName-searchInput').val()
    var urlStr = ipPort + "/user/getByDepartmentAndNameLikeByPage?id=" + departmentId + "&name=" + staffName + "&page=" + currentPage
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    setStaffTableInformation(obj)
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
    currentPage = 0
    var page = currentPage
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
设置详细页面人员信息栏/
 */
function setDetailsStaffInformationColumn(obj) {
    if(obj.data){
        $('#staffInformation-name').val(obj.data.name)

        $('#staffInformation-id').val(obj.data.id)
        if(obj.data.sex == 0){
            $('#staffInformation-sex').html("男" + "<span class='caret'></span>")
            $('#staffInformation-sex').attr('value', 0)
        }else if(obj.data.sex == 1){
            $('#staffInformation-sex').html("女" + "<span class='caret'></span>")
            $('#staffInformation-sex').attr('value', 1)
        }else{
            $('#staffInformation-sex').html("请选择" + "<span class='caret'></span>")
            $('#staffInformation-sex').attr('value', '')
        }

        var bornDateSplit = obj.data.bornDate
        if(bornDateSplit){
            var bornDate = new Date()
            bornDate.setFullYear(bornDateSplit.split('-')[0], bornDateSplit.split('-')[1] - 1, bornDateSplit.split('-')[2])
            $('#staffInformation-bornDate').val(bornDate.toLocaleDateString())
        }else{
            $('#staffInformation-bornDate').val('')
        }

        var staffInformationCycleA = $('#staffInformation-cycle').parent().find('ul').find('li a')
        if(obj.data.period == null){
            $('#staffInformation-cycle').html(staffInformationCycleA.eq(0).text() + "<span class='caret'></span>")
            $('#staffInformation-cycle').attr('value', 0)
        }else{
            $('#staffInformation-cycle').html(staffInformationCycleA.eq(parseInt(obj.data.period.months)).text() + "<span class='caret'></span>")
            $('#staffInformation-cycle').attr('value', obj.data.period.months)
        }

        if(obj.data.department){
            $('#staffInformation-department').html(obj.data.department.name + "<span class='caret'></span>")
            $('#staffInformation-department').attr('value', obj.data.department.id)
        }else{
            $('#staffInformation-department').html("请选择" + "<span class='caret'></span>")
            $('#staffInformation-department').attr('value', '')
        }

        if(obj.data.role){
            $('#staffInformation-role').html(obj.data.role.name + "<span class='caret'></span>")
            $('#staffInformation-role').attr('value', obj.data.role.id)
        }else{
            $('#staffInformation-role').html("请选择" + "<span class='caret'></span>")
            $('#staffInformation-role').attr('value', '')
        }

        var joinDateSplit = obj.data.employDate
        if(joinDateSplit){
            var joinDate = new Date()
            joinDate.setFullYear(joinDateSplit.split('-')[0], joinDateSplit.split('-')[1] - 1, joinDateSplit.split('-')[2])
            $('#staffInformation-joinDate').val(joinDate.toLocaleDateString())
        }else{
            $('#staffInformation-joinDate').val('')
        }

        $('#staffInformation-icID').val(obj.data.ic)
        $('#staffInformation-weChat').val(obj.data.wechat)
        $('#staffInformation-phone').val(obj.data.contact)

        if(obj.data.jobNature){
            $('#staffInformation-jobNature').html(obj.data.jobNature.name + "<span class='caret'></span>")
            $('#staffInformation-jobNature').attr('value', obj.data.jobNature.id)
        } else{
            $('#staffInformation-jobNature').html("请选择" + "<span class='caret'></span>")
            $('#staffInformation-jobNature').attr('value', '')
        }

        if(obj.data.resignType){
            $('#staffInformation-resignType').html(obj.data.resignType.name + "<span class='caret'></span>")
            $('#staffInformation-resignType').attr('value', obj.data.resignType.id)
        }else{
            $('#staffInformation-resignType').html("请选择" + "<span class='caret'></span>")
            $('#staffInformation-resignType').attr('value', '')
        }

        var resignDateSplit = obj.data.resignDate
        if(resignDateSplit){
            var resignDate = new Date()
            resignDate.setFullYear(resignDateSplit.split('-')[0], resignDateSplit.split('-')[1] - 1, resignDateSplit.split('-')[2])
            $('#staffInformation-resignDate').val(resignDate.toLocaleDateString())
        }else{
            $('#staffInformation-resignDate').val('')
        }

        $('#staffInformation-bankCardNum').val(obj.data.bankCardNum)
        $('#staffInformation-baseWage').val(obj.data.baseWage)
        $('#staffInformation-foundation').val(obj.data.foundation)
        $('#staffInformation-socialSecuritySubsidyWage').val(obj.data.socialSecuritySubsidyWage)
    }
}
/*
详细页面设置档案信息栏/
 */
function setDetailsArchiveInformationColumn(obj) {
    $('#archiveInformation-archiveID').val(obj.data.id)
    if(obj.data.nation){
        $('#archiveInformation-nation').html(obj.data.nation.name + "<span class='caret'></span>")
        $('#archiveInformation-nation').attr('value', obj.data.nation.id)
    }else{
        $('#staffInformation-nation').html("请选择" + "<span class='caret'></span>")
        $('#staffInformation-nation').attr('value', '')
    }

    $('#archiveInformation-identityNumber').val(obj.data.identityNumber)

    if(obj.data.maritalStatus){
        $('#archiveInformation-maritalStatus').html(obj.data.maritalStatus.name + "<span class='caret'></span>")
        $('#archiveInformation-maritalStatus').attr('value', obj.data.maritalStatus.id)
    }else{
        $('#staffInformation-maritalStatus').html("请选择" + "<span class='caret'></span>")
        $('#staffInformation-maritalStatus').attr('value', '')
    }

    if(obj.data.militaryStatus){
        $('#archiveInformation-militaryStatus').html(obj.data.militaryStatus.name + "<span class='caret'></span>")
        $('#archiveInformation-militaryStatus').attr('value', obj.data.militaryStatus.id)
    }else{
        $('#staffInformation-militaryStatus').html("请选择" + "<span class='caret'></span>")
        $('#staffInformation-militaryStatus').attr('value', '')
    }

    if(obj.data.politicalStatus){
        $('#archiveInformation-politicalStatus').html(obj.data.politicalStatus.name + "<span class='caret'></span>")
        $('#archiveInformation-politicalStatus').attr('value', obj.data.politicalStatus.id)
    }else{
        $('#staffInformation-politicalStatus').html("请选择" + "<span class='caret'></span>")
        $('#staffInformation-politicalStatus').attr('value', '')
    }

    if(obj.data.education){
        $('#archiveInformation-education').html(obj.data.education.name + "<span class='caret'></span>")
        $('#archiveInformation-education').attr('value', obj.data.education.id)
    }else{
        $('#staffInformation-education').html("请选择" + "<span class='caret'></span>")
        $('#staffInformation-education').attr('value', '')
    }

    $('#archiveInformation-major').val(obj.data.major)

    var firstWorkDateSplit = obj.data.firstWorkDate
    if(firstWorkDateSplit){
        var firstWorkDate = new Date()
        firstWorkDate.setFullYear(firstWorkDateSplit.split('-')[0], firstWorkDateSplit.split('-')[1] - 1, firstWorkDateSplit.split('-')[2])
        $('#archiveInformation-firstWorkDate').val(firstWorkDate.toLocaleDateString())
    }else {
        $('#archiveInformation-firstWorkDate').val('')
    }

    $('#archiveInformation-height').val(obj.data.height)
    $('#archiveInformation-weight').val(obj.data.weight)

    if(obj.data.healthStatus){
        $('#archiveInformation-healthStatus').html(obj.data.healthStatus.name + "<span class='caret'></span>")
        $('#archiveInformation-healthStatus').attr('value', obj.data.healthStatus.id)
    }else{
        $('#staffInformation-healthStatus').html("请选择" + "<span class='caret'></span>")
        $('#staffInformation-healthStatus').attr('value', '')
    }

    $('#archiveInformation-domicilePlace').val(obj.data.domicilePlace)
    $('#archiveInformation-livePlace').val(obj.data.livePlace)

    if(obj.data.insurance == 0){
        $('#archiveInformation-insurance').html("无" + "<span class='caret'></span>")
        $('#archiveInformation-insurance').attr('value', 0)
    }else {
        $('#archiveInformation-insurance').html("有" + "<span class='caret'></span>")
        $('#archiveInformation-insurance').attr('value', 1)
    }

    if(obj.data.hasSecuCert == 0){
        $('#archiveInformation-secuCert').html("无" + "<span class='caret'></span>")
        $('#archiveInformation-secuCert').attr('value', 0)
        $('#archiveInformation-secuCertNum').val('')
        $('#archiveInformation-secuCertNum').attr('disabled', 'disabled')
    }else {
        $('#archiveInformation-secuCert').html("有" + "<span class='caret'></span>")
        $('#archiveInformation-secuCert').attr('value', 1)
        $('#archiveInformation-secuCertNum').val(obj.data.secuCertNum)
    }

    $('#archiveInformation-sponsorName').val(obj.data.sponsorName)
    $('#archiveInformation-familyMemberName').val(obj.data.familyMemberName)
    $('#archiveInformation-familyMemberContact').val(obj.data.familyMemberContact)
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
            }else {
                $('#formalContractStartDate').val('')
            }

            var endDateSplit = obj.data.content[i].endDate
            if(endDateSplit){
                var endDate = new Date()
                startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
                $('#formalContractEndDate').val(endDate.toLocaleDateString())
            }else {
                $('#formalContractEndDate').val('')
            }

            $('#formalContractPeriod').val(obj.data.content[i].period)

            if(obj.data.content[i].contractStatus){
                $('#formalContractStatus').attr('value', obj.data.content[i].contractStatus.id)
                $('#formalContractStatus').html(obj.data.content[i].contractStatus.name + "<span class='caret'></span>")
            }else {
                $('#formalContractStatus').attr('value', '')
                $('#formalContractStatus').html("请选择" + "<span class='caret'></span>")
            }

            $('#formalContractContent').val(obj.data.content[i].content)
            $('#formalContractScanningCopy').val(obj.data.content[i].scanningCopy)
        }
        else if (obj.data.content[i].contractType.id == 1) {
            $('#temporaryContractID').val(obj.data.content[i].id)

            var startDateSplit = obj.data.content[i].startDate
            if(startDateSplit){
                var startDate = new Date()
                startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
                $('#temporaryContractStartDate').val(startDate.toLocaleDateString())
            }else {
                $('#temporaryContractStartDate').val('')
            }

            var endDateSplit = obj.data.content[i].endDate
            if(endDateSplit){
                var endDate = new Date()
                startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
                $('#temporaryContractEndDate').val(endDate.toLocaleDateString())
            }else {
                $('#temporaryContractEndDate').val('')
            }

            $('#temporaryContractPeriod').val(obj.data.content[i].period)
            if(obj.data.content[i].contractStatus){
                $('#temporaryContractStatus').attr('value', obj.data.content[i].contractStatus.id)
                $('#temporaryContractStatus').html(obj.data.content[i].contractStatus.name + "<span class='caret'></span>")
            }else {
                $('#temporaryContractStatus').attr('value', '')
                $('#temporaryContractStatus').html("" + "<span class='caret'></span>")
            }

            $('#temporaryContractContent').val(obj.data.content[i].content)
            $('#temporaryContractScanningCopy').val(obj.data.content[i].scanningCopy)
        }
        else if (obj.data.content[i].contractType.id == 2) {
            $('#internshipAgreementID').val(obj.data.content[i].id)

            var startDateSplit = obj.data.content[i].startDate
            if(startDateSplit){
                var startDate = new Date()
                startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
                $('#internshipAgreementStartDate').val(startDate.toLocaleDateString())
            }else {
                $('#internshipAgreementStartDate').val('')
            }

            var endDateSplit = obj.data.content[i].endDate
            if(endDateSplit){
                var endDate = new Date()
                startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
                $('#internshipAgreementEndDate').val(endDate.toLocaleDateString())
            }else {
                $('#internshipAgreementEndDate').val('')
            }

            $('#internshipAgreementPeriod').val(obj.data.content[i].period)
            if(obj.data.content[i].contractStatus){
                $('#internshipAgreementStatus').attr('value', obj.data.content[i].contractStatus.id)
                $('#internshipAgreementStatus').html(obj.data.content[i].contractStatus.name + "<span class='caret'></span>")
            }else {
                $('#internshipAgreementStatus').attr('value', '')
                $('#internshipAgreementStatus').html("" + "<span class='caret'></span>")
            }
            $('#internshipAgreementContent').val(obj.data.content[i].content)
            $('#internshipAgreementScanningCopy').val(obj.data.content[i].scanningCopy)
        }
        else if (obj.data.content[i].contractType.id == 4) {
            $('#businessInsuranceID').val(obj.data.content[i].id)

            var startDateSplit = obj.data.content[i].startDate
            if(startDateSplit){
                var startDate = new Date()
                startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
                $('#businessInsuranceStartDate').val(startDate.toLocaleDateString())
            }else {
                $('#businessInsuranceStartDate').val('')
            }

            var endDateSplit = obj.data.content[i].endDate
            if(endDateSplit){
                var endDate = new Date()
                startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
                $('#businessInsuranceEndDate').val(endDate.toLocaleDateString())
            }else {
                $('#businessInsuranceEndDate').val('')
            }

            $('#businessInsurancePeriod').val(obj.data.content[i].period)
            if(obj.data.content[i].contractStatus){
                $('#businessInsuranceStatus').attr('value', obj.data.content[i].contractStatus.id)
                $('#businessInsuranceStatus').html(obj.data.content[i].contractStatus.name + "<span class='caret'></span>")
            }else {
                $('#businessInsuranceStatus').attr('value', '')
                $('#businessInsuranceStatus').html("" + "<span class='caret'></span>")
            }
            $('#businessInsuranceContent').val(obj.data.content[i].content)
            //加载扫描件
            if(obj.data.content[i].scanningCopy){
                $('#businessInsurance-panel .scanningCopyImg').remove()
                $('#businessInsurance-panel .scanningCopyDiv').remove()
                $('#businessInsuranceScanningCopy').attr('value', obj.data.content[i].scanningCopy)
                var affterStr = "<img class='col-xs-6 col-xs-pull-3 scanningCopyImg' height=300 style='display:none'>"+
                    "<div class='col-xs-6 col-xs-pull-3 scanningCopyDiv' style='height:300px;color: #006dcc;text-align: center;'>正在加载扫描件...</div>"
                $('#businessInsurance-panel iframe').after(affterStr)
                $('#businessInsurance-panel img').attr('onload', "this.nextSibling.style.display='none';this.style.display='';")
                $('#businessInsurance-panel img').attr('src', ipPort + '/image/' + obj.data.content[i].scanningCopy)
            }
        }
        else if (obj.data.content[i].contractType.id == 5) {
            $('#socialSecurityContractID').val(obj.data.content[i].id)

            var startDateSplit = obj.data.content[i].startDate
            if(startDateSplit){
                var startDate = new Date()
                startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
                $('#socialSecurityContractStartDate').val(startDate.toLocaleDateString())
            }else {
                $('#socialSecurityContractStartDate').val('')
            }

            var endDateSplit = obj.data.content[i].endDate
            if(endDateSplit){
                var endDate = new Date()
                startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
                $('#socialSecurityContractEndDate').val(endDate.toLocaleDateString())
            }else {
                $('#socialSecurityContractEndDate').val('')
            }

            $('#socialSecurityContractPeriod').val(obj.data.content[i].period)
            if(obj.data.content[i].contractStatus){
                $('#socialSecurityContractStatus').attr('value', obj.data.content[i].contractStatus.id)
                $('#socialSecurityContractStatus').html(obj.data.content[i].contractStatus.name + "<span class='caret'></span>")
            }else {
                $('#socialSecurityContractStatus').attr('value', '')
                $('#socialSecurityContractStatus').html("" + "<span class='caret'></span>")
            }
            $('#socialSecurityContractContent').val(obj.data.content[i].content)
            //加载扫描件
            if(obj.data.content[i].scanningCopy){
                $('#socialSecurityContract-panel .scanningCopyImg').remove()
                $('#socialSecurityContract-panel .scanningCopyDiv').remove()
                $('#socialSecurityContractScanningCopy').attr('value', obj.data.content[i].scanningCopy)
                var affterStr = "<img class='col-xs-6 col-xs-pull-3 scanningCopyImg' height=300 style='display:none'>"+
                    "<div class='col-xs-6 col-xs-pull-3 scanningCopyDiv' style='height:300px;color: #006dcc;text-align: center;'>正在加载扫描件...</div>"
                $('#socialSecurityContract-panel iframe').after(affterStr)
                $('#socialSecurityContract-panel img').attr('onload', "this.nextSibling.style.display='none';this.style.display='';")
                $('#socialSecurityContract-panel img').attr('src', ipPort + '/image/' + obj.data.content[i].scanningCopy)
            }
        }
    }
}
/*
详细信息页面编辑按钮/
 */
function editButtonOnClick(str){
    //人员信息
    if(str == 'staff'){
        var panelName = str
        panelName = '.' + panelName + 'Information'
        var input = $(panelName).find('input')
        var button = $(panelName).find('button')
        for(var i = 0; i < input.length; i++){
            if(i == 1)continue
            input.eq(i).attr('disabled', false)
        }
        for(var i = 0; i < button.length; i++){
            button.eq(i).attr('disabled', false)
        }
        $('.' + str + 'CancelButton').removeClass('hidden')
    }
    //档案信息
    else if(str == 'archive'){
        var panelName = str
        panelName = '.' + panelName + 'Information'
        var input = $(panelName).find('input')
        var button = $(panelName).find('button')
        for(var i = 0; i < input.length; i++){
            if(i == 0)continue
            input.eq(i).attr('disabled', false)
        }
        for(var i = 0; i < button.length; i++){
            button.eq(i).attr('disabled', false)
        }
        if($('#archiveInformation-secuCert').attr('value') == 1){
            $('#archiveInformation-secuCertNum').attr('disabled', false)
        }else{
            $('#archiveInformation-secuCertNum').attr('disabled', 'disabled')
        }
        $('.' + str + 'CancelButton').removeClass('hidden')
    }
    //合同信息
    else if(str == 'formalContract' || str == 'internshipAgreement' || str == 'temporaryContract' || str == 'businessInsurance' || str == 'socialSecurityContract'){
        var panelName = str
        panelName = '#' + panelName + '-panel'
        var input = $(panelName).find('input')
        var button = $(panelName).find('button')
        var textArea = $(panelName).find('textarea')
        var a = $(panelName).find('a')
        for(var i = 0; i < input.length; i++){
            if(i == 1 || i == 0 || i == 4)continue
            input.eq(i).attr('disabled', false)
        }
        for(var i = 0; i < button.length; i++){
            button.eq(i).attr('disabled', false)
        }
        for(var i = 0; i < textArea.length; i++){
            textArea.eq(i).attr('disabled', false)
            textArea.eq(i).removeClass('disable')
        }
        for(var i = 0; i < a.length; i++){
            a.eq(i).attr('disabled', false)
        }
        $('.' + str + 'CancelButton').removeClass('hidden')
    }

}
/*
详细信息页面取消编辑按钮/
 */
function cancelEditButtonOnClick(str) {
    var cancelButton = '.' + str + 'CancelButton'
    $(cancelButton).addClass('hidden')
    //人员信息和档案信息
    if(str == 'staff' || str == 'archive'){
        var panelName = str
        panelName = '.' + panelName + 'Information'
        var input = $(panelName).find('input')
        var button = $(panelName).find('button')
        for(var i = 0; i < input.length; i++){
            input.eq(i).attr('disabled', 'disabled')
        }
        for(var i = 0; i < button.length; i++){
            button.eq(i).attr('disabled', 'disabled')
        }

        var staffID = $('#staffInformation-id').val()
        if(str == 'staff'){
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
                        alert(obj.message)
                    }
                },
                error:function (error) {
                    console.log(error)
                }
            })
        }else if(str == 'archive'){
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
                            for(var i = 0; i < button.length; i++){
                                button.eq(i).html("请选择" + "<span class='caret'></span>")
                                button.eq(i).attr('value', '')
                            }
                        }
                    }
                    else{
                        alert(obj.message)
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
        var contractName = str
        var panelName = '#' + contractName + '-panel'
        var input = $(panelName).find('input')
        var button = $(panelName).find('button')
        var textArea = $(panelName).find('textarea')
        var a = $(panelName).find('.input-append a')
        for(var i = 0; i < input.length; i++){
            input.eq(i).attr('disabled', 'disabled')
        }
        for(var i = 0; i < button.length; i++){
            button.eq(i).attr('disabled', 'disabled')
        }
        for(var i = 0; i < textArea.length; i++){
            textArea.eq(i).attr('disabled', 'disabled')
            textArea.eq(i).addClass('disable')
        }
        for(var i = 0; i < a.length; i++){
            a.eq(i).attr('disabled', 'disabled')
        }
        if($(panelName).find('.scanningCopyImg')){
            $(panelName).find('.scanningCopyImg').remove()
        }
        if($(panelName).find('.scanningCopyDiv')){
            $(panelName).find('.scanningCopyDiv').remove()
        }
        var contractID = $('#' + contractName + 'ID').val()
        if(contractID == ''){
            for(var i = 0; i < input.length; i++){
                if(i != 1){
                    input.eq(i).val('')
                    input.eq(i).attr('value', '')
                }
            }
            for(var i = 0; i < button.length; i++){
                button.eq(i).html("请选择" + "<span class='caret'></span>")
                button.eq(i).attr('value', '')
            }
            for(var i = 0; i < textArea.length; i++){
                textArea.eq(i).val('')
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
                        alert(obj.message)
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
设置详细页面合同信息栏取消按钮/
 */
function setDetailsContractInformationColumnCancelButton(obj) {
    if(obj.data.contractType.id == 3){
        $('#formalContractID').val(obj.data.id)

        var startDateSplit = obj.data.startDate
        if(startDateSplit){
            var startDate = new Date()
            startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
            $('#formalContractStartDate').val(startDate.toLocaleDateString())
        }else {
            $('#formalContractStartDate').val('')
        }

        var endDateSplit = obj.data.endDate
        if(endDateSplit){
            var endDate = new Date()
            startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
            $('#formalContractEndDate').val(endDate.toLocaleDateString())
        }else {
            $('#formalContractEndDate').val('')
        }

        $('#formalContractPeriod').val(obj.data.period)

        if(obj.data.contractStatus){
            $('#formalContractStatus').attr('value', obj.data.contractStatus.id)
            $('#formalContractStatus').html(obj.data.contractStatus.name + "<span class='caret'></span>")
        }else {
            $('#formalContractStatus').attr('value', '')
            $('#formalContractStatus').html("请选择" + "<span class='caret'></span>")
        }

        $('#formalContractContent').val(obj.data.content)
        $('#formalContractScanningCopy').val(obj.data.scanningCopy)
    }else if (obj.data.contractType.id == 1) {
        $('#temporaryContractID').val(obj.data.id)

        var startDateSplit = obj.data.startDate
        if(startDateSplit){
            var startDate = new Date()
            startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
            $('#temporaryContractStartDate').val(startDate.toLocaleDateString())
        }else {
            $('#temporaryContractStartDate').val('')
        }

        var endDateSplit = obj.data.endDate
        if(endDateSplit){
            var endDate = new Date()
            startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
            $('#temporaryContractEndDate').val(endDate.toLocaleDateString())
        }else {
            $('#temporaryContractEndDate').val('')
        }

        $('#temporaryContractPeriod').val(obj.data.period)

        if(obj.data.contractStatus){
            $('#temporaryContractStatus').attr('value', obj.data.contractStatus.id)
            $('#temporaryContractStatus').html(obj.data.contractStatus.name + "<span class='caret'></span>")
        }else {
            $('#temporaryContractStatus').attr('value', '')
            $('#temporaryContractStatus').html("请选择" + "<span class='caret'></span>")
        }

        $('#temporaryContractContent').val(obj.data.content)
        $('#temporaryContractScanningCopy').val(obj.data.scanningCopy)
    }else if (obj.data.contractType.id == 2) {
        $('#internshipAgreementID').val(obj.data.id)

        var startDateSplit = obj.data.startDate
        if(startDateSplit){
            var startDate = new Date()
            startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
            $('#internshipAgreementStartDate').val(startDate.toLocaleDateString())
        }else {
            $('#internshipAgreementStartDate').val('')
        }

        var endDateSplit = obj.data.endDate
        if(endDateSplit){
            var endDate = new Date()
            startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
            $('#internshipAgreementEndDate').val(endDate.toLocaleDateString())
        }else {
            $('#internshipAgreementEndDate').val('')
        }

        $('#internshipAgreementPeriod').val(obj.data.period)

        if(obj.data.contractStatus){
            $('#internshipAgreementStatus').attr('value', obj.data.contractStatus.id)
            $('#internshipAgreementStatus').html(obj.data.contractStatus.name + "<span class='caret'></span>")
        }else {
            $('#internshipAgreementStatus').attr('value', '')
            $('#internshipAgreementStatus').html("请选择" + "<span class='caret'></span>")
        }

        $('#internshipAgreementContent').val(obj.data.content)
        $('#internshipAgreementScanningCopy').val(obj.data.scanningCopy)
    }else if (obj.data.contractType.id == 4) {
        $('#businessInsuranceID').val(obj.data.id)

        var startDateSplit = obj.data.startDate
        if(startDateSplit){
            var startDate = new Date()
            startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
            $('#businessInsuranceStartDate').val(startDate.toLocaleDateString())
        }else {
            $('#businessInsuranceStartDate').val('')
        }

        var endDateSplit = obj.data.endDate
        if(endDateSplit){
            var endDate = new Date()
            startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
            $('#businessInsuranceEndDate').val(endDate.toLocaleDateString())
        }else {
            $('#businessInsuranceEndDate').val('')
        }

        $('#businessInsurancePeriod').val(obj.data.period)

        if(obj.data.contractStatus){
            $('#businessInsuranceStatus').attr('value', obj.data.contractStatus.id)
            $('#businessInsuranceStatus').html(obj.data.contractStatus.name + "<span class='caret'></span>")
        }else {
            $('#businessInsuranceStatus').attr('value', '')
            $('#businessInsuranceStatus').html("请选择" + "<span class='caret'></span>")
        }

        $('#businessInsuranceContent').val(obj.data.content)
        $('#businessInsuranceScanningCopy').val('')
        $('#businessInsuranceScanningCopy').attr(obj.data.scanningCopy)
        //加载扫描件
        if(obj.data.scanningCopy){
            $('#businessInsuranceScanningCopy').attr('value', obj.data.scanningCopy)
            var affterStr = "<img class='col-xs-6 col-xs-pull-3 scanningCopyImg' height=300 style='display:none'>"+
                "<div class='col-xs-6 col-xs-pull-3 scanningCopyDiv' style='height:300px;color: #006dcc;text-align: center;'>正在加载扫描件...</div>"
            $('#businessInsurance-panel iframe').after(affterStr)
            $('#businessInsurance-panel img').attr('onload', "this.nextSibling.style.display='none';this.style.display='';")
            $('#businessInsurance-panel img').attr('src', ipPort + '/image/' + obj.data.scanningCopy)
        }
    }else if (obj.data.contractType.id == 5) {
        $('#socialSecurityContractID').val(obj.data.id)

        var startDateSplit = obj.data.startDate
        if(startDateSplit){
            var startDate = new Date()
            startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
            $('#socialSecurityContractStartDate').val(startDate.toLocaleDateString())
        }else {
            $('#socialSecurityContractStartDate').val('')
        }

        var endDateSplit = obj.data.endDate
        if(endDateSplit){
            var endDate = new Date()
            startDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
            $('#socialSecurityContractEndDate').val(endDate.toLocaleDateString())
        }else {
            $('#socialSecurityContractEndDate').val('')
        }

        $('#socialSecurityContractPeriod').val(obj.data.period)

        if(obj.data.contractStatus){
            $('#socialSecurityContractStatus').attr('value', obj.data.contractStatus.id)
            $('#socialSecurityContractStatus').html(obj.data.contractStatus.name + "<span class='caret'></span>")
        }else {
            $('#socialSecurityContractStatus').attr('value', '')
            $('#socialSecurityContractStatus').html("请选择" + "<span class='caret'></span>")
        }

        $('#socialSecurityContractContent').val(obj.data.content)
        $('#socialSecurityContractScanningCopy').val('')
        $('#socialSecurityContractScanningCopy').attr('value', obj.data.scanningCopy)
        //加载扫描件
        if(obj.data.scanningCopy){
            $('#socialSecurityContractScanningCopy').attr('value', obj.data.scanningCopy)
            var affterStr = "<img class='col-xs-6 col-xs-pull-3 scanningCopyImg' height=300 style='display:none'>"+
                "<div class='col-xs-6 col-xs-pull-3 scanningCopyDiv' style='height:300px;color: #006dcc;text-align: center;'>正在加载扫描件...</div>"
            $('#socialSecurityContract-panel iframe').after(affterStr)
            $('#socialSecurityContract-panel img').attr('onload', "this.nextSibling.style.display='none';this.style.display='';")
            $('#socialSecurityContract-panel img').attr('src', ipPort + '/image/' + obj.data.scanningCopy)
        }
    }
}
/*
详细信息页面修改员工信息/
 */
function updateStaffInformation() {
    var staffID = $('#staffInformation-id').val()
    var staffName = $('#staffInformation-name').val()
    var staffSex = $('#staffInformation-sex').attr('value')
    var bornDate = $('#staffInformation-bornDate').val()
    if(bornDate){
        bornDate = new Date(bornDate)
        bornDate = (bornDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        bornDate = ''
    }
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
    var bankCardNum = $('#staffInformation-bankCardNum').val()
    var baseWage = $('#staffInformation-baseWage').val()
    var foundation = $('#staffInformation-foundation').val()
    var socialSecuritySubsidyWage = $('#staffInformation-socialSecuritySubsidyWage').val()
    if(!staffName || !phoneNumber){
        alert('姓名或者联系方式不能为空！')
        return
    }else {
        var urlStr = ipPort + '/user/update?name=' + staffName + '&id=' + staffID + '&sex=' + staffSex + '&ic=' + IcID + '&wechat=' + weChat + '&contact=' + phoneNumber
            + '&department=' + department + '&role=' + position + '&jobNature=' + jobNature + '&employDate=' + joinDate + '&practiceEndDate=' + period + '&resignDate= ' + resignDate + '&resignType=' + resignType
            + '&bornDate=' + bornDate + '&bankCardNum=' + bankCardNum + '&baseWage=' + baseWage + '&foundation=' + foundation
            + '&socialSecuritySubsidyWage=' + socialSecuritySubsidyWage
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
设置批量修改基本工资modal/
 */
function setUpdateBaseAndSocialSecurityAndFoundationBatchModal() {
    getAllStaff_multi()
    $('#updateBaseWageBatch-baseWage').val('')
    $('#updateBaseWageBatch-foundation').val('')
    $('#updateBaseWageBatch-socialSecuritySubsidyWage').val('')
    $('#myModal-updateBaseWageBatch').modal('toggle')
}
/*
批量修改基本工资等/
 */
function updateBaseAndSocialSecurityAndFoundationBatch() {
    var baseWage = $('#updateBaseWageBatch-baseWage').val()
    if(!baseWage){
        baseWage = 0
    }
    var foundation = $('#updateBaseWageBatch-foundation').val()
    if(!foundation){
        foundation = 0
    }
    var socialSecuritySubsidyWage = $('#updateBaseWageBatch-socialSecuritySubsidyWage').val()
    if(!socialSecuritySubsidyWage){
        socialSecuritySubsidyWage = 0
    }
    var selectedStaff_span = $('.selectedStaff-span')
    var strID = []
    for(var i = 0; i < selectedStaff_span.length; i++){
        strID.push(selectedStaff_span.eq(i).attr('value'))
    }
    var urlStr = ipPort + '/user/updateBaseAndSocialSecurityAndFoundationBatch?userIds=' + strID + '&base=' + baseWage
        + '&socialSecurity=' + socialSecuritySubsidyWage + '&foundation=' + foundation
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
    var hasSecuCert = $('#archiveInformation-secuCert').attr('value')
    var secuCertNum = $('#archiveInformation-secuCertNum').val()
    var sponsorName = $('#archiveInformation-sponsorName').val()
    var familyMemberName = $('#archiveInformation-familyMemberName').val()
    var familyMemberContact = $('#archiveInformation-familyMemberContact').val()

    if(archiveID == ''){
        var urlStr = ipPort + '/archive/add?user=' + staffID + '&nation=' + nation + '&identityNumber=' + identityNumber + '&maritalStatus=' + maritalStatus
            + '&militaryStatus=' + militaryStatus + '&politicalStatus=' + politicalStatus + '&education=' + education + '&major=' + major
            + '&firstWorkDate=' + firstWorkDate + '&height=' + height + '&weight=' + weight + '&healthStatus=' + healthStatus + '&domicilePlace=' + domicilePlace
            + '&livePlace=' + livePlace + '&insurance=' + insurance + '&hasSecuCert=' + hasSecuCert + '&secuCertNum=' + secuCertNum +
            '&sponsorName=' + sponsorName + '&familyMemberName=' + familyMemberName + '&familyMemberContact=' + familyMemberContact
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
            + '&livePlace=' + livePlace + '&insurance=' + insurance + '&hasSecuCert=' + hasSecuCert + '&secuCertNum=' + secuCertNum +
            '&sponsorName=' + sponsorName + '&familyMemberName=' + familyMemberName + '&familyMemberContact=' + familyMemberContact
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
详细页面保存商业保险合同栏信息/
 */
function saveBusinessInsurance() {
    var contractID = $('#businessInsuranceID').val()
    var userID = $('#staffInformation-id').val()
    var contractType = $('#businessInsuranceType').attr('value')
    var contractStartDate = new Date(($('#businessInsuranceStartDate').val()))
    if(contractStartDate != 'Invalid Date'){
        contractStartDate = (contractStartDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractStartDate = ''
    }
    var contractEndDate = new Date(($('#businessInsuranceEndDate').val()))
    if(contractEndDate != 'Invalid Date'){
        contractEndDate = (contractEndDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractEndDate = ''
    }
    var contractStatus = $('#businessInsuranceStatus').attr('value')
    var contractContent = $('#businessInsuranceContent').val()
    var contractScanningCopy = $('#businessInsuranceScanningCopy').val()
    if(contractScanningCopy){
        $("[data-toggle='popover']").popover('show');
        var formData = new FormData($("#businessInsurance-uploadImage")[0]);
        $.ajax({
            url:ipPort + '/image/upload',
            type:"post",
            data:formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success:function(obj_){
                console.log(obj_)
                if(obj_.code == 0){
                    if(contractID == ''){
                        var urlStr = ipPort + '/contract/add?user=' + userID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
                            + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + obj_.data.code
                        $.ajax({
                            url:urlStr,
                            dataType:'json',
                            success:function (obj) {
                                if(obj.code == 0){
                                    $("[data-toggle='popover']").popover('destroy');
                                    alert(obj.message)
                                    setContractID('businessInsurance')
                                }else{
                                    $("[data-toggle='popover']").popover('destroy');
                                    console.log(obj)
                                }
                            },
                            error:function (error) {
                                $("[data-toggle='popover']").popover('destroy');
                                console.log(error)
                            }
                        })
                    }else{
                        var urlStr = ipPort + '/contract/update?id=' + contractID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
                            + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + obj_.data.code + '&user=' + userID
                        $.ajax({
                            url:urlStr,
                            dataType:'json',
                            success:function (obj) {
                                if(obj.code == 0){
                                    $("[data-toggle='popover']").popover('destroy');
                                    alert(obj.message)
                                    setContractID('businessInsurance')
                                }else{
                                    $("[data-toggle='popover']").popover('destroy');
                                    console.log(obj)
                                }
                            },
                            error:function (error) {
                                $("[data-toggle='popover']").popover('destroy');
                                console.log(error)
                            }
                        })
                    }
                }else{
                    $("[data-toggle='popover']").popover('destroy');
                    alert(obj_.message)
                }
            },
            error:function(e){
                $("[data-toggle='popover']").popover('destroy');
                alert("上传失败！！");
            }
        });
    }
    else{
        if(contractID == ''){
            var urlStr = ipPort + '/contract/add?user=' + userID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
                + '&contractStatus=' + contractStatus + '&content=' + contractContent
            $.ajax({
                url:urlStr,
                dataType:'json',
                success:function (obj) {
                    if(obj.code == 0){
                        alert(obj.message)
                        setContractID('businessInsurance')
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
                + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&user=' + userID + '&scanningCopy=' + $('#businessInsuranceScanningCopy').attr('value')
            $.ajax({
                url:urlStr,
                dataType:'json',
                success:function (obj) {
                    if(obj.code == 0){
                        alert(obj.message)
                        setContractID('businessInsurance')
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
}
/*
详细页面保存社保合同栏信息/
 */
function saveSocialSecurityContract() {
    var contractID = $('#socialSecurityContractID').val()
    var userID = $('#staffInformation-id').val()
    var contractType = $('#socialSecurityContractType').attr('value')
    var contractStartDate = new Date(($('#socialSecurityContractStartDate').val()))
    if(contractStartDate != 'Invalid Date'){
        contractStartDate = (contractStartDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractStartDate = ''
    }
    var contractEndDate = new Date(($('#socialSecurityContractEndDate').val()))
    if(contractEndDate != 'Invalid Date'){
        contractEndDate = (contractEndDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractEndDate = ''
    }
    var contractStatus = $('#socialSecurityContractStatus').attr('value')
    var contractContent = $('#socialSecurityContractContent').val()
    var contractScanningCopy = $('#socialSecurityContractScanningCopy').val()

    if(contractScanningCopy){
        $("[data-toggle='popover']").popover('show');
        var formData = new FormData($("#socialSecurityContract-uploadImage")[0]);
        $.ajax({
            url:ipPort + '/image/upload',
            type:"post",
            data:formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success:function(obj_){
                console.log(obj_)
                if(obj_.code == 0){
                    if(contractID == ''){
                        var urlStr = ipPort + '/contract/add?user=' + userID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
                            + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + obj_.data.code
                        $.ajax({
                            url:urlStr,
                            dataType:'json',
                            success:function (obj) {
                                if(obj.code == 0){
                                    $("[data-toggle='popover']").popover('destroy');
                                    alert(obj.message)
                                    setContractID('socialSecurityContract')
                                }else{
                                    $("[data-toggle='popover']").popover('destroy');
                                    console.log(obj)
                                }
                            },
                            error:function (error) {
                                $("[data-toggle='popover']").popover('destroy');
                                console.log(error)
                            }
                        })
                    }else{
                        var urlStr = ipPort + '/contract/update?id=' + contractID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
                            + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + obj_.data.code + '&user=' + userID
                        $.ajax({
                            url:urlStr,
                            dataType:'json',
                            success:function (obj) {
                                if(obj.code == 0){
                                    $("[data-toggle='popover']").popover('destroy');
                                    alert(obj.message)
                                    setContractID('socialSecurityContract')
                                }else{
                                    $("[data-toggle='popover']").popover('destroy');
                                    console.log(obj)
                                }
                            },
                            error:function (error) {
                                $("[data-toggle='popover']").popover('destroy');
                                console.log(error)
                            }
                        })
                    }
                }else{
                    $("[data-toggle='popover']").popover('destroy');
                    alert(obj_.message)
                }
            },
            error:function(e){
                $("[data-toggle='popover']").popover('destroy');
                alert("上传失败！！");
            }
        });
    }
    else{
        if(contractID == ''){
            var urlStr = ipPort + '/contract/add?user=' + userID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
                + '&contractStatus=' + contractStatus + '&content=' + contractContent
            $.ajax({
                url:urlStr,
                dataType:'json',
                success:function (obj) {
                    if(obj.code == 0){
                        alert(obj.message)
                        setContractID('socialSecurityContract')
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
                + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&user=' + userID + '&scanningCopy=' + $('#socialSecurityContractScanningCopy').attr('value')
            $.ajax({
                url:urlStr,
                dataType:'json',
                success:function (obj) {
                    if(obj.code == 0){
                        alert(obj.message)
                        setContractID('socialSecurityContract')
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
                }else if(panelName == 'businessInsurance'){
                    for (var i = 0; i < obj.data.numberOfElements; i ++){
                        if(obj.data.content[i].contractType.id == 4){
                            $('#businessInsuranceID').val(obj.data.content[i].id)
                        }
                    }
                }else if(panelName == 'socialSecurityContract'){
                    for (var i = 0; i < obj.data.numberOfElements; i ++){
                        if(obj.data.content[i].contractType.id == 5){
                            $('#socialSecurityContractID').val(obj.data.content[i].id)
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
/****************************************************************/
/*
获取所有员工姓名/
 */
function getAllStaff_multi() {
    $('.selectAllDepartmentStaffs input').prop('checked',false)
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
    var selectedStaffUl = $('#form-selectStaff1 .selectedStaff-staff-ul')
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
选定人员/
 */
function selectedPeople() {
    var selectedStaff_span = $('.selectedStaff-span')
    var strID = ''
    var strName = ''
    for(var i = 0; i < selectedStaff_span.length; i++){
        strID = strID + selectedStaff_span.eq(i).attr('value')
        strName = strName + selectedStaff_span.eq(i).text()
        if(i != selectedStaff_span.length - 1){
            strID = strID + '_'
            strName = strName + '、'
        }
    }
    $('#goOutPanel-staffNames').attr('value', strID)
    $('#goOutPanel-staffNames').val(strName)
}
/*
通过姓名搜索/
 */
function searchByName_modal(thisObj) {
    var name = $(thisObj).parent().find('input').val()
    if(name != ''){
        $.ajax({
            url:ipPort + '/user/getByNameLike?name=' + name,
            dataType:'json',
            success:function (obj) {
                $('#form-selectStaff1 .selectStaff-department-ul').addClass('hidden')
                $('#form-selectStaff1 .selectStaff-staff-ul2').removeClass('hidden')
                var staffUl = $('#form-selectStaff1').find('.selectStaff-staff-ul2')
                staffUl.find('li').remove()
                for(var i = 0; i < obj.data.length; i++){
                    var appendStr = '<li onclick="selectedStaff(this)"><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span ' + 'value="' + obj.data[i].id + '">' + obj.data[i].name + '</span></li>'
                    staffUl.append(appendStr)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }
}
/**********************************************************888/
/*
上一页/
 */
function previousPage() {
    var currentPage_ = $('.currentPage').text()
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
下一页/
 */
function nextPage() {
    var currentPage_ = $('.currentPage').text()
    var totalPage_ = $('.totalPage').text()
    if(currentPage_ == totalPage_){
        alert("已经是最后一页！")
        return
    }
    currentPage++
    var page = currentPage
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
跳转页/
 */
function skipPage() {
    var skipPage_ = parseInt($('.skipPage').val())
    var totalPage_ = parseInt($('.totalPage').text())
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
