import { Request, Response } from "express"
import { prisma } from "../lib/prisma"

export const createSales = async (req: Request, res: Response) => {
  const { products } = req.body
  let { discont } = req.body
  const { id } = req.user

  try {
    const productByDatabase = await prisma.product.findMany({
      where: {
        id: { in: products.map((product: any) => product.id) }
      }
    })

    const productQuantity = productByDatabase.map((product) => {
      const { id, name, price } = product
      const quantity = products.find((p: any) => p.id === product.id).quantity
      return { id, name, price, quantity }
    })

    let price = 0
    for (const item of productQuantity) {
      price += item.price * parseInt(item.quantity)
    }

    if (!discont) {
      discont = 0.0
    }

    const sale = await prisma.sales.create({
      data: {
        total_value: price,
        discont_value: discont,
        final_value: price - discont,
        user: { connect: { id } },
        SalesProducts: {
          create: productQuantity.map(product => ({
            product: { connect: { id: product.id } },
            quantity: product.quantity
          }))
        }
      },
      include: {
        SalesProducts: true
      }
    })

    productQuantity.map(async (product) => {
      await prisma.product.updateMany({
        where: { id: product.id },
        data: { 
          amount:{
            decrement: parseInt(product.quantity)
          }
        }
      })
    })

    return res.status(201).json({ sale, message: "Venda Realizada com Sucesso" })

  } catch (error) {
    return res.status(400).json(error)

  }
}

export const getAllSales =async (req:Request, res: Response) => {
  const sales = await prisma.sales.findMany({
    select:{
      id: true,
      total_value: true,
      discont_value: true,
      final_value: true,
      user: {
        select:{
          id: true,
          name: true,          
        }
      },
      SalesProducts: {
        select: {
          product:{
            select:{
              id: true,
              name: true,
              price: true
            }
          },
          quantity:true
        }
      },
      created_at: true
    }
  })

  return res.status(200).json(sales)
}

export const getAllSalesByUser =async (req:Request, res: Response) => {
  const {id } = req.user
  const sales = await prisma.sales.findMany({
    where :{
      userId: id },
    select:{
      id: true,
      total_value: true,
      discont_value: true,
      final_value: true,
      user: {
        select:{
          id: true,
          name: true,          
        }
      },
      SalesProducts: {
        select: {
          product:{
            select:{
              id: true,
              name: true,
              price: true
            }
          },
          quantity:true
        }
      },
      created_at: true
    }
  })

  return res.status(200).json(sales)
}