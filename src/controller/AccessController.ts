import { Request, Response } from "express"
import { prisma } from "../lib/prisma"


export const createAccess = async (req: Request, res: Response) => {
  const { name } = req.body;
  
  try {
    const access = await prisma.access.create({
      data: {
        name
      }
    })

    return res.status(200).json(access);
    
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const getAllAccesses = async (req: Request, res: Response) => {
  try {
    const accesses = await prisma.access.findMany()

    return res.status(200).json(accesses);
  } catch (error) {
    return res.status(400).json(error)

  }
}