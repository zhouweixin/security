var currentPage = 0
$(document).ready(function () {
    getAllWorkRecords()
})
/*
获取全部记录/
 */
function getAllWorkRecords() {
    var page = currentPage
    var size = 10
    var sortFieldName = 'startTime'
    var asc = 1
    var urlStr = ipPort + '/workRecord/getByProjectAndDateAndNameLike?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc + '&date=2000-01-01'
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            console.log(obj)
            if(obj.code == 0){
                setAllWorkRecordsTable(obj)
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
设置记录table/
 */
function setAllWorkRecordsTable(obj) {
    $('.currentPage').text(currentPage + 1)
    $('.totalPage').text(obj.data.totalPages)
    if(obj.data.numberOfElements != 0){
        var i = 0
        setAllWorkRecordsTableCallBack(i, obj)

    }

    var table_tr = $('.table-tr')
    for (var i = obj.data.numberOfElements; i < 10; i++){
        table_tr.eq(i).addClass('hidden')
    }
}
/*
递归设置记录table/
 */
function setAllWorkRecordsTableCallBack(i, obj) {
    var table_tr = $('.table-tr')
    var staff_id = $('.dailyStatistics-staffID')
    var staff_name = $('.dailyStatistics-staffName')
    var staff_attendanceDate = $('.dailyStatistics-attendanceDate')
    var staff_startPunchTime = $('.dailyStatistics-startPunchTime')
    var staff_endPunchTime = $('.dailyStatistics-endPunchTime')
    var staff_validWorkTime = $('.dailyStatistics-validWorkTime')
    var staff_department = $('.dailyStatistics-staffDepartment')
    var staff_project = $('.dailyStatistics-project')
    var staff_address = $('.dailyStatistics-punchAddress')

    table_tr.eq(i).removeClass('hidden')
    staff_name.eq(i).text(obj.data.content[i].user.name)
    staff_id.eq(i).text(obj.data.content[i].user.id)
    if(obj.data.content[i].user.department){
        staff_department.eq(i).text(obj.data.content[i].user.department.name)
    }
    if(obj.data.content[i].startTime){
        staff_attendanceDate.eq(i).text(obj.data.content[i].startTime.substring(0, 10))
    }
    if(obj.data.content[i].startTime){
        staff_startPunchTime.eq(i).text(obj.data.content[i].startTime.substring(12, 17))
    }
    if(obj.data.content[i].endTime){
        staff_endPunchTime.eq(i).text(obj.data.content[i].endTime.substring(12, 17))
    }
    staff_validWorkTime.eq(i).text(obj.data.content[i].hours)
    if(obj.data.content[i].project){
        staff_project.eq(i).text(obj.data.content[i].project.name)
    }

    //通过baiduMap API获取街道名称
    var map = new BMap.Map("allmap");
    var gc = new BMap.Geocoder();
    var point = new BMap.Point(obj.data.content[i].startLongitude,obj.data.content[i].startLatitude);

    gc.getLocation(point, function(rs){
        var addComp = rs.addressComponents;
        var address = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
        staff_address.eq(i).text(address)
        i++
        if(i != obj.data.numberOfElements){
            setAllWorkRecordsTableCallBack(i, obj)
        }
    });
}
/*
获取地址/
 */
function getAddress(longitude,latitude){
    //通过baiduMap API获取街道名称
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(longitude,latitude);
    var gc = new BMap.Geocoder();

    gc.getLocation(point, function(rs){
        var addComp = rs.addressComponents;
        var address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
        console.log(address)
    });

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
    var urlStr = ipPort + '/workRecord/getByProjectAndDateAndNameLike?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc + '&date=2000-01-01'
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setAllWorkRecordsTable(obj)
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
    var urlStr = ipPort + '/workRecord/getByProjectAndDateAndNameLike?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc + '&date=2000-01-01'
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setAllWorkRecordsTable(obj)
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
    var urlStr = ipPort + '/workRecord/getByProjectAndDateAndNameLike?page='+ page + '&size=' + size + '&sortFieldName='
        + sortFieldName + '&asc=' + asc + '&date=2000-01-01'
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                setAllWorkRecordsTable(obj)
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