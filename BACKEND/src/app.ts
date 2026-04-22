import express from "express";
import { router as homeRouter } from "./routes/home.route";
import { router as userRouter } from "./routes/user.route";
import { router as voliRouter } from "./routes/voli.route";
import { authMW } from "./middleware/authorization.MW";
import { router as authrouter } from "./routes/auth.route";
import { router as pagamentoRouter } from "./routes/pagamento.route";
import { router as recapRouter } from "./routes/recap.route";
import { router as loginRouter } from "./routes/login.route";



const app = express();

app.use(express.json()); //middleware
app.use(homeRouter); //pagina inizale ricerca voli parenza e arrivo
app.use(voliRouter); //pagina di risultato ricerca voli
app.use(authMW, pagamentoRouter) //pagina di pagamento con dati utenti e carte
app.use(recapRouter); //pagina recap finale post acquisto

app.use(authMW, loginRouter)
app.use(userRouter); //gestione user e admin
app.use(authMW, authrouter)

export default  app ; 