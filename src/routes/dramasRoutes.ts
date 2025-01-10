import { Router } from "express";
import {
  createDramaHandler,
  listDramasHandler,
  getDramaByIdHandler,
} from "../controllers/dramaController";

const router = Router();

router.post("/createDrama", createDramaHandler); // cadastrar dorama
router.get("/listDramas", listDramasHandler); // listar todos os doramas
router.get("/getDramaById:id", getDramaByIdHandler); // listar drama pelo id

export default router;
