import middlewareConfig, { loggerFileName } from "@@config/middlewareConfig";
import routes from "@@routes/index";
import cors from "cors";
import express, { Express } from "express";
import fs from "fs";
import path from "path";
import helmet from "helmet";
import logger from "morgan";
import mysql from "mysql2/promise";
import "reflect-metadata";

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
});

// createConnection({
//   name: "dev",
//   type: "mysql",
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// })
//   .then(() => {
//     console.log("Database Connected :)");
//   })
//   .catch((error: any) => {
//     console.log(error);
//   });

function checkAndCreateDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function checkAndCreateFile(filePath: string) {
  const dirPath = path.dirname(filePath);
  checkAndCreateDirectory(dirPath);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }
}
const filePath = path.join(__dirname, "log", loggerFileName);
checkAndCreateFile(filePath);

app.use(helmet());
app.use(cors(middlewareConfig.cors));
app.use(express.json());
app.use(
  logger(middlewareConfig.logger.common.index, {
    stream: fs.createWriteStream(
      filePath,
      middlewareConfig.logger.common.flags
    ),
  })
);
app.use(logger(middlewareConfig.logger.dev.index));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
