import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { DBConnect } from './models/configs/DBConnect.js';
import { routes } from './routes/v1/index.js';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 3333;

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', process.env.REACT_URL);
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: process.env.REACT_URL, credentials: true }));

app.use('/api/v1', routes);

DBConnect()
  .then(() =>
    app.listen(port, async () => {
      console.log(`Example app listening on http://127.0.0.1:${port}`);
    })
  )
  .catch((err) => console.log(err));
