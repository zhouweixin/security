$(document).ready(function () {
    var selectDepartmentA = $('.originalRecord-department-ul li a')
    getAllDepartmentsName(selectDepartmentA)
    $('.originalRecord-department-ul li a').on('click', function () {
        $('#originalRecord-department').html($(this).text() + '<span style="margin-left:4px" class="caret"></span>')
        $('#originalRecord-department').attr('value', $(this).attr('value'))
    })
})
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