var speed = 0;
function start(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {

        var style = 0;
        // 定义标杆，为true说明所有属性都到达终点值
        var flag = true;
        // 透明度变化处理
        // 添加判断语句，为透明度变化时的处理不一样
        for (var attr in json) {
            switch (attr) {
                case 'opacity':
                    style = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                    break;
                case 'scrollTop':
                    style = obj[attr];
                    break;
                default:
                    style = parseInt(getStyle(obj, attr)); // 获取的为字符串一定要记得转化为整形
                    break;
            }
            // if (attr == 'opacity') {
            //     // parseFloat 获取浮点数之后乘以100，越大就会产生越多的小数点，所以用Math.round进行四舍五入
            //     style = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            // } else {
            //     // console.log(getStyle(obj,attr))
            //     style = parseInt(getStyle(obj, attr)); // 获取的为字符串一定要记得转化为整形
            // }
            speed = (json[attr] - style) / 10;
            // 增大向上取整，减小乡下去整
            speed = json[attr] > style ? Math.ceil(speed) : Math.floor(speed);

            // 增加停止的边界，让json里面的所有属性都为true
            if (style !== json[attr]) {
                flag = false;
            }
            // 运动起来
            switch (attr) {
                case 'opacity':
                    obj.style[attr] = (style + speed) / 100;
                    break;
                case 'scrollTop':
                    obj.scrollTop = style + speed;
                    break;
                default:
                    obj.style[attr] = style + speed + 'px';
                    break;
            }
            // if (attr === 'opacity') {
            //     obj.style[attr] = (style + speed) / 100;
            // } else {
            //     obj.style[attr] = style + speed + 'px';
            // }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
            return;
        }
    }, 30)

}
// 获取width的封装函数，offsetwidth不适用有border的情况
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];// 兼容IE浏览器
    } else {
        return getComputedStyle(obj, null)[attr];// 获取到的是当前的属性
        // getComputedStyle(str:Element, [pseudo]这个为伪元素像：：before) 这个方法就是将第一个参数的所有css属性都取出来放进一个数组，想要具体的某一个样式通过【】取出来
    }
}