/* setInterval(function() {
        getData();
    }, 120000) */
//获取数据并渲染
function getData() {
    $.ajax({
        type: 'POST',
        url: 'http://10.15.208.144:8081/jinke-slaes/apivideo.do?getAreaCount',
        success: function(s) {
            var dataInfo = JSON.parse(s).tableData.areaData;
            for (var i = 0; i < dataInfo.length; i++) {
                blockShow(parseInt(dataInfo[i].ch), dataInfo[i].count)
            }

        },
        fail: function(f) {

        }
    });
}
//渲染页面的方法
function blockShow(id, num) {
    var dom = $('.point-h-' + id);
    var type
    switch (id) {
        case 0:
            type = 1
            break;
        case 3:
        case 4:
            type = 2
            break;
        case 6:
        case 1:
            type = 3
            break;
        case 2:
        case 5:
        case 7:
            type = 4
            break;
        case 8:
            type = 5
            break;
    }

    if (num < 10) {
        dom.addClass('p-' + type + '-1').css({
            'opacity': 0.5
        });
    } else if (num < 20) {
        dom.addClass('p-' + type + '-1');
    } else if (num < 50) {
        dom.addClass('p-' + type + '-2');
    } else if (num < 80) {
        dom.addClass('p-' + type + '-3');
    } else {
        dom.addClass('p-' + type + '-4');
    }
}

getData();