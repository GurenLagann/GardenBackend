import { Request, Response } from "express"
import { prisma } from "../lib/prisma"

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, amount } = req.body

    const Product = await prisma.product.create({
      data: {
        name,
        price,
        amount,
      }
    })

    return res.status(200).json(Product)
  } catch (error) {
    return res.status(400).json(error)
  }
}