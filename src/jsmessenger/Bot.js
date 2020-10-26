var rp = require('request-promise')
var facebook_service = require('./config/config.js')

class Bot {
  constructor(token) {
    this.pageToken = token;
  }
  getUserProfile(userId) {
    const url = `https://graph.facebook.com/v8.0/${userId}?fields=first_name,last_name&access_token=${this.pageToken}`;
      return rp(url)
        .then(res => JSON.parse(res))
        .catch(err => console.log(`Error getting user profile: ${err}`));
  }
  sendTextMessage(recipientId, messageText, quickReplies=[], messageType = 'RESPONSE') {
    if(quickReplies.length > 0){
      var messageData = {
        messaging_type: messageType,
        recipient: {
          id: recipientId
        },
        message: {
          text: messageText,
          quick_replies: quickReplies
        }
      };
    }
    else{
      var messageData = {
        messaging_type: messageType,
        recipient: {
          id: recipientId
        },
        message: {
          text: messageText
        }
      };
    }
    return this.callSendAPI(messageData);
  }

  sendGenericTemplate(recipientId, elements, ratio = 'horizontal', messageType = 'RESPONSE'){
    var messageData = {
      messaging_type: messageType,
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type:"template",
          payload: {
            template_type:"generic",
            image_aspect_ratio: ratio,
            elements: elements
          }
        }
      }
    };
    return this.callSendAPI(messageData);
  }

  sendListTemplate(recipientId, elements, buttons, top_element_style = 'LARGE', messageType = 'RESPONSE'){
    var messageData = {
      messaging_type: messageType,
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type:"template",
          payload: {
            template_type:"list",
            top_element_style,
            elements,
            buttons
          }
        }
      }
    };
    return this.callSendAPI(messageData);
  }

  sendButtonTemplate(recipientId, text, buttons, messageType = 'RESPONSE'){
    var messageData = {
      messaging_type: messageType,
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type:"template",
          payload:{
            template_type:"button",
            text,
            buttons
          }
        }
      }
    };
    return this.callSendAPI(messageData);
  }

  sendOpenGraphTemplate(recipientId, elements, messageType = 'RESPONSE'){
    var messageData = {
      messaging_type: messageType,
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type:"template",
          payload:{
            template_type:"open_graph",
            elements
          }
        }
      }
    };
    return this.callSendAPI(messageData);
  }

  sendMediaTemplate(recipientId, elements, messageType = 'RESPONSE'){
    var messageData = {
      messaging_type: messageType,
      recipient: {
        id: recipientId
      },
      message:{
        attachment: {
          type: "template",
          payload: {
             template_type: "media",
             elements
          }
        }
      }
    };
    return this.callSendAPI(messageData);
  }

  sendAttachment(recipientId, type, url, quickReplies=[], messageType = 'RESPONSE'){
    if(quickReplies.length > 0){
      var messageData = {
        messaging_type: messageType,
        recipient: {
          id: recipientId
        },
        message:{
          attachment: {
            type,
            payload:{
              url,
              is_reusable:false
            }
          },
          quick_replies: quickReplies
        }
      };
    } else {
      var messageData = {
        messaging_type: messageType,
        recipient: {
          id: recipientId
        },
        message:{
          attachment: {
            type,
            payload:{
              url,
              is_reusable:false
            }
          }
        }
      };
    }
    return this.callSendAPI(messageData);
  }

  sendReceiptTemplate(recipientId, data, messageType = 'RESPONSE'){
    var messageData = {
      messaging_type: messageType,
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type:"template",
          payload: {
            template_type:"receipt",
            recipient_name: data.recipient_name,
            order_number: data.order_number,
            currency: data.currency,
            payment_method: data.payment_method,
            order_url: data.order_url,
            timestamp: data.timestamp,
            address: data.address,
            summary: data.summary,
            adjustments: data.adjustments,
            elements: data.elements
          }
        }
      }
    };
    return this.callSendAPI(messageData);
  }

  senderAction(recipientId, sender_action){
    var messageData = {
      recipient: {
        id: recipientId
      },
      sender_action
    };
    return this.callSendAPI(messageData);
  }

  callSendAPI(messageData) {
    var options = {
      method: 'POST',
      uri: facebook_service.url,
      qs: { access_token: this.pageToken },
      json: messageData
    };
    return rp(options)
    .then(res => res)
  }
}

module.exports = Bot;