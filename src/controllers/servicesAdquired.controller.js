'use strict';

import ServicesAdquired from '../models/servicesAdquired.model';

export const adquireService = async (req, res) => {
  try {
    let { service_id, total } = req.params;
    let dataa = req.body;
    let dateNow = Date.now;
    let data = {
      service_id: service_id,
      date_adquired: dateNow,
      date_start: dataa.date_start,
      date_end: dataa.date_end,
      total_price: dataa.total,
    };
    let servicesAdquired = new ServicesAdquired(data);
    await servicesAdquired.save();
    return res.status(200).send({ message: 'Servicios adquiridos con exito' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al adquirir el servicio' });
  }
};
