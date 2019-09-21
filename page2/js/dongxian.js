var pointArray = [
    { id: 0, left: 154, top: 567, className: 'point-info-0' },
    { id: 1, left: 960, top: 178, className: 'point-info-1' },
    { id: 2, left: 1251, top: 367, className: 'point-info-2' },
    { id: 3, left: 577, top: 313, className: 'point-info-3' },
    { id: 4, left: 924, top: 313, className: 'point-info-4' },
    { id: 5, left: 1143, top: 337, className: 'point-info-5' },
    { id: 6, left: 1060, top: 203, className: 'point-info-6' },
    { id: 7, left: 1209, top: 412, className: 'point-info-7' },
    { id: 8, left: 1457, top: 349, className: 'point-info-8' },
];

var websocket = null;

//判断当前浏览器是否支持WebSocket  
if ('WebSocket' in window) {
    createWebSocket();
} else {
    console.log('Not support websocket');
}

// 創建WebSocket
function createWebSocket() {
    try {
        websocket = new WebSocket("ws://10.15.208.144:8081/jinke-slaes/webSocketServer"); // ws://10.15.8.241:8081/jinke-slaes/webSocketServer
        //websocket = new WebSocket("ws://dev.tq-service.com:18087/smart/webSocketServer"); 
        init();
    } catch (e) {
        console.log('catch');
    }
}

// WebSocket初始化
function init() {

    //连接发生错误的回调方法  
    websocket.onerror = function(event) {
        console.log("socket错误");
        reconnect();
    };

    //连接成功建立的回调方法  
    websocket.onopen = function(event) {
        console.log("socket连接");
    }

    //接收到消息的回调方法  
    websocket.onmessage = function(event) {
        reset();
        // 车辆、人脸推送
        console.log("socket消息：" + JSON.stringify(event.data));
        var result = JSON.parse(event.data);
        if (result.type && result.type == 'isCar') {
            /*  $('#active-car-img').attr("src", result.data.carImg);
             $('#active-car-number').html(result.data.carNum);
             var nowDate = new Date(parseInt(result.data.createDate));
             $('#active-car-time').html(nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds());
             $('.active-car-box').css("opacity", 1); */

            var htmls = '<li>' +
                '<div class="last-car-box">' +
                '   <div class="a">' +
                '       <img src="' + result.data.carImg + '" alt="">' +
                '       <img src="' + result.data.faceImg + '" alt="">' +
                '   </div>' +
                '   <div class="b">' +
                '       <p>车牌号码 <span>' + result.data.carNum + '</span></p>' +
                '       <p>车辆颜色 <span>' + result.data.carColor + '</span></p>' +
                '       <p>入场时间 <span>' + (result.data.storeId ? result.data.storeId.split(" ")[1] : "") + '</span></p>' +
                '   </div>' +
                '   <div class="b">' +
                '       <p>车辆类型 <span>' + result.data.carType + '</span></p>' +
                '       <p>车辆品牌 <span>' + result.data.carBrands + '</span></p>' +
                '       <p>出场时间 <span></span></p>' +
                '   </div>' +
                '</div>' +
                '</li>';

            $('#last-car-list').prepend(htmls);

        } else if (result.type && result.type == 'isFace') {
            var hasCar = result.data.carNum ? '<div class="img-car-label s-label"></div>' : '';
            var hasPhone = result.data.phone ? '<div class="img-phone-label s-label"></div>' : '';
            var cacheDataHtmls = ' <li>' +
                ' <div class="list-item-left">' +
                '   <div class="list-item-img-box">' +
                '       <img onclick="showDongXian(\'' + result.data.uid + '\',\'' + result.data.ageGroup + '\',\'' + result.data.sex + '\',\'' + result.data.glass + '\',\'' + result.data.reportTime + '\',\'' + result.data.snapPic + '\',\'' + result.data.faceSnap + '\',\'' + result.data.carNum + '\',\'' + result.data.name + '\',\'' + result.data.phone + '\',\'' + result.data.counts + '\',\'' + result.data.totalTime + '\',\'' + result.data.reportTime + '\')" src="' + result.data.faceSnap + '" alt="">' + hasCar + hasPhone +
                '   </div>' +
                '</div>' +
                '<div class="list-item-right">' +
                '    <p>进入时间:</p>' +
                '    <p>' + (result.data.reportTime ? result.data.reportTime.split(" ")[1] : "") + '</p>' +
                '</div>' +
                '</li>';
            $('#people-list').prepend(cacheDataHtmls);
            $(".people-list").animate({ scrollTop: 0 }, 10);
        }

    }

    //连接关闭的回调方法  
    websocket.onclose = function() {
        console.log("socket关闭");
        reconnect();
    }

}


//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
window.onbeforeunload = function() {
    websocket.close();
}

//关闭连接  
function closeWebSocket() {
    websocket.close();
}

var lockReconnect = false; // 是否连接，避免ws重复连接
var reconnectTimerObj = null; // 重连定时器
var serverTimerObj = null; // 心跳超時定時器
var timerObj = null; // 心跳定時器
var timer = 10000; // 心跳間隔

// 重置定时器
function reset() {
    clearTimeout(timerObj);
    clearTimeout(serverTimerObj);
    clearTimeout(reconnectTimerObj);
    sendHeartBeat();
}

// 发送心跳
function sendHeartBeat() {
    timerObj = setTimeout(function() {
        websocket.send(JSON.stringify({
            data: { text: 'heart' },
            errcode: 0,
            errmsg: "",
            type: "isHeartbeat"
        }));

        serverTimerObj = setTimeout(function() {
            /*  console.log("心跳超时未返回消息,重新连接"); */
            websocket.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        }, timer);
    }, timer);
}

// 重連
function reconnect() {
    if (lockReconnect) return;
    lockReconnect = true;
    reconnectTimerObj = setTimeout(function() {
        createWebSocket(); //没连接上会一直重连，设置延迟避免请求过多
        lockReconnect = false;
    }, 2000);
}

// 绘制百分比圆形进度条
function drawCircle(percent, target, width, height) {
    var canvas = document.getElementById(target); //获取canvas元素
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d'), //获取画图环境，指明为2d
        centerX = canvas.width / 2, //Canvas中心点x轴坐标
        centerY = canvas.height / 2, //Canvas中心点y轴坐标
        rad = Math.PI * 2 / 100, //将360度分成100份，那么每一份就是rad度
        speed = 0.3; //加载的快慢就靠它了 

    //绘制8像素宽的运动外圈
    function blueCircle(n) {
        context.save();

        context.strokeStyle = "#1F95FF"; //设置描边样式
        context.lineWidth = 10; //设置线宽
        context.beginPath(); //路径开始
        context.arc(centerX, centerY, canvas.width / 2 - 6, 78 * rad, 78 * rad - n * rad, true);
        //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke(); //绘制
        context.closePath(); //路径结束
        context.restore();
    }

    //绘制底圈
    function whiteCircle() {
        context.save();
        context.beginPath();
        context.lineWidth = 5; //设置线宽
        var grad = context.createLinearGradient(0, 100, 100, 0);
        grad.addColorStop(0, 'rgba(151,151,151,1)');
        grad.addColorStop(1, 'rgba(24,24,24,1)');
        context.strokeStyle = grad;
        context.arc(centerX, centerY, canvas.width / 2 - 6, 0, 100 * rad, true);
        context.stroke();
        context.closePath();
        context.restore();
    }

    //百分比文字绘制
    function text(n) {
        context.save();
        context.beginPath();
        context.font = '24px Arial';
        context.fillStyle = '#FF70A8';
        var text = n.toFixed(0) + '%';
        context.fillText(percent + '%', centerX - 20, centerY + 10);
        context.stroke(); //执行绘制
        context.closePath();
        context.restore();
    }

    //动画循环
    var timer = "";

    function drawFrame() {
        timer = window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, canvas.width, canvas.height);
        whiteCircle();
        // text(speed);
        blueCircle(speed);
        if (speed > percent) {
            window.cancelAnimationFrame(timer);
        };
        speed += 0.3;
    }

    drawFrame();
}


function getUserTotalCount() {
    $.ajax({
        url: baseUrl + "apihkcloud.do?personTodayCounts",
        data: {
            "token": localStorage.getItem("hktoken"),
            "storeId": "8273c4de28c44fe0867ca20cbab089a5",
            "ksdate": "",
            "jsdate": ""
        },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            if (response.code == 200) {
                $('#total-car').text(response.data.carTotal);
                $('#total-car-rate').text(response.data.carRate ? response.data.carRate.replace('%', '') : '');
                $("#peopleTotal").text(response.data.totle);
            }
        }
    });
}

// 獲取最新車輛
function getNewCar() {
    $.ajax({
        url: baseUrl + "apivideo.do?getCarList",
        data: {
            "page": 1,
            "rows": 4
        },
        type: "post",
        cache: false,
        dataType: "json",
        success: function(response) {
            if (response.tableType == 0) {
                var result = response.tableData.carList;
                var htmls = "";
                for (var i = 0; i < result.length; i++) {
                    htmls += '<li>' +
                        '<div class="last-car-box">' +
                        '   <div class="a">' +
                        '       <img src="' + result[i].carImg + '" alt="">' +
                        '       <img src="' + result[i].faceImg + '" alt="">' +
                        '   </div>' +
                        '   <div class="b">' +
                        '       <p>车牌号码 <span>' + result[i].carNum + '</span></p>' +
                        '       <p>车辆颜色 <span>' + result[i].carColor + '</span></p>' +
                        '       <p>入场时间 <span>' + result[i].createDate + '</span></p>' +
                        '   </div>' +
                        '   <div class="b">' +
                        '       <p>车辆类型 <span>' + result[i].carType + '</span></p>' +
                        '       <p>车辆品牌 <span>' + result[i].carBrands + '</span></p>' +
                        '       <p>出场时间 <span></span></p>' +
                        '   </div>' +
                        '</div>' +
                        '</li>';
                }

                $('#last-car-list').empty().append(htmls);

                /*  $('#active-car-img').attr("src", result.carImg);
                 $('#active-car-number').html(result.carNum);
                 var nowDate = new Date(parseInt(result.createDate));
                 $('#active-car-time').html(nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds());
                 $('.active-car-box').css("opacity", 1); */
            }
        }
    });
}

var headHtmls = []; // 头像信息
var points = []; // 点信息
var headTimer = null; // 头像信息定时器
function getPointInfo(userId) {


    headHtmls = [];
    points = [];
    // 清空动线
    $('#infoNumber').empty();
    $('#infoHtml').empty();
    var canvas = document.getElementById("myCanvas");
    var cxt = canvas.getContext("2d");

    cxt.beginPath();
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    $.ajax({
        type: "post",
        dataType: "json",
        url: baseUrl + "apivideo.do?getUserdx&userId=" + userId,
        success: function(result) {
            $('.loading-box').addClass('block-hide');
            if (result.tableType == 0) {
                var cacheData = result.tableData.dxData; //testData.data;  */
                var faceData = result.tableData.faceData;
                var htmls = ""; // 单处头像信息
                var pointHtmls = ""; // 单个点信息
                for (var i = 0; i < cacheData.length; i++) {
                    pointArray.forEach(function(item, index) {
                        if (item.id == cacheData[i].ch) {
                            if (item.id == 0) {
                                htmls += '<div class="house-point-info point-info-0">' +
                                    '   <img onclick="showVideo(\'rtsp://admin:hik12345@10.15.8.5:554/h264/ch1/sub/av_stream\')" src="' + cacheData[i].firstPic.faceUrl + '" alt="">' +
                                    '   <img onclick="showVideo(\'rtsp://admin:hik12345@10.15.8.5:554/h264/ch1/sub/av_stream\')" src="' + cacheData[i].firstPic.fileName + '" alt="">' +
                                    '   <div>' +
                                    '   <p class="color-blue-7 font-size-12"><span class="ico-carnumber"></span> 车牌号</p>' +
                                    '    <p class="font-size-16">' + cacheData[i].firstPic.carNum + '</p>' +
                                    '</div>' +
                                    '</div>';

                            } else {
                                var times = cacheData[i].residencetime1 ? Math.round(cacheData[i].residencetime1 / 60) : 1;
                                var spec = "";
                                var specClass = (item.id == 1 && (faceData.phone || faceData.nickname)) ? 'spec' : '';
                                var img2 = (item.id == 1) ? '<img src="' + faceData.faceImage + '" alt="">' : '';
                                if (item.id == 1 && (faceData.phone || faceData.nickname)) {
                                    spec = '<p>昵称:<span>' + faceData.nickname + '</span></p><p>手机号:<span>' + faceData.phone + '</span></p>';
                                }
                                htmls += '<div class="house-point-info point-info-' + item.id + ' ' + specClass + ' ">' +
                                    '<img src="' + cacheData[i].firstPic.url + '" alt="">' +
                                    img2 +
                                    '<div>' +
                                    '       <p>' + cacheData[i].firstPic.time.substring(cacheData[i].firstPic.time.length - 8, cacheData[i].firstPic.time.length) + '</p>' +
                                    spec +
                                    '       <p>' + (i == cacheData.length - 1 ? '总' : '') + '停留时长：<span>' + (times > 1 ? times : 1) + '分钟</span></p>' +
                                    '    </div>' +
                                    '</div>';
                            }

                            pointHtmls += '<div  class="point-number point-' + item.id + '"><span>' + (i + 1) + '</span>' +
                                '<div class="hot-area-' + item.id + '"></div>' +
                                '<div class="hot-light-' + item.id + '"></div>' +
                                '</div>';

                            headHtmls.push({
                                headInfo: htmls,
                                pintInfo: pointHtmls
                            });
                        }
                    });
                }

                window.clearInterval(headTimer);
                drawLine(cacheData); // 渲染动线
                q = 0;
                //drawHeadInfo(); // 渲染头像信息
            };
        },
        fail: function(f) {
            $('.loading-box').addClass('block-hide');
        }
    })
}

// 顯示直播視頻
var arrowTimer = null;
var showTimer = null;

function showVideo(url) {
    /*  closeVideo();
     showTimer = setTimeout(function() {
     showVideoInfo(url);
     }, 100); */
}

function showVideoInfo(url) {
    $('.video-box').addClass('video-show');
    $('#vlc param')[0].value = url;

    var mark = 9;
    arrowTimer = setInterval(function() {
        $('.video-box-right').find('.arrow-show-1').removeClass('arrow-show-1');
        $('.video-box-right').find('.arrow-show-2').removeClass('arrow-show-2');
        if (mark == 1) {
            $('.video-box-right div').eq(mark - 1).addClass('arrow-show-1');
            $('.video-box-right div').eq(mark).addClass('arrow-show-2');
            $('.video-box-right div').eq(mark + 1).addClass('arrow-show-1');
            mark = 9;
        } else {
            $('.video-box-right div').eq(mark - 1).addClass('arrow-show-1');
            $('.video-box-right div').eq(mark).addClass('arrow-show-2');
            $('.video-box-right div').eq(mark + 1).addClass('arrow-show-1');
            mark--;
        }

    }, 2000);
}

// 關閉痰喘
function closeVideo() {
    /* $('#vlc param')[0].value = "";
     $('.video-box').removeClass('video-show');
     window.clearInterval(arrowTimer);
     window.clearInterval(showTimer); */
}

// 渲染动线
var c = document.getElementById("myCanvas"); //初始化
var ctx = c.getContext("2d");
c.width = 1665;
c.height = 765;
var t = 1; // 动线点
var q = 0; // 头像点

function drawLine(cacheData) {
    var vertices = [];
    for (var i = 0; i < cacheData.length; i++) {
        pointArray.forEach(function(item, index) {
            if (item.id == cacheData[i].ch) {
                vertices.push({
                    x: item.left + 22,
                    y: item.top + 22
                });
            }
        });
    }

    if (vertices.length > 1) {
        points = calcWaypoints(vertices);
    } else {
        drawHeadInfo(0);
    }

    ctx.lineWidth = 2;
    ctx.shadowOffsetX = 0; // 设置水平位移
    ctx.shadowOffsetY = 0; // 设置垂直位移
    ctx.shadowBlur = 10; // 设置模糊度
    ctx.shadowColor = "rgba(4,168,233,0.8)"; // 设置阴影颜色
    ctx.strokeStyle = "rgba(55,105,254,1)";
    t = 1;
    animate();
}

// 渲染头像信息
function drawHeadInfo(q) {
    $('#infoHtml').append(headHtmls[q].headInfo);
    $('#infoNumber').append(headHtmls[q].pintInfo);
    /*  q++; */
}

// 渲染点
function animate() {
    if (t < points.length) {
        if (t == 1 || t == points.length - 1 || points[t].start) {
            drawHeadInfo(t != 1 ? points[t].start : 0);
            q++;
        }
        requestAnimationFrame(animate);
    } else {
        return;
    }
    ctx.beginPath();
    ctx.moveTo(points[t - 1].x, points[t - 1].y);
    ctx.lineTo(points[t].x, points[t].y);
    ctx.stroke();
    /*  ctx.restore(); */
    t++;
}

// 分解点
function calcWaypoints(vertices) {
    var waypoints = [];
    var mark = 50;
    for (var i = 1; i < vertices.length; i++) {
        var pt0 = vertices[i - 1];
        var pt1 = vertices[i];
        var dx = pt1.x - pt0.x;
        var dy = pt1.y - pt0.y;

        if (Math.abs(dx) + Math.abs(dy) < 300) {
            mark = 30;
        } else {
            mark = 50;
        }

        for (var j = 0; j < mark; j++) {
            var x = pt0.x + dx * j / mark;
            var y = pt0.y + dy * j / mark;
            var zz = j == 0 ? (i - 1) : false;
            waypoints.push({
                x: x,
                y: y,
                start: (i == vertices.length - 1 && j == mark - 1) ? i : zz
            });
        }
    }
    return (waypoints);
}


// 获取人脸列表
function getPeopleList(page, rows, typeId) {
    $('.loading-box').addClass('block-hide');
    //请求格式
    $.ajax({
        type: "POST",
        url: baseUrl + "apivideo.do?getUserList",
        data: {
            "page": 1,
            "rows": 100,
            "typeId": ""
        }, //数据，这里使用的是Json格式进行传输
        success: function(result) { //返回数据根据结果进行相应的处理
            var data = eval('(' + result + ')');
            var info = data.tableData.cameraData;
            var htmlsList = "";
            for (var i = 0; i < info.length; i++) {

                if (i == 0) {
                    // getPointInfo(info[i].id); //"8a8f501067c59f8a0167c9d381f207cb";
                    $('#active-age').html(info[i].ageGroup);
                    $('#active-sex').html(info[i].sex);
                    $('#active-car').html(info[i].carNum ? info[i].carNum : '无');
                    $('#active-glass').html(info[i].glass);
                    $('#active-time').html(info[i].reportTime ? info[i].reportTime.split(' ')[1] : "");
                    $('#active-big-img').html('<img src="' + info[i].snapPic + '" alt="">');
                    $('#active-header').html(' <img src="' + info[i].faceSnap + '" alt="">');

                    $('#active-name').html(info[i].userName);
                    $('#active-phone').html(info[i].phone == 'undefined' ? '' : info[i].phone);
                    $('#active-daofang').html(info[i].counts);
                    $('#active-times').html(info[i].totalTime + 'min');
                    $('#active-yezhu').html("");
                    $('#active-last-time').html(info[i].reportTime ? info[i].reportTime.split(' ')[0] : "");
                } else {
                    var hasCar = info[i].carNum ? '<div class="img-car-label s-label"></div>' : '';
                    var hasPhone = info[i].phone ? '<div class="img-phone-label s-label"></div>' : '';
                    htmlsList += ' <li>' +
                        ' <div class="list-item-left" >' +
                        '   <div class="list-item-img-box">' +
                        '       <img  onclick="showDongXian(\'' + info[i].id + '\',\'' + info[i].ageGroup + '\',\'' + info[i].sex + '\',\'' + info[i].glass + '\',\'' + info[i].reportTime + '\',\'' + info[i].snapPic + '\',\'' + info[i].faceSnap + '\',\'' + info[i].carNum + '\',\'' + info[i].name + '\',\'' + info[i].phone + '\',\'' + info[i].counts + '\',\'' + info[i].totalTime + '\',\'' + info[i].reportTime + '\')" src="' + info[i].faceSnap + '" alt="">' + hasCar + hasPhone +
                        '   </div>' +
                        '</div>' +
                        '<div class="list-item-right">' +
                        '    <p>进入时间:</p>' +
                        '    <p>' + (info[i].reportTime ? info[i].reportTime.split(" ")[1] : "") + '</p>' +
                        '</div>' +
                        '</li>';
                }
            }
            $('#people-list').empty().append(htmlsList);
        },
        fail: function(f) {
            $('#people-list').empty();
        }
    });
}

// 展示动线
function showDongXian(id, ageGroup, sex, glass, reportTime, snapPic, faceSnap, car, name, phone, counts, totalTime, reportTime) {
    $('.loading-box').removeClass('block-hide');
    $('.point-hotarea-group').addClass('block-hide');
    closeVideo();
    getPointInfo(id);
    $('#active-age').html(ageGroup);
    $('#active-sex').html(sex);
    $('#active-car').html(car ? car : '无');
    $('#active-glass').html(glass);
    $('#active-time').html(reportTime ? reportTime.split(' ')[1] : "");
    $('#active-big-img').html('<img src="' + snapPic + '" alt="">');
    $('#active-header').html(' <img src="' + faceSnap + '" alt="">');




    $('#active-name').html('');
    $('#active-phone').html(phone == 'undefined' ? '' : phone);
    $('#active-daofang').html(counts);
    $('#active-times').html(totalTime + 'min');
    $('#active-yezhu').html("");
    $('#active-last-time').html(reportTime ? reportTime.split(' ')[0] : "");
}

// 恢复热力图
function showHot() {
    $('.point-hotarea-group').removeClass('block-hide');
    // 清空动线
    $('#infoNumber').empty();
    $('#infoHtml').empty();
    var canvas = document.getElementById("myCanvas");
    var cxt = canvas.getContext("2d");

    cxt.beginPath();
    cxt.clearRect(0, 0, canvas.width, canvas.height);
}

$(document).ready(function() {
    getNewCar();
    getPeopleList();
});