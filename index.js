import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import './database';

import bot from './routes/bot';

const app = express();

app
  .use('/bot', bot)
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/seoul', routes)

const server = app.listen(process.env.PORT || 3000, function () {
  const port = server.address().port;
  console.log('[PORT]', port);
});
