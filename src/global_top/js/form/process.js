
  //Validate all inputs values on form submission
  $(document).on('submit','#cheque_form:not([data-vpass])',function(e){
    e.preventDefault();
    e.stopPropagation();

    let form = $(this);
    
    //if input validation checks are needed
    if(form.find("[data-check]").length){
      let inputs = $(this).find("[data-check]");
      let form_erros = false;

      //validate each input value
      inputs.each(function(){
        if(form_input_error($(this))){
          //One invalid input value stops the form submittion even if other input values are vaid
          form_erros = true;
        }
      });

      //handle validation result
      if(form_erros){
        $(this).removeAttr("data-vpass");
      }else{
        submit_form_submit($(this));
      }

    }else{
      //no input validation needed
      submit_form_submit($(this));
    }
    
  });


  //input change - validate input value
  $(document).on("change","#cheque_form:not([data-vpass]) input",function(){
    form_input_error($(this));
  });

