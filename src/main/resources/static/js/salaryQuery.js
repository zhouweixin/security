var currentPage = 0
$(document).ready(function () {

    //设置选择月份为当天日期
    var today_date = new Date().toLocaleDateString()
    $('#salaryQuery-month').val(today_date.split('/')[0] + '/' + today_date.split('/')[1])

    getALlWage()
})
/*
获取所有固定日期的工资单/
 */
function getALlWage() {
    var page = currentPage
    var size = 10
    var sortFieldName = 'startTime'
    var asc = 1
    var month = $('#salaryQuery-month').val()
    month = month.replace(/\//g, '-')
    var urlStr = ipPort + '/wageEntry/getByDateAndNameLikeByPage?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc + '&date=' + month
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            console.log(obj)
            if(obj.code == 0){
                setAllWageTable(obj)
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
设置所有工资单table/
 */
function setAllWageTable(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    var table_tr = $('.table-tr')
    if(obj.data.numberOfElements != 0){
        var name = $('.salaryQuery-staffName')
        var department = $('.salaryQuery-department')
        var idCard = $('.salaryQuery-idCard')
        var bankCard = $('.salaryQuery-bankCard').find('input')
        var baseWage = $('.salaryQuery-baseWage').find('input')
        var projectWage = $('.salaryQuery-projectWage').find('input')
        var fullAttenBonus = $('.salaryQuery-fullAttenBonus').find('input')
        var bonus = $('.salaryQuery-bonus').find('input')
        var overtimeWage = $('.salaryQuery-overtimeWage').find('input')
        var boardWage = $('.salaryQuery-boardWage').find('input')
        var socialSecuritySubsidyWage = $('.salaryQuery-socialSecuritySubsidyWage').find('input')
        var foundation = $('.salaryQuery-foundation').find('input')
        var deductionWage = $('.salaryQuery-deductionWage').find('input')
        var workDays = $('.salaryQuery-workDays').find('input')
        var grossPay = $('.salaryQuery-grossPay').find('input')
        var realPay = $('.salaryQuery-realPay').find('input')
        for(var i = 0; i < obj.data.numberOfElements; i++){
            table_tr.eq(i).removeClass('hidden')
            name.eq(i).text(obj.data.content[i].userName)
            name.eq(i).attr('value', obj.data.content[i].userId)
            department.eq(i).text(obj.data.content[i].originalSpot)
            idCard.eq(i).text(obj.data.content[i].idNumber)
            bankCard.eq(i).text(obj.data.content[i].cardNumber)
            baseWage.eq(i).val(obj.data.content[i].baseWage)
            projectWage.eq(i).val(obj.data.content[i].projectWage)
            fullAttenBonus.eq(i).val(obj.data.content[i].fullAttenBonus)
            bonus.eq(i).val(obj.data.content[i].bonus)
            overtimeWage.eq(i).val(obj.data.content[i].overtimeWage)
            boardWage.eq(i).val(obj.data.content[i].boardWage)
            socialSecuritySubsidyWage.eq(i).val(obj.data.content[i].socialSecuritySubsidyWage)
            foundation.eq(i).val(obj.data.content[i].foundation)
            deductionWage.eq(i).val(obj.data.content[i].deductionWage)
            workDays.eq(i).val(obj.data.content[i].workDays)
            grossPay.eq(i).val(obj.data.content[i].grossPay)
            realPay.eq(i).val(obj.data.content[i].realPay)
        }
    }
    for (var i = obj.data.numberOfElements; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
}

/*
打印薪资表/
 */
function printSalaryTable() {
    $('#myModal-printInit').modal('toggle')
    if($('.printAll-box').checked == true){//如果全部打印为真

    }
    else{//为否

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
    var sortFieldName = 'startTime'
    var asc = 1
    var month = $('#salaryQuery-month').val()
    month = month.replace(/\//g, '-')
    var urlStr = ipPort + '/wageEntry/getByDateAndNameLikeByPage?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc + '&date=' + month
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setAllWageTable(obj)
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
    var sortFieldName = 'startTime'
    var asc = 1
    var month = $('#salaryQuery-month').val()
    month = month.replace(/\//g, '-')
    var urlStr = ipPort + '/wageEntry/getByDateAndNameLikeByPage?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc + '&date=' + month
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setAllWageTable(obj)
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
    var sortFieldName = 'startTime'
    var asc = 1
    var month = $('#salaryQuery-month').val()
    month = month.replace(/\//g, '-')
    var urlStr = ipPort + '/wageEntry/getByDateAndNameLikeByPage?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc + '&date=' + month
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setAllWageTable(obj)
            }else{
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}