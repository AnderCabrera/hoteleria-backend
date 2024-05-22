'use strict';

import Booking from '../models/booking.model.js';

export const getBookings = async (req, res) => {
  try {
    let bookings = await Booking.find({})
      .populate({
        path: 'servicesAdquired',
        select: 'name description price',
      })
      .populate({
        path: 'room',
        select: 'description peopleCapacity nightPrice',
      })
      .populate({
        path: 'user',
        select: 'name username -_id',
      });

    return res.status(200).send(bookings);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al obtener las reservaciones' });
  }
};

export const newBooking = async (req, res) => {
  try {
    let { idRoom, idUser } = req.params;

    let { date_start, date_end, servicesAdquired } = req.body;

    let booking = new Booking({
      date_start,
      date_end,
      servicesAdquired,
      room: idRoom,
      user: idUser,
    });

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
