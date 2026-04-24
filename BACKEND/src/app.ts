import express from "express";
import cookieParser from "cookie-parser";
import { router as homeRouter } from "./routes/home.route";
import { router as userRouter } from "./routes/user.route";
import { router as voliRouter } from "./routes/voli.route";
import { router as authrouter } from "./routes/auth.route";
import { router as pagamentoRouter } from "./routes/pagamento.route";
import { router as recapRouter } from "./routes/recap.route";
import { router as loginRouter } from "./routes/login.route";
import { router as amministrazioneRouter } from "./routes/amministrazione.route";



const app = express();

app.use(express.json()); //middleware
app.use(cookieParser());
app.use(homeRouter); //pagina inizale ricerca voli parenza e arrivo
app.use(voliRouter); //pagina di risultato ricerca voli
app.use(pagamentoRouter) //pagina di pagamento con dati utenti e carte
app.use(recapRouter); //pagina recap finale post acquisto
app.use(amministrazioneRouter)//pagina amministrativa
app.use(loginRouter)
app.use(userRouter); //gestione user e admin
app.use(authrouter)

export default  app ; 