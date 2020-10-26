var initBot = require('./src/jsmessenger/InitBot.js')
var facebook_service = require('./src/jsmessenger/config/config.js')
var initbot = new initBot(facebook_service.pageAccessToken)

var postback_start_button = 'INIT_BOT'
var greeting = 'Hola, bienvenido a business'
var persistent_menu = [
  {
    title:'Menu principal',
    type:'postback',
    payload:'RESTART_BOT'
  },
  {
    title:'Ayuda',
    type:'nested',
    call_to_actions:[
      {
        title:'Opcion1',
        type:'postback',
        payload:'PAYBILL_PAYLOAD'
      },
      {
        type:'web_url',
        title:'Latest News',
        url:'https://www.messenger.com/',
        webview_height_ratio:'full'
      }
    ]
  }
]

initbot.setStartButton(postback_start_button).then( res => {
  console.log(res)
  initbot.setGreeting(greeting).then( res => {
    console.log(res)
    initbot.setMenuPersistent(persistent_menu).then( res => {
      console.log(res)
      console.log("Configurado !")
    }).catch(err => { console.log("Error menú persistente")})
  }).catch(err => { console.log("Error saludo bienvenida")})
}).catch(err => { console.log("Error botón empezar")})