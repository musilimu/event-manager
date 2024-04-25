import express from "express";
const app = express()

const PORT = process.env.PORT || 3000

app.get("/", (_, res) => {
    res.send("Hi there")
})
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

