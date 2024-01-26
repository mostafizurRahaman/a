

import mongoose from "mongoose";

// ** import app from app:
import app from "./app";
import configs from "./app/configs";
import { Server } from "http";

// ** Initialize Server:
let server: Server;

// ** configure and connect with database:
const main = async () => {
 
  try {
    await mongoose.connect(configs.db_url as string);
    console.log("Database connected Successfully!!!");
    server = app.listen(configs.port as string, () => {
      console.log("Server is running now!!!");
    });
  } catch (err) {
    console.log(err);
  }
};

// ** call the main function to connect database.
main();

// ** Call the event which handle  unHandledRejection :
process.on("unhandledRejection", () => {
  console.log(`Server is Detected UnHandled Rejection!!!`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// ** Call the event which handle unCaughtException:
process.on("uncaughtException", () => {
  console.log(`Server is Detected unCaughtException!!!`);
  process.exit(1);
});
