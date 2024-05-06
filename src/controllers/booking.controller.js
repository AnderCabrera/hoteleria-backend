'use strict';

import Booking from '../models/booking.model.js';

export const newBooking = async (req, res) => {
  try {
    let { idRoom, idUser } = req.params;
    let data = req.body;
    data.room_id = idRoom;
    data.user_id = idUser;
    let booking = new Booking(data);
    await booking.save();
    return res.status(201).send({ message: 'Habitación agregada a su cuenta' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al agregar la habitación a su cuenta' });
  }
};
