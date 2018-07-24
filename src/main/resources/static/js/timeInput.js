$(document).ready(function () {
    /*
      时间控件/
    */
    $('.from_date').datetimepicker({
        format: "yyyy/mm/dd",
        language: 'zh-CN',
        pickerPosition: 'top-left',
        weekStart: 1,
        todayBtn: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0,
        autoclose:1,
    });
    $('.to_date').datetimepicker({
        format: "yyyy/mm/dd",
        language: 'zh-CN',
        pickerPosition: 'bottom-left',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
})