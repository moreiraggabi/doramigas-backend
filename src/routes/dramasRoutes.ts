import { Router } from "express";
import {
  createDramaHandler,
  listDramasHandler,
  getDramaByIdHandler,
  editDramaHandler,
  deleteDramaHandler,
} from "../controllers/dramaController";

const router = Router();

router.post("/", createDramaHandler); // cadastrar dorama
router.get("/", listDramasHandler); // listar todos os doramas
router.get("/:id", getDramaByIdHandler); // listar drama pelo id
router.put("/:id", editDramaHandler);
router.delete("/:id", deleteDramaHandler);

export default router;
