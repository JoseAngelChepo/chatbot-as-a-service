const MiddlePayload = require('../src/custom_modules/MiddlePayload.js')
const ChatbotServices = require('../src/api/server')

const StatesMachine = require('./StatesMachine')
const Bot = require('../src/jsmessenger/Bot')

const BotTemplate = {}

const loadState = (id) => {
  return ChatbotServices.getState(id).then(state => state)
}

const loadPageAccess = (pageId) => {
  return ChatbotServices.getPageAccessToken(pageId).then(state => state)
}

BotTemplate.listen = async (message) => {
  // GET User ID
  const userId = message.sender.id
  // GET Page ID
  const pageId = message.recipient.id
  // GET Chatbot user state saved in DB
  const state = await loadState(userId)
  // GET Access token page saved in DB
  const accessPage = await loadPageAccess(pageId)
  // Create instance bot with access token and page id
  const bot = new Bot(accessPage, pageId)
  const stateMachine = new StatesMachine(bot, userId, pageId, ChatbotServices)
  // Bot actions input userID, this bot instance includes access token and page id yet
  bot.senderAction(userId, "mark_seen").then(res => {
    bot.senderAction(userId, "typing_on").then(res => {
       // State machine derive the next state in chatbot
      stateMachine.set(pageId, state)
      stateMachine.go(state, MiddlePayload.filter(message))
    })
  })
}

module.exports = BotTemplate;
