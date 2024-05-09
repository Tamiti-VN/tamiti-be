import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { urlencoded, json } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { api } from "./routes/index.js";

import compression from "compression";

export const app = express();

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', process.env.REACT_URL);
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(cors({ origin: process.env.REACT_URL, credentials: true }));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(json());

import "./databases/DBConnect.js";

app.use("/api", api);
