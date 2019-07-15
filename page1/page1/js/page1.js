// 人流统计
function getPieChart1() {
    var piechart = echarts.init(document.getElementById("user-chart"));
    var dataLegend = ['多次到访', '员工', '其他'];
    var dataSeries = [{ name: '多次到访', value: 0 }, { name: '员工', value: 0 }, { name: '其他', value: 0 }];
    piechart.setOption(PieChart1(dataLegend, dataSeries, '类型'));
    $.ajax({
        url: baseUrl + "apihkcloud.do?personTodayCounts",
        data: { "token": localStorage.getItem("hktoken"), "storeId": localStorage.getItem("hkstoreId"), "ksdate": localStorage.getItem("ksdate"), "jsdate": localStorage.getItem("jsdate") },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            if (response.code == 200) {
                dataSeries = [];
                $("#todayUsers").text(response.data.totle);
                $("#peopleTotal").text(response.data.peopleTotal);
                $("#bdRate").text(response.data.carRate ? response.data.carRate.replace('%', '') : 0);
                $('#totalCarUsers').text(response.data.carTotal);
                dataSeries.push({ value: response.data.recusCount, name: '多次到访' });
                dataSeries.push({ value: response.data.cusCount, name: '员工' });
                dataSeries.push({ value: response.data.othercusCount, name: '其他' });
                piechart.setOption(PieChart1(dataLegend, dataSeries, '类型'));
            }
        }
    });
}

// 来访次数比例
function getLaiFangChart() {
    var piechart3 = echarts.init(document.getElementById("laifang-chart"));
    var dataLegend3 = ['10次及以下', '10-50次'];
    var dataSeries3 = [{ name: '10次及以下', value: '10' }, { name: '10-50次', value: '20' }];
    var dataColor3 = ["#48BBE6", "#43DBAE", "#4864E6", "#3F42E1", "#FFCA36"];

    //piechart3.setOption(PieChart2(dataLegend3, dataSeries3, dataColor3, "来访次数比例" + Math.ceil()));

    $.ajax({
        url: baseUrl + "apivideo.do?getVisitCount",
        data: { "ksdate": localStorage.getItem("ksdate"), "jsdate": localStorage.getItem("jsdate") },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            var result = response.tableData;
            dataLegend3 = [];
            dataSeries3 = [];
            if (response.tableType == 0) {
                dataLegend3 = result.nameData;
                var one = result.areaData[0].one;
                var two = result.areaData[0].two;
                var three = result.areaData[0].three;
                var htmlss = "";
                for (var i = 0; i < result.nameData.length; i++) {
                    var mark = one;
                    if (i == 1) {
                        mark = two;
                    } else if (i == 2) {
                        mark = three;
                    }
                    dataSeries3.push({ name: dataLegend3[i], value: mark });
                    htmlss += '<li>' +
                        '<span class="ico-circle"></span>' +
                        '<span>' + dataLegend3[i] + '</span>' +
                        '<span class="age-total-rate">' + (parseFloat(mark / (one + two + three)) * 100) + '%</span>' +
                        '</li>';
                }
                $('#laifang-chart-legend').html(htmlss);
                var dataColor3 = ["#48BBE6", "#43DBAE", "#4864E6", "#3F42E1", "#FFCA36"];
                piechart3.setOption(PieChart2(dataLegend3, dataSeries3, dataColor3, "来访次数比例" + Math.ceil()));
            }


        }
    });
}

// 客流统计
function getUserFlow() {
    var myChart2 = echarts.init(document.getElementById("user-flow-chart"));
    var dataX = [];
    var dataY1 = [];
    var dataY2 = [];
    var dataY3 = [];
    var legendData = ['所有人', '员工', '多次到访'];

    $.ajax({
        url: baseUrl + "apihkcloud.do?personHourDetails",
        data: {
            "token": localStorage.getItem("hktoken"),
            "storeId": localStorage.getItem("hkstoreId"),
            "ksdate": localStorage.getItem("ksdate"),
            "jsdate": localStorage.getItem("jsdate")
        },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            if (response.code == 200) {
                dataX = response.data.xData;
                dataY1 = response.data.yData;
                dataY2 = response.data.yData1;
                var lineopt = LineChart1(legendData, dataX, dataY1, dataY2, dataY3);
                myChart2.setOption(lineopt);
            }
        },
        error: function(e) {
            myChart2.setOption(LineChart1(legendData, dataX, dataY1, dataY2, dataY3));
        }
    });
}

// 获取车辆总数
function getCarTotal() {
    percentCircle(0, 'matchPercent');
    $.ajax({
        url: baseUrl + "apihkcloud.do?getCarTotle",
        data: {
            "storeId": localStorage.getItem("hkstoreId"),
            /* "date": localStorage.getItem("hkdate") */
            "ksdate": localStorage.getItem("ksdate"),
            "jsdate": localStorage.getItem("jsdate")
        },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            $("#carTotal").text(response.data.cartotal);
            $("#todayCarTotal").text(response.data.cartoday);
            percentCircle(response.data.bdrate ? response.data.bdrate.replace('%', '') : 0, 'matchPercent');
        }
    });
}

//车型统计
var qmark = true;

function getPieChart4() {
    //车辆类型
    var myChart4 = echarts.init(document.getElementById("car-type-chart"));
    var dataV = [];
    var indicatorData = [];

    //车辆品牌
    var myChart2 = echarts.init(document.getElementById("cartype-chart"));
    var dataX = [];
    var dataY = [];
    var dataCarLegend = ['b', 'a', 'c'];
    //myChart2.setOption(BarChart(dataX, dataY, dataCarLegend, "车型统计"));

    $.ajax({
        url: baseUrl + "apihkcloud.do?getTodayCarTypes",
        data: { "storeId": localStorage.getItem("hkstoreId"), "ksdate": localStorage.getItem("ksdate"), "jsdate": localStorage.getItem("jsdate") },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            var typelist = response.data.typelist; //车辆类型
            var htmlss = "";
            for (var i = 0; i < typelist.length; i++) {
                dataV.push(typelist[i].typeCount);
                indicatorData.push({ max: 60, name: typelist[i].typeName });
                htmlss += '<li>' +
                    '<span class="ico-circle"></span>' +
                    '<span>' + typelist[i].typeName + '</span>' +
                    '<span class="age-total-rate">' + typelist[i].avg + '%</span>' +
                    '</li>';
            }

            $('#car-big-type-legend').empty().append(htmlss);
            var randeropt = RanderChart1(indicatorData, dataV, '车型统计');
            myChart4.setOption(randeropt);
            var brandslist = response.data.brandslist; //车辆品牌

            var a = 0;
            if (qmark) {
                a = 0;
                qmark = !qmark;
            } else {
                a = 9;
                qmark = !qmark;
            }
            for (var i = a; i < a + 9; i++) {

                dataX.push(brandslist[i].brandsCount);
                dataY.push(brandslist[i].brandsName);
            }
            // 处理图例
            var htmls = "";
            for (var i = a; i < a + 9; i++) {
                htmls += '<li>' +
                    '<span class="ico-circle"></span>' +
                    '<span>' + brandslist[i].brandsName + '</span>' +
                    '<span class="age-total-rate">' + brandslist[i].avg + '%</span>' +
                    '</li>';
            }
            $('#car-type-legend').empty().append(htmls);
            var timopt = BarChart(dataX, dataY, dataCarLegend, "车型统计");
            myChart2.setOption(timopt);
        }
    });

}

//性别分布
function getPieChart2(type) {
    //性别
    var piechart2 = echarts.init(document.getElementById("sex-chart"));
    var dataLegend2 = ['男性', '女性'];
    var dataSeries2 = [{ name: '男性', value: '0' }, { name: '女性', value: '0' }];
    var dataColor2 = ["#4864E6", "#48A4E6"];
    // piechart2.setOption(PieChart5(dataLegend2, dataSeries2, dataColor2, "性别分布"));

    //年龄
    var dataV = [300, 200, 250];
    var dataSeries3 = [
        { name: '青年', max: 500 },
        { name: '中年', max: 500 },
        { name: '未识别', max: 500 }
    ]

    var myChart4 = echarts.init(document.getElementById("age-chart"));
    var randeropt = RanderChart(dataSeries3, dataV, '年龄' + Math.ceil());
    // myChart4.setOption(randeropt);

    $.ajax({
        url: baseUrl + "apihkcloud.do?personPropertys",
        data: {
            "token": localStorage.getItem("hktoken"),
            "storeId": localStorage.getItem("hkstoreId"),
            "ksdate": localStorage.getItem("ksdate"),
            "jsdate": localStorage.getItem("jsdate"),
            "type": type
        },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            var personInfo = response.data;
            //年龄
            dataV = [];
            dataSeries3 = [];
            var htmls = "";

            // 手动加其他
            if (personInfo.ageData.length < 3) {
                personInfo.ageData.push({ value: 0, name: '其他', avg: 0 });
            }

            for (var j = 0; j < personInfo.ageData.length; j++) {
                dataV.push(personInfo.ageData[j].value);
                dataSeries3.push({ max: personInfo.ageData[j].value + 10, name: personInfo.ageData[j].name });

                htmls += '<li>' +
                    '<span class="ico-circle"></span>' +
                    '<span>' + personInfo.ageData[j].name + '</span>' +
                    '<span class="age-total-rate">' + personInfo.ageData[j].avg + '%</span>' +
                    '</li> ';
            }
            //性别
            var dataSeries2Cache = [];
            for (var j = 0; j < personInfo.sexData.length; j++) {
                if (personInfo.sexData[j].name == "女") {
                    dataLegend2.push("女性");
                    dataSeries2Cache.push({ value: personInfo.sexData[j].value, name: '女性' });
                } else {
                    dataLegend2.push("男性");
                    dataSeries2Cache.push({ value: personInfo.sexData[j].value, name: '男性' });
                }
            }

            if (dataSeries2Cache.length > 0) {
                dataSeries2 = dataSeries2Cache;
            }

            $('#age-legend').empty().append(htmls);
            $('#sex-rate').html(dataSeries2[0].value + ":" + dataSeries2[1].value);
            myChart4.setOption(RanderChart(dataSeries3, dataV, '年龄分布'));
            piechart2.setOption(PieChart5(dataLegend2, dataSeries2, dataColor2, "性别分布"));
        }
    });

}

// 加载区域客流数
function getAreaUserData() {
    var myChart2 = echarts.init(document.getElementById("area-user-chart"));
    var dataX = [1, 2, 3, 4, 5, 6];
    var dataY = [11, 22, 44, 66, 77, 88];
    //myChart2.setOption(LineChart3(dataX, dataY, '区域客流' + Math.ceil()));

    $.ajax({
        url: baseUrl + "apivideo.do?getAreaCount",
        data: { "ksdate": localStorage.getItem("ksdate"), "jsdate": localStorage.getItem("jsdate") },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            var result = response.tableData.areaData;
            dataX = [];
            dataY = [];
            for (var i = 0; i < result.length; i++) {
                dataY.push(result[i].count);
                dataX.push(result[i].cameraName);
            }

            myChart2.setOption(LineChart3(dataX, dataY, '区域客流' + Math.ceil()));
        }
    });

}

// 停留时长统计
function getStopTimeData() {
    var myChart2 = echarts.init(document.getElementById("stop-time-chart"));
    var dataX = [1, ];
    var dataY = ['60-120分钟'];


    $.ajax({
        url: baseUrl + "apivideo.do?getStopTime",
        data: { "ksdate": localStorage.getItem("ksdate"), "jsdate": localStorage.getItem("jsdate") },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            var result = response.tableData;
            dataX = result.dataX.split(',');
            dataY = result.dataY.split(',');
            myChart2.setOption(BarChart2(dataX, dataY, "停留时长" + Math.ceil()));
        }
    });
}

// 来访车辆类型统计
function getCarTypeData() {

}

// 车流统计
function getCarFlow() {
    var myChart2 = echarts.init(document.getElementById("car-flow-chart"));
    var dataX = [];
    var dataY = [];
    var legendData = ['所有车辆'];
    $.ajax({
        url: baseUrl + "apihkcloud.do?getTodayCarHours",
        data: {
            "storeId": localStorage.getItem("hkstoreId"),
            "ksdate": localStorage.getItem("ksdate"),
            "jsdate": localStorage.getItem("jsdate")
        },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            if (response.code == 200) {
                dataX = response.data.housrlist;
                dataY = response.data.countlist;
                var lineopt = LineChart2(legendData, dataX, dataY);
                myChart2.setOption(lineopt);
            }
        }
    });

}



function getIdAndDate() {
    localStorage.setItem('hkdate', ''); //  myDate.toLocaleDateString().replace(/\//g, "-")
    localStorage.setItem('ksdate', '');
    localStorage.setItem('jsdate', '');
    localStorage.setItem('hkstoreId', ""); //8273c4de28c44fe0867ca20cbab089a5
}

// 获取token
function getToken() {
    $.ajax({
        url: baseUrl + "apihkcloud.do?getToken",
        data: "",
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            if (response.code == 200) {
                localStorage.setItem('hktoken', response.data.access_token); //token，加载页面时获取
                getIdAndDate();
            }
        }
    });
}

// 动画加载
function getAnimate() {
    var timer1 = setInterval(function() {
        getAreaUserData();
    }, 6000);

    var timer2 = setInterval(function() {
        getPieChart2();
    }, 7000);

    var timer6 = setInterval(function() {
        getPieChart1();
    }, 8000);

    var timer3 = setInterval(function() {
        getStopTimeData();
        getUserFlow();
        getCarFlow();
    }, 9000);

    var timer4 = setInterval(function() {
        getLaiFangChart();
        getPieChart4();
        CircleProgress(78, 'progress1', '#FFCA36');
    }, 12000);
}

function getCurrentDate() {
    var nowdate = new Date();
    var y = nowdate.getFullYear().toString();
    var m = (nowdate.getMonth() + 1).toString();
    var d = nowdate.getDate().toString();
    m = m.length < 2 ? ('0' + m) : m;
    d = d.length < 2 ? ('0' + d) : d;
    var starttime = y + "-" + m + "-" + d;
    var endtime = y + "-" + m + "-" + d;
    $('#starttime').text(starttime);
    $('#endtime').text(endtime);
}


$(document).ready(function() {
    getToken();
    CircleProgress(78, 'progress1', '#FFCA36');
    getPieChart1();
    getLaiFangChart();
    getUserFlow();
    CircleProgress(68, 'progress2', '#48E6CF');
    getCarTotal();
    getPieChart4();
    getPieChart2();
    getAreaUserData();
    getStopTimeData();
    getCarTypeData();
    getCarFlow();
    getCurrentDate();

    //getAnimate();
});