import linebot from 'linebot';
import { linebotConfig } from '../config';
import { Spot } from '../database/schema';
import { handleReplyMsg, handleTextMsg } from '../utils/linebot-handle';
import * as formatMsg from '../utils/formatMessage';
import { day1, day2, day3, day4, day5 } from '../static/json/schedule';
import { outbound, inbound } from '../static/json/airplane';
import { taxi, hotel, ski } from '../static/json/booking';
import translate from '@vitalets/google-translate-api';

const bot = linebot(linebotConfig);

bot.on('postback', async (event) => {
  let text = event.postback.data;
  let replyMsg;

  const mapping = {
    "去程": outbound,
    "回程": inbound,
    "計程車": taxi,
    "住宿": hotel,
    "滑雪": ski,
  }

  if (mapping[text]) {
    replyMsg = mapping[text];
  } else {
    const ret = await Spot.find({ keywords: text });
    replyMsg = await handleReplyMsg(ret);
  }

  event.reply(replyMsg)
    .then(() => {
      console.log('[MSG]', replyMsg);
    })
    .catch(error => {
      console.log('[ERROR]' + error);
    });

})

bot.on('message', async (event) => {
  let replyMsg, msg, ret;

  if (event.message.type === 'text') {
    msg = event.message.text;

    if (msg.includes('翻譯') && msg.substr(0, 3) === '翻譯 ') {

      const googleTranslate = async (msg) => await translate(msg, { from: 'zh-TW', to: 'ko' });

      let originalMsg = msg.slice(3);
      let translation = await googleTranslate(originalMsg);

      replyMsg = await handleTextMsg(translation.text);

    } else {

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

        case '行程':
          replyMsg = {
            "type": "flex",
            "altText": "2/26 ~ 3/2 的行程",
            "contents": {
              "type": "carousel",
              "contents": []
            }
          }
          replyMsg.contents.contents.push(day1.contents, day2.contents, day3.contents, day4.contents, day5.contents);
          break;

        case '翻譯功能':
          replyMsg = handleTextMsg('只要在句首打「翻譯 」（要有空格），就會自動翻譯你輸入的句子囉！這是來自 Google 的翻譯，所以只能提供非常基本的用法～');
          break;

        default:
          ret = await Spot.find({ keywords: msg });
          replyMsg = await handleReplyMsg(ret);
      }
    }
  } else if (event.message.type === 'location') {
    const { latitude: lat, longitude: lng } = event.message;
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
