import { Request, Response } from "express";
import pool from "../db";
import { createDrama } from "../services/dramaService";

export const createDramaHandler = async (req: Request, res: Response) => {
  return createDrama(req, res);
};

export const listDramasHandler = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM dramas", []);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Não foi possível buscar os doramas." });
  }
};

export const getDramaByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "É obrigatório informar um id" });
  }

  try {
    const result = await pool.query("SELECT * FROM dramas WHERE = $1", [id]);

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar doramas" });
  }
};

// export const editDramaHandler = async (req: Request, res: Response) => {
//     const {id, name, synopsis, genre, nationality, platform } = req.body;

//     if (!id) {
//         return res.status(400).json({error: 'É obrigatório informar o id do drama editado'});
//     }

//     try {
//         const result = await pool.query(
//             ''
//         )
//     }
// }
