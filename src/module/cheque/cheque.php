<section class="cheque">

  <div class="cheque__container">
    <div class="cheque__intro">
      <h1 class="h-xxl">
        Cheque writing
      </h1>
      <div class="cheque__intro__hero h-l">
        A cheque writing demo app
      </div>
    </div>
    
    
    <div class="cheque__book">
      <div class="cheque__book__head"></div>
      <div class="cheque__book__body">
      <!-- inject requested body in template 
           @@gulp-include is prefered over php-include to improve peformance - body doesn't need to be included on script execution -->
        @@if (context.body == 'form') {
          @@include('./module/cheque/_form.php')
        }
        @@if (context.body == 'outcome') {
          @@include('./module/cheque/_outcome.php')
        }
        
      </div>
    </div>
    
  </div>

</section>