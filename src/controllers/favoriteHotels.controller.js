'use strict';

import FavoriteHotels from '../models/favoriteHotels.model.js';

export const newFavoriteHotel = async (req, res) => {
  try {
    let { id } = req.params;
    let data = {
      user_id: req.user._id,
      hotel_id: id,
    };
    if (data) {
      let favoritedHotel = new FavoriteHotels(data);
      await favoritedHotel.save();
      return res
        .status(200)
        .send({ message: 'Hotel agregado a favoritos correctamente' });
    }
    return res
      .status(500)
      .send({ message: 'No se han incluido todos los campos requeridos' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar el hotel a favoritos' });
  }
};

export const viewFavoriteHotels = async (req, res) => {
  try {
    let id = req.user._id;
    let foundedFavoriteHotels = await FavoriteHotels.find({ user_id: id });
    if (!foundedFavoriteHotels)
      return res
        .status(404)
        .send({ message: 'No se ha encontrado ningún hotel en favoritos' });
    return res.status(200).send({ foundedFavoriteHotels });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al ver los hoteles favoritos' });
  }
};

export const deleteFavoriteHotel = async (req, res) => {
  try {
    let userId = req.user._id;
    let { id } = req.params;
    let deletedFavoriteHotel = await FavoriteHotels.findOneAndDelete({
      _id: id,
      user_id: userId,
    });
    if (!deletedFavoriteHotel)
      return res.status(404).send({
        message: 'No se ha encontrado este hotel entre sus favoritos',
      });
    return res.status(200).send({
      message: 'El hotel a sido eliminado de favoritos satisfactoriamente',
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al eliminar un hotel de favoritos' });
  }
};
