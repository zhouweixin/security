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

/*
获取所有部门名称/
 */
function getAllDepartmentsName(department){
    $.ajax({
        url:ipPort + '/department/getAll',
        dataType:'json',
        success:function (obj) {
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                department.eq(i).parent().removeClass('hidden')
                department.eq(i).text(obj.data[i - 1].name)
                department.eq(i).attr('value', obj.data[i - 1].id)
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
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                jobNature.eq(i).parent().removeClass('hidden')
                jobNature.eq(i).text(obj.data[i - 1].name)
                jobNature.eq(i).attr('value', obj.data[i - 1].id)
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
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                role.eq(i).parent().removeClass('hidden')
                role.eq(i).text(obj.data[i - 1].name)
                role.eq(i).attr('value', obj.data[i - 1].id)
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
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                nation.eq(i).parent().removeClass('hidden')
                nation.eq(i).text(obj.data[i - 1].name)
                nation.eq(i).attr('value', obj.data[i - 1].id)
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
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                maritalStatus.eq(i).parent().removeClass('hidden')
                maritalStatus.eq(i).text(obj.data[i - 1].name)
                maritalStatus.eq(i).attr('value', obj.data[i - 1].id)
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
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                militaryStatus.eq(i).parent().removeClass('hidden')
                militaryStatus.eq(i).text(obj.data[i - 1].name)
                militaryStatus.eq(i).attr('value', obj.data[i - 1].id)
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
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                politicalStatus.eq(i).parent().removeClass('hidden')
                politicalStatus.eq(i).text(obj.data[i - 1].name)
                politicalStatus.eq(i).attr('value', obj.data[i - 1].id)
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
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                education.eq(i).parent().removeClass('hidden')
                education.eq(i).text(obj.data[i - 1].name)
                education.eq(i).attr('value', obj.data[i - 1].id)
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
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                healthStatus.eq(i).parent().removeClass('hidden')
                healthStatus.eq(i).text(obj.data[i - 1].name)
                healthStatus.eq(i).attr('value', obj.data[i - 1].id)
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
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                contractType.eq(i).parent().removeClass('hidden')
                contractType.eq(i).text(obj.data[i - 1].name)
                contractType.eq(i).attr('value', obj.data[i - 1].id)
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
            for(var i = 1; i < obj.data.length + 1; i ++ ){
                contractStatus.eq(i).parent().removeClass('hidden')
                contractStatus.eq(i).text(obj.data[i - 1].name)
                contractStatus.eq(i).attr('value', obj.data[i - 1].id)
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
             for(var i = 1; i < obj.data.length + 1; i ++ ){
                 projectStatus.eq(i).parent().removeClass('hidden')
                 projectStatus.eq(i).text(obj.data[i - 1].name)
                 projectStatus.eq(i).attr('value', obj.data[i - 1].id)
             }
         },
         error:function (error) {
             console.log(error)
         }
     })
 } /*
 获取所有离职类型名称/
  */
 function getAllResignTypeName(resignType){
     $.ajax({
         url:ipPort + '/resignType/getAll',
         dataType:'json',
         success:function (obj) {
             for(var i = 1; i < obj.data.length + 1; i ++ ){
                 resignType.eq(i).parent().removeClass('hidden')
                 resignType.eq(i).text(obj.data[i - 1].name)
                 resignType.eq(i).attr('value', obj.data[i - 1].id)
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