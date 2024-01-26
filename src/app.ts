import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import router from "./app/routes/routes";

// ** Create an app with express :
const app: Application = express();

// ** Application Label Middlewares Here:
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// ** Our Testing Route or Main is Here:
app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    message: "Yah!!! Our Server is Running Now ",
  });
});

// ** Our All Route Are here:
app.use("/api/v1", router);

// ** Global Error Handler:
app.use(globalErrorHandler);

// ** Call the not Found Route:
app.use(notFound);

export default app;
