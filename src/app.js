import express from "express"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.json({ status: "OK", message: "API funcionando correctamente" })
})

export default app