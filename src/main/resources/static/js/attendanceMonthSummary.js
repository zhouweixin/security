$(document).ready(function () {
    getAllMonthSummary()
    //设置tbody高度
    var tbody_height = $('.right-panel').height() - 245
    tbody_height = tbody_height + 'px'
    $('#staffMonthSummaryTable').find('tbody').css('max-height',  tbody_height)


    //设置选择月份为当天日期
    var today_date = new Date().toLocaleDateString()
    $('#staffMonthSummary-date').val(today_date.split('/')[0] + '/' + today_date.split('/')[1])
    $('#projectMonthSummary-date').val(today_date.split('/')[0] + '/' + today_date.split('/')[1])
})

/*
获取所有月统计信息/
 */
function getAllMonthSummary() {
    var date = $('#staffMonthSummary-date').val()
    if(date == '年/月'){
        date = '2000-01'
    }else{
        date = date.replace(/\//g, '-')
    }
    var urlStr = ipPort + '/workRecord/getByMonth?date=' + date
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            console.log(obj)
            if(obj.code == 0){
                setMonthSummaryTable(obj)
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
通过参数搜索记录/
 */

function getMonthSummaryByParameters() {
    var project = $('#staffMonthSummary-project').attr('value')
    var date = $('#staffMonthSummary-date').val()
    if(date == '年/月'){
        date = '2000-01'
    }else{
        date = date.replace(/\//g, '-')
    }
    var name = $('#staffMonthSummary-name').val()

    var urlStr = ipPort  + '/workRecord/getByMonth?date=' + date + '&name=' + name + '&projectId=' + project
    console.log(urlStr)
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            console.log(obj)
            if(obj.code == 0){
                setMonthSummaryTable(obj)
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
设置月统计table/
 */
function setMonthSummaryTable(obj) {
    if(obj.data.length != 0){
        var date = $('#staffMonthSummary-date').val()
        if(date == '年/月'){
            date = ''
        }else{
            date = date.replace(/\//g, '-')
        }
        var parent = $('#staffMonthSummaryTable tbody')
        parent.find('.table-tr').remove()
        for(var i = 0; i < obj.data.length; i++){
            var appendStr = "<tr class='table-tr' style='display: block;'>\n" +
                "<td class='staffMonthSummary-staffName' style='display: block;width: 15%'>" + obj.data[i].userName + "</td>" +
                "<td class='staffMonthSummary-staffID' style='display: block;width: 20%'>" + obj.data[i].userId + "</td>" +
                "<td class='staffMonthSummary-month' style='display: block;width: 15%'>" + date + "</td>" +
                "<td class='staffMonthSummary-days' style='display: block;width: 10%'>" + obj.data[i].days + "</td>" +
                "<td class='staffMonthSummary-sumDays' style='display: block;width: 10%'>" + obj.data[i].sumDays + "</td>" +
                "<td class='staffMonthSummary-hours' style='display: block;width: 15%'>" + obj.data[i].hours + "</td>" +
                "<td class='staffMonthSummary-realHours' style='display: block;width: 15%'>" + obj.data[i].realHours + "</td>" +
                "</tr>"
            parent.append(appendStr)
        }
        $('#staffMonthSummaryTable').find('tbody td').css('border-top', 'none')
        $('#staffMonthSummaryTable').find('tbody td').css('border-right', 'none')
    }
}

/**************************************项目*****************************************/
/*
获取项目小时/
 */
function getProjectHoursByMonth() {
    var date = $('#projectMonthSummary-date').val()
    if(date == '年/月'){
        date = '2000-01'
    }else{
        date = date.replace(/\//g, '-')
    }
    var urlStr = ipPort + '/workRecord/getProjectHoursByMonth?date=' + date
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setProjectMonthSummaryTable(obj)
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
设置月统计table/
 */
function setProjectMonthSummaryTable(obj) {
    console.log(obj)
    if(obj.data.length != 0){
        var parent = $('#projectMonthSummaryTable tbody')
        parent.find('.table-tr').remove()
        for(var i = 0; i < obj.data.length; i++){
            var appendStr = "<tr class='table-tr'>\n" +
                "<td class='projectMonthSummary-name'>" + obj.data[i].project.name + "</td>" +
                "<td class='projectMonthSummary-status'>" + obj.data[i].project.projectStatus.name + "</td>" +
                "<td class='staffMonthSummary-customerName'>" + obj.data[i].project.customerUnit + "</td>" +
                "<td class='staffMonthSummary-leader'>" + obj.data[i].project.leader.name + "</td>" +
                "<td class='staffMonthSummary-hours'>" + obj.data[i].hours + "</td>" +
                "</tr>"
            parent.append(appendStr)
        }
        $('#projectMonthSummaryTable').find('tbody td').css('border-top', 'none')
        $('#projectMonthSummaryTable').find('tbody td').css('border-right', 'none')
    }
}
/*
导出/
 */
function exportOriginalRecordTable(tableID) {
    if(getExplorer()=='ie')
    {
        var curTbl = document.getElementById(tableID);
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
        tableToExcel(tableID)
    }
}