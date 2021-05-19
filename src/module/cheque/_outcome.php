<?php

//FUNCTIONS

//simple server side data validation
function ss_validate(){
  $passed = false;
  $values_exist = true;
  //all form keys exist in the post array
  //expected keys have values & match expected format (max length to avoid DDOS attacks) - recaptcha must be added in a production environment
  foreach(array('fullname','amount') as $k){
    if(!in_array($k,array_keys($_POST)) || is_null($_POST[$k]) || strlen($_POST[$k]) > 100){
      $values_exist = false;
    }
  }
  
  //amount is a valid number
  if($values_exist && is_numeric($_POST['amount']) && $_POST['amount'] > 0 && $_POST['amount'] < 999999999999999){
    $passed = true;
  }
  
  return $passed;
}

//Add "s" to units if needed
function pluralS($number){
  return $number > 1 ? "s" : "";
}
//Spellout dollar amount
function amount2text($amount){
  $amount_in_cents = round($amount,2)*100;
  $cents = $amount_in_cents % 100;         
  $dollars = round(($amount_in_cents - $cents) / 100,0);  
  
  $text_format = new NumberFormatter("en", NumberFormatter::SPELLOUT);
  $text = $text_format->format($dollars)." dollar".pluralS($dollars);
  //Include cents only if needed
  if($cents > 0){
    $text .= " and ".$text_format->format($cents)." cent".pluralS($cents);
  }
  
  //Return uppercase - Mimic cheques
  return strtoupper($text);
}
  
//Print cheque if submission passes server-side validation
if(ss_validate()){

  ?>
        <div class="cheque__book__body__left">
          <h2 class="h-xs">
            Cheque No. <?php echo rand(1000000000,9999999999);//random 10 digit number ?>
          </h2>
          <div class="field">
            <h3 class="field__header">PAY</h3>
            <span class="field__pay"><?php echo $_POST['fullname']; ?></span>
          </div>
          <div class="field">
            <h3 class="field__header">THE SUM OF</h3>
            <span class="field__sum"><?php echo amount2text($_POST['amount']); ?></span>
          </div>
        </div>
        <div class="cheque__book__body__right">
          <div class="field">
            <h3 class="field__header">Date</h3>
            <span><?php echo date('jS \of F Y'); ?></span>
          </div>
          <div class="cheque__book__body__right__figure">
            <span>$</span><span class="number"><?php echo number_format($_POST['amount'], 2, '.', ','); ?></span>
          </div>
        </div>
<?php
}else{
  
  //print error if server-side validation fails
?>
  <div>
     <h2 class="h-xs">
       Error!
    </h2>
    <div>
      Something went wrong.
    </div>
  </div>
  
<?php
}
?>

