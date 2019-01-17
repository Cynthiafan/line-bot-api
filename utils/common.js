export const parsePostback = (text) => {

  let objects = text.split('&');
  let ret = {};

  objects.map(obj => {
    let temp = obj.split('=');
    ret[temp[0]] = temp[1];
  })

  return ret;
}