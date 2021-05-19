
  

  
 
<form action="/outcome" method="POST" id="cheque_form" class="cheque__book__body__form">			

    <fieldset>
      <legend class="cheque__book__body__form__header h-m">
         Cheque details
      </legend>

      <div class="cheque__book__body__form__q q">
        <label for="q1"><span>Full name</span> <abbr title="required">*</abbr></label> 
        <div class="cheque__book__body__form__q__input-wrapper">
          <input type="text" name="fullname" value="" placeholder="Fredy Liévano" data-check="req,max_len:100" id="q1" />
          <span class="m m-s m--e-user"></span> 
        </div>
      </div>

      <div class="cheque__book__body__form__q q">
        <label for="q2"><span>Amount</span> <abbr title="required">*</abbr></label> 
        <div class="cheque__book__body__form__q__input-wrapper">
          <input type="text" name="amount" value="" placeholder="00.00" data-check="req,number,+0,max:999999999999999" id="q2" />
          <span class="m m-s m--e-dollar"></span>  
        </div>
      </div>

    </fieldset>

  <div>
      <input type="submit" name="form_submit" value="Submit" class="cheque__book__body__form__submitBtn btn btn--blue">
  </div>
</form>
