<?php 

  $page = $_GET['l'] == "/" ? "/index" : $_GET['l'];

  //direct page (/index.php or page_name/page_name.php)
  if(file_exists($_SERVER['DOCUMENT_ROOT'] ."/page".$page.".php")){
    require_once($_SERVER['DOCUMENT_ROOT']."/page".$page.".php");
  }else{
    echo "<h1>404</h1>";//adjust apache header in prodcution, set code to 404 instead of 200
    die();
  }

?>