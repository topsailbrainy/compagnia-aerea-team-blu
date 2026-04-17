import { configDotenv } from "dotenv";
import app from "./app";
import { listen } from "node:quic";

const port = 3000;

app.listen( port, () => {
    console.log(`Server running on port ${port}`);
})