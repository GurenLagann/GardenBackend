import { FastifyInstance } from "fastify";
import { z } from "zod"
import { prisma } from "../lib/prisma";

export async function salesRoutes(app: FastifyInstance) {

  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/sales', async () => {
    const items = await prisma.venda.findMany()
    return items
  })

  app.get('/sales/:id', async (request) => {
    const salesSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = salesSchema.parse(request.params)

    const item = await prisma.venda.findFirstOrThrow({
      where: {
        id,
      }
    })
    return item
  })

  // app.post('/sales', async (request) => {
  //   const salesSchema = z.object({
  //     quantidade: z.string(),
  //     valor_total: z.number()
  //   })

  //   const { quantidade, valor_total } = salesSchema.parse(request.body)
  //   const item = await prisma.venda.create({
  //     data: {
  //       valor_total
  //     }
  //   })
  //   return item
  // })
}

