import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TypeSchema = new Schema({
  type: Number,
  enabled: Boolean
}, { collection: 'type' });

const Type = mongoose.model('Type', TypeSchema);

export default Type;
