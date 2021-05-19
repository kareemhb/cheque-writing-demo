//Set Dependencies
  let express = require('express');
  let sphp = require('sphp');
  let modRewrite = require('connect-modrewrite');
  let basicAuth = require('basic-auth-connect');

// Create app
  let app = express();
  const PORT =  3040;
  let server = app.listen(PORT, function () {
    console.log('Express server is up on port ' + PORT);
  });

//Use app
  app.use(basicAuth('fredy', 'lgaq'));
    app
   .use(modRewrite([
      '^([A-Za-z0-9\-\/]+)$ /index.php?l=$1 [L,QSA]'
    ]))
              
  .use(sphp.express('dest'));

  app.use(express.static('dest'));


