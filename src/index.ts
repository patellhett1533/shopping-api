import express, { Express } from "express";
import connectDB from "./config/db";
import logger from "./config/logger";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import routes from "./routes";
import passport from "passport";
import jwtStrategy from "./config/passport";
import path from "path";

require("dotenv").config();

// mongodb connection
connectDB();

const app: Express = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// enable cors
app.use(cors());
app.options("*", cors());

//cross origin resource sharing
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

//to access local files of images
app.use("/images", express.static("/app/uploads"));

const PORT = process.env.NODE_DOCKER_PORT || 5000;

app.use("/v1", routes);

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
});
