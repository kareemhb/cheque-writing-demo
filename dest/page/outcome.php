<!doctype html> <html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="ie=edge"><meta name="msapplication-TileColor" content="#ffffff"><meta name="msapplication-TileImage" content="https://www.lgaq.asn.au/site/images/favicons/ms-icon-144x144.png"><meta name="theme-color" content="#ffffff"><meta property="og:url" content="%%"><meta property="og:title" content="%%"><meta property="og:description" content="%%"><meta property="og:image" content="%%"><link rel="apple-touch-icon" sizes="57x57" href="https://www.lgaq.asn.au/site/images/favicons/apple-icon-57x57.png"><link rel="apple-touch-icon" sizes="60x60" href="https://www.lgaq.asn.au/site/images/favicons/apple-icon-60x60.png"><link rel="apple-touch-icon" sizes="72x72" href="https://www.lgaq.asn.au/site/images/favicons/apple-icon-72x72.png"><link rel="apple-touch-icon" sizes="76x76" href="https://www.lgaq.asn.au/site/images/favicons/apple-icon-76x76.png"><link rel="apple-touch-icon" sizes="114x114" href="https://www.lgaq.asn.au/site/images/favicons/apple-icon-114x114.png"><link rel="apple-touch-icon" sizes="120x120" href="https://www.lgaq.asn.au/site/images/favicons/apple-icon-120x120.png"><link rel="apple-touch-icon" sizes="144x144" href="https://www.lgaq.asn.au/site/images/favicons/apple-icon-144x144.png"><link rel="apple-touch-icon" sizes="152x152" href="https://www.lgaq.asn.au/site/images/favicons/apple-icon-152x152.png"><link rel="apple-touch-icon" sizes="180x180" href="https://www.lgaq.asn.au/site/images/favicons/apple-icon-180x180.png"><link rel="icon" type="image/png" sizes="192x192" href="https://www.lgaq.asn.au/site/images/favicons/android-icon-192x192.png"><link rel="icon" type="image/png" sizes="32x32" href="https://www.lgaq.asn.au/site/images/favicons/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="https://www.lgaq.asn.au/site/images/favicons/favicon-96x96.png"><link rel="icon" type="image/png" sizes="16x16" href="https://www.lgaq.asn.au/site/images/favicons/favicon-16x16.png"><link rel="manifest" href="https://www.lgaq.asn.au/site/images/favicons/manifest.json"><link rel="shortcut icon" href="https://www.lgaq.asn.au/site/images/favicons/favicon.ico"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i"><link type="text/css" rel="stylesheet" href="/_global/css/style.css"><script src="/_global/js/jquery-3.4.1.min.js"></script><script src="/_global/js/jquery-ui.min.js"></script><script src="/_global/js/script.js"></script><title><?php 
      $clean_name = preg_replace("/\//","",$_GET['l']);
      $page_title = $clean_name == "" ? "Home" : $clean_name;
      echo ucwords($page_title); 
      ?> - LGAQ Cheque Writing App</title></head><body><header class="lgaq-header"><div class="lgaq-header__container"><a class="lgaq-header__logo" href="/"><img src="/image/lgaq-logo.png" title="LGAQ – CONNECT . INNOVATE . ACHIEVE" alt="LGAQ – CONNECT . INNOVATE . ACHIEVE"> </a><button aria-haspopup="true" aria-expanded="false" class="lgaq-header__hmb-menu" type="button" title="Main navigation"><div class="lgaq-header__hmb-menu__wrapper"><div class="lgaq-header__hmb-menu__wrapper__icon"></div></div></button><nav class="lgaq-header__topnav"><ul><li><a class="arrow_link arrow_link--tab-fixed" href="/">Cheque</a></li><li><a class="arrow_link arrow_link--tab-fixed" href="/documentation">Documentation</a></li></ul></nav></div></header><main><section class="cheque"><div class="cheque__container"><div class="cheque__intro"><h1 class="h-xxl">Cheque writing</h1><div class="cheque__intro__hero h-l">A cheque writing demo app</div></div><div class="cheque__book"><div class="cheque__book__head"></div><div class="cheque__book__body"> <?php

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

  ?> <div class="cheque__book__body__left"><h2 class="h-xs">Cheque No. <?php echo rand(1000000000,9999999999);//random 10 digit number ?> </h2><div class="field"><h3 class="field__header">PAY</h3><span class="field__pay"><?php echo $_POST['fullname']; ?></span></div><div class="field"><h3 class="field__header">THE SUM OF</h3><span class="field__sum"><?php echo amount2text($_POST['amount']); ?></span></div></div><div class="cheque__book__body__right"><div class="field"><h3 class="field__header">Date</h3><span><?php echo date('jS \of F Y'); ?></span></div><div class="cheque__book__body__right__figure"><span>$</span><span class="number"><?php echo number_format($_POST['amount'], 2, '.', ','); ?></span></div></div> <?php
}else{
  
  //print error if server-side validation fails
?> <div><h2 class="h-xs">Error!</h2><div>Something went wrong.</div></div> <?php
}
?> </div></div></div></section></main><footer>© <?php echo date("Y"); ?> LGAQ</footer></body></html>