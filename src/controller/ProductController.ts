import { Request, Response } from "express"
import { prisma } from "../lib/prisma"

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, amount } = req.body

  const Product = await prisma.product.create({
    data: {
      name,
      price,
      amount,
    }
  })

  return res.json(Product)
}