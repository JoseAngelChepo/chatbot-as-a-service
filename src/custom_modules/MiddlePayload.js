const MiddlePayload = {}

MiddlePayload.filter = (payload) => {
  if(payload.message){
    if(payload.message.text){
      if(payload.message.quick_reply){
        return ['quick_reply',payload.message.quick_reply.payload]
      }
      else{
        if(payload.message.nlp){
          if(payload.message.nlp.entities.intent){
            return ['text',payload.message.text, payload.message.nlp.entities.intent[0].value]
          } else if(payload.message.nlp.entities){
            return ['text',payload.message.text, payload.message.nlp.entities]
          } else {
            return ['text',payload.message.text]
          }
        } else{
          return ['text',payload.message.text]
        }
      }
    }
    else if(payload.message.attachments){
      if(payload.message.attachments[0].type == 'location'){
        return ['location',payload.message.attachments[0].payload]
      }
      else if(payload.message.attachments[0].type == 'image'){
        return ['image',payload.message.attachments[0].payload.url]
      }
      else if(payload.message.attachments[0].type == 'audio'){
        return ['audio',payload.message.attachments[0].payload.url]
      }
      else if(payload.message.attachments[0].type == 'video'){
        return ['video',payload.message.attachments[0].payload.url]
      }
      else {
        return ['not exist',null]
      }
    }
    else {
      return ['not exist',null]
    }
  }
  else if(payload.postback){
    return ['postback',payload.postback.payload]
  }
  else {
    return ['not exist',null]
  }
}

module.exports = MiddlePayload;