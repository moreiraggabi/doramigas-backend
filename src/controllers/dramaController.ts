import { Request, Response } from "express";
import pool from "../db";

export const createDrama = async (req: Request, res: Response, next: any) => {
  const { name, synopsis, genre, nationality, platform } = req.body;

  if (!name) {
    return res.status(400).json({ error: "O nome do dorama é obrigatório" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO dramas (name, synopsis, genre, nationality, platform) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, synopsis, genre, nationality, platform]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao cadastrar dorama." });
  }

  return next();
};

export const listDramas = async (req: Request, res: Response, next: any) => {
  try {
    const result = await pool.query("SELECT * FROM dramas", []);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Não foi possível buscar os doramas." });
  }

  return next();
};

export const getDramaByIdd = async (req: Request, res: Response, next: any) => {
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

  return next();
};

// export const editDrama = async (req: Request, res: Response) => {
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
