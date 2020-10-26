const express = require('express');
const bodyParser = require('body-parser')
const facebook_service = require('./src/jsmessenger/config/config.js')
const BotTemplate = require('./bot/BotTemplate.js')

var app = express();
var newPort = process.env.PORT || 8081

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.json({ message: "Chatbot Template" });
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === facebook_service.validationToken) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.post('/webhook', function (req, res) {
  var data = req.body;
  try {
    console.log(data)
    if (data.object == 'page') {
      data.entry.forEach(function(pageEntry) {
        pageEntry.messaging.forEach(function(messagingEvent) {
          BotTemplate.listen(messagingEvent)
        });
      });
      res.sendStatus(200);
    }
  }
  catch(err) {
    res.sendStatus(500);
  }
});

var server = app.listen(newPort, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Web server started at http://%s:%s', host, port);
});