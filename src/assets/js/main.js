//加载完成后执行
window.addEventListener('load', function () {
    try {
        $('#loading-box').attr('class', 'loaded');
        $('#bg').css("cssText", "transform: scale(1);filter: blur(0px);transition: ease 1.5s;");
        $('#section').css("cssText", "opacity: 1;transition: ease 1.5s;");
        $('.cover').css("cssText", "opacity: 1;transition: ease 1.5s;");

        if (typeof iziToast !== 'undefined') {
            iziToast.settings({
                timeout: 3000,
                backgroundColor: '#ffffff40',
                titleColor: '#efefef',
                messageColor: '#efefef',
                progressBar: false,
                close: false,
                closeOnEscape: true,
                position: 'topCenter',
                transitionIn: 'bounceInDown',
                transitionOut: 'flipOutX',
                displayMode: 'replace',
                layout: '1'
            });
            setTimeout(function () {
                iziToast.show({
                    title: typeof hello === 'string' ? hello : '你好',
                    message: '欢迎来到 KobayashiTab'
                });
            }, 800);
        }

        try {
            const font = new FontFace(
                "MiSans",
                "url(" + "./font/MiSans-Regular.woff2" + ")"
            );
            font.load().then(function() {
                document.fonts.add(font);
            }).catch(function() {});
        } catch (e) {}
    } catch (e) {
        console.error('Load error:', e);
        $('#loading-box').attr('class', 'loaded');
        $('#bg').css("cssText", "transform: scale(1);filter: blur(0px);transition: ease 1.5s;");
        $('#section').css("cssText", "opacity: 1;transition: ease 1.5s;");
        $('.cover').css("cssText", "opacity: 1;transition: ease 1.5s;");
    }
}, false)

//进入问候
now = new Date(), hour = now.getHours()
if (hour < 6) {
    var hello = "凌晨好";
} else if (hour < 9) {
    var hello = "早上好";
} else if (hour < 12) {
    var hello = "上午好";
} else if (hour < 14) {
    var hello = "中午好";
} else if (hour < 17) {
    var hello = "下午好";
} else if (hour < 19) {
    var hello = "傍晚好";
} else if (hour < 22) {
    var hello = "晚上好";
} else {
    var hello = "夜深了";
}

//获取时间
var t = null;
t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    var mm = dt.getMonth() + 1;
    var d = dt.getDate();
    var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var day = dt.getDay();
    var h = dt.getHours();
    var m = dt.getMinutes();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    $("#time_text").html(h + '<span id="point">:</span>' + m);
    $("#day").html(mm + "&nbsp;月&nbsp;" + d + "&nbsp;日&nbsp;" + weekday[day]);
    t = setTimeout(time, 1000);
}

//获取天气
//每日限量 100 次
//请前往 https://www.tianqiapi.com/index/doc?version=v6 申请（免费）
fetch('https://yiketianqi.com/api?unescape=1&version=v6&appid=43986679&appsecret=TksqGZT7')
    .then(response => response.json())
    .then(data => {
        //$('#wea_text').html(data.wea + '&nbsp;' + data.tem_night + '℃' + '&nbsp;~&nbsp;' + data.tem_day + '℃')
        $('#wea_text').text(data.wea)
        $('#tem1').text(data.tem1)
        $('#tem2').text(data.tem2)
    })
    .catch(console.error)
    
//Tab书签页
$(function () {
    $(".mark .tab .tab-item").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".products .mainCont").eq($(this).index()).css("display", "flex").siblings().css("display", "none");
    })
})

//设置
$(function () {
    $(".set .tabs .tab-items").click(function () {
        $(this).addClass("actives").siblings().removeClass("actives");
        $(".productss .mainConts").eq($(this).index()).css("display", "flex").siblings().css("display", "none");
    })
})

//输入框为空时阻止跳转
$(window).keydown(function (e) {
    var key = window.event ? e.keyCode : e.which;
    if (key.toString() == "13") {
        if ($(".wd").val() == "") {
            return false;
        }
    }
});

//点击搜索按钮
$(".sou-button").click(function () {
    if ($("body").attr("class") === "onsearch") {
        if ($(".wd").val() != "") {
            $("#search-submit").click();
        }
    }
});

//鼠标中键点击事件
$(window).mousedown(function (event) {
    if (event.button == 1) {
        $("#time_text").click();
    }
});

