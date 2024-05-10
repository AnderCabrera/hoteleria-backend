'use strict';

import Room from '../models/room.model.js';

export const newRoom = async (req, res) => {
  try {
    let data = req.body;
    let room = new Room(data);
    await room.save();
    return res.status(200).send({ message: 'Habitación agregada con exito' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar una nueva habitación' });
  }
};

export const updateRoom = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updatedRoom = await Room.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!updatedRoom)
      return res
        .status(404)
        .send({ message: 'Habitación no encontrada no ha sido actualizada' });
    return res
      .status(200)
      .send({ message: 'Habitación actualizada con exito', updatedRoom });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al actualizar la habitación' });
  }
};

//id del hotel
export const viewRooms = async (req, res) => {
  try {
    let { id } = req.params;
    let foundedRooms = await Room.find({ id_hotel: id });
    if (!foundedRooms)
      return res
        .status(404)
        .send({ message: 'No se han encontrado habitaciones' });
    return res.status(200).send({ foundedRooms });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error viendo las habitaciones' });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    let { id } = req.params;
    let data = {
      tp_status: 'DELETED',
    };
    let deletedRoom = await Room.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!deletedRoom)
      return res.status(404).send({
        message: 'No se ha encontrado la habitación, no se ha actualizado',
      });
    return res
      .status(200)
      .send({ message: 'Habitación eliminada', deletedRoom });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al eliminar la habitación' });
  }
};
