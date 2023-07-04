import { Router } from "express";
import { createUser, getAllUsers } from "./controller/UserController";
import { createAccess, getAllAccesses } from "./controller/AccessController";
import { createProduct } from "./controller/ProductController";


export const router = Router()

router.post("/user", createUser)
router.get("/user", getAllUsers)

router.post("/access", createAccess)
router.get("/access", getAllAccesses)

router.post("/product", createProduct)