var ipPort = "http://39.108.89.212:8080/security"
//var ipPort = "http://127.0.0.1:9000/security"
var departmentsName = []
var departmentsID = []

var positionName = []
var positionID = []
var nationName= []
var nationID = []
var maritalStatusName = []
var maritalStatusID = []
var militaryStatusName = []
var militaryStatusID = []
var educationName = []
var educationID = []
var healthStatusName = []
var healthStatusID = []
var politicalStatusName = []
var politicalStatusID = []
var personnelContractTypeName = []
var personnelContractTypeID = []
var contractStatusName = []
var contractStatusID = []

//getAllDepartmentsName()
// getAllJobNaturesName()
// getAllPositionName()
// getAllNationName()
// getAllMaritalStatusName()
// getAllMilitaryStatusName()
// getAllPoliticalStatusName()
// getAllHealthStatusName()
// getAllEducationName()
// getAllPersonnelContractTypeName()
// getAllContractStatusName()
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
/*
获取所有部门名称/
 */
function getAllDepartmentsName(department){
    $.ajax({
        url:ipPort + '/department/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < department.length; j++){
                var a = department.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }

        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有工作性质名称/
 */
function getAllJobNaturesName(jobNature){
    $.ajax({
        url:ipPort + '/jobNature/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < jobNature.length; j++){
                var a = jobNature.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有职位名称/
 */
function getAllPositionName(role){
    $.ajax({
        url:ipPort + '/role/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < role.length; j++){
                var a = role.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有民族名称/
 */
function getAllNationName(nation){
    $.ajax({
        url:ipPort + '/nation/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < nation.length; j++){
                var a = nation.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有婚姻状况名称/
 */
function getAllMaritalStatusName(maritalStatus){
    $.ajax({
        url:ipPort + '/maritalStatus/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < maritalStatus.length; j++){
                var a = maritalStatus.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有兵役状况名称/
 */
function getAllMilitaryStatusName(militaryStatus){
    $.ajax({
        url:ipPort + '/militaryStatus/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < militaryStatus.length; j++){
                var a = militaryStatus.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有政治面貌名称/
 */
function getAllPoliticalStatusName(politicalStatus){
    $.ajax({
        url:ipPort + '/politicalStatus/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < politicalStatus.length; j++){
                var a = politicalStatus.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有学历名称/
 */
function getAllEducationName(education){
    $.ajax({
        url:ipPort + '/education/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < education.length; j++){
                var a = education.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有健康状况名称/
 */
function getAllHealthStatusName(healthStatus){
    $.ajax({
        url:ipPort + '/healthStatus/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < healthStatus.length; j++){
                var a = healthStatus.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有合同类型名称/
 */
function getAllPersonnelContractTypeName(contractType){
    $.ajax({
        url:ipPort + '/contractType/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < contractType.length; j++){
                var a = contractType.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有迟到类型名称/
 */
function getAllLateTypeName(lateType){
    $.ajax({
        url:ipPort + '/lateType/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < lateType.length; j++){
                var a = lateType.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置合同类型/
 */
function setContractType(contractType, i){
     $.ajax({
         url:ipPort + '/contractType/getAll',
         dataType:'json',
         success:function (obj) {
             contractType.val(obj.data[i].name)
             contractType.attr('value', obj.data[i].id)
         },
         error:function (error) {
             console.log(error)
         }
     })
 }

/*
获取所有合同状态名称/
 */
function getAllContractStatusName(contractStatus){
    $.ajax({
        url:ipPort + '/contractStatus/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < contractStatus.length; j++){
                var a = contractStatus.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有项目状态名称/
 */
function getAllProjectStatusName(projectStatus){
    $.ajax({
        url:ipPort + '/projectStatus/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < projectStatus.length; j++){
                var a = projectStatus.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有项目名称/
 */
function getAllProjectName(project){
    $.ajax({
        url:ipPort + '/project/getAll',
        dataType:'json',
        success:function (obj) {
            for(var j = 0; j < project.length; j++){
                var a = project.eq(j).find('li a')
                for(var i = 1; i < obj.data.length + 1; i ++ ){
                    a.eq(i).parent().removeClass('hidden')
                    a.eq(i).text(obj.data[i - 1].name)
                    a.eq(i).attr('value', obj.data[i - 1].id)
                }
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
获取所有离职类型名称/
 */
 function getAllResignTypeName(resignType){
     $.ajax({
         url:ipPort + '/resignType/getAll',
         dataType:'json',
         success:function (obj) {
             for(var j = 0; j < resignType.length; j++){
                 var a = resignType.eq(j).find('li a')
                 for(var i = 1; i < obj.data.length + 1; i ++ ){
                     a.eq(i).parent().removeClass('hidden')
                     a.eq(i).text(obj.data[i - 1].name)
                     a.eq(i).attr('value', obj.data[i - 1].id)
                 }
             }
         },
         error:function (error) {
             console.log(error)
         }
     })
 }

/*
获取浏览器信息/
 */
 function  getExplorer() {
     var explorer = window.navigator.userAgent ;
     //ie
     if (explorer.indexOf("MSIE") >= 0) {
         return 'ie';
     }
     //firefox
     else if (explorer.indexOf("Firefox") >= 0) {
         return 'Firefox';
     }
     //Chrome
     else if(explorer.indexOf("Chrome") >= 0){
         return 'Chrome';
     }
     //Opera
     else if(explorer.indexOf("Opera") >= 0){
         return 'Opera';
     }
     //Safari
     else if(explorer.indexOf("Safari") >= 0){
         return 'Safari';
     }
 }

 var tableToExcel = (function() {
     var uri = 'data:application/vnd.ms-excel;base64,',
         template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
         base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
         format = function(s, c) {
             return s.replace(/{(\w+)}/g,
                 function(m, p) { return c[p]; }) }
     return function(table, name) {
         if (!table.nodeType) table = document.getElementById(table)
         var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
         window.location.href = uri + base64(format(template, ctx))
     }
 })()