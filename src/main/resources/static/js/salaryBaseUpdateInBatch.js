var currentPage = 0
$(document).ready(function () {
    getAllBaseWageByPage()

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
获取所有基本工资/
 */
function getAllBaseWageByPage() {
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
            console.log(obj)
            if(obj.code == 0){
                setAllBaseWageATable(obj)
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
设置所有基本工资table/
 */
function setAllBaseWageATable(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var table_tr = $('.table-tr')
    if(obj.data.numberOfElements != 0){
        var name = $('.salaryBaseUpdate-staffName')
        var department = $('.salaryBaseUpdate-department')
        var id = $('.salaryBaseUpdate-staffID')
        var baseWage = $('.salaryBaseUpdate-baseWage').find('input')
        var socialSecuritySubsidyWage = $('.salaryBaseUpdate-socialSecuritySubsidyWage').find('input')
        var foundation = $('.salaryBaseUpdate-foundation').find('input')
        for(var i = 0; i < obj.data.numberOfElements; i++){
            table_tr.eq(i).removeClass('hidden')
            name.eq(i).text(obj.data.content[i].name)
            id.eq(i).text(obj.data.content[i].id)
            if(obj.data.content[i].department){
                department.eq(i).text(obj.data.content[i].department.name)
            }
            baseWage.eq(i).val(obj.data.content[i].baseWage)
            socialSecuritySubsidyWage.eq(i).val(obj.data.content[i].socialSecuritySubsidyWage)
            foundation.eq(i).val(obj.data.content[i].foundation)
        }
    }else{
        alert('没有相关信息！')
    }
    for (var i = obj.data.numberOfElements; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
}
/*
通过部门和姓名搜索信息/
 */
function searchByDepartmentAndStaffName() {
    currentPage = 0
    var departmentId = $('#salaryBaseUpdate-department').attr('value')
    var staffName = $('#salaryBaseUpdate-name').val()
    var urlStr = ipPort + "/user/getByDepartmentAndNameLikeByPage?id=" + departmentId + "&name=" + staffName + "&page=" + currentPage
    $.ajax({
        url: urlStr,
        dataType: 'json',
        success: function (obj) {
            if (obj.code == 0) {
                if (obj.data.numberOfElements == 0) {
                    setAllBaseWageATable(obj)
                    alert("未搜索到信息")
                    return
                }
                setAllBaseWageATable(obj)
            } else {
                alert(obj.message)
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}
/*
单个修改基本工资/
 */
function updateBaseWage(thisObj) {
    var parent = $(thisObj).parent().parent()
    var baseWage = parent.find('.salaryBaseUpdate-baseWage input').val()
    var foundation = parent.find('.salaryBaseUpdate-foundation input').val()
    var socialSecuritySubsidyWage = parent.find('.salaryBaseUpdate-socialSecuritySubsidyWage input').val()
    var strID = parent.find('.salaryBaseUpdate-staffID').text()
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
    var foundation = $('#updateBaseWageBatch-foundation').val()
    var socialSecuritySubsidyWage = $('#updateBaseWageBatch-socialSecuritySubsidyWage').val()
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
                getAllBaseWageByPage()
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
                setAllBaseWageATable(obj)
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
                setAllBaseWageATable(obj)
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
                setAllBaseWageATable(obj)
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
