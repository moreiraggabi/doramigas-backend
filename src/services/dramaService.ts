import { Request, Response } from "express";
import pool from "../db";

export const createDrama = async (req: Request, res: Response) => {
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
};
