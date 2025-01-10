import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { extingUser, createUser, editUser } from "../services/userService";
import { encriptPassword } from "../helpers/usersHelper";

// Lógica para registrar uma usuária
export const createUserHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await extingUser(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email já está em uso." });
    }

    const hashedPassword = await encriptPassword(password);

    const result = await createUser({ name, email, password: hashedPassword });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao registrar a usuária." });
  }
};

// Lógica de login
export const loginUsserHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    //Verificar se o emial existe
    const userResult = await extingUser(email);
    if (!userResult) {
      return res.status(404).json({
        error: "Nenhum usuário cadastrado com esse e-mail foi encontrado.",
      });
    }

    const user = userResult;

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

export const editUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const existingUser = await extingUser(email);

    if (existingUser) {
      res.status(400).json({ error: "O e-mail informado já está em uso." });
    }

    const hashedPassword = await encriptPassword(password);

    const editedUser = await editUser(+id, {
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({ editedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao editar usuário" });
  }
};
