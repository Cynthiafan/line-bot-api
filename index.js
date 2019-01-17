import express from 'express';
import linebot from './linebot';
import routes from './routes';
import bodyParser from 'body-parser';
import './database';

const app = express();

app
  .use(function (req, res, next) {
    // console.log(req.headers);
    next();
  })
  .post('/bot', linebot)
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use('/seoul', routes)


const server = app.listen(process.env.PORT || 3000, function () {
  const port = server.address().port;
  console.log('[PORT]', port);
});
