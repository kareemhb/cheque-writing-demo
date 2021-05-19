
// a simple (extendable) client side input value validation function 
function input_erros(val,k,check_val,input){  
  let result = false;

    if((k == "min_len" || k == "req") && val.length == 0){
      result = "This field is required!";
    }else
    if(k == "recapt" && val.length == 0){
      result = "Please complete the recaptcha";
    }else
    if(input.attr("type") == "checkbox" && k == "req" && !input.is(':checked')){
      result = "You must agree to proceed";
    }else
    if(k == "min_len" && val.length < check_val){
      result = "Too short!";
    }else
    if(k == "max_len" && val.length > check_val){
      result = "Too long!";
    }else  
    if(k == "regex" && !(new RegExp(check_val).test(val))){
      result = "Invalid value!";
    }else
    if(k == "number" && !isNumber(val) ){
      result = "Not a valid number";
    }else
    if(k == "max" && !(isNumber(val) && val < parseInt(check_val) )){
      result = "Must be smaller than "+add_commaS(check_val);
    }else
    if(k == "+0" && !(isNumber(val) && val > 0) ){
      result = "Must be above zero";
    }else
    if(k == "format" && check_val == "postcode" && (val.length !== 4 || !isNumber(val) )){
      result = "Not a valid postcode";
    }else
    if(k == "format" && check_val == "email" && !val.match("^([\\w-.]{1,}[@](([a-z0-9]){1,}([-]+[a-z0-9]+){0,}\\.){1,}([a-z0-9]){1,}([-]+[a-z0-9]+){0,})$")){
      result = "Not a valid email address";
    }

  return result;

}


//Call input value validation for all checks required and handle the outcome on the UI
function form_input_error(input){
    let papa = input.closest(".q");
    let val = input.val();
    let checks = input.attr("data-check").split(",");
    let input_errors = false;

   //run checks defined in the input attribute "data-check"
    $.each(checks,function(k,v){
      let check_arr = v.trim().split(":");
      let check = check_arr[0];
      let check_val = false;
      if(check_arr.length > 1){
         check_val = check_arr[1];
      }
      let result = input_erros(val,check,check_val,input);
      if(result){
        papa.find(".ferror").remove();
        papa.append("<span class='ferror'><span class='msg'>"+result+"</span></span>");
        //one false check fails the input from passing even if it passes other checks
        input_errors = true;
        //stop other checks
        return false;
      }
    });
  
    //no errors found
    if(!input_errors){
      papa.find(".ferror").remove();
    }
  
  return input_errors;
}

//Submit client-side validation passed form
function submit_form_submit(form){
  form.attr({"data-vpass":"1"}).submit();
}
