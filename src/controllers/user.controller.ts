import { Request, Response } from 'express';
import { createUser, editUser, loginUser } from '../services/user.service';
import {
  IncorrectPasswordException,
  UserNotFoundException,
} from '../exceptions/userExcepetions';

// Lógica para registrar uma usuária
export const createUserHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const result = await createUser({ name, email, password });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);

    if (err instanceof UserNotFoundException) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
};

// Lógica de login
export const loginUserHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = loginUser(email, password);

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);

    if (err instanceof IncorrectPasswordException) {
      res.status(500).json({ errors: 'A senha informada está incorreta' });
    } else {
      res.status(500).json({ errors: 'Erro ao realizar login' });
    }
  }
};

export const editUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const editedUser = await editUser(+id, {
      name,
      email,
      password,
    });

    return res.status(200).json({ editedUser });
  } catch (err) {
    console.error(err);

    if (err instanceof UserNotFoundException) {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Erro ao editar usuário' });
    }
  }
};
