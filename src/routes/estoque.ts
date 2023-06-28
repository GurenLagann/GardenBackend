import { FastifyInstance } from "fastify";
import { z } from "zod"
import { prisma } from "../lib/prisma";

export async function stockRoutes(app: FastifyInstance) {

  app.addHook('preHandler', async (request)=> {
    await request.jwtVerify()
  })

  app.get('/product', async () => {
    const items = await prisma.produto.findMany()
    return items
  })

  app.get('/product/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const item = await prisma.produto.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return item
  })

  app.post('/product', async (request) => {
    const bodySchema = z.object({      
      nome: z.string(),
      quantidade: z.number(),
      valor_unidade: z.number(),
      foto: z.string()
    })

    const { nome, quantidade, valor_unidade, foto } = bodySchema.parse(request.body)

    const item = await prisma.produto.create({
      data: {
        nome,
        quantidade,
        valor_unidade,
        foto
      }
    })

    return item
  })

  app.put('/product/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({      
      nome: z.string(),
      quantidade: z.number(),
      valor_unidade: z.number(),
      foto: z.string()
    })

    const { nome, quantidade, valor_unidade, foto } = bodySchema.parse(request.body)

    const item = await prisma.produto.update({
      where: {
        id,
      },
      data: {
        nome,
        quantidade,
        valor_unidade,
        foto
      }
    })
    return item
  })

  app.delete('/product/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.produto.delete({
      where: {
        id,
      },
    })
  })


}