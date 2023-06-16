import fastify from "fastify";
import cors from "@fastify/cors";
import { estoqueRoutes } from "./routes/estoque";
import { usuarioRoutes } from "./routes/usuarios";

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(estoqueRoutes)
app.register(usuarioRoutes)

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})