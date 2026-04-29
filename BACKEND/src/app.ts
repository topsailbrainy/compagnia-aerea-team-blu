import express, { Router } from "express";
import { router as homeRouter } from "./routes/home.route";
import { router as userRouter } from "./routes/user.route";
import { router as voliRouter } from "./routes/voli.route";
import { authMW } from "./middleware/authorization.MW";
import { router as authrouter } from "./routes/auth.route";
import { router as adminRouter } from "./routes/amministrazione.route";


const app = express();

const apiRouter = Router();

apiRouter.use(homeRouter);
apiRouter.use(userRouter);
apiRouter.use(voliRouter); 
apiRouter.use(authMW, authrouter);
apiRouter.use("/amministrazione", adminRouter);

app.use(express.json()); //middleware
app.use("/api", apiRouter);

export default app ; 