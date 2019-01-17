import * as formatMsg from './formatMessage';

export const handleReplyMsg = (places) => {

  let replyMsg = {};

  if (!places.length) {

    replyMsg = formatMsg.text('沒有符合的結果...😭');

  } else if (places.length > 1) {

    replyMsg = formatMsg.contentCarousel(places);

  } else {
    const place = places[0];
    replyMsg = formatMsg.singleSpot(place);
  }

  return replyMsg;
}

export const handleTextMsg = (text) => {
  return {
    type: 'text',
    text
  }
}
