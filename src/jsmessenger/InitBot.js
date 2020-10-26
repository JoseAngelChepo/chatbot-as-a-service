var rp = require('request-promise')
var facebook_service = require('./config/config.js')

class InitBot {
  constructor(TOKEN) {
    this.page_token = TOKEN;
  }

  setStartButton(postback) {
    var configMessage = {
      get_started: {
        payload: postback
      }
    }
    return this.callSendAPI(configMessage);
  }

  setGreeting(greeting, greetingUs = 'Hi :)') {
    var configMessage = {
      greeting: [
        {
          locale:"default",
          text: greeting 
        }, {
          locale:"en_US",
          text:greetingUs
        }
      ]
    }
    return this.callSendAPI(configMessage);
  }

  setMenuPersistent(call_to_actions){
    var configMessage = {
      persistent_menu:[
        {
          locale:"default",
          composer_input_disabled: false,
          call_to_actions
        }
      ]
    }
    return this.callSendAPI(configMessage);
  }

  callSendAPI(messageData) { 
    var options = {
      method: 'POST',
      uri: facebook_service.graph,
      qs: { access_token: this.page_token },
      json: messageData
    };
    return rp(options)
    .then(res => res )
  }
}

module.exports = InitBot;