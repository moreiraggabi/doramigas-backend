import { Router } from "express";
import {
  createDrama,
  listDramas,
  getDramaByIdd,
} from "../controllers/dramaController";

const router = Router();

router.post("/createDrama", createDrama); // cadastrar dorama
router.get("/listDramas", listDramas); // listar todos os doramas
router.get("/getDramaById:id", getDramaByIdd); // listar drama pelo id

export default router;
