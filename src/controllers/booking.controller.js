'use strict';

import Booking from '../models/booking.model.js';

export const newBooking = async (req, res) => {
  try {
    let { idRoom, idUser } = req.params;
    let data = req.body;
    data.room = idRoom;
    data.user = idUser;
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

export const getDates = async (req, res) => {
  try {
    let { idRoom } = req.params;
    let foundedDates = await Booking.find({ room: idRoom });
    if (!foundedDates)
      return res
        .status(404)
        .send({ message: 'Esta habitación no ha sido reservada aún' });
    let dates = foundedDates.map((booking) => {
      return {
        date_start: booking.date_start,
        date_end: booking.date_end,
      };
    });
    return res.status(200).send(dates);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al obtener las fechas de reservación' });
  }
};
