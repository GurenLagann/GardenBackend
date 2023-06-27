import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { stockRoutes } from "./routes/estoque";
import { userRoutes } from "./routes/usuarios";
import { authRoutes } from "./routes/auth";
import { salesRoutes } from "./routes/vendas";

const app = fastify()

app.register(cors, { origin: true, })

app.register(jwt, { secret: 'spacetime' })

app.register(authRoutes)
app.register(userRoutes)
app.register(stockRoutes)
app.register(salesRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})