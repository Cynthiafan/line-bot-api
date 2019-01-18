import mongoose, { mongo } from 'mongoose';
import Type from './type';

const Schema = mongoose.Schema;
const SpotSchema = new Schema({
  name: {
    zhTW: String,
    ko: String
  },
  location: {
    lat: Number,
    lng: Number,
    placeId: String,
    area: String,
  },
  keywords: [String],
  description: String,
  business: {
    start: String,
    end: String,
    dayoff: {
      type: [String],
      enum: {
        values: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日', ''],
        message: '請以「星期一」的模式輸入'
      },
      trim: true
    }
  },
  traffic: [String],
  imageUrl: String,
  memo: String,
  type: [{ type: Number, ref: 'Type' }]
}, { collection: 'spot' });

const Spot = mongoose.model('Spot', SpotSchema);

export default Spot;
