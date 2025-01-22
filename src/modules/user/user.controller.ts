import { Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  editUser,
  listUserById,
  listUsers,
  loginUser,
  userProfile,
} from './user.service';
import {
  IncorrectPasswordException,
  UserNotFoundException,
} from './user.exceptions';
import { errorMessages } from '../../utils/errorMessages';

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
    const token = await loginUser(email, password);

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

export const listUsersHandler = async (req: Request, res: Response) => {
  try {
    const result = await listUsers();

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocorreu um erro ao listar os usuários' });
  }
};

export const listUserByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: errorMessages.idRequired });
  }

  try {
    const result = await listUserById(+id);

    if (!result) {
      return res
        .status(404)
        .json({ error: 'Não foi econtrado nenhum usuário com o id informado' });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: 'Ocorreu um erro ao pesquisar o usuário' });
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: errorMessages.idRequired });
  }

  try {
    const result = await deleteUser(+id);

    if (!result) {
      return res.status(404).json({
        error: 'Não foi encontrado nenhum usuário com o id informado',
      });
    }

    return res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ocorreu um erro ao deletar o usuário' });
  }
};

export const userProfileByIdHandler = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ errors: errorMessages.userIdRequired });
  }

  try {
    const result = await userProfile(+userId);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    if (err instanceof UserNotFoundException) {
      return res.status(500).json(err.message);
    } else {
      return res.status(500).json('Ocorreu um erro ao buscar perfil de usuário');
    }
  }
};

export const authenticatedUserProfileHandler = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ errors: errorMessages.userIdRequired });
  }

  try {
    const result = await userProfile(+userId);

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    if (err instanceof UserNotFoundException) {
      res.status(500).json(err.message);
    } else {
      res.status(500).json('Ocorreu um erro ao buscar perfil de usuário');
    }
  }
};
