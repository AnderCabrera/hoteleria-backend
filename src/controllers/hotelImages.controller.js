'use strict';

import ImagesHotel from '../models/hotelImages.model.js';
import Hotel from '../models/hotel.model.js';

//Esta función se va a usar en el controlador de hotel para que al momento de agregar un hotel, ponerle una imagen inicial
export const addInitialImage = async (url, hotelName) => {
  try {
    let foundedIdHotel = await Hotel.findOne({ name: hotelName });
    let idHotel = foundedIdHotel._id;
    let data = {
      image_url: url,
      hotel_id: idHotel,
    };
    let imagesHotel = new ImagesHotel(data);
    await imagesHotel.save();
    return console.log('Se agrego la imagen correctamente');
  } catch (err) {
    console.error(err);
    return console.log('Error al agregar la imagen a la base de datos');
  }
};

//Función para agregar imagenes despúes de crear el hotel
export const addImageHotel = async (req, res) => {
  try {
    let data = req.body;
    let imagesHotel = new ImagesHotel(data);
    await imagesHotel.save();
    return res
      .status(200)
      .send({ message: 'Imagen asignada al hotel correctamente' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar la imagen a la base de datos' });
  }
};

//eliminar una sola imagen del hotel
export const deleteImageHotel = async (req, res) => {
  try {
    let { id } = req.params;
    let deletedImages = await ImagesHotel.findOneAndDelete({ _id: id });
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

//Eliminar todas las imagenes de ese hotel (idHotel)
export const deleteImagesHotel = async (req, res) => {
  try {
    let { id } = req.params;
    let deletedImages = await ImagesHotel.deleteMany({ hotel_id: id });
    if (!deletedImages)
      return res
        .status(404)
        .send({ message: 'El hotel no tenia imagenes asignadas' });
    return res
      .status(200)
      .send({ message: 'Imagenes de el hotel eliminadas exitosamente' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al eliminar las imagenes del hotel' });
  }
};

//se mete el id del hotel, para obtener sus imagenes
export const getUrls = async (req, res) => {
  try {
    let { id } = req.params;
    let foundedImages = await ImagesHotel.find({ hotel_id: id });
    if (!foundedImages)
      return res
        .status(404)
        .send({ message: 'No se ha encontrado ninguna imagen de este hotel' });
    return res.send({ foundedImages });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al obtener las url de las imagenes' });
  }
};
