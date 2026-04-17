import express from "express";
import { router as homeRouter } from "./routes/home.route";
import { router as userRouter } from "./routes/user.route";
import { router as searchRouter } from "./controller/search.controller";


const app = express();

app.use(express.json()); //middleware
app.use(homeRouter);
app.use(userRouter);
app.use(searchRouter);  

export default  app ; 