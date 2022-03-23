window.onload = function () {
    // 获取标签
    var slider = document.getElementById('slider');
    var slider_main = document.getElementById('slider_main');
    var allBoxes = slider_main.children;
    var next = document.getElementById('next');
    var prev = document.getElementById('prev');
    var slider_index = document.getElementById('slider_index');
    var iNow = 0;// 当前元素可视索引
    var timer = null;
    // 2.动态的创建轮播图的索引
    

    for (var i = 0; i < allBoxes.length; i++) {
        // 创建一个标签后续插入
        var span = document.createElement('span');
        // 给新创建的span标签添加类名，进行样式的书写
        if (i === 0) {
            // 第一个标签的字体颜色为红色
            span.className = 'slider_index_icon current';
        } else {
            span.className = 'slider_index_icon';
        }
        // 将新建的标签插入到底部
        span.innerText = i + 1;
        slider_index.appendChild(span);
    }
    // 3.让滚动的元素归位,除第一张
    var scroll_Width = parseInt(getStyle(slider, 'width'));
    for (var j = 1; j < allBoxes.length; j++) {
        allBoxes[j].style.left = scroll_Width + 'px';
    }

    // 4.监听下一张按钮的事件
    next.onclick = function () {
        /** 
         * 1.让当前的可是元素左移
         * 2.让下一张图片快速的显示到右边
         * 3.让这个元素进入
        */
        // 让元素往左走    
        start(allBoxes[iNow], { 'left': -scroll_Width })
        // 让inow更新    
        iNow++;
        //    让左边的元素进入
        if (iNow >= allBoxes.length) {
            iNow = 0;
        }
        allBoxes[iNow].style.left = scroll_Width + 'px';
        start(allBoxes[iNow], { 'left': 0 })
        changeIdex();
    }

    // 5.监听上一张按钮的事件
    prev.onclick = function () {
        /** 
         * 1.让当前的可是元素右移
         * 2.让下一张图片快速的显示到左边
         * 3.让这个元素进入
        */
        // 让元素往右走    
        start(allBoxes[iNow], { 'left': scroll_Width })
        // 让inow更新    
        iNow--;
        //    让左边的元素进入
        if (iNow < 0) {
            iNow = allBoxes.length - 1;
        }
        allBoxes[iNow].style.left = -scroll_Width + 'px';
        start(allBoxes[iNow], { 'left': 0 })
        changeIdex();
    }

    // 6.开启定时器，鼠标悬浮时关闭
    timer = setInterval(function(){
        /** 
        * 1.让当前的可是元素左移
        * 2.让下一张图片快速的显示到右边
        * 3.让这个元素进入
       */
       // 让元素往左走    
       start(allBoxes[iNow], { 'left': -scroll_Width })
       // 让inow更新    
       iNow++;
       //    让左边的元素进入
       if (iNow >= allBoxes.length) {
           iNow = 0;
       }
       allBoxes[iNow].style.left = scroll_Width + 'px';
       start(allBoxes[iNow], { 'left': 0 })
       changeIdex();

   },2000)
    // 鼠标悬浮关闭
    slider.onmouseover = function(){
        clearInterval(timer);
    }
    // 鼠标离开时继续开启定时器
    slider.onmouseout = function(){
        timer = setInterval(function(){
            /** 
            * 1.让当前的可是元素左移
            * 2.让下一张图片快速的显示到右边
            * 3.让这个元素进入
           */
           // 让元素往左走    
           start(allBoxes[iNow], { 'left': -scroll_Width })
           // 让inow更新    
           iNow++;
           //    让左边的元素进入
           if (iNow >= allBoxes.length) {
               iNow = 0;
           }
           allBoxes[iNow].style.left = scroll_Width + 'px';
           start(allBoxes[iNow], { 'left': 0 })
           changeIdex();
    
       },2000)
    }
    

    var slider_index_icons = slider_index.children;
    // 6.遍历索引器，添加监听事件
    for (var i = 0; i < slider_index_icons.length; i++) {
        slider_index_icons[i].onmousedown = function(){

            // 6.1获取当前的索引
            var index = parseInt(this.innerText) - 1;
            if(index > iNow){
                // 让当前的图片向左移出
                start(allBoxes[iNow],{'left':-scroll_Width})
                // 让对应索引的图片移到可视区的右边
                allBoxes[index].style.left = scroll_Width + 'px';
                // 让该图片移动到可视区域
                start(allBoxes[index],{'left':0})
                iNow = index;
                changeIdex();
            }else if(index < iNow){
                // 让当前的图片向右移出
                start(allBoxes[iNow],{'left':scroll_Width});
                // 让索引对应的图片移动到左边的等待区域
                allBoxes[index].style.left = -scroll_Width + 'px';
                // 让等待的图片向右移动进可视化区域
                start(allBoxes[index],{'left':0});
                // 更新suoyin
                iNow = index;
                // 调用改变索引函数
                changeIdex();
            }
        }
    }

    // 7.给轮播图添加定时器，使其自动切换
    

    
    // 改变索引
    function changeIdex() {
        // 找到索引
        for (let i = 0; i < slider_index.children.length; i++) {
            slider_index.children[i].className = 'slider_index_icon';
        }
        slider_index.children[iNow].className = 'slider_index_icon current';
    }


} 