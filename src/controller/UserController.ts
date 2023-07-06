import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  const { name, usuario, password, accessName } = req.body;
  
  try {
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

      return res.status(201).json(user)

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

    if (!users) {
      return res.status(204).json({ message: "Sem Conteúdo" })
    }

    return res.status(200).json(users)
    
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        usuario: true,
        status: true,
        user_access: { 
          select: { Access: { select: { name: true } } } 
        }
      }
    })

    if (!user) {
      return res.status(204).json({ message: "Sem Conteúdo" })
    }

  } catch (error) {

  }
}