import express from "express";
import helmet from "helmet";
const app = express()
app.use(helmet())
const PORT = process.env.PORT || 3000

app.get("/", (_, res) => {
    res.send("Hi there")
})
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

