import express from "express";
import helmet from "helmet";

import { loginRouter, registerRouter } from "./controllers/auth";
import { createEventRouter } from "./controllers/event";

const app = express();
app.use(express.json())
app.use(helmet());
const PORT = process.env.PORT || 3000;

app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use("/", createEventRouter)

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
