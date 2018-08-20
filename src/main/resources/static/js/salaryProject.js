var currentPage = 0
$(document).ready(function () {
    getAllProjectWage()
})
/*
获取所有项目工资/
 */
function getAllProjectWage() {
    currentPage = 0
    var page = currentPage
    var size = 10
    var sortFieldName = 'id'
    var asc = 1
    var urlStr = ipPort + '/project/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            console.log(obj)
            if(obj.code == 0){
                setAllProjectWageTable(obj)
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
通过项目名称搜索/
 */
function getInformationByProjectName() {
    currentPage = 0
    var projectName = $('#salaryProject-name').val()
    var urlStr = ipPort + '/project/getByNameLikeByPage?name=' + projectName + "&page=" + currentPage
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                if(obj.data.numberOfElements == 0){
                    alert('无相关信息!')
                    setAllProjectWageTable(obj)
                    return
                }
                setAllProjectWageTable(obj)
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
设置所有基本工资table/
 */
function setAllProjectWageTable(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var table_tr = $('.table-tr')
    if(obj.data.numberOfElements != 0){
        var name = $('.salaryProject-name')
        var id = $('.salaryProject-id')
        var status = $('.salaryProject-status')
        var custName = $('.salaryProject-customerName')
        var wage = $('.salaryProject-wage').find('input')
        for(var i = 0; i < obj.data.numberOfElements; i++){
            table_tr.eq(i).removeClass('hidden')
            name.eq(i).text(obj.data.content[i].name)
            id.eq(i).text(obj.data.content[i].id)
            custName.eq(i).text(obj.data.content[i].customerUnit)
            if(obj.data.content[i].projectStatus){
                status.eq(i).text(obj.data.content[i].projectStatus.name)
            }
            wage.eq(i).val(obj.data.content[i].wagePerHour)
        }
    }
    for (var i = obj.data.numberOfElements; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
}
/*
修改项目工资/
 */
function updateProjectWagePerHour(thisObj) {
    var parent = $(thisObj).parent().parent()
    var id = parent.find('.salaryProject-id').text()
    var wagePerHour = parent.find('.salaryProject-wage input').val()
    var urlStr = ipPort + '/project/updateWagePerHour?id='+ id + '&wagePerHour=' + wagePerHour
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
    var urlStr = ipPort + '/project/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
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
    var urlStr = ipPort + '/project/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
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
    var urlStr = ipPort + '/project/getAllByPage?page='+ page + '&size=' + size + '&sortFieldName=' + sortFieldName + '&asc=' + asc
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