'use strict';

import Review from '../models/review.model.js';

export const newReview = async (req, res) => {
  try {
    let data = req.body;
    data.user_id = req.params;
    //let founded falta buscar si el usuario ha reservado la habitación con anterioridad
    let review = new Review(data);
    await review.save();
    return res.status(200).send({ message: 'Review agregada correctamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al agregar el comentario' });
  }
};

//id de la valoración
export const editReview = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updatedReview = await Review.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!updatedReview)
      return res
        .status(404)
        .send({ message: 'Review no encontrada, no se ha actualizado' });
    return res
      .status(200)
      .send({ message: 'Review actualizada correctamente', updatedReview });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al actualizar la valoración' });
  }
};

//id de la valoración
export const deleteReview = async (req, res) => {
  try {
    let { id } = req.params;
    let deletedReview = await Review.findOneAndDelete({ _id: id });
    if (!deletedReview)
      return res
        .status(404)
        .send({ message: 'Valoración no encontrada, no ha sido actualizada' });
    return res.status(200).send({ deletedReview });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al eliminar la valoración' });
  }
};

//ingresa el id del hotel, para ver sus valoraciones
export const viewReviews = async (req, res) => {
  try {
    let { id } = req.params;
    let foundedReviews = await Review.find({ hotel_id: id });
    if (!foundedReviews)
      return res.status(404).send({ message: 'El hotel no tiene reviews' });
    return res.status(200).send({ foundedReviews });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al visualizar las reviews' });
  }
};
