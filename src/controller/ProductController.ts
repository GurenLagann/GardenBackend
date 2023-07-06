import { Request, Response } from "express"
import { prisma } from "../lib/prisma"

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, amount } = req.body
  
  try {
    const Product = await prisma.product.create({
      data: {
        name,
        price,
        amount,
      }
    })

    return res.status(201).json(Product)

  } catch (error) {
    return res.status(400).json(error)
  }
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({ })

    if (!products){
      return res.status(204).json({ message: "Sem Conteúdo"})
    }

    return res.status(200).json(products)

  } catch (error) {
    return res.status(400).json(error)
  }
}