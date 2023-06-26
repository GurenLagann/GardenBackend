import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { estoqueRoutes } from "./routes/estoque";
import { usuarioRoutes } from "./routes/usuarios";
import { authRoutes } from "./routes/auth";

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(estoqueRoutes)
app.register(usuarioRoutes)
app.register(authRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})