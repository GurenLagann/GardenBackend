import { Router } from "express";
import { createUser, getAllUsers, getUser } from "./controller/UserController";
import { createAccess, getAllAccesses } from "./controller/AccessController";
import { createProduct, getAllProducts } from "./controller/ProductController";
import { signIn } from "./controller/SessionController";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { createSales, getAllSales, getAllSalesByUser } from "./controller/SalesController";


export const router = Router()

router.post("/", signIn)

router.post("/user", AuthMiddleware(["Admin"]), createUser)
router.get("/user/:id", AuthMiddleware(["Admin"]), getUser)
router.get("/users", AuthMiddleware(["Admin"]), getAllUsers)

router.post("/access", AuthMiddleware(["Admin"]), createAccess)
router.get("/access", AuthMiddleware(["Admin"]), getAllAccesses)

router.post("/product", AuthMiddleware(["Admin", "Vendedor"]), createProduct)
router.get("/products", AuthMiddleware(["Admin", "Vendedor"]), getAllProducts)

router.post("/sales", AuthMiddleware(["Admin", "Vendedor"]), createSales)
router.get("/sales", AuthMiddleware(["Admin", "Vendedor"]), getAllSales)
router.get("/yoursales", AuthMiddleware(["Admin"]), getAllSalesByUser)