export const text = (text) => {
  return {
    type: 'text',
    text
  }
}

export const template = {
  buttons: (place) => {
    return {
      type: 'template',
      altText: `想去${place.name}嗎？`,
      template: {
        type: 'buttons',
        title: place.name,
        text: place.description || '沒有內容',
        actions: [
          {
            type: 'postback',
            label: '📚 資訊',
            data: handleDetailText(place)
          },
          {
            type: 'uri',
            label: '📍 地圖',
            uri: `https://www.google.com.tw/maps/@${place.location.lat},${place.location.lng},17z`
          }
        ]
      }
    }
  },
  carousel: (places) => {
    let columns = places.map(place => {
      return {
        title: place.name,
        text: place.description,
        actions: [
          {
            type: 'postback',
            label: '📚 資訊',
            data: handleDetailText(place)
          },
          {
            type: 'uri',
            label: '📍 地圖',
            uri: `https://www.google.com.tw/maps/@${place.location.lat},${place.location.lng},17z`
          }
        ]
      }

    })
    return {
      type: 'template',
      altText: '我有一份好新鮮的名單 🤫',
      template: {
        type: 'carousel',
        columns
      }
    }
  }
}

export const singleSpot = (place) => {

  return {
    type: 'flex',
    altText: `想去${place.name.zhTW}嗎？`,
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'text',
            text: `${place.name.zhTW} ${place.name.ko}`,
            size: 'sm',
            weight: 'bold',
            color: '#AAAAAA'
          }
        ]
      },
      hero: {
        type: 'image',
        url: place.imageUrl,
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
        backgroundColor: '#FFFFFF',
        action: {
          type: 'uri',
          label: 'Action',
          uri: 'https://linecorp.com/'
        }
      },
      body: {
        type: 'box',
        layout: 'vertical',
        spacing: 'md',
        contents: [
          {
            type: 'text',
            text: place.description,
            wrap: true,
            size: 'sm'
          },
          {
            type: 'box',
            layout: 'vertical',
            flex: 2,
            spacing: 'md',
            margin: 'lg',
            contents: [
              {
                type: 'separator'
              },
              {
                type: 'box',
                layout: 'baseline',
                contents: [
                  {
                    type: 'text',
                    text: '營業時間',
                    size: 'xs',
                    color: '#AAAAAA'
                  },
                  {
                    type: 'text',
                    text: `${place.business.start} - ${place.business.end}，${place.business.dayoff.length ? place.business.dayoff.join('、') : '無'}公休`,
                    flex: 3,
                    size: 'xs',
                    align: 'start',
                    gravity: 'center',
                    wrap: true
                  }
                ]
              },
              {
                type: 'box',
                layout: 'baseline',
                contents: [
                  {
                    type: 'text',
                    text: '交通資訊',
                    flex: 1,
                    size: 'xs',
                    color: '#AAAAAA'
                  },
                  {
                    type: 'text',
                    text: `${place.traffic.length ? place.traffic.join('／') : '暫無資訊'}`,
                    flex: 3,
                    size: 'xs',
                    align: 'start',
                    gravity: 'center',
                    wrap: true
                  }
                ]
              },
              {
                type: 'separator'
              },
              {
                type: 'text',
                text: place.memo,
                flex: 2,
                size: 'xs',
                gravity: 'center',
                wrap: true
              }
            ]
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: '出發！',
              uri: `https://www.google.com/maps/search/?api=1&query=${place.location.lat},${place.location.lng}&query_place_id=${place.location.placeId}`
            },
            color: '#AC433E',
            height: 'sm',
            style: 'primary'
          }
        ]
      }
    }
  }
}

export const contentCarousel = async (list) => {
  let card = [];
  let cardContent = [];

  for (let type of list) {

    let temp = type.result;

    for (let spot of temp) {

      cardContent.push({
        "type": "box",
        "layout": "baseline",
        "contents": [
          {
            "type": "text",
            "text": spot.name,
            "flex": 0,
            "margin": "sm",
            "weight": "bold"
          },
          {
            "type": "text",
            "text": "新村",
            "size": "sm",
            "align": "end",
            "color": "#AAAAAA"
          }
        ]
      })
    }

    card.push({
      "type": "bubble",
      "direction": "ltr",
      "header": {
        "type": "box",
        "layout": "vertical",
        "flex": 0,
        "contents": [
          {
            "type": "text",
            "text": type.title,
            "size": "xl",
            "weight": "bold"
          }
        ]
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "md",
        "action": {
          "type": "uri",
          "label": "Action",
          "uri": "https://linecorp.com"
        },
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              ...cardContent,
              {
                "type": "spacer"
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "spacer"
          },
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "建議新增",
              "data": "action=advise"
            },
            "style": "primary"
          }
        ]
      },
      "styles": {
        "body": {
          "backgroundColor": "#F4F4F4"
        }
      }
    })

    cardContent = [];
  }


  return {
    "type": "flex",
    "altText": "目錄",
    "contents": {
      "type": "carousel",
      "contents": card
    }
  }
}


const handleDetailText = (place) => {
  const { start, end, dayoff } = place.business;
  let dayoffStr = dayoff.join('、');
  return `營業時間：${start} - ${end}\n公休日：${dayoffStr || '無'}`
}
