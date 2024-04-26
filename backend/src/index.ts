import express from "express";
import helmet from "helmet";

import { router } from "./controllers/auth/register";

const app = express();
app.use(helmet());
const PORT = process.env.PORT || 3000;

app.use("/auth", router);

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
