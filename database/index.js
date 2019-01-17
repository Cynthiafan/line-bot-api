import { mongoDbConfig } from '../config';
import mongoose from 'mongoose';
import schema from './schema';

const { url, config } = mongoDbConfig;

mongoose.connect(url, config);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db
  .on('open', () => {
    console.log('MongoDB Connection Successed');
  })
  .on('error', () => {
    console.log('MongoDB Connection Error');
  });

export default db;