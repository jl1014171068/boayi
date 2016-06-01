$(".order-head").on('click', function(e) {
      var $menu = $('.order-head');
      $menu.find('ul').toggle();
       $(document).one("click", function(){
         $menu.find('ul').hide();
       });
        e.stopPropagation();
});

function menu(element){
  $(element +' li').click(function(e){
  var $menu = $(element +' li');
  if($(this).find('ol').is(":hidden")){
    $(this).find('ol').show();$(this).siblings('li').find('ol').hide();
  }
  else{
     $(this).find('ol').hide();
  }
  $(document).not(element).one("click", function(){
    $(element).find('ol').hide();
  });
  e.stopPropagation();
  })
}
menu(".appoinList-nav ul");
menu(".baby-partList-nav ul");
// 个人中心订单页面的全部订单切换

 $(function(){
     var  length=$('.appoin-head ul li').length,now=0;
     var $li=$('.appoin-head ul li');
     $li.width($(window).width());
     var wid=$li.width();
     $('.appoin-head ul').width(wid*length);
     for(var i=0;i<length;i++){
      var html='<li></li>';
      $('.appoin-head ol').append(html);
     }
     var olwidth=($('.appoin-head ol').width())/2;
      $('.appoin-head ol').css('marginLeft',-olwidth);
       $('.appoin-head ol li').eq(now).addClass('active').siblings('li').removeClass('active');
     function silder(){
      $('.appoin-head ul').css("-webkit-transform", "translate3d(" + -wid*(now) + "px,0,0)");
      $('.appoin-head ol li').eq(now).addClass('active').siblings('li').removeClass('active');
     }
     $('.appoin-head ul li').swipeLeft(function(e){
        now++;
        if(now>length-1)now=0;
        silder();   
     })
     $('.appoin-head ul li').swipeRight(function(e){
        now--;
        if(now<0)now=length-1;
        silder(); 
     })
     var time=setInterval(function(){
        now++;
        if(now>length-1)now=0;
        silder();        
     },3000);
     $('.appoin-head ul li').on('touchstart',function(){
       clearInterval(time);
     })
     $('.appoin-head ul li').on('touchend',function(){
        time=setInterval(function(){
        now++;
        if(now>length-1)now=0;
        silder();        
     },3000);
     })
  }());
  // 上面是banner图切换，touch的js部分有改动，修复安卓qq浏览器中的失效
  $(".checkbox .ad-checkbox").tap(function(e){
     $(this).addClass('active').siblings('.ad-checkbox').removeClass('active');
     $(this).find('input[type="checkbox"]').prop('checked');
     $(this).siblings('.ad-checkbox').find('input[type="checkbox"]').removeAttr('checked');
  })
  // 上面为公用的check单选