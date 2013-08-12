(function($) {
  $.fn.slider = function(o) {
    o = $.extend({
      interval: null,
      speed: 2000,
      auto: 10000,
      btnPrev: ".left-arrow",
      btnNext: ".left-arrow",
      switchers: "#switcher .sw", 
      relSlider: "#txsl .tx", 
      activeClassName: "selected"
    }, o || {});
    
    var set = this;
    
    if (set.length > 1) {

      countSlides = set.length;
      $(set).each(function(i) {
        if (i == 0)
          $(this).addClass(o.activeClassName).show();
        else
          $(this).hide();
      });

      // auto rotation
      if(o.auto) {
        o.interval = setInterval(function() {
          go("auto");
        }, o.auto);
      }
      
      //  click on prev button
      if(o.btnPrev) {
        $(o.btnPrev).click(function() {
            if (o.auto)
                clearInterval(o.interval);
            return go("prev");
        });  
      }

      //  click on next button
      if(o.btnNext) {
        $(o.btnNext).click(function() {
            if (o.auto)
                clearInterval(o.interval);
            return go("next");
        });  
      }

      // click by switchers
      if (o.switchers) {
        $(o.switchers).each(function(i){
          $(this).click(function(){
            if (o.auto)
                clearInterval(o.interval);
            return go(i);  
          });
        });  
      }     

    }

    function go(action) {
      var current = null;
      var next = null;
      var prev = null;

      $(set).each(function(i) {
        
        if ($(this).hasClass(o.activeClassName)) {
          current = this;
          next = (set[i+1]) ? set[i+1] : set[0];
          prev = (set[i-1]) ? set[i-1] : set[0];

          if (i==(countSlides-1)) 
            next = set[0];
           
          if (i==0)
            prev=set[countSlides-1];
        }

      });

      $(current).removeClass(o.activeClassName).fadeOut(o.speed);

      switch (action) {
        case "auto":
        case "next": 
          ind = $(next).addClass(o.activeClassName).fadeIn(o.speed).index();
        break;

        case "prev":
          ind = $(prev).addClass(o.activeClassName).fadeIn(o.speed).index();
        break;

        default:
          ind = $(set[parseInt(action)]).addClass(o.activeClassName).fadeIn(o.speed).index();
        break;

      }

      // change the state of the switchers
      if (o.switchers)
        changeSwitchersState(ind);

      // relative slider
      if (o.relSlider)
        relSlider(ind);
    } 

    
    function changeSwitchersState(i) {
      $(o.switchers).removeClass(o.activeClassName);
      $(o.switchers+"."+i+"").addClass(o.activeClassName);
    }

    function relSlider(i) {
      $(o.relSlider).fadeOut(o.speed);
      $(o.relSlider+"."+i+"").fadeIn(o.speed);
    }

    return this; 
  };



})(jQuery);