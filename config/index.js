require('dotenv').config();

export const linebotConfig = {
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

export const mongoDbConfig = {
  url: `mongodb://${process.env.DB_ADDRESS}`,
  config: {
    useNewUrlParser: true,
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  } 
};