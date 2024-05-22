'use strict';

import User from '../models/user.model.js';
import FavoriteHotels from '../models/favorite-hotels.model.js';
import Review from '../models/review.model.js';
import { encrypt, checkPassword } from '../helpers/validator.js';
import { generateJwt } from '../helpers/jwt.js';
import { checkUpdate } from '../helpers/validator.js';

export const newUser = async (req, res) => {
  try {
    let data = req.body;
    data.password = await encrypt(data.password);
    data.role = 'CLIENT';
    data.tp_status = 'ACTIVE';
    let user = new User(data);
    await user.save();
    return res.send({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al crear un nuevo usuario' });
  }
};

export const newAdmin = async (req, res) => {
  try {
    let data = req.body;
    data.password = await encrypt(data.password);
    data.role = 'ADMIN_APP';
    data.tp_status = 'ACTIVE';
    let user = new User(data);
    await user.save();
    return res.send({ message: 'Admin registrado exitosamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error registrando al Admin' });
  }
};

export const login = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    let user = await User.findOne({
      $or: [
        {
          username: username,
        },
        {
          email: email,
        },
      ],
      tp_status: 'ACTIVE',
    });
    if (user && (await checkPassword(password, user.password))) {
      let loggedUser = {
        uid: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
      };
      let token = await generateJwt(loggedUser);
      return res.send({
        message: `Bienvenido ${loggedUser.username}`,
        loggedUser,
        token,
      });
    }
    return res.status(404).send({ message: 'Credenciales invalidas' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al logear' });
  }
};

export const dataUser = async (req, res) => {
  try {
    let { id } = req.params;
    let foundedUser = await User.findOne({ _id: id });
    if (!foundedUser)
      return res.status(404).send({ message: 'No se encontró al usuario' });
    return res.send({ foundedUser });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al obtener los datos del usuario' });
  }
};

export const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;

    console.log(`Updating user with ID: ${id}`);
    console.log('Data received:', data);

    // Validar la información actualizable
    let update = checkUpdate(data, id);
    if (!update) {
      return res.status(400).send({
        message:
          'Ha enviado información que no se puede actualizar, o hace falta información',
      });
    }

    // Verificar si se proporcionan las contraseñas
    if (data.password && data.passwordConfirm) {
      if (data.password !== data.passwordConfirm) {
        return res.status(400).send({
          message: 'Las contraseñas no coinciden',
        });
      }
      // Encriptar la nueva contraseña
      data.password = await encrypt(data.passwordConfirm);
      delete data.passwordConfirm; // eliminar el campo passwordConfirm para que no sea parte del update
    } else {
      // Si no se proporcionan ambos campos, eliminar password del objeto de datos
      delete data.password;
      delete data.passwordConfirm;
    }

    // Actualizar el usuario en la base de datos
    let updatedUser = await User.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .send({ message: 'Usuario no encontrado, no se ha actualizado' });
    }

    return res
      .status(200)
      .send({ message: 'Usuario actualizado', updatedUser });
  } catch (err) {
    console.error('Error actualizando el usuario:', err);
    return res.status(500).send({ message: 'Error actualizando la cuenta' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    let data = {
      tp_status: 'DELETED',
    };
    let deletedUser = await User.findOneAndUpdate(
      { _id: id, tp_status: 'ACTIVE' },
      data,
      { new: true },
    );
    if (!deletedUser)
      return res
        .status(404)
        .send({ message: 'Usuario no encontrado, no se ha actualizado' });
    let deletedFavorite = await FavoriteHotels.deleteMany({ user_id: id });
    return res.status(200).send({ message: 'Usuario eliminado con exito' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error eliminando la cuenta' });
  }
};

export const userAdminDefault = async () => {
  try {
    const data = {
      name: 'Josué',
      lastname: 'Noj',
      username: 'jnoj',
      email: 'jnoj@gmail.com',
      password: await encrypt('12345678'),
      role: 'ADMIN_APP',
      tp_status: 'ACTIVE',
    };
    let defualtCreated = await User.findOne({ email: data.email });
    if (!defualtCreated) {
      let user = new User(data);
      await user.save();
      console.log('Usuario admin default creado con exito');
    } else {
      console.log('Usuario default creado con anterioridad');
    }
  } catch (err) {
    console.error(err);
    console.log('Error creando al usuario Admin por defecto');
  }
};
