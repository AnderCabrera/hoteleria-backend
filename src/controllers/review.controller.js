'use strict';

import Review from '../models/review.model.js';

export const newReview = async (req, res) => {
  try {
    let data = req.body;
    data.user_id = req.user._id;
    //let founded falta buscar si el usuario ha reservado la habitación con anterioridad
    let review = new Review(data);
    await review.save();
    return res.status(200).send({ message: 'Review agregada correctamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al agregar el comentario' });
  }
};
