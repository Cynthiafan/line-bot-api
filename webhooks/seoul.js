import linebot from 'linebot';
import { linebotConfig } from '../config';
import { Spot } from '../database/schema';
import { handleReplyMsg } from '../utils/linebot-handle';
import * as formatMsg from '../utils/formatMessage';

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

  console.log('=============================');
  console.log(JSON.stringify(event, undefined, 2));
  console.log('=============================');

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
                '$push': { id: '$_id', name: '$name.zhTW', area: '$location.area' }
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
          { '$project': { _id: 0, result: 1, type: '$type.type', title: '$type.text' } },
          { '$sort': { type: 1 } }
        ]);
        replyMsg = await handleReplyMsg(ret);
        break;
      case '地鐵圖':

        replyMsg = await formatMsg.subwayImage();

        break;
      default:
        ret = await Spot.find({ keywords: msg });
        replyMsg = await handleReplyMsg(ret);
    }



  } else if (event.message.type === 'location') {
    const { latitude: lat, longitude: lng } = event.message;
    console.log(lat, lng);

    replyMsg = formatMsg.text('想搜尋附近的店家嗎？此功能還在開發中哦～');

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
