// import fs from "fs";
import winston from "winston";

// const fsPromise = fs.promises;

// const logger = async (logData) => {
//   try {
//     logData = `\n  ${new Date().toISOString()} - Log data ${logData}`;

//     await fsPromise.appendFile("log.txt", logData);
//   } catch (error) {
//     console.log(error);
//   }
// };

// Using winston library for adding logging info

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-info" },
  transports: [
    new winston.transports.File({
      filename: "logs.txt",
    }),
  ],
});

const loggerMiddleware = (req, res, next) => {
  if (!req.url.includes("signin")) {
    logger.info(
      `${new Date()} reqUrl:${req.url} - reqBody:${JSON.stringify(req.body)}`
    );
  }

  next();
};

export default loggerMiddleware;
