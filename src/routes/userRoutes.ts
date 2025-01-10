import { Router } from "express";
import {
  loginUsserHandler,
  createUserHandler,
} from "../controllers/userController";

const router = Router();

router.post("/register", createUserHandler); //cadastro
router.post("/login", loginUsserHandler); //login

export default router;
