import express from "express";
import { router } from "./router";

const app = express()

app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`)
})