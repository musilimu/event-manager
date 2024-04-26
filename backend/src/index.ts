import express from "express";
import helmet from "helmet";

import { loginRouter, registerRouter } from "./controllers/auth";

const app = express();
app.use(express.json())
app.use(helmet());
const PORT = process.env.PORT || 3000;

app.use('/login', loginRouter)
app.use('/register', registerRouter)

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
