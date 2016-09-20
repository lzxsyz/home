setTimeout(function () {
    chrome.bookmarks.getTree(function (results) {
        response = results[0].children[0].children;
        for (var i = response.length - 1; i >= 0; i--) {
            $("body").prepend($("<a class=\"menu\" href='" + response[i].url + "' target='_blank'>" + response[i].title + "</a>"));
        }
    });
}, 500);
$(function () {
    $("#sousuo_baidu").click(function () {
        window.open("http://www.baidu.com/baidu?select=1&tn=nhren_pg&ie=utf-8&word=" + encodeURIComponent($("#kw").val()));
    });
    $("#kw").keydown(function () {
        if (event.keyCode == 13) {
            window.open("http://www.baidu.com/baidu?select=1&tn=nhren_pg&ie=utf-8&word=" + encodeURIComponent(textValue));
        }
    });
});
function isEn(text) {
    text = text.replace(/[ \s]/g, '');
    var zh = text.length - text.replace(/[\u4e00-\u9fa5\s]+/g, '').length;
    var en = text.length - text.replace(/[a-zA-Z]+/g, '').length;
    return en >= zh ? true : false;
}
function Preview(text) {
    var winname = window.open('', "_blank", '');
    winname.document.open('text/html', 'replace');
    winname.document.write(text);
    winname.document.close();
}
function Random(leng) {
    var cCode = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var cAmount = cCode.length;
    var cStr = "";
    for (var i = 0; i < leng; i++) {
        cStr += cCode.charAt(parseInt(Math.random() * cAmount));
    }
    return cStr;
}

function sousuo(str) {
    var textValue = document.getElementById("kw").value;
    if (str == "baidu")
    { window.open("http://www.baidu.com/baidu?select=1&tn=nhren_pg&ie=utf-8&word=" + encodeURIComponent(textValue)); }
    if (str == "google")
    { window.open("http://www.google.com.hk/search?q=" + encodeURIComponent(textValue)); }
    if (str == "sogou")
    { window.open("http://www.sogou.com/web?query=" + encodeURIComponent(textValue)); }
    if (str == "bing")
    { window.open("http://cn.bing.com/search?q=" + encodeURIComponent(textValue)); }
    if (str == "gougou")
    { window.open("http://www.gougou.com/search?search=" + encodeURIComponent(textValue)); }
    if (str == "baidufy")
    { window.open("http://www.baidu.com/s?lm=0&si=&rn=10&ct=1048576&tn=nhren_pg&ie=utf-8&wd=" + encodeURIComponent(textValue)); }
    if (str == "icibafy")
    { window.open("http://dict.iciba.com/" + encodeURIComponent(textValue) + "/"); }
}
// ´¦Àí×¢ÊÍ¡£
function clzs(str) {
    return str.replace(/\r\n.*?((\/\/\/)|(\/\/))/g, " ").replace(new RegExp("//", "g"), "").replace(/\n/g, "");
}
function googlefy() {
    var text = $.trim($("#code").val());
    if (text == "") return;
    var isen = isEn(text);
    $.ajax({
        type: 'POST',
        url: "http://translate.google.cn/translate_a/t",
        data: {
            "client": "t",
            "text": text,
            "hl": "zh-CN",
            "sl": isen ? "en" : "zh-CN",
            "tl": isen ? "zh-CN" : "en"
        },
        async: true,
        success: function (rData, textStatus) {
            var resp = eval("(" + rData + ")");
            var jg = resp[0];
            var result = "";
            for (var i = 0; i < jg.length; i++) {
                result += jg[i][0].replace(new RegExp("<", 'g'), "&lt;").replace(new RegExp(">", 'g'), "&gt;") + "<br />";
            }
            $("#googlefydiv").html(result);
        }
    });
}