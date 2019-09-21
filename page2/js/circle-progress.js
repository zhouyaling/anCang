function CircleProgress(percent, el, col) {
    var canvas = document.getElementById(el), //获取canvas元素
        context = canvas.getContext('2d'), //获取画图环境，指明为2d
        centerX = canvas.width / 2, //Canvas中心点x轴坐标
        centerY = canvas.height / 2, //Canvas中心点y轴坐标

        rad = Math.PI * 2 / 100, //将360度分成100份，那么每一份就是rad度
        speed = 0.3; //加载的快慢就靠它了 

    //绘制8像素宽的运动外圈
    function blueCircle(n) {
        context.save();
        context.strokeStyle = col; //"#FFCA36"; //设置描边样式
        context.lineWidth = 15; //设置线宽
        context.beginPath(); //路径开始
        context.arc(centerX, centerY, 70, 83 * rad, 83 * rad - n * rad, true);
        //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke(); //绘制
        context.closePath(); //路径结束
        context.restore();
    }
    //绘制底圈
    function whiteCircle() {
        context.save();
        context.beginPath();
        context.lineWidth = 15; //设置线宽
        context.strokeStyle = "rgba(242,242,242,0.16)";
        context.arc(centerX, centerY, 70, 83 * rad, 90 * rad, true);
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
        context.fillText(percent, centerX - 25, centerY + 20);
        context.stroke(); //执行绘制
        context.closePath();
        context.restore();
    }
    //动画循环
    var timer = "";
    (function drawFrame() {
        timer = window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineCap = "round";
        whiteCircle();
        //text(speed);
        blueCircle(speed);
        if (speed > percent) {
            window.cancelAnimationFrame(timer);
        };
        speed += 0.3;
    }())
}

// 绘制百分比圆形进度条
function percentCircle(percent, target) {
    var canvas = document.getElementById(target); //获取canvas元素
    canvas.width = 210;
    canvas.height = 210;
    var context = canvas.getContext('2d'), //获取画图环境，指明为2d
        centerX = canvas.width / 2, //Canvas中心点x轴坐标
        centerY = canvas.height / 2, //Canvas中心点y轴坐标
        rad = Math.PI * 2 / 100, //将360度分成100份，那么每一份就是rad度
        speed = 0.3; //加载的快慢就靠它了 

    //绘制8像素宽的运动外圈
    function blueCircle(n) {
        context.save();
        /*  var grad = context.createLinearGradient(0, 0, 0, 100);
         grad.addColorStop(0, 'rgba(72,100,230,0.1)');
         grad.addColorStop(0.5, 'rgba(72,100,230,0.4)');
         grad.addColorStop(1, 'rgba(72,100,230,1)'); */
        context.strokeStyle = "#4864E6"; //设置描边样式
        context.lineWidth = 15; //设置线宽
        context.beginPath(); //路径开始
        context.arc(centerX, centerY, 75, 83 * rad, 83 * rad - n * rad, true);
        //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke(); //绘制
        context.closePath(); //路径结束
        context.restore();
    }
    //绘制底圈
    function whiteCircle() {
        context.save();
        context.beginPath();
        context.lineWidth = 10; //设置线宽
        context.strokeStyle = "rgba(242,242,242,0.16)";
        context.arc(centerX, centerY, 75, 0, 100 * rad, true);
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
        context.fillText(percent, centerX - 25, centerY + 20);
        context.stroke(); //执行绘制
        context.closePath();
        context.restore();
    }

    //动画循环
    var timer = "";

    function drawFrame() {
        timer = window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineCap = "round";
        whiteCircle();
        //text(speed);
        blueCircle(speed);
        if (speed > percent) {
            window.cancelAnimationFrame(timer);
        };
        speed += 0.3;
    }

    drawFrame();
}