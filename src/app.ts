import express, { Application, NextFunction, Request, Response } from "express";
import { indexRoute } from "./app/routes/routes";
import { auth } from "./app/lib/auth";
import { toNodeHandler } from "better-auth/node";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.all("/api/auth", toNodeHandler(auth));
app.use("/api/v1", indexRoute);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
