import express from "express";
import { router } from "./router";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(router)

const options: cors.CorsOptions = {
  methods: "GET, OPTIONS, PUT, POST, DELETE",
  origin: "*",
  allowedHeaders: "origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Data, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Authorization"
}

app.use(cors(options))





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`)
})