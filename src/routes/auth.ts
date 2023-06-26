import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {

  app.addHook('preHandler', async (request)=> {
    await request.jwtVerify()
  })

  app.post('/register', async (request) => {
    const bodySchema = z.object({
      nome: z.string(),
      funcao: z.string(),
      usuario: z.string(),
      senha: z.string()
    })

    const { nome, funcao, usuario, senha } = bodySchema.parse(request.body)

    let user = await prisma.user.findUnique({
      where: {
        usuario: usuario
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          nome: nome,
          funcao: funcao,
          status: "Ativo",
          usuario: usuario,
          senha: senha
        }
      })
    }


    const token = app.jwt.sign({
      nome: user.nome,
      funcao: user.funcao,
      status: user.status
    }, {
      sub: user.usuario,
      expiresIn: "30 days"

    })

    return {
      token,
    }

  })
}