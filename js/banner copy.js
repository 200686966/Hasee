window.onload = function(){
    var oBox = document.getElementById('banner')
    var oUl = document.getElementById('img_show')
    var oBtn = document.querySelectorAll('.Btn span')
    var iNow = null;
    var timer = null;

    for(var i = 0;i < oBtn.length;i++){
        oBtn[i].index = i;
        oBtn[i].onclick = function(){
            iNow = this.index + 1;
            tab()
        }
    }

    //启动定时器    自动轮播
    timer = setInterval(timeInner,2000)

    //移入停止
    oBox.addEventListener('mouseenter',function(){
        clearInterval(timer)
    })
    //移出运行
    oBox.addEventListener('mouseleave',function(){
        timer = setInterval(timeInner,2000)
    })


    // //点击轮播
    // var aBtn = document.querySelectorAll('a')
    // aBtn[0].onclick = function(){
    //     iNow--;
    //     tab()
    // }
    // aBtn[0].onclick = function(){
    //     iNow--;
    //     tab()
    // }



    function timeInner (){
        iNow++;
        tab()
    }
    

    function tab(){
        for(var i = 0;i < oBtn.length;i++){
            oBtn[i].className = '';
        }

        if(iNow == oBtn.length + 1){
            oBtn[0].className = 'active'
        }else if(iNow == 0){
            oBtn[oBtn.length - 1].className = 'active'
        }else{
            oBtn[iNow - 1].className = 'active'
        }

        startMove(oUl,{left: -iNow * 956},function(){
            if(iNow == oBtn.length + 1){
                iNow = 1
                oUl.style.left = '-956px'
            }

            if(iNow == 0){
                iNow = 3;
                oUl.style.left = -5 * 956 + 'px'
            }
        })
    }

    function startMove(node, cssObj, complete) {
        clearInterval(node.timer);
        node.timer = setInterval(function () {
            var isEnd = true; //假设都到达目的值了
            for (var attr in cssObj) {
    
                var iTarget = cssObj[attr];
    
                var iCur = null;
    
                if (attr == "opacity") {
                    iCur = parseInt(parseFloat(getStyle(node, attr)) * 100);
                } else {
                    iCur = parseInt(getStyle(node, attr));
                }
    
                var speed = (iTarget - iCur) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    
                //node.style["width"]
                if (attr == "opacity") {
                    iCur += speed;
                    node.style.opacity = iCur / 100;
                    node.style.filter = "alpha(opacity=" + iCur + ")";
                } else {
                    node.style[attr] = iCur + speed + 'px';
                }
    
                if(iTarget != iCur){
                    isEnd = false;
                }
            }
            //定时器关闭的条件是，所有动画都达到目的值
            if(isEnd){
                clearInterval(node.timer);
                if(complete){
                    complete.call(node);
                }
            }
        }, 30);
    }
    
    
    //获取当前有效样式的浏览器兼容
    function getStyle(node, cssAttr) {
        if (node.currentStyle) {
            return node.currentStyle[cssAttr];
        } else {
            return getComputedStyle(node)[cssAttr];
        }
    }
}