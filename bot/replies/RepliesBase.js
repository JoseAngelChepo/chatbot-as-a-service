const RepliesBase = {}

RepliesBase.nlp = {
  get: {number:0, type_input:['text'], filters_available: [], errors: {
    1:"No logré entenderte lo siento"
  }}
}
RepliesBase.nlp.run = (message) => {
  if(message == 'saludo'){
    return ['go', 1]
  } else if(message == 'menu'){
    return ['go', 2]
  } else if(message == 'gracias'){
    return ['go', 3]
  } else if(message == 'información'){
    return ['go', 4]
  } else if(message == 'ubicacion'){
    return ['go', 6]
  } else if(message == 'telefono'){
    return ['go', 5]
  } else {
    return ['next']
  }
}

RepliesBase.postback = {
  get: {number:0, type_input:['postback'], filters_available: [], errors: {
    1:"Opción errónea"
  }}
}
RepliesBase.postback.run = (message) => {
  if(message == 'INIT_BOT'){
    return ['go', 1]
  } else if(message == 'RESTART_BOT'){
    return ['go', 1]
  } else if(message == 'MENU'){
    return ['go', 2]
  } else if(message == 'LOCATION'){
    return ['go', 6]
  } else if(message == 'PHONE'){
    return ['go', 5]
  } else {
    return ['no_found']
  }
}

module.exports = RepliesBase;