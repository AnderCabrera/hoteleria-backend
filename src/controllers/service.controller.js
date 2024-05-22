'use strict';

import Service from '../models/service.model.js';
import Hotel from '../models/hotel.model.js';

export const newService = async (req, res) => {
  try {
    let data = req.body;
    let service = new Service(data);
    await service.save();
    return res.status(201).send({ message: 'Servicio creado exitosamente' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al agregar el servicio' });
  }
};

export const viewServices = async (req, res) => {
  try {
    let { idHotel } = req.params;
    let foundedServices = await Service.find({
      hotelId: idHotel,
      tp_status: 'AVAILIABLE',
    });
    if (!foundedServices)
      return res
        .status(404)
        .send({ message: 'El hotel no tiene servicios extras' });
    return res.status(200).send({ foundedServices });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error al ver los servicios disponibles' });
  }
};

export const deleteService = async (req, res) => {
  try {
    let { idService } = req.params;
    let data = {
      tp_status: 'DELETED',
    };
    let deletedService = await Service.findOneAndUpdate(
      { _id: idService },
      data,
      { new: true },
    );
    if (!deletedService)
      return res
        .status(404)
        .send({ message: 'No se encontró el servicio, no se elimino' });
    return res.status(200).send({ message: 'Servicio eliminado con exito' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al eliminar el servicio' });
  }
};

export const serviceDefault = async (name, description, price, hotelName) => {
  try {
    let hotel = await Hotel.findOne({ name: hotelName });
    let hotelId = hotel._id;
    let data = {
      name: name,
      description: description,
      tp_status: 'AVAILIABLE',
      price: price,
      hotelId: hotelId,
    };
    let service = new Service(data);
    await service.save();
    console.log('Servicio default creado con éxito');
  } catch (err) {
    console.error(err);
    console.log('Se creo el servicio con exito');
  }
};
