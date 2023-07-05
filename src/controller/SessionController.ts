import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

export const signIn = async (req: Request, res: Response) => {
  try {
    const { usuario, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        usuario
      },
      include: {
        user_access: {
          select: { Access: { select: { name: true } } }
        }
      }
    })

    if (!user) {
      return res.json(400).json({ message: "Usuário não encontrado" })
    }

    const isPassword = await compare(password, user.password)

    if (!isPassword) {
      return res.status(400).json({ message: "Senha incorreta" })
    }

    const MySecretKey = process.env.MY_SECRET_KEY

    if (!MySecretKey) {
      throw new Error("Chave secreta não exite");
    }

    const token = sign({
      id: String(user.id),
      name: String(user.name),
      status: String(user.status),
      role: String(user.user_access.map(role => role.Access?.name))
    }, MySecretKey, {
      algorithm: "HS256",
      expiresIn: "30days"
    })

    return res.status(200).json({ token })

  } catch (error) {
    return res.status(400).json(error)
  }

}