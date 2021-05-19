
  $(document).on("click",'.lgaq-header__hmb-menu', function() {
		$('.lgaq-header').toggleClass('lgaq-header--expand');

    //WCAG - adjust aria & tabindex
    let page_focusable_elements = $("main,footer").find("input, textarea, select, button, a, [tabindex]");
    if($('.lgaq-header').hasClass("lgaq-header--expand")){
      //disable tabing on elements out of menu
      page_focusable_elements.attr({tabindex:-1});
      $(".lgaq-header__hmb-menu").attr({"aria-expanded":"true"});
    }else{
      //enable tabing on elements out of menu
      page_focusable_elements.removeAttr("tabindex");
      $(".lgaq-header__hmb-menu").attr({"aria-expanded":"false"});
    }
    
	});

