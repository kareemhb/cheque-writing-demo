

$(document).on('keydown', 'body', function(e) { 
  let keyCode = e.keyCode || e.which; 
  if (keyCode == 9 || keyCode == "Tab") { 
    $("body").addClass("kb-tab");
  } 
});

$(document).on('mousedown', 'body', function() { 
  $("body").removeClass("kb-tab");
});