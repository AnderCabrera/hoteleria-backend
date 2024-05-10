'use strict';

import Services from '../models/services.model.js';

export const newService = async (req, res) => {
  try {
    let data = req.body;
    let service = new Services(data);
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
    let foundedServices = await Services.find({
      hotel: idHotel,
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
    let deletedService = await Services.findOneAndUpdate(
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
