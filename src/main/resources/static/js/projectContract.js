var currentPage = 0
/*
currentSearch == -1 全部搜索
currentSearch == -2 条件搜索/
 */
var currentSearch = -1
/*
currentModal == 0 添加
currentModal == 1 修改/
 */
var currentModal = 0
$(document).ready(function () {
    $('#modal-contractStartDate').val( new Date().toLocaleDateString())
    $('#modal-contractEndDate').val( new Date().toLocaleDateString())

    var projectStatusA = $('.projectStatus-menu-ul li a')
    getAllProjectStatusName(projectStatusA)
    $('.projectStatus-menu-ul li a').on('click', function () {
        $('#modal-projectStatus').val($(this).text())
        $('#modal-projectStatus').attr('value', $(this).attr('value'))
    })

    var updateProjectStatusA = $('.updateProjectStatus-menu-ul li a')
    getAllProjectStatusName(updateProjectStatusA)
    $('.updateProjectStatus-menu-ul li a').on('click', function () {
        $('#modal-updateProjectStatus').val($(this).text())
        $('#modal-updateProjectStatus').attr('value', $(this).attr('value'))
    })

    getAllProjectContractInformation()
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
    $('#myModal-selectStaff .modal-searchInput input').on('input propertychange', function () {
        if($('#myModal-selectStaff .modal-searchInput input').val() == ''){
            $('#form-selectStaff1 .selectStaff-staff-ul2').addClass('hidden')
            $('#form-selectStaff1 .selectStaff-department-ul').removeClass('hidden')
        }
    })
    /*
     选择one员工/
      */
    $('.selectOneStaff-department-li img').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectOneStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
        }else{
            $(this).parent().find('.selectOneStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
        }
    })
    $('.selectOneStaff-department-li .departmentName-span').on('click', function () {
        if($(this).parent().find('.hidden').length == 0){
            $(this).parent().find('.selectOneStaff-staff-ul').addClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/addition.png')
        }else{
            $(this).parent().find('.selectOneStaff-staff-ul').removeClass('hidden')
            $(this).parent().find('.departmentName-img').attr('src', 'imgs/offline.png')
        }
    })
    /*
    按姓名搜索modal/
     */
    $('#myModal-selectOneStaff .modal-searchInput input').on('input propertychange', function () {
        if($(this).val() == ''){
            $('#form-selectOneStaff .selectOneStaff-staff-ul2').addClass('hidden')
            $('#form-selectOneStaff .selectOneStaff-department-ul').removeClass('hidden')
        }
    })
})
/*
添加项目合同/
 */
function addProjectContract() {
    var projectName = $('#modal-contractName').val()
    var contractCustomerName = $('#modal-contractCustomerName').val()
    var contractStartDate = new Date(($('#modal-contractStartDate').val()))
    contractStartDate = (contractStartDate.toLocaleDateString()).replace(/\//g, '-')
    var contractEndDate = new Date(($('#modal-contractEndDate').val()))
    contractEndDate = (contractEndDate.toLocaleDateString()).replace(/\//g, '-')
    var contractAmount = $('#modal-contractAmount').val()
    var contractCustomerOfficePhone = $('#modal-contractCustomerOfficePhone').val()
    var contractCustomerFinancePhone = $('#modal-contractCustomerFinancePhone').val()
    var projectStatus = $('#modal-projectStatus').attr('value')
    var contractResponsibleName = $('#modal-contractResponsibleName').attr('value').split('_')
    var projectStaffs = $('#modal-contractStaffs').attr('value').split('_')
    if(projectName == ''){
        alert("请输入项目名称")
        return
    }
    var urlStr = ipPort + '/project/add?name='+ projectName + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate + '&price=' + contractAmount
        + '&customerOfficePhone=' + contractCustomerOfficePhone + '&customerFinancePhone=' + contractCustomerFinancePhone
        + '&customerUnit=' + contractCustomerName + '&leader=' + contractResponsibleName + '&projectStatus=' + projectStatus + '&userIds=' + projectStaffs
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            alert(obj.message)
            getAllProjectContractInformation()
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
搜索所有项目合同/
 */
function getAllProjectContractInformation(page_ = 0) {
    currentSearch = -1
    currentPage = page_
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/project/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setProjectContractTableInformation(obj)
                console.log(obj)
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
/*
设置项目table/
 */
function setProjectContractTableInformation(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    if(obj.data.numberOfElements != 0){
        var table_tr = $('.table-tr')
        var project_checkbox = $('.project-checkBox')
        var project_id = $('.project-id')
        var project_name = $('.project-name')
        var project_status = $('.project-status')
        var project_period = $('.project-period')
        var project_customerName = $('.project-customerName')
        var project_customerOfficePhone = $('.project-customerOfficePhone')
        var project_customerFinancePhone = $('.project-customerFinancePhone')
        var project_amount = $('.project-amount')
        var project_receivedPrice = $('.project-receivedPrice')
        var project_responsiblePersonName = $('.project-responsiblePersonName')
        var project_startDate = $('.project-startDate')
        var project_project_endDate = $('.project-endDate')
        for(var  i = 0; i < obj.data.numberOfElements; i++){
            table_tr.eq(i).removeClass('hidden')
            project_checkbox.eq(i).find('input').attr('value', obj.data.content[i].id )
            project_id.eq(i).text(obj.data.content[i].id)
            project_name.eq(i).text(obj.data.content[i].name)
            if(obj.data.content[i].projectStatus){
                project_status.eq(i).text(obj.data.content[i].projectStatus.name)
                project_status.eq(i).attr('value', obj.data.content[i].projectStatus.id)
            }else{
                project_status.eq(i).text('')
                project_status.eq(i).attr('value','')
            }
            project_period.eq(i).text(obj.data.content[i].period.days)
            project_customerName.eq(i).text(obj.data.content[i].customerUnit)
            project_customerOfficePhone.eq(i).text(obj.data.content[i].customerOfficePhone)
            project_customerFinancePhone.eq(i).text(obj.data.content[i].customerFinancePhone)
            project_amount.eq(i).text(obj.data.content[i].price)
            project_receivedPrice.eq(i).text(obj.data.content[i].receiptPrice)
            if(obj.data.content[i].leader){
                project_responsiblePersonName.eq(i).text(obj.data.content[i].leader.name)
                project_responsiblePersonName.eq(i).attr('value', obj.data.content[i].leader.id)
            }else{
                project_responsiblePersonName.eq(i).text('')
                project_responsiblePersonName.eq(i).attr('value', '')
            }
            project_startDate.eq(i).text(obj.data.content[i].startDate)
            project_project_endDate.eq(i).text(obj.data.content[i].endDate)
        }
        for (var i = obj.data.numberOfElements; i < 10; i++){
            table_tr.eq(i).addClass('hidden')
        }
    }else{
        for (var i = 0; i < 10; i++){
            var table_tr = $('.table-tr')
            table_tr.eq(i).addClass('hidden')
        }
    }
}
/*
设置修改合同modal/
 */
function setUpdateModalInformation(thisObj) {
    var td = $(thisObj).parent().parent().parent().find('td')
    $('#modal-updateProjectID').val(td.eq(1).text())
    $('#modal-updateProjectName').val(td.eq(2).text())
    $('#modal-updateProjectStatus').val(td.eq(3).text())
    $('#modal-updateProjectStatus').attr('value', td.eq(3).attr('value'))
    $('#modal-updateProjectCustomerName').val(td.eq(5).text())
    $('#modal-updateProjectCustomerOfficePhone').val(td.eq(6).text())
    $('#modal-updateProjectCustomerFinancePhone').val(td.eq(7).text())
    $('#modal-updateProjectAmount').val(td.eq(8).text())
    $('#modal-updateProjectReceiptPrice').val(td.eq(9).text())
    $('#modal-updateProjectResponsibleName').val(td.eq(10).text())
    $('#modal-updateProjectResponsibleName').attr('value', td.eq(10).attr('value'))

    var updateProjectStartDateSplit = td.eq(11).text()
    if(updateProjectStartDateSplit){
        var updateProjectStartDate = new Date()
        updateProjectStartDate.setFullYear(updateProjectStartDateSplit.split('-')[0], updateProjectStartDateSplit.split('-')[1] - 1, updateProjectStartDateSplit.split('-')[2])
        $('#modal-updateProjectStartDate').val(updateProjectStartDate.toLocaleDateString())
    }else {
        $('#modal-updateProjectStartDate').val('')
    }
    var updateProjectEndDateSplit = td.eq(12).text()
    if(updateProjectEndDateSplit){
        var updateProjectEndDate = new Date()
        updateProjectEndDate.setFullYear(updateProjectEndDateSplit.split('-')[0], updateProjectEndDateSplit.split('-')[1] - 1, updateProjectEndDateSplit.split('-')[2])
        $('#modal-updateProjectEndDate').val(updateProjectStartDate.toLocaleDateString())
    }else {
        $('#modal-updateProjectEndDate').val('')
    }

    $.ajax({
        url:ipPort + '/project/getUsersByProject?id=' + td.eq(1).text(),
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                var staffsID = ''
                var staffsName = ''
                for(var i = 0; i < obj.data.length; i++){
                    staffsID = staffsID + obj.data[i].id
                    staffsName = staffsName + obj.data[i].name
                    if(i != obj.data.length - 1){
                        staffsID = staffsID + '_'
                        staffsName = staffsName + '、'
                    }
                }
                $('#modal-updateProjectStaffs').val(staffsName)
                $('#modal-updateProjectStaffs').attr('value', staffsID)
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
/*
修改合同/
 */
function updateProjectContract() {
    var projectID = $('#modal-updateProjectID').val()
    var projectName = $('#modal-updateProjectName').val()
    var contractCustomerName = $('#modal-updateProjectCustomerName').val()

    var contractStartDate = new Date(($('#modal-updateProjectStartDate').val()))
    if(contractStartDate != 'Invalid Date'){
        contractStartDate = (contractStartDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractStartDate = ''
    }
    var contractEndDate = new Date(($('#modal-updateProjectEndDate').val()))
    if(contractEndDate != 'Invalid Date'){
        contractEndDate = (contractEndDate.toLocaleDateString()).replace(/\//g, '-')
    }else{
        contractEndDate = ''
    }

    var contractAmount = $('#modal-updateProjectAmount').val()
    var contractReceiptPrice = $('#modal-updateProjectReceiptPrice').val()
    var contractCustomerOfficePhone = $('#modal-updateProjectCustomerOfficePhone').val()
    var contractCustomerFinancePhone = $('#modal-updateProjectCustomerFinancePhone').val()
    var projectStatus = $('#modal-updateProjectStatus').attr('value')
    var contractResponsibleName = $('#modal-updateProjectResponsibleName').attr('value').split('_')
    var projectStaffs = $('#modal-updateProjectStaffs').attr('value').split('_')
    if(projectName == ''){
        alert("请输入项目名称")
        return
    }
    var urlStr = ipPort + '/project/update?name='+ projectName + '&id=' + projectID + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate + '&price=' + contractAmount
        + '&receiptPrice=' + contractReceiptPrice + '&customerOfficePhone=' + contractCustomerOfficePhone + '&customerFinancePhone=' + contractCustomerFinancePhone
        + '&customerUnit=' + contractCustomerName + '&leader=' + contractResponsibleName + '&projectStatus=' + projectStatus + '&userIds=' + projectStaffs
    console.log(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            alert(obj.message)
            getAllProjectContractInformation()
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置makeSureModal的value/
 */
function setMakeSureDeleteButtonValue(thisObj) {
    var td = $(thisObj).parent().parent().parent().find('td')
    var contractId = td.eq(1).text()
    $('#myModal-makeSureDelete').attr('value', contractId)
}
/*
删除单个合同信息/
 */
function deleteProjectContract() {
    var contractId = $('#myModal-makeSureDelete').attr('value')
    var urlStr = ipPort + '/project/deleteById?id='+ contractId
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert('删除成功!')
                getAllProjectContractInformation()
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
/*
批量删除合同信息/
 */
function deleteContractInBatch() {
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
    var urlStr = ipPort + '/project/deleteByIdBatch'
    $.ajax({
        url:urlStr,
        contentType:'application/json',
        data:myjson,
        dataType:'json',
        type:'post',
        success:function (obj) {
            if(obj.code == 0){
                alert("批量删除项目合同信息成功！")
                getAllProjectContractInformation()
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
通过项目名称搜索/
 */
function getInformationByProjectName(page_ = 0) {
    currentSearch = -2
    currentPage = page_
    var projectName = $('#projectName-input').val()
    var urlStr = ipPort + '/project/getByNameLikeByPage?name=' + projectName + "&page=" + currentPage
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert('无相关信息!')
                    setProjectContractTableInformation(obj)
                    return
                }
                setProjectContractTableInformation(obj)
                alert('搜索成功!')
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
/*
设置项目收款记录表modal/
 */
function setProjectReceiptModalInformation(thisObj) {
    var td = $(thisObj).parent().parent().parent().find('td')
    $('#projectReceipt-projectName-th').attr('value-id', td.eq(1).text())
    $('#projectReceipt-projectName-th').attr('value-name', td.eq(2).text())
    var projectID = td.eq(1).text()
    $.ajax({
        url:ipPort + '/projectReceipt/getByProjectByPage?project=' + projectID + '&size=' + 50,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setProjectReceiptModalTableInformation(obj)
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
/*
设置项目收款记录表Table/
 */
function setProjectReceiptModalTableInformation(obj) {
    if(obj.data.numberOfElements != 0){
        var table_trr = $('.table-trr')
        var projectReceipt_projectName = $('.projectReceipt-projectName')
        var projectReceipt_price = $('.projectReceipt-price')
        var projectReceipt_time = $('.projectReceipt-time')
        var projectReceipt_description = $('.projectReceipt-description')
        var projectReceipt_operator = $('.projectReceipt-operator')
        for(var  i = 0; i < obj.data.numberOfElements; i++){
            table_trr.eq(i).removeClass('hidden')
            if(obj.data.content[i].project){
                projectReceipt_projectName.eq(i).text(obj.data.content[i].project.name)
                projectReceipt_projectName.eq(i).attr('value', obj.data.content[i].id)
            }else {
                projectReceipt_projectName.eq(i).text('')
                projectReceipt_projectName.eq(i).attr('value', '')
            }
            projectReceipt_price.eq(i).text(obj.data.content[i].price)
            var time = new Date(obj.data.content[i].time)
            projectReceipt_time.eq(i).text(time.toLocaleString())
            projectReceipt_description.eq(i).text(obj.data.content[i].description)
            if(obj.data.content[i].operator){
                projectReceipt_operator.eq(i).text(obj.data.content[i].operator.name)
                projectReceipt_operator.eq(i).attr('value', obj.data.content[i].operator.id)
            }else {
                projectReceipt_operator.eq(i).text('')
                projectReceipt_operator.eq(i).attr('value', '')
            }
        }
        for (var i = obj.data.numberOfElements; i < 50; i++){
            table_trr.eq(i).addClass('hidden')
        }
    }else{
        for (var i = 0; i < 50; i++){
            var table_trr = $('.table-trr')
            table_trr.eq(i).addClass('hidden')
        }
    }
}
/*
设置添加收款记录modal/
 */
function setAddProjectReceiptModalInformation() {
    $('#modal-addProjectReceipt-price').val('')
    $('#modal-addProjectReceipt-description').val('')
    $('#modal-addProjectReceipt-operator').val('')
    $('#modal-addProjectReceipt-operator').attr('value', '')
    $('#modal-addProjectReceipt-projectName').val($('#projectReceipt-projectName-th').attr('value-name'))
    $('#modal-addProjectReceipt-projectName').attr('value', $('#projectReceipt-projectName-th').attr('value-id'))
    $('#modal-addProjectReceipt-operator').val(window.localStorage.userName)
    $('#modal-addProjectReceipt-operator').attr('value', window.localStorage.userID)
}
/*
添加收款记录/
 */
function addProjectReceipt() {
    var projectID = $('#modal-addProjectReceipt-projectName').attr('value')
    var price = $('#modal-addProjectReceipt-price').val()
    var description = $('#modal-addProjectReceipt-description').val()
    var operator = $('#modal-addProjectReceipt-operator').attr('value')
    var urlStr = ipPort + '/projectReceipt/add?project=' + projectID + '&price=' + price + '&description=' + description + '&operator=' + operator
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert(obj.message)
                $.ajax({
                    url:ipPort + '/projectReceipt/getByProjectByPage?project=' + projectID + '&size=' + 50,
                    dataType:'json',
                    success:function (obj) {
                        if(obj.code == 0){
                            setProjectReceiptModalTableInformation(obj)
                            getAllProjectContractInformation()
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
            else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置修改收款记录Modal/
 */
function setUpdateProjectReceiptModalInformation(thisObj) {
    var td = $(thisObj).parent().parent().parent().find('td')
    $('#modal-updateProjectReceipt-id').val(td.eq(0).attr('value'))
    $('#modal-updateProjectReceipt-price').val(td.eq(1).text())
    $('#modal-updateProjectReceipt-description').val(td.eq(3).text())
    $('#modal-updateProjectReceipt-operator').val(td.eq(4).text())
    $('#modal-updateProjectReceipt-operator').attr('value', td.eq(4).attr('value'))
    $('#modal-updateProjectReceipt-projectName').val(td.eq(0).text())
    $('#modal-updateProjectReceipt-operator').val(window.localStorage.userName)
    $('#modal-updateProjectReceipt-operator').attr('value', window.localStorage.userID)
}
/*
修改收款记录/
 */
function updateProjectReceipt() {
    var id = $('#modal-updateProjectReceipt-id').val()
    var price = $('#modal-updateProjectReceipt-price').val()
    var description = $('#modal-updateProjectReceipt-description').val()
    var operator = $('#modal-updateProjectReceipt-operator').attr('value')
    var urlStr = ipPort + '/projectReceipt/update?id=' + id + '&price=' + price + '&description=' + description + '&operator=' + operator
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                alert(obj.message)
                $.ajax({
                    url:ipPort + '/projectReceipt/getByProjectByPage?project=' +  $('#projectReceipt-projectName-th').attr('value-id') + '&size=' + 50,
                    dataType:'json',
                    success:function (obj) {
                        if(obj.code == 0){
                            setProjectReceiptModalTableInformation(obj)
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
            else{
                alert(obj.message)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}


/*************************************选取多个员工modal*****************************************/
/*
获取所有员工姓名/
 */
function getAllStaff_multi(str) {
    currentModal = str
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
    if(currentModal == 0)
    {
        $('#modal-contractStaffs').attr('value', strID)
        $('#modal-contractStaffs').val(strName)
    }else if(currentModal == 1){
        $('#modal-updateProjectStaffs').attr('value', strID)
        $('#modal-updateProjectStaffs').val(strName)
    }
}
/*
通过姓名搜索/
 */
function searchByName_modal(thisObj) {
    var keyword = $(thisObj).parent().find('input').val()
    var type = $('#selectSearchWay-dropdownMenu').attr('value')
    if(keyword != ''){
        $.ajax({
            url:ipPort + '/user/search?type=' + type + '&keyword=' + keyword,
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
/******************************************************************************/

/*************************************选取一个员工modal*****************************************/
/*
获取所有员工/
 */
function getAllStaff_one(str) {
    currentModal = str
    var staffInformationDepartmentA = $('.selectOneStaff-department-ul .selectOneStaff-department-li .departmentName-span')
    $.ajax({
        url:ipPort + '/department/getAll',
        dataType:'json',
        success:function (obj) {
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
                                    var staffUl = staffInformationDepartmentA.eq(m).parent().find('.selectOneStaff-staff-ul')
                                    var appendStr = '<li data-dismiss="modal" onclick="selectedOneStaff(this)"><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span ' + 'value="' + obj_.data[j].id + '">' + obj_.data[j].name + '</span></li>'
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
通过姓名搜索/
 */
function searchOneByName_modal(thisObj) {
    var keyword = $(thisObj).parent().find('input').val()
    var type = $('#selectSearchOneWay-dropdownMenu').attr('value')
    if(keyword != ''){
        $.ajax({
            url:ipPort + '/user/search?type=' + type + '&keyword=' + keyword,
            dataType:'json',
            success:function (obj) {
                $('#form-selectOneStaff .selectOneStaff-department-ul').addClass('hidden')
                $('#form-selectOneStaff .selectOneStaff-staff-ul2').removeClass('hidden')
                var staffUl = $('#form-selectOneStaff').find('.selectOneStaff-staff-ul2')
                staffUl.find('li').remove()
                for(var i = 0; i < obj.data.length; i++){
                    var appendStr = '<li data-dismiss="modal" onclick="selectedOneStaff(this)"><img src="imgs/mine.png" height="20px" style="margin-top: -2px"><span ' + 'value="' + obj.data[i].id + '">' + obj.data[i].name + '</span></li>'
                    staffUl.append(appendStr)
                }
            },
            error:function (error) {
                console.log(error)
            }
        })
    }
}
/*
选定人员/
 */
function selectedOneStaff(thisObj) {
    if(currentModal == 0){
        $('#modal-contractResponsibleName').val( $(thisObj).find("span").text())
        $('#modal-contractResponsibleName').attr('value', $(thisObj).find("span").attr("value"))
    }else if(currentModal == 1){
        $('#modal-updateProjectResponsibleName').val( $(thisObj).find("span").text())
        $('#modal-updateProjectResponsibleName').attr('value', $(thisObj).find("span").attr("value"))
    }
}
/******************************************************************************/


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
    if(currentSearch == -1){
        getAllProjectContractInformation(currentPage)
    }else  if(currentSearch == -2){
        getInformationByProjectName(currentPage)
    }
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
    if(currentSearch == -1){
        getAllProjectContractInformation(currentPage)
    }else  if(currentSearch == -2){
        getInformationByProjectName(currentPage)
    }
}
/*
跳转页/
 */
function skipPage() {
    var skipPage_ = parseInt($('.skipPage').val())
    var totalPage_ = parseInt($('.totalPage').text())
    if (skipPage_ - totalPage_ > 0) {
        alert("没有此页！")
        return
    }
    if (skipPage_ < 1) {
        alert("没有此页！")
        return
    }
    currentPage = skipPage_ - 1
    if (currentSearch == -1) {
        getAllProjectContractInformation(currentPage)
    } else if (currentSearch == -2) {
        getInformationByProjectName(currentPage)
    }
}

