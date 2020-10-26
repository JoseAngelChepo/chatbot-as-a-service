var ApiService = require('../config')

const ChatbotServices = {}

ChatbotServices.getState = (facebookId) => {
  const URL = '/user/' + facebookId
  return ApiService.get(URL).then(res => parseInt(res.data.state)).catch(err => err)
}

ChatbotServices.updateState = (facebookId, state) => {
  const URL = '/user/' + facebookId
  return ApiService.patch(URL,{ state: state.toString() }).then(res => res.data).catch(err => err)
}

ChatbotServices.getPageAccessToken = (pageId) => {
  const URL = '/page/' + pageId
  return ApiService.get(URL).then(res => res.data.accessToken).catch(err => err)
}

module.exports = ChatbotServices;
