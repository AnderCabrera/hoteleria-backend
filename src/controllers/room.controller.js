'use strict';

import Room from '../models/room.model.js';
import TypeRoom from '../models/typeRoom.model.js';
import Hotel from '../models/hotel.model.js';
import User from '../models/user.model.js';
import { addInitialImage } from './roomImages.controller.js';
import RoomImage from '../models/roomImages.model.js';

export const newRoom = async (req, res) => {
  try {
    let { idUser } = req.params;
    let foundedUser = await User.findOne({ _id: idUser });
    let foundedHotel = await Hotel.findOne({ _id: foundedUser.id_hotel });
    let data = req.body;
    data.idHotel = foundedHotel._id;
    let room = new Room(data);
    await room.save();
    let foundedRoom = await Room.findOne({ description: data.description });
    await addInitialImage(data.url, foundedRoom._id);
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
    let { id, idRoom } = req.params;
    let foundedRooms = await Room.find({
      roomType: idRoom,
      idHotel: id,
      tp_status: 'ACTIVE',
    });

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

export const viewRoomsHotel = async (req, res) => {
  try {
    let { idUser } = req.params;
    let foundedUser = await User.findOne({ _id: idUser });
    let foundedRooms = await Room.find({ idHotel: foundedUser.id_hotel });
    return res.status(200).send({ foundedRooms });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al ver las habitaciones del hotel' });
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

export const roomDefault = async (
  description,
  people,
  price,
  typeRoom,
  hotelName,
  urlImage,
) => {
  try {
    let foundedType = await TypeRoom.findOne({ name: typeRoom });
    let idType = foundedType._id;
    let foundedIdHotel = await Hotel.findOne({ name: hotelName });
    let idHotel = foundedIdHotel._id;
    let data = {
      description: description,
      peopleCapacity: people,
      nightPrice: price,
      roomType: idType,
      tp_status: 'ACTIVE',
      idHotel: idHotel,
    };

    let room = new Room(data);
    await room.save();
    let roomFounded = await Room.findOne({
      description: description,
      roomType: idType,
      idHotel: idHotel,
    });
    let data2 = {
      image_url: urlImage,
      room_id: roomFounded,
    };
    let roomImage = new RoomImage(data2);
    await roomImage.save();
    console.log('Habitación creada con éxito');
  } catch (err) {
    console.error(err);
    return console.log('Error al agregar la habitación por default');
  }
};
