import axios from 'axios';
import config from '../config/env.js';

import sendToWhatsApp from "../services/httpRequest/sendToWhatsApp.js";





class WhatsAppService {

  async sendMessage(to, body, messageId) {

    const data = {
      messaging_product: 'whatsapp',
      to,
      text: { body },
    };

    await sendToWhatsApp(data);

    // try {
    //   await axios({
    //     method: 'POST',
    //     url: `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`,
    //     headers: {
    //       Authorization: `Bearer ${config.API_TOKEN}`,
    //     },
    //     data: {
    //       messaging_product: 'whatsapp',
    //       to,
    //       text: { body },
    //       // context: {
    //       //   message_id: messageId,
    //       // },
    //     },
    //   });
    // } catch (error) {
    //   console.error('Error sending message:', error);
    // }
  }

  async markAsRead(messageId,to) {

    // const data = {
    //   messaging_product: 'whatsapp',
    //   status: 'read',
    //   message_Id: messageId,
    // };

    // await sendToWhatsApp(data);


    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId,
        },
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  async sendInteractiveButtons(to, BodyText, buttons) {
    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          to,
          type: 'interactive',
          interactive: {
            type: 'button',
            body: { text: BodyText },
            action: {
              buttons: buttons
            }
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async sendMediaMessage(to, type, mediaUrl, caption) {
    try {
      const mediaObject = {};

      switch (type) {
        case 'image':
          mediaObject.image = { link: mediaUrl, caption: caption }
          break;
        case 'audio':
          mediaObject.audio = { link: mediaUrl }
          break;
        case 'video':
          mediaObject.video = { link: mediaUrl, caption: caption }
          break;
        case 'document':
          mediaObject.document = { link: mediaUrl, caption: caption, filename: 'unired.pdf' }
          break;
        default:
          throw new Error('Not Soported Media Type');
      }

      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          to,
          type: type,
          ...mediaObject
        },
      });
    } catch (error) {
      console.error('Error sending Media', error);
    }
  }

  async sendContactMessage(to, contact) {
    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          to,
          type: 'contacts',
          contacts: [contact]
        },
      });
    } catch (error) {
      console.errror(error)
    }
  }


  async sendLocationMessage(to, latitude, longitude, name, address) {
    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${config.API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          to,
          type: 'location',
          location: {
            latitude: latitude,
            longitude: longitude,
            name: name,
            address: address
          }
        },
      });
    } catch (error) {
      console.error(error)
    }
  }


}

export default new WhatsAppService();