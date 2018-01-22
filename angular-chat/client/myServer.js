(function (req) {
	
  var _= req('lodash');
  var express = req('express');
  var bodyParser = req('body-parser');
  var app = express();
  var PORT = 8000;

  const dirname= __dirname + '\\app';
  console.log('dirname', dirname);
  app.use(express.static(dirname));
  app.use(bodyParser.json());

  app.get('/', function (request, response) {
    response.sendFile('index.html');
  });
  
  app.listen(PORT);
  console.log('Server listening on port ' + PORT);
  
})(require);