var RepliesBase = require('./replies/RepliesBase')
var RepliesInput = require('./replies/RepliesInput')
var RepliesOutput = require('./replies/RepliesOutput')

class StatesMachine {
  constructor(bot, userId, pageId, chatbotServices) {
    this.bot = bot
    this.useId = userId
    this.pageId = pageId
    this.chatbotServices = chatbotServices
    this.RepliesBase = RepliesBase
    this.RepliesInput = RepliesInput
    this.RepliesOutput = RepliesOutput
    this.states = {
      error: this.RepliesOutput.error,
      postback: this.RepliesBase.postback,
      nlp: this.RepliesBase.nlp,
      0: this.RepliesInput.first_message,
      1: this.RepliesOutput.welcome,
      2: this.RepliesOutput.menu,
      3: this.RepliesOutput.thanks,
      4: this.RepliesOutput.information,
      5: this.RepliesOutput.call,
      6: this.RepliesOutput.location,
      7: this.RepliesOutput.finish,
    }
  }

  set(pageId, state){
    this.RepliesInput.set(this.useId, pageId)
    this.RepliesOutput.set(this.bot, this.useId, pageId, this.chatbotServices)
    this.state = this.states[state].get
  }

  go(state, message=null){
    if(message == null){
      this.states[state]().then(res => {
        this.change(res)
      })
    } else {
      if(message[0] == 'postback'){
        let response = this.states['postback'].run(message[1])
        if(response[1]){
          this.change(response)
        } else {
          this.read(state, message)
        }
      } else if(message[2] && message[0] == 'text'){
        let response_nlp_base = this.states['nlp'].run(message[2])
        if(response_nlp_base[0] == 'next'){
          this.read(state, message)
        } else {
          this.change(response_nlp_base)
        }
      } else{
        this.read(state, message)
      }
    }
  }


  read(num_state, message){
    console.log("READ: %s", this.state.number)
    if(this.state.type_input.includes(message[0])){
      if(this.state.filters_available.lenght > 0){
        message = SpecialFilters.filter(this.state.filters_available[0], message[1])
      }
      this.change(this.states[num_state].run(message))
    }
    else{
      this.error(1)
    }
  }

  change(response) {
    console.log("ID: %s => CAMBIO: %s -> %s ", this.useId, response[0], response[1])
    if(response[0] == 'go'){
      this.go(response[1])
    }
    else if(response[0] == 'save'){
      this.chatbotServices.updateState(this.useId, response[1])
    }
    else if(response[0] == 'error'){
      this.error(response[1])
    }
    else{
      return true
    }
  }

  error(num_error) {
    this.states['error'](this.state.errors[num_error]).then(res => {
      this.change(res)
    })
  }
}

module.exports = StatesMachine;
