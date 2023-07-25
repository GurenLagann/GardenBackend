import express from "express";
import { router } from "./router";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(router)

app.use(cors({
  origin: true,
  credentials: true
}))



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`)
})