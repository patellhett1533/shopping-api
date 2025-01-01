import express, { Express } from "express";
import connectDB from "./config/db";
import logger from "./config/logger";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import routes from "./routes";
import passport from "passport";
import jwtStrategy from "./config/passport";
import path from "path";

require("dotenv").config();

connectDB();

const app: Express = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use(cors());
app.options("*", cors());

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use("/images", express.static("uploads"));

const PORT = 5000;

app.use("/v1", routes);

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at http://localhost:${PORT}`);
});
