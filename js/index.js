var wrap = document.getElementsByClassName('wrap')[0],
    content = document.getElementsByClassName('content')[0],
    barWrap = document.getElementsByClassName('barWrap')[0],
    bar = document.getElementsByClassName('bar')[0];
//对象解构赋值，不兼容ie   
var {
    max,
    min
} = Math

init();

//设定拖动滚轮事件
bar.onmousedown = function (e) {

    var startY = e.clientY,
        origTop = bar.offsetTop,
        barWrapH = barWrap.clientHeight,
        barH = bar.scrollHeight,
        contentH = content.scrollHeight;

    document.onmousemove = function (e) {
        //val  滚动距离
        var val = origTop + e.clientY - startY;
        val = max(0, val)
        val = min(barWrapH - barH, val)

        bar.style.top = val + 'px'
        //（val / barWrapH）为滚动的比例值
        content.style.top = -val / barWrapH * contentH + 'px'
    }
    //事件解绑
    document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
    }
    //阻止选中文本
    e.preventDefault();
}

/**
 * 初始化滚动条的高度
 */
function init() {
    var wrapH = wrap.clientHeight,
        contentH = content.offsetHeight,
        barWrapH = barWrap.clientHeight;

    bar.style.height = wrapH / contentH * barWrapH + 'px'
}

//设定鼠标滚轮事件
mouseScroll(wrap, function (e) {
    var speed = 20,
        val = 0,
        origTop = bar.offsetTop,
        barWrapH = barWrap.clientHeight,
        barH = bar.scrollHeight,
        contentH = content.scrollHeight;

    if (e.mouseDelta > 0) {
        val = origTop - speed
    } else {
        val = origTop + speed
    }

    val = max(0, val)
    val = min(barWrapH - barH, val)

    bar.style.top = val + 'px'
     //（val / barWrapH）为滚动的比例值
    content.style.top = -val / barWrapH * contentH + 'px'
    //阻止默认的滚轮事件，阻止外部滚轮和内部滚轮同时滚动
    e.preventDefault();
})


//鼠标滚轮兼容性
function mouseScroll(el, eventhandler, bool) {
    var type = 'mousewheel'
    if (el.onmousewheel === undefined) {
        //fireFox
        type = 'DOMMouseScroll'
    }

    el.addEventListener(type, mouseScroll, bool);

    function mouseScroll(e) {
        e.mouseDelta = e.wheelDelta / 120 || e.detail / -3;
        eventhandler.call(this, e);
    }
}