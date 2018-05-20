var express = require('express');
var app = express();
var fs = require("fs");
var http = require('http');
var watson_assistant_=require("./watson_assistant/send_massege.js");
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/api', function (req, res) {
   console.log(JSON.stringify(req.body));
  res.setHeader('Content-Type', 'application/json');


  var AssistantV1 = require('watson-developer-cloud/assistant/v1');

  var assistant = new AssistantV1({
    username: '980c1826-9da1-4e65-832f-2a7f8d3c59e0',
    password: '1vLI22mdA2OT',
    url: 'https://gateway.watsonplatform.net/assistant/api/',
    version: '2018-02-16'
  });
  input=req.body['input']
  return assistant.message(
    {
      input: { text: input },
      workspace_id: 'c72784bc-1422-4bf1-be2b-abedc13b381f'
    },
    function(err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log();
        console.log(response["output"]["text"]);

      }
      res.write(JSON.stringify({
        "dailog":response["output"]["text"],
        "prompt":response['context']['prompt']
      }));
      res.end();
    }
  );

})

app.get('/chat', function (req, res) {
  fs.readFile('./chat.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
  });


})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
