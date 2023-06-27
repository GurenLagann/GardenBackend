import { FastifyInstance } from "fastify";
import { z } from "zod"
import { prisma } from "../lib/prisma";

export async function userRoutes(app: FastifyInstance) {

  app.addHook('preHandler', async (request)=> {
    await request.jwtVerify()
  })

  app.get('/user', async () => {
    const users = await prisma.user.findMany()
    return users
  })

  app.get('/user/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return user
  })

  app.put('/user/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({      
      nome: z.string(),
      funcao: z.string(),
      status: z.string(),
      usuario: z.string(),
      senha: z.string()
    })

    const { nome, funcao, status, usuario, senha } = bodySchema.parse(request.body)

    const user = await prisma.user.create({
      data: {
        nome,
        funcao,
        status,
        usuario,
        senha
      }
    })

    return user
  })

  app.delete('/user/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.user.delete({
      where: {
        id,
      },
    })
  })  
}