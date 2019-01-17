import linebot from 'linebot';
import { linebotConfig } from './config';
import { Spot } from './database/schema';
import { handleReplyMsg } from './utils/linebot-handle';
import * as formatMsg from './utils/formatMessage';
import { currencySVC } from './utils/service';

const bot = linebot(linebotConfig);


bot.on('postback', async (event) => {
  let replyText = event.postback.data;

  let replyMsg = formatMsg.text(replyText);

  event.reply(replyMsg)
    .then(() => {
      console.log('[MSG]', replyText);
    })
    .catch(error => {
      console.log('[ERROR]' + error);
    });

})

bot.on('message', async (event) => {
  let replyMsg, msg, ret;

  if (event.message.type === 'text') {

    msg = event.message.text;

    switch (msg) {
      case '目錄':

        ret = await Spot.aggregate([
          {
            '$group': {
              _id: '$type',
              type: { $first: '$type' },
              result: {
                '$push': { id: '$_id', name: '$name.zhTW', }
              }
            },
          },
          {
            '$lookup': {
              from: 'type',
              localField: 'type',
              foreignField: 'type',
              as: 'type'
            }
          },
          { '$unwind': '$type' },
          { '$project': { _id: 0, result: 1, type: '$type.type', title: '$type.text' } }
        ]);

        break;
      default:
        ret = await Spot.find({ keywords: msg });
    }

    replyMsg = await handleReplyMsg(ret);

  } else {
    replyMsg = formatMsg.text('目前沒有支援此種訊息類型哦～');
  }

  event.reply(replyMsg)
    .then(() => {
      console.log('[MSG]', msg);
    })
    .catch(error => {
      console.log('[ERROR]' + error);
    });
});

const linebotParser = bot.parser();

export default linebotParser;
