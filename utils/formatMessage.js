// ======================
//        純文字訊息
// ======================
export const text = (text) => {
  return {
    type: 'text',
    text
  }
};
// ======================
//         地鐵圖
// ======================
export const subwayImage = () => {
  return {
    type: 'image',
    originalContentUrl: 'https://firebasestorage.googleapis.com/v0/b/line-bot-seoul.appspot.com/o/%E5%9C%B0%E9%90%B5%E5%9C%96.jpg?alt=media&token=bffb3d22-1c45-40ce-8512-1468cfa88db6',
    previewImageUrl: 'https://firebasestorage.googleapis.com/v0/b/line-bot-seoul.appspot.com/o/%E5%9C%B0%E9%90%B5%E5%9C%96.jpg?alt=media&token=bffb3d22-1c45-40ce-8512-1468cfa88db6'
  }
}


// ======================
//        單個景點
// ======================
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
};
// ======================
//          目錄
// ======================
export const contentCarousel = async (list) => {
  let card = [];
  let cardContent = [];

  for (let type of list) {

    let temp = type.result;

    for (let spot of temp) {

      cardContent.push({
        type: "box",
        layout: "baseline",
        contents: [
          {
            type: "text",
            text: spot.name,
            flex: 0,
            size: "sm",
            margin: "sm",
            weight: "bold"
          },
          {
            type: "text",
            text: spot.area,
            size: "sm",
            align: "end",
            color: "#AAAAAA"
          }
        ]
      })
    }

    card.push({
      type: "bubble",
      direction: "ltr",
      header: {
        type: "box",
        layout: "vertical",
        flex: 0,
        contents: [
          {
            type: "text",
            text: type.title,
            size: "lg",
            weight: "bold"
          }
        ]
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              ...cardContent,
              {
                type: "spacer"
              }
            ]
          }
        ]
      },
      // footer: {
      //   type: "box",
      //   layout: "vertical",
      //   contents: [
      //     {
      //       type: "spacer"
      //     },
      //     {
      //       type: "button",
      //       action: {
      //         type: "postback",
      //         label: "建議新增",
      //         data: "action=advise"
      //       },
      //       color: "#AC433E",
      //       height: "sm",
      //       style: "primary"
      //     }
      //   ]
      // },
      styles: {
        body: {
          backgroundColor: "#F4F4F4"
        }
      }
    })

    cardContent = [];
  }

  return {
    type: "flex",
    altText: "目錄",
    contents: {
      type: "carousel",
      contents: card
    }
  }
};
