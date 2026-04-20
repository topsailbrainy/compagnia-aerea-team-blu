import express from "express";
import { router as homeRouter } from "./routes/home.route";
import { router as userRouter } from "./routes/user.route";
import { router as voliRouter } from "./routes/voli.route";


const app = express();

app.use(express.json()); //middleware
app.use(homeRouter);
app.use(userRouter);
app.use(voliRouter);  

export default  app ; 