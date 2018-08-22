var currentPage = 0
$(document).ready(function () {
    $('.select-department-ul li a').on('click', function () {
        $('#alreadySigned-dropdownMenu1').val($(this).text())
        $('#alreadySigned-dropdownMenu1').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#notSigned-dropdownMenu1').val($(this).text())
        $('#notSigned-dropdownMenu1').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#dueDate-dropdownMenu1').val($(this).text())
        $('#dueDate-dropdownMenu1').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
    })
    $('.select-jobCondition-ul li a').on('click', function () {
        $('#alreadySigned-dropdownMenu2').val($(this).text())
        $('#alreadySigned-dropdownMenu2').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
    })
    $('.select-contractCondition-ul li a').on('click', function () {
        $('#alreadySigned-dropdownMenu3').val($(this).text())
        $('#alreadySigned-dropdownMenu3').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#dueDate-dropdownMenu2').val($(this).text())
        $('#dueDate-dropdownMenu2').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
    })

    $('.contractType-menu-ul li a').on('click', function () {
        $('#modal-contractType').val($(this).text())
    })
    $('.contractDuration-menu-ul li a').on('click', function () {
        $('#modal-contractDuration').val($(this).text())
    })
    $('.contractCondition-menu-ul li a').on('click', function () {
        $('#modal-contractCondition').val($(this).text())
    })
    /*
    获取全部合同信息/
     */
    getAllContractInformation()
    //getAllDueDateContractInformation()
    /*
    搜索栏/
     */
    var alreadySignedDepartmentA = $('.alreadySigned-department-ul')
    getAllDepartmentsName(alreadySignedDepartmentA)
    $('.alreadySigned-department-ul li a').on('click', function () {
        $('#alreadySigned-department').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#alreadySigned-department').attr('value', $(this).attr('value'))
    })

    var alreadySignedJobNatureA = $('.alreadySigned-jobNature-ul')
    getAllJobNaturesName(alreadySignedJobNatureA)
    $('.alreadySigned-jobNature-ul li a').on('click', function () {
        $('#alreadySigned-jobNature').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#alreadySigned-jobNature').attr('value', $(this).attr('value'))
    })

    var alreadySignedContractTypeA = $('.alreadySigned-contractType-ul')
    getAllPersonnelContractTypeName(alreadySignedContractTypeA)
    $('.alreadySigned-contractType-ul li a').on('click', function () {
        $('#alreadySigned-contractType').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#alreadySigned-contractType').attr('value', $(this).attr('value'))
    })
    /*
    修改modal/
     */
    var modalContractStatusA = $('.modal-contractStatus-menu-ul li a')
    getAllContractStatusName(modalContractStatusA)
    $('.modal-contractStatus-menu-ul li a').on('click', function () {
        $('#modal-contractStatus').val($(this).text())
        $('#modal-contractStatus').attr('value', $(this).attr('value'))
    })
    /*
    选择图片/
     */
    $('input[class=scanningCopy]').change(function() {
        $(this).parent().find('.input-append input').val($(this).val())
    });
})
/*
搜索全部合同信息/
 */
function getAllContractInformation(currentPage_=0) {
    currentPage = currentPage_
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/contract/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            setContractTableInformation(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置合同已签订table/
 */
function setContractTableInformation(obj) {
    $('#alreadySigned-panel .currentPage').text(currentPage + 1)
    $('#alreadySigned-panel .totalPage').text(obj.data.totalPages)
    if(obj.data.numberOfElements != 0){
        var table_tr = $('.table-tr')
        var alreadySignedStaff_chexBox = $('.alreadySignedStaff-checkBox')
        var alreadySignedStaff_name = $('.alreadySignedStaff-name')
        var alreadySignedStaff_id = $('.alreadySignedStaff-id')
        var alreadySignedStaff_department = $('.alreadySignedStaff-department')
        var alreadySignedStaff_contractNumber = $('.alreadySignedStaff-contractNumber')
        var alreadySignedStaff_contractType = $('.alreadySignedStaff-contractType')
        var alreadySignedStaff_contractStartDate = $('.alreadySignedStaff-contractStartDate')
        var alreadySignedStaff_contractEndDate = $('.alreadySignedStaff-contractEndDate')
        var alreadySignedStaff_contractCondition = $('.alreadySignedStaff-contractCondition')
        var number  = 0
        for(var j = 0, i = 0; j < obj.data.numberOfElements; j++){
            if(obj.data.content[j].user != null){
                table_tr.eq(i).removeClass('hidden')
                alreadySignedStaff_chexBox.eq(i).find('input').attr('value', obj.data.content[j].id)
                alreadySignedStaff_name.eq(i).text(obj.data.content[j].user.name)
                alreadySignedStaff_id.eq(i).text(obj.data.content[j].user.id)
                if(obj.data.content[j].user.department){
                    alreadySignedStaff_department.eq(i).text(obj.data.content[j].user.department.name)
                }
                alreadySignedStaff_contractNumber.eq(i).text(obj.data.content[j].id)
                if(obj.data.content[j].contractType){
                    alreadySignedStaff_contractType.eq(i).text(obj.data.content[j].contractType.name)
                }
                alreadySignedStaff_contractStartDate.eq(i).text(obj.data.content[j].startDate)
                alreadySignedStaff_contractEndDate.eq(i).text(obj.data.content[j].endDate)
                if(obj.data.content[j].contractStatus){
                    alreadySignedStaff_contractCondition.eq(i).text(obj.data.content[j].contractStatus.name)
                }
                i++
            }
            number = i
        }
        for (var i = number; i < 10; i++){
            table_tr.eq(i).addClass('hidden')
        }
    }else{
        for (var i = 0; i < 10; i++){
            var table_tr = $('.table-tr')
            table_tr.eq(i).addClass('hidden')
        }
        alert('未搜索到相关信息！')
    }
}
/*
通过各种参数搜索合同信息/
 */
function getInformationByParameters() {
    currentPage = 0
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var departmentID = $('#alreadySigned-department').attr('value')
    var jobNatureID = $('#alreadySigned-jobNature').attr('value')
    var contractTypeID = $('#alreadySigned-contractType').attr('value')
    var startDate = $('#alreadySigned-startDate').val()
    if(startDate == '年/月/日'){
        startDate = ''
    }else{
        startDate = startDate.replace(/\//g, '-')
    }
    var endDate = $('#alreadySigned-endDate').val()
    if(endDate == '年/月/日'){
        endDate = ''
    }else{
        endDate = endDate.replace(/\//g, '-')
    }
    var userName = $('#alreadySigned-name').val()
    var urlStr = ipPort + '/contract/getByParametersByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    + '&departmentId=' + departmentID + '&jobNatureId=' + jobNatureID + '&contractTypeId=' + contractTypeID + '&date1=' + startDate
        + '&date2=' + endDate + '&userName=' + userName
    console.log(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setContractTableInformation(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
修改合同信息/
 */
function updateContractInformation() {
    var userID = $('#modal-contractStaffID').val()
    var contractID = $('#modal-contractID').val()
    var contractType = $('#modal-contractType').attr('value')

    var contractStartDate = new Date(($('#modal-contractStartDate').val()))
    contractStartDate = (contractStartDate.toLocaleDateString()).replace(/\//g, '-')

    var contractEndDate = new Date(($('#modal-contractEndDate').val()))
    contractEndDate = (contractEndDate.toLocaleDateString()).replace(/\//g, '-')

    var contractStatus = $('#modal-contractStatus').attr('value')
    var contractContent = $('#modal-contractContent').val()

    var contractScanningCopy = $('#modal-contractScanningCopy').val()
    //上传扫描件
    if(contractScanningCopy){
        $("[data-toggle='popover']").popover('show');
        var formData = new FormData($("#updateContractModal-uploadImage")[0]);
        $.ajax({
            url:ipPort + '/image/upload',
            type:"post",
            data:formData,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success:function(obj_){
                if(obj_.code == 0){
                    var urlStr = ipPort + '/contract/update?id=' + contractID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
                        + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + obj_.data.code + '&user=' + userID
                    $.ajax({
                        url:urlStr,
                        dataType:'json',
                        success:function (obj) {
                            if(obj.code == 0){
                                $("[data-toggle='popover']").popover('destroy');
                                getAllContractInformation(currentPage)
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
    //不上传扫描件
    else{
        var urlStr = ipPort + '/contract/update?id=' + contractID + '&contractType=' + contractType + '&startDate=' + contractStartDate + '&endDate=' + contractEndDate
            + '&contractStatus=' + contractStatus + '&content=' + contractContent + '&scanningCopy=' + $('#modal-contractScanningCopy').attr('value') + '&user=' + userID
        $.ajax({
            url:urlStr,
            dataType:'json',
            success:function (obj) {
                if(obj.code == 0){
                    getAllContractInformation(currentPage)
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
设置修改合同modal/
 */
function setUpdateModalInformation(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var contractId = td.eq(4).text()
    var urlStr = ipPort + '/contract/getById?id='+ contractId
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.data.user){
                $('#modal-contractStaffName').val(obj.data.user.name)
                $('#modal-contractStaffID').val(obj.data.user.id)
            }
            $('#modal-contractID').val(obj.data.id)
            if(obj.data.contractType){
                $('#modal-contractType').val(obj.data.contractType.name)
                $('#modal-contractType').attr('value', obj.data.contractType.id)
            }
            var startDateSplit = obj.data.startDate
            if(startDateSplit){
                var startDate = new Date()
                startDate.setFullYear(startDateSplit.split('-')[0], startDateSplit.split('-')[1] - 1, startDateSplit.split('-')[2])
                $('#modal-contractStartDate').val(startDate.toLocaleDateString())
            }else {
                $('#modal-contractStartDate').val('')
            }
            var endDateSplit = obj.data.endDate
            if(endDateSplit){
                var endDate = new Date()
                endDate.setFullYear(endDateSplit.split('-')[0], endDateSplit.split('-')[1] - 1, endDateSplit.split('-')[2])
                $('#modal-contractEndDate').val(endDate.toLocaleDateString())
            }else {
                $('#modal-contractEndDate').val('')
            }
            $('#modal-contractPeriod').val(obj.data.period)
            if(obj.data.contractStatus){
                $('#modal-contractStatus').attr('value', obj.data.contractStatus.id)
                $('#modal-contractStatus').html(obj.data.contractStatus.name + "<span class='caret'></span>")
            }
            $('#modal-contractContent').val(obj.data.content)

            if(obj.data.scanningCopy){
                $('#modal-contractScanningCopy').attr('value', obj.data.scanningCopy)
                $('#modal-contractScanningCopy').val('')
                $('#checkScanningCopyImg').removeClass('none')
            }else{
                $('#modal-contractScanningCopy').attr('value', '')
                $('#modal-contractScanningCopy').val('')
                $('#checkScanningCopyImg').addClass('none')
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置扫描件图片modal/
 */
function setScanningCopyImageModal() {
    if($('#myModal-checkScanningCopyImg .modal-body').find('.scanningCopyImg')){
        $('#myModal-checkScanningCopyImg .modal-body').find('.scanningCopyImg').remove()
    }
    if($('#myModal-checkScanningCopyImg .modal-body').find('.scanningCopyDiv')){
        $('#myModal-checkScanningCopyImg .modal-body').find('.scanningCopyDiv').remove()
    }
    var appendStr = "<img class='col-xs-12 scanningCopyImg' height=500 style='display:none'>"+
        "<div class='col-xs-12 scanningCopyDiv'  style='height:500px;color: #337ab7;text-align: center;font-size: 16px;'>正在加载扫描件...</div>"
    $('#myModal-checkScanningCopyImg .modal-body').append(appendStr)
    $('#myModal-checkScanningCopyImg img').attr('onload', "this.nextSibling.style.display='none';this.style.display='';")
    $('#myModal-checkScanningCopyImg img').attr('src', ipPort + '/image/' + $('#modal-contractScanningCopy').attr('value'))
}
/*
设置makeSureModal的value/
 */
function setMakeSureDeleteButtonValue(thisObj) {
    var td = $(thisObj).parent().parent().find('td')
    var contractId = td.eq(4).text()
    $('#myModal-makeSureDelete').attr('value', contractId)
    $('#myModal-makeSureDelete').attr('value-t', $(thisObj).attr('value'))
}
/*
删除单个合同信息/
 */
function deleteContract() {
    var contractId = $('#myModal-makeSureDelete').attr('value')
    var urlStr = ipPort + '/contract/deleteById?id='+ contractId
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if( $('#myModal-makeSureDelete').attr('value-t') == 'dueDate'){
                    getAllDueDateContractInformation()
                }else {
                    getAllContractInformation()
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
/*
设置批量删除Modal的value/
 */
function setMakeSureDeleteInBatchButtonValue(valueStr) {
    $('#myModal-makeSureDeleteInBatch').attr('value', valueStr)
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
    var urlStr = ipPort + '/contract/deleteByIdBatch'
    $.ajax({
        url:urlStr,
        contentType:'application/json',
        data:myjson,
        dataType:'json',
        type:'post',
        success:function (obj) {
            if(obj.code == 0){
                alert("批量删除合同信息成功！")
                if($('#myModal-makeSureDeleteInBatch').attr('value') == 'dueDate'){
                    getAllDueDateContractInformation()
                }else {
                    getAllContractInformation()
                }
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
搜索全部即将到期合同信息/
 */
function getAllDueDateContractInformation() {
    currentPage = 0
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var dueDate = 60
    var urlStr = ipPort + '/contract/getByEndDayByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc + '&endDay=' + dueDate
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            setDueDateContractTableInformation(obj)
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置合同即将到期table/
 */
function setDueDateContractTableInformation(obj) {
    $('#dueDate-panel .currentPage').text(currentPage + 1)
    $('#dueDate-panel .totalPage').text(obj.data.totalPages)
    if(obj.data.numberOfElements != 0){
        var table_trr = $('.table-trr')
        var dueDate_chexbox = $('.dueDate-checkBox')
        var dueDate_name = $('.dueDate-name')
        var dueDate_id = $('.dueDate-id')
        var dueDate_department = $('.dueDate-department')
        var dueDate_contractNumber = $('.dueDate-contractNumber')
        var dueDate_contractType = $('.dueDate-contractType')
        var dueDate_contractStartDate = $('.dueDate-contractStartDate')
        var dueDate_contractEndDate = $('.dueDate-contractEndDate')
        var dueDate_contractCondition = $('.dueDate-contractCondition')
        var number  = 0
        for(var j = 0, i = 0; j < obj.data.numberOfElements; j++){
            if(obj.data.content[j].user != null){
                table_trr.eq(i).removeClass('hidden')
                dueDate_chexbox.eq(i).find('input').attr('value', obj.data.content[j].id)
                dueDate_name.eq(i).text(obj.data.content[j].user.name)
                if(obj.data.content[j].user){
                    dueDate_id.eq(i).text(obj.data.content[j].user.id)
                }
                if(obj.data.content[j].user.department){
                    dueDate_department.eq(i).text(obj.data.content[j].user.department.name)
                }
                dueDate_contractNumber.eq(i).text(obj.data.content[j].id)
                if(obj.data.content[j].contractType){
                    dueDate_contractType.eq(i).text(obj.data.content[j].contractType.name)
                }
                dueDate_contractStartDate.eq(i).text(obj.data.content[j].startDate)
                dueDate_contractEndDate.eq(i).text(obj.data.content[j].endDate)
                if(obj.data.content[j].contractStatus){
                    dueDate_contractCondition.eq(i).text(obj.data.content[j].contractStatus.name)
                }
                i++
            }
            number = i
        }
        for (var i = number; i < 10; i++){
            table_trr.eq(i).addClass('hidden')
        }
    }
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
    var urlStr = ipPort + '/contract/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setContractTableInformation(obj)
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
    var urlStr = ipPort + '/contract/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setContractTableInformation(obj)
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
    var urlStr = ipPort + '/contract/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setContractTableInformation(obj)
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
