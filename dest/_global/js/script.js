//     (c) 2021 Kareem Bassiouni, Cheque writing demo app
//     For all details and documentation:
//     karimhb@gmail.com
"use strict";function input_erros(e,r,t,a){var s=!1;return"min_len"!=r&&"req"!=r||0!=e.length?"recapt"==r&&0==e.length?s="Please complete the recaptcha":"checkbox"!=a.attr("type")||"req"!=r||a.is(":checked")?"min_len"==r&&e.length<t?s="Too short!":"max_len"==r&&e.length>t?s="Too long!":"regex"!=r||new RegExp(t).test(e)?"number"!=r||isNumber(e)?"max"!=r||isNumber(e)&&e<parseInt(t)?"+0"!=r||isNumber(e)&&0<e?"format"!=r||"postcode"!=t||4===e.length&&isNumber(e)?"format"!=r||"email"!=t||e.match("^([\\w-.]{1,}[@](([a-z0-9]){1,}([-]+[a-z0-9]+){0,}\\.){1,}([a-z0-9]){1,}([-]+[a-z0-9]+){0,})$")||(s="Not a valid email address"):s="Not a valid postcode":s="Must be above zero":s="Must be smaller than "+add_commaS(t):s="Not a valid number":s="Invalid value!":s="You must agree to proceed":s="This field is required!",s}function form_input_error(o){var i=o.closest(".q"),m=o.val(),e=o.attr("data-check").split(","),l=!1;return $.each(e,function(e,r){var t=r.trim().split(":"),a=t[0],s=!1;1<t.length&&(s=t[1]);var n=input_erros(m,a,s,o);if(n)return i.find(".ferror").remove(),i.append("<span class='ferror'><span class='msg'>"+n+"</span></span>"),!(l=!0)}),l||i.find(".ferror").remove(),l}function submit_form_submit(e){e.attr({"data-vpass":"1"}).submit()}
"use strict";$(document).on("submit","#cheque_form:not([data-vpass])",function(t){if(t.preventDefault(),t.stopPropagation(),$(this).find("[data-check]").length){var i=$(this).find("[data-check]"),s=!1;i.each(function(){form_input_error($(this))&&(s=!0)}),s?$(this).removeAttr("data-vpass"):submit_form_submit($(this))}else submit_form_submit($(this))}),$(document).on("change","#cheque_form:not([data-vpass]) input",function(){form_input_error($(this))});
"use strict";function clean_commaS(e){return 0===e?0:e?Number(e.toString().replace(/,|^\$/g,"")):NaN}function add_commaS(e,r){var t=r||0;return clean_commaS(e).toFixed(t).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,")}function isNumber(e){return!isNaN(e)&&(!(isNaN(parseFloat(e))||!isFinite(e))||void 0)}
"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function has_attr(t,o){var n=t.attr(o);return"undefined"!==_typeof(n)&&!1!==n}
"use strict";$(document).on("keydown","body",function(o){var d=o.keyCode||o.which;9!=d&&"Tab"!=d||$("body").addClass("kb-tab")}),$(document).on("mousedown","body",function(){$("body").removeClass("kb-tab")});
"use strict";$(document).on("click",".lgaq-header__hmb-menu",function(){$(".lgaq-header").toggleClass("lgaq-header--expand");var e=$("main,footer").find("input, textarea, select, button, a, [tabindex]");$(".lgaq-header").hasClass("lgaq-header--expand")?(e.attr({tabindex:-1}),$(".lgaq-header__hmb-menu").attr({"aria-expanded":"true"})):(e.removeAttr("tabindex"),$(".lgaq-header__hmb-menu").attr({"aria-expanded":"false"}))});