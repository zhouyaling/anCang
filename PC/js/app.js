//webSocket 配置

if (window.WebSocket) {
    var ws = new WebSocket('ws://101.200.194.246:9911');
    ws.onopen = function (e) {
        console.log("连接服务器成功");
        var item = {};
        item.type = "regist";
        item.server = "no";
        item.value = "server2010701";
        item.order = [];

        ws.send(JSON.stringify(item));
    }
    ws.onclose = function (e) {
        console.log("服务器关闭");
    }
    ws.onerror = function () {
        console.log("连接出错");
    }
    ws.onmessage = function (e) {
        var item = JSON.parse(e.data);
        console.log(item)
        showPage(item.showImg);
        var item = order("1");
        ws.send(JSON.stringify(item));
    }
}
var typeNum = 'page1';
//
function order(_status) {
    var item = {};
    item.type = "order";
    item.server = "client2010701";//识别客户端
    item.value = "";
    item.order = [];
    var jObj = {
        status: "1",
    };
    item.order.push(jObj)
    return item;
}
function showPage(page) {
    console.log('44444444444444444444444444444')
    console.log(typeNum,page)
    if (typeNum ==page.substring(0,5)) {


    }else{
        typeNum = page.substring(0,5)
        switch (page) {
            case "page1":

                $('#iframe').attr('src', '../page1/page1/page1.html')
                console.log($('#iframe').attr("src"))

                break;
            // case "page2":
            //
            //     $('#iframe').attr('src', '../page2/page2.html')
            //     console.log($('#iframe').attr("src"))
            //
            //     break
            case "page3":

                $('#iframe').attr('src', '../page3/page3.html')
                console.log($('#iframe').attr("src"))
                break


            default:
                $('#iframe').attr('src', '../page1/page1.html')
                console.log($('#iframe').attr("src"))
                console.log('other')
                break
        }
    }
    console.log(page)

}
