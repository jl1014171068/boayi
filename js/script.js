
$(".order-head").on('click', function(e) {
    var $menu = $('.order-head');
    $menu.find('ul').toggle();
    $(document).one("click", function() {
        $menu.find('ul').hide();
    });
    e.stopPropagation();
});

function menu(element) {
    $(element + ' li').click(function(e) {
        var $menu = $(element + ' li');
        if ($(this).find('ol').is(":hidden")) {
            $(this).find('ol').show();
            $(this).siblings('li').find('ol').hide();
        } else {
            $(this).find('ol').hide();
        }
        $(document).not(element).one("click", function() {
            $(element).find('ol').hide();
        });
        e.stopPropagation();
    })
}
menu(".appoinList-nav ul");
menu(".baby-partList-nav ul");
// 个人中心订单页面的全部订单切换

$(function() {
    var length = $('.appoin-head ul li').length,
        now = 0;
    var $li = $('.appoin-head ul li');
    $li.width($(window).width());
    var wid = $li.width();
    $('.appoin-head ul').width(wid * length);
    for (var i = 0; i < length; i++) {
        var html = '<li></li>';
        $('.appoin-head ol').append(html);
    }
    var olwidth = ($('.appoin-head ol').width()) / 2;
    $('.appoin-head ol').css('marginLeft', -olwidth);
    $('.appoin-head ol li').eq(now).addClass('active').siblings('li').removeClass('active');

    function silder() {
        $('.appoin-head ul').css("-webkit-transform", "translate3d(" + -wid * (now) + "px,0,0)");
        $('.appoin-head ol li').eq(now).addClass('active').siblings('li').removeClass('active');
    }
    $('.appoin-head ul li').swipeLeft(function(e) {
        now++;
        if (now > length - 1) now = 0;
        silder();
    })
    $('.appoin-head ul li').swipeRight(function(e) {
        now--;
        if (now < 0) now = length - 1;
        silder();
    })
    var time = setInterval(function() {
        now++;
        if (now > length - 1) now = 0;
        silder();
    }, 3000);
    $('.appoin-head ul li').on('touchstart', function() {
        clearInterval(time);
    })
    $('.appoin-head ul li').on('touchend', function() {
        time = setInterval(function() {
            now++;
            if (now > length - 1) now = 0;
            silder();
        }, 3000);
    })
}());
// 上面是banner图切换，touch的js部分有改动，修复安卓qq浏览器中的失效
$(".checkbox .ad-checkbox").tap(function(e) {
        $(this).addClass('active').siblings('.ad-checkbox').removeClass('active');
        $(this).find('input[type="checkbox"]').prop('checked');
        $(this).siblings('.ad-checkbox').find('input[type="checkbox"]').removeAttr('checked');
    })
    // 上面为公用的check单选


function score(elem) {
    $("." + elem + " .xing i").tap(function() {
        var index = $(this).index() + 1;
        var cla = '';
        switch (index) {
            case 1:
                cla = 'one';
                break;
            case 2:
                cla = 'two';
                break;
            case 3:
                cla = 'three';
                break;
            case 4:
                cla = 'four';
                break;
            case 5:
                cla = 'five';
                break;
        }
        $(this).parents('.xing').removeClass().addClass(cla + " xing");
        return false;
    });
}
// 上面为公用的评分
score('baby-article-section');


// -----------------下面为日期选择组件--------------------------

function apdData(elem, insArry) {
    /*elem为外层id
    insArry为已预定日期*/
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var elem = $("#" + elem);
    // 存储当前日期
    var nowYear = y;
    var nowMonth = m;
    var nowDate = d;
    var Oul = elem.find(".apd-md ul");
    var left=elem.find(".left");
    var right=elem.find(".right");
    //今天日期
    elem.find('.apd-top .center').html(y + '年' + m + '月');
    // 清空显示日历的div
    function clearDiv() {
        Oul.html('');
    }
    left.tap(function(){
        nowMonth--;
        if(nowMonth===0){
            nowMonth=12;
            nowYear--;
        }
        clearDiv();
        showDate();
        elem.find('.apd-top .center').html(nowYear + '年' + nowMonth + '月');
    })

    right.tap(function(){
        nowMonth++;
        if(nowMonth===13){
            nowMonth=1;
            nowYear++;
        }
        clearDiv();
        showDate();
        elem.find('.apd-top .center').html(nowYear + '年' + nowMonth + '月');
    })
    
    // 初始化日历
    function showDate() {       
        var li = new Array();
        //总天数
        var sumDay = 0;
        //计算年
        for (var i = 1900; i < nowYear; i++) {
            //判断闰年和平年
            if ((i % 4 == 0 && i % 100 !== 0) || (i % 400 == 0)) {
                sumDay += 366;
            } else {
                sumDay += 365;
            }
        }

        // 计算月
        for (var i = 1; i < nowMonth; i++) {
            if (i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12) {
                sumDay += 31;
            } else if (i == 2) {
                if ((nowYear % 4 == 0 && nowYear % 100 !== 0) || (nowYear % 400 == 0)) {
                    sumDay += 29;
                } else {
                    sumDay += 28;
                }
            } else {
                sumDay += 30;
            }
        }
        //算出某年某月的1号是星期几
        sumDay += 1;
        var weekDay = sumDay % 7;
        var html = '';
        for (var i = 0; i < weekDay; i++) {
            html = '<li></li>';
            Oul.append(html);
        }

        //判断现在的月份有多少天
        var monthDay = 0;
        if (nowMonth == 2) {
            if ((nowYear % 4 == 0 && nowYear % 100 != 0) || nowYear % 400 === 0) {
                monthDay = 29;
            } else {
                monthDay = 28;
            }
        }
        //小月30天
        else if (nowMonth == 4 || nowMonth == 6 || nowMonth == 9 || nowMonth == 11) {
            monthDay = 30;
        } else {
            monthDay = 31;
        }

        // 输出所有农历
        for (var i = 1; i <= monthDay; i++) {
            if (sumDay % 7 == 6) {
                html = '<li id="li' + i + '" dataTime='+nowYear+","+nowMonth+","+i+'>' + i + '</li>';
                Oul.append(html);
            } else {
                html = '<li id="li' + i + '" dataTime='+nowYear+","+nowMonth+","+i+'>' + i + '</li>';
                Oul.append(html);
               
            }
            sumDay++;
        }
        // 后台传入的对应格式加禁用class
        if(typeof insArry === 'object'){    
        Oul.find('li').each(function(index, el) {
            var self=$(this);
            var co=$(this).attr('dataTime');
            $.each(insArry,function(index, el) {
                if(co==insArry[index]){
                   self.addClass('disable');
                }
            });
        });
        }

        //让当前天背景高亮
        for (var i = 1; i <=monthDay; i++) {
            if (nowYear == y && nowMonth == m && $("#li" + i).html() == d) {
                $("#li" + i).addClass('now');
            }
            else if(nowYear<=y){
                if(nowYear==y&&nowMonth<=m){
                    if(nowMonth==m&&nowDate<=d){
                      if(i<d){
                        $("#li" + i).addClass('disable');
                      }
                    }
                    else if(nowMonth<m){
                        $("#li" + i).addClass('disable');
                         console.log(i)
                    }
                }
                else if(nowYear<y){
                    $("#li" + i).addClass('disable');
                }              
            }

        }
    }
    showDate();
    var status=false;
    var s1,s2;
    Oul.find('li').not('.disable').tap(function(){
        if(status){         
           s2=$(this).index();
           var min=s2>s1?s1:s2;
           var max=s2>s1?s2:s1;
           for(var i=min;i<=max;i++){
            Oul.find('li').eq(i).addClass('active');
           }
            status=false;
            s1=0;
            s2=0;
        }
        else{
          if(!(s1>1||s2>1)){
            $(this).addClass('active').siblings('li').removeClass('active');
          }
          s1=Oul.find('.active').index();
          status=true;
        }        
    })
}
// 下面是调用
$("#sub").tap(function(){
    var outArry=[];
    $("#dataTime li").each(function(index, el) {
        var self=$(this);
        var co=$(this).attr('class');
        if(co&&co.indexOf('active')>-1){
            outArry.push(self.attr('dataTime'));        
        }  
    });
})
//下面是调用日历，第一个参数为id名第二个为已经被挑选的日期传入，没有的话''即可
apdData("dataTime",['2016,6,30','2016,6,29']);







// document.addEventListener("DOMContentLoaded", function(event) {
//     document.documentElement.style.fontSize = window.innerWidth/40 + "px";
//   });