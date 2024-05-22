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

export const getBooking = async (req, res) => {
  try {
    let bookingFound = await Booking.find().populate({
      path: 'room',
      populate: {
        path: 'idHotel', // Cambiado de 'hotel' a 'idHotel'
        model: 'Hotel',
      },
    });

    if (!bookingFound.length) {
      return res.status(404).send({ message: 'No hay reservaciones' });
    }

    let bookingsByHotel = {};

    bookingFound.forEach((booking) => {
      let hotelName = booking.room.idHotel.name; // Cambiado de 'room.hotel' a 'room.idHotel'
      if (!bookingsByHotel[hotelName]) {
        bookingsByHotel[hotelName] = 0;
      }
      bookingsByHotel[hotelName]++;
    });

    return res.status(200).send({ bookingsByHotel });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: 'Error al obtener las reservaciones' });
  }
};
