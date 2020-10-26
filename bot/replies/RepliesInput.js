const RepliesLeer = {}

RepliesLeer.set = (useId, pageId) => {
  this.useId = useId
  this.pageId = pageId
}

RepliesLeer.first_message = {
  get: {number:0, type_input:['text'], filters_available: [], errors: {
    1:"Sigo aprendiendo, no logre entenderte"
  }}
}
RepliesLeer.first_message.run = (message) => {
  return ['error',1]
}

module.exports = RepliesLeer;
