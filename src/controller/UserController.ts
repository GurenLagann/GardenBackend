import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, usuario, password, accessName } = req.body;

    let userVerify = await prisma.user.findUnique({
      where: {
        usuario: usuario
      }
    })

    const hashPass = await hash(password, 8)


    if (!userVerify) {
      const user = await prisma.user.create({
        data: {
          name,
          usuario,
          password: hashPass,
          user_access: {
            create: { Access: { connect: { name: accessName } } }
          }

        },
        select: {
          id: true,
          name: true,
          usuario: true,
          user_access: {
            select: { Access: { select: { name: true, } } }
          }

        }
      })
      return res.json(user);
    }
    else {
      return res.status(400).json({ message: "Esse usuário ja foi cadastrado" })
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        usuario: true,
        user_access: {
          select: { Access: { select: { name: true } } }
        },
        status: true
      }
    })

    return res.json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}