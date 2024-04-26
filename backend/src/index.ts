import express from "express";
import helmet from "helmet";
import cors from 'cors'

import { loginRouter, registerRouter } from "./controllers/auth";
import { eventRouter } from "./controllers/event";

const app = express();
app.use(express.json())
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT }))

const PORT = process.env.PORT || 3000;

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use("/", eventRouter)

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
