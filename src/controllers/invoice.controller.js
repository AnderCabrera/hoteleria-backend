'use strict';

import Invoice from '../models/invoice.model.js';
import Booking from '../models/booking.model.js';

export const newInvoice = async (req, res) => {
  try {
    let { price, idRoom, idUser } = req.params;
    let idBooking = await Booking.findOne({ room: idRoom, user: idUser });
    let data = {
      price: price,
      booking_id: idBooking._id,
      user: idUser,
    };
    if (!data)
      return res
        .status(500)
        .send({
          message: 'Debe tener todos los datos para hacer la reservación',
        });
    let invoice = new Invoice(data);
    await invoice.save();
    return res
      .status(201)
      .send({ message: 'Se ha hecho la reservación con exito' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al hacer la factura' });
  }
};
