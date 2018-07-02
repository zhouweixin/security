$(document).ready(function () {
    setSexEcharts()
    setAgeEcharts()
    setEducationEcharts()
})
/*
设置男女Echarts/
 */
function setSexEcharts() {
    var urlStr = ipPort + '/user/getUserNumber'
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                var femaleNumber = obj.data.femaleNumber
                var maleNumber = obj.data.maleNumber
                var myChart = echarts.init(document.getElementById('sexEcharts'));
                // 显示标题，图例和空的坐标轴
                myChart.setOption({
                    title : {
                        text: '员工男女比例',
                        subtext: '',
                        x:'left'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'center',
                        data: ['男','女']
                    },
                    series : [
                        {
                            name: '员工男女比例',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:maleNumber, name:'男'},
                                {value:femaleNumber, name:'女'},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }else {
                alert(obj.message)
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置年龄Echarts/
 */
function setAgeEcharts() {
    var urlStr = ipPort + '/user/getUserNumberByPage'
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                var twentyLowerNumber = obj.data.twentyLowerNumber
                var twentyToThirtyNumber = obj.data.twentyToThirtyNumber
                var thirtyToFortyNumber = obj.data.thirtyToFortyNumber
                var fortyToFiftyNumber = obj.data.fortyToFiftyNumber
                var fiftyUpperNumber = obj.data.fiftyUpperNumber
                var myChart = echarts.init(document.getElementById('ageEcharts'));
                // 显示标题，图例和空的坐标轴
                myChart.setOption({
                    title : {
                        text: '员工年龄段比例',
                        subtext: '',
                        x:'left'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'center',
                        data: ['< 20','20 - 30','30 - 40','40 - 50','> 50']
                    },
                    series : [
                        {
                            name: '员工年龄段比例',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:twentyLowerNumber, name:'< 20'},
                                {value:twentyToThirtyNumber, name:'20 - 30'},
                                {value:thirtyToFortyNumber, name:'30 - 40'},
                                {value:fortyToFiftyNumber, name:'40 - 50'},
                                {value:fiftyUpperNumber, name:'> 50'},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }else {
                alert(obj.message)
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}
/*
设置学历Echarts/
 */
function setEducationEcharts() {
    var urlStr = ipPort + '/user/getUserNumberByEducation'
    $.ajax({
        url:urlStr,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                var educationName = []
                var educationNumber = []
                for(var i = 0; i < obj.data.length; i++){
                    educationName.push(obj.data[i].education.name)
                    educationNumber.push(obj.data[i].num)
                }
                var myChart = echarts.init(document.getElementById('educationEcharts'));
                // 显示标题，图例和空的坐标轴
                myChart.setOption({
                    title : {
                        text: '员工学历比例',
                        subtext: '',
                        x:'left'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        height : '120px',
                        orient: 'vertical',
                        left: 'right',
                        data: [educationName[0],educationName[1],educationName[2],educationName[3],educationName[4],educationName[5],educationName[6],educationName[7],educationName[8]]
                    },
                    series : [
                        {
                            name: '员工学历比例',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:educationNumber[0], name:educationName[0]},
                                {value:educationNumber[1], name:educationName[1]},
                                {value:educationNumber[2], name:educationName[2]},
                                {value:educationNumber[3], name:educationName[3]},
                                {value:educationNumber[4], name:educationName[4]},
                                {value:educationNumber[5], name:educationName[5]},
                                {value:educationNumber[6], name:educationName[6]},
                                {value:educationNumber[7], name:educationName[7]},
                                {value:educationNumber[8], name:educationName[8]},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }else {
                alert(obj.message)
                console.log(obj)
            }
        },
        error:function (error) {
            console.log(error)
        }
    })
}