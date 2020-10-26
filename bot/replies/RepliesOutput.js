const RepliesOutput = {}

RepliesOutput.set = (bot, userId, pageId, chatbotServices) => {
  this.bot = bot
  this.userId = userId
  this.pageId = pageId
  this.chatbotServices = chatbotServices
}

RepliesOutput.error = (error) => {
  console.log("Error: %s", error)
  if(typeof error == 'object'){
    return this.bot.sendTextMessage(this.userId, error[0]).then(res => {
      return ['go', error[1]]
    })
  }
  else{
    return this.bot.sendTextMessage(this.userId, error).then(res => {
      return ['finish']
    })
  }
}

RepliesOutput.welcome = () => {
  return this.bot.getUserProfile(this.userId).then(data => {
    return this.bot.sendTextMessage(this.userId, "Hola " + data.first_name + "!").then(res => ['go', 2])
  })
}

RepliesOutput.menu = () => {
  let elements = [
    {
      title:"Menú",
      image_url:"http://res.cloudinary.com/helpo/image/upload/v1519670613/toktok_menu_01_ilqulw.jpg",
      subtitle:"✔ Revisa nuestro menú",
      buttons:[{ type: "postback", title: "ver", payload: "MENU" }]
    },
    {
      title:"Información",
      image_url:"http://res.cloudinary.com/helpo/image/upload/v1519670613/toktok_contacto_01_xumc1k.jpg",
      subtitle:"Estamos a tus ordenes",
      buttons:[{ type: "postback", title: "ver", payload: "LOCATION" }]
    }
  ]
  return this.bot.sendGenericTemplate(this.userId, elements).then(res => ['save', 0])
}

RepliesOutput.thanks = () => {
  return this.bot.getUserProfile(this.userId).then(data => {
    return this.bot.sendTextMessage(this.userId, "No hay de qué "+data.first_name+" visitanos pronto. 😉").then(res => ['save',0])
  })
}

RepliesOutput.information = () => {
  return this.bot.getUserProfile(this.userId).then(data => {
    return this.bot.sendTextMessage(this.userId, "Hola "+data.first_name+" somos example business\n\n⬇⬇⬇\n").then(res => {
      return this.bot.sendAttachment(this.userId, "image", "https://res.cloudinary.com/fivie/image/upload/v1591663246/sample.jpg").then(res => {
        let buttons = [
          { type: "web_url", url: "https://www.google.com.mx/maps/place/@19.4270206,-99.1681465,19z", title: "Ubicación" },
          { type: "web_url", url: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=19.4270206,-99.1681465&heading=-45&pitch=38&fov=80", title: "Navegación" },
          { type: "phone_number", title:"Llamar", payload: "+525500000000" }
        ]
        return this.bot.sendButtonTemplate(this.userId,"¡No dudes en visitarnos! 🍽.\nO comunicate con nosotros ☎ :D", buttons).then( res => ['save', 0])
      })
    })
  })
}


RepliesOutput.call = () => {
  return this.bot.getUserProfile(this.userId).then(data => {
    let buttons = [
      {type:"phone_number",title:"📞 Llamar",payload: "+525500000000"}
    ]
    return this.bot.sendButtonTemplate(this.userId,"Ponte en contacto con nosotros ☎", buttons).then( res => ['save', 0])
  })
}

RepliesOutput.location = () => {
  return this.bot.getUserProfile(this.userId).then(data => {
    return this.bot.sendTextMessage(this.userId, "Puedes encontrarnos en la siguiente dirección " + data.first_name + "\n¡No dudes en visitarnos!")
      .then(res => {
        let element =[{
          title: 'Name business',
          image_url:  'https://res.cloudinary.com/fivie/image/upload/v1591663246/sample.jpg',
          subtitle: '¡Visitanos!',
          buttons:[
            { type: "web_url", url: "https://www.google.com.mx/maps/place/@19.4270206,-99.1681465,19z", title: "Ubicación" },
            { type: "postback", title: "Ver menú", payload: "INIT_BOT" }
          ]
        }]
        return this.bot.sendGenericTemplate(this.userId, element).then(res => ['save', 0])
      })
  })
}

RepliesOutput.finish = () => {
  return this.bot.sendTextMessage(this.userId, "Gracias, acá estamos si te podemos ayudar en algo más").then(res => {
    return ['save', 0]
  })
}

module.exports = RepliesOutput;