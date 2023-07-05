import { Router } from "express";
import { createUser, getAllUsers } from "./controller/UserController";
import { createAccess, getAllAccesses } from "./controller/AccessController";
import { createProduct } from "./controller/ProductController";
import { signIn } from "./controller/SessionController";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";


export const router = Router()

router.post("/signIn", signIn)

router.post("/user", AuthMiddleware(["Admin"]), createUser)
router.get("/user", AuthMiddleware(["Admin"]), getAllUsers)

router.post("/access", AuthMiddleware(["Admin"]), createAccess)
router.get("/access", AuthMiddleware(["Admin"]), getAllAccesses)

router.post("/product", AuthMiddleware(["Admin", "Vendedor"]), createProduct)