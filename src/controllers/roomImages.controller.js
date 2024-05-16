'use strict';

import RoomImages from '../models/roomImages.model.js';

//Este controlador basicamente tiene la misma funcionalidad que el de las
//imagenes de hoteles

export const addInitialImage = async (url, idRoom) => {
  try {
    let data = {
      image_url: url,
      room_id: idRoom,
    };
    let imagesRoom = new RoomImages(data);
    await imagesRoom.save();
    return console.log('Se agrego la imagen correctamente');
  } catch (err) {
    console.error(err);
    return console.log('Error al agregar la imagen a la base de datos');
  }
};

export const addImageRoom = async (req, res) => {
  try {
    let data = req.body;
    let imagesRoom = new RoomImages(data);
    await imagesRoom.save();
    return res
      .status(200)
      .send({ message: 'Imagen asignada a la habitación correctamente' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar la imagen a la base de datos' });
  }
};

export const getImageRoom = async (req, res) => {
  try {
    let { id } = req.params;
    let foundedImageRoom = await RoomImages.find({ _id: id });
    if (!foundedImageRoom) {
      return res
        .status(404)
        .send({ message: 'No se han encontrado Imagenes para la habitación' });
    }
    return res.status(200).send({ foundedImageRoom });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error con las imagenes de la habitacion' });
  }
};

export const deleteImageRoom = async (req, res) => {
  try {
    let { id } = req.params;
    let deletedImages = await RoomImages.findOneAndDelete({ _id: id });
    if (!deletedImages)
      return res
        .status(500)
        .send({ message: 'No se encontro la imagen, no se ha eliminado' });
    return res.status(200).send({ message: 'Imagen eliminada correctamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al eliminar la imagen' });
  }
};

export const deleteImagesRoom = async (req, res) => {
  try {
    let { id } = req.params;
    let deletedImages = await RoomImages.deleteMany({ room_id: id });
    if (!deletedImages)
      return res
        .status(404)
        .send({ message: 'La habitación no tenia imagenes' });
    return res
      .status(200)
      .send({ message: 'Imagenes de la habitación eliminadas exitosamente' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al eliminar las imagenes de la habitación' });
  }
};
