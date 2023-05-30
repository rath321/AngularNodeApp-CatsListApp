import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';

import { connectToMongo } from './mongo';
import setRoutes from './routes';

const app = express();
var cors = require('cors')
app.use(cors()) // Use this after the variable declaration
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      res.setHeader("Access-Control-Allow-Origin", "*")
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
      res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT,PATCH, DELETE, OPTIONS");
      next();
  })
app.set('port', (process.env.PORT || 3001));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

setRoutes(app);

const main = async (): Promise<void> => {
  try {
    await connectToMongo();
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.listen(app.get('port'), () => console.log(`Angular Full Stack listening on port ${app.get('port')}`));
  } catch (err) {
    console.error(err);
  }
};

if (process.env.NODE_ENV !== 'test') {
  main();
}

export { app };
