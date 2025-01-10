import { Request, Response } from "express";
import {
  createDrama,
  deleteDrama,
  editDrama,
  getDramasById,
  listDramas,
} from "../services/dramaService";
import { errorMessages } from "../utils/errorMessages";

export const createDramaHandler = async (req: Request, res: Response) => {
  const { name, synopsis, genre, nationality, platform } = req.body;

  if (!name) {
    return res.status(400).json({ error: "O nome do dorama é obrigatório" });
  }

  try {
    const result = await createDrama({
      name,
      synopsis,
      genre,
      nationality,
      platform,
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao cadastrar dorama." });
  }
};

export const listDramasHandler = async (req: Request, res: Response) => {
  try {
    const result = await listDramas();

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Não foi possível buscar os doramas." });
  }
};

export const getDramaByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: errorMessages.idRequired });
  }

  try {
    const result = await getDramasById(+id);

    if (!result) {
      return res.status(404).json({ error: "Dorama não encontrado." });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar doramas" });
  }
};

export const editDramaHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, synopsis, genre, nationality, platform } = req.body;

  if (!id) {
    res.status(400).json({ error: errorMessages.idRequired });
  }

  try {
    const updatedDrama = await editDrama(+id, {
      name,
      synopsis,
      genre,
      nationality,
      platform,
    });

    res.status(200).json({ updatedDrama });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro ao editar o dorama" });
  }
};

export const deleteDramaHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: errorMessages.idRequired });
  }

  const deletedDrama = await deleteDrama(+id);

  res.status(200).json({ deletedDrama });
};
