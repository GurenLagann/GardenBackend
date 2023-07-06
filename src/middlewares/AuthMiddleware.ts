import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

interface DecodedToken {
  id: string
}

 
export function AuthMiddleware(permissions?: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const AuthHeader = req.headers.authorization

    if (!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" })
    }

    const token = AuthHeader.substring(7)
    

    try {
      const MySecretKey = process.env.MY_SECRET_KEY

      if (!MySecretKey) {
        throw new Error("Chave secreta não exite");
      }

      const decodedToken = verify(token, MySecretKey) as DecodedToken

      req.user = { id: decodedToken.id }

      if (permissions) {
        const user = await prisma.user.findUnique({
          where: {
            id: decodedToken.id
          },
          include: {
            user_access: {
              select: {
                Access: { select: { name: true } }
              }
            }
          }
        })
        
        const userPermissions = user?.user_access.map((na) => na.Access?.name) ?? []
        const hasPermissions = permissions.some((p) => userPermissions.includes(p))

        if (!hasPermissions) {
          return res.status(403).json({ message: "Permissão Negada" })
        }
      }

      return next()

    } catch (error) {
      return res.status(401).json({ menssage: "token invalido" })
    }
  }

}