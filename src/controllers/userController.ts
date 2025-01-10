import { Request, Response } from "express";
import pool from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Lógica para registrar uma usuária
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Verificar se o email já existe no banco
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email já está em uso." });
    }

    // Hash da senhx
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Inserir a nova usuária no banco
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [name, email, hashedPassword]
    );

    // Responder com os dados da usuária criada
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar a usuária." });
  }
};

// Lógica de login
export const loginUsser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //Verificar se o emial existe
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Email não encontrado." });
    }

    const user = userResult.rows[0];

    //Comparar a senha fornecida com o hash armazenado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "A senha fornecida está incorreta!" });
    }

    //Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: "Erro ao realizar login" });
  }
};
