'use strict';

import TypeRoom from '../models/typeRoom.model.js';
import Room from '../models/room.model.js';

export const newTypeRoom = async (req, res) => {
  try {
    let data = req.body;
    let typeRoom = new TypeRoom(data);
    await typeRoom.save();
    return res.status(200).send({
      message: 'Tipo de habitación agregado exitosamente a la base de datos',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message:
        'Error al agregar el tipo de habitación al sistema, intentelo nuevamente',
    });
  }
};

export const updateTypeRoom = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updatedTypeRoom = await TypeRoom.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!updatedTypeRoom)
      return res.status(404).send({
        message: 'Tipo de habitación no encontrado, no se ha actualizado',
      });
    return res
      .status(200)
      .send({ message: 'Tipo de habitación actualizado correctamente' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al actualizar el tipo de habitación' });
  }
};

export const viewTypeRoom = async (req, res) => {
  try {
    let typeRoomsFounded = await TypeRoom.find();
    if (!typeRoomsFounded)
      return res
        .status(404)
        .send({ message: 'No se ha encontrado ningún tipo de habitación' });
    return res.status(200).send({ typeRoomsFounded });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al visualizar los tipos de habitación' });
  }
};

export const searchTypeRoomById = async (req, res) => {
  try {
    let { id } = req.params;
    let foundedTypeRoom = await TypeRoom.findOne({ _id: id });
    if (!foundedTypeRoom)
      return res
        .status(404)
        .send({ message: 'No se ha encontrado el tipo de habitación' });
    return res.status(200).send({ foundedTypeRoom });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al buscar el tipo de habitación' });
  }
};

export const searchTypeRoomByName = async (req, res) => {
  try {
    let { name } = req.body;
    let foundedTypeRoom = await TypeRoom.find({ type: new RegExp(name, 'i') });
    if (!foundedTypeRoom)
      return res
        .status(404)
        .send({ message: 'No se ha encontrado ningún tipo de habitación' });
    return res.status(200).send({ foundedTypeRoom });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al buscar el tipo de habitación' });
  }
};

export const deleteTypeRoom = async (req, res) => {
  try {
    let { id } = req.params;
    let deletedTypeRoom = await TypeRoom.findOneAndDelete({ _id: id });
    if (!deletedTypeRoom)
      return res.status(404).send({
        message: 'Tipo de habitación no encontrado, no se ha eliminado',
      });
    let defaultTypeRoom = await TypeRoom.findOne({ type: 'Default' });
    let roomsDeletedTypeRoom = await Room.updateMany(
      { roomType: deletedTypeRoom._id },
      { $set: { roomType: defaultTypeRoom._id } },
    );
    if (!roomsDeletedTypeRoom)
      return res.status(404).send({
        message: 'No habian habitaciones con este tipo de habitación',
      });
    return res
      .status(200)
      .send({ message: 'Tipo de habitación eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al eliminar el tipo de habitación' });
  }
};

export const typeRoomDefault = async (req, res) => {
  try {
    const data = {
      type: 'Default',
    };
    let defaultTypeRoom = await TypeRoom.findOne({ type: data.type });
    if (!defaultTypeRoom) {
      let typeRoom = new TypeRoom(data);
      await typeRoom.save();
      return res.status(200).send({
        message: 'Tipo de habitación por default creado exitosamente',
      });
    }
    return res
      .status(500)
      .send({ message: 'Tipo de habitación default creado con anterioridad' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al crear el tipo de habitación por defecto' });
  }
};
