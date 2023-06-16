import fastify from "fastify";
import { estoqueRoutes } from "./routes/estoque";

const app = fastify()

app.register(estoqueRoutes)


app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})