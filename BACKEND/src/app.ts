import express from "express";
import { router as homeRouter } from "./routes/home.route";
import { router as userRouter } from "./routes/user.route";
import { router as voliRouter } from "./routes/voli.route";
import { authMW } from "./middleware/authorization.MW";
import { router as authrouter } from "./routes/auth.route";


const app = express();

app.use(express.json()); //middleware
app.use(homeRouter);
app.use(userRouter);
app.use(voliRouter);  
app.use(authMW, authrouter)

export default  app ; 