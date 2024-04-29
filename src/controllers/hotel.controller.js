'use strict';

import Hotel from '../models/hotel.model.js';

export const newHotel = async (req, res) => {
  try {
    let data = req.body;
    let hotel = new Hotel(data);
    await hotel.save();
    return res.send({ message: 'Hotel creado con exito' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al agregar el hotel' });
  }
};

export const updateHotel = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    let updatedHotel = await Hotel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!updatedHotel)
      return res
        .status(404)
        .send({ message: 'Hotel no encontrado, no se ha actualizado' });
    return res.send({ message: 'Hotel actualizado', updatedHotel });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al actualizar el hotel' });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    let { id } = req.params;
    let deletedHotel = await Hotel.findOneAndDelete({ _id: id });
    if (!deletedHotel)
      return res
        .status(404)
        .send({ message: 'Hotel no encontrado, no se ha actualizado' });
    return res.send({
      message: `El hotel ${deletedHotel.name} ha sido eliminado`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al eliminar el hotel' });
  }
};

export const viewHotels = async (req, res) => {
  try {
    let hotelsFound = await Hotel.find();
    if (!hotelsFound)
      return res.status(404).send({ message: 'No se han encontrado hoteles' });
    return res.send({ hotelsFound });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al visualizar los hoteles' });
  }
};

export const defaultHotel = async (req, res) => {
  try {
    const data = {
      name: 'Barceló',
      country: 'Guatemala',
      address: '7a Avenida 15 45 zona 9 ciudad de Guatemala',
      description:
        'Este hotel de ciudad dispone de 397 elegantes habitaciones equipadas y reformadas completamente. En el año 2013 se realizó la instalación, en todas las habitaciones, de dispositivos de ahorro de energía como iniciativa para preservar el medio ambiente. Además, cuenta con habitaciones de categoría Premium para los huéspedes que estén interesados en disfrutar de una estancia con un plus en servicios y equipamiento.',
    };
    let defualtCreated = await Hotel.findOne({ name: data.name });
    if (!defualtCreated) {
      let hotel = new Hotel(data);
      await hotel.save();
      console.log('Hotel default creado con exito');
    } else {
      console.log('Hotel default creado con anterioridad');
    }
  } catch (err) {
    console.error(err);
    console.log('Erro al crear los hoteles default por defecto');
  }
};

export const defaultHotel2 = async (req, res) => {
  try {
    const data = {
      name: 'The westin camino real',
      country: 'Guatemala',
      address:
        'The Westin Camino Real, Guatemala Avenida la Reforma y 14 Calle, Ciudad de Guatemala',
      description:
        'Situado en el distrito más moderno y exclusivo de Guatemala, a pocos minutos de tiendas locales, restaurantes de primer nivel, centros comerciales y lugares de entretenimiento.',
    };
    let defualtCreated = await Hotel.findOne({ name: data.name });
    if (!defualtCreated) {
      let hotel = new Hotel(data);
      await hotel.save();
      console.log('Hotel default creado con exito');
    } else {
      console.log('Hotel default creado con anterioridad');
    }
  } catch (err) {
    console.error(err);
    console.log('Erro al crear los hoteles default por defecto');
  }
};

export const defaultHotel3 = async (req, res) => {
  try {
    const data = {
      name: 'Hyatt centric',
      country: 'Guatemala',
      address: '12 Calle 2-25 Zona 10, Ciudad de Guatemala',
      description:
        'Descubra la Ciudad de Guatemala durante su estadía en la Zona 10, una de las más atractivas de la ciudad con museos, cafés, restaurantes y la impresionante arquitectura del siglo XIX. Dentro de la Zona 10, uno de los distritos más animados de la ciudad, con hermosas calles bordeadas de árboles y mucho más.',
    };
    let defualtCreated = await Hotel.findOne({ name: data.name });
    if (!defualtCreated) {
      let hotel = new Hotel(data);
      await hotel.save();
      console.log('Hotel default creado con exito');
    } else {
      console.log('Hotel default creado con anterioridad');
    }
  } catch (err) {
    console.error(err);
    console.log('Erro al crear los hoteles default por defecto');
  }
};

export const defaultHotel4 = async (req, res) => {
  try {
    const data = {
      name: 'Citadin hoteles',
      country: 'Guatemala',
      address: '9 Avenida 5-01 zona 4, Guatemala, Guatemala',
      description:
        'At Hoteles Citadin we are proud to offer decent and clean rooms at affordable prices, in demanded locations of Guatemala. We know life is out there and not inside a hotel, so we focus on what is most important for you.',
    };
    let defualtCreated = await Hotel.findOne({ name: data.name });
    if (!defualtCreated) {
      let hotel = new Hotel(data);
      await hotel.save();
      console.log('Hotel default creado con exito');
    } else {
      console.log('Hotel default creado con anterioridad');
    }
  } catch (err) {
    console.error(err);
    console.log('Erro al crear los hoteles default por defecto');
  }
};

export const defaultHotel5 = async (req, res) => {
  try {
    const data = {
      name: 'Hilton Garden Inn',
      country: 'Guatemala',
      address: '13 calle 7-65 zona 9 Guatemala',
      description: 'Hotel en Guatemala',
    };
    let defualtCreated = await Hotel.findOne({ name: data.name });
    if (!defualtCreated) {
      let hotel = new Hotel(data);
      await hotel.save();
      console.log('Hotel default creado con exito');
    } else {
      console.log('Hotel default creado con anterioridad');
    }
  } catch (err) {
    console.error(err);
    console.log('Erro al crear los hoteles default por defecto');
  }
};

export const defaultHotel6 = async (req, res) => {
  try {
    const data = {
      name: 'Hotel conquistador',
      country: 'Guatemala',
      address: 'Vía 5, 4-58. Zona 4. Ciudad de Guatemala',
      description:
        'Conquistador Hotel & Conference Center posee una ubicación privilegiada a 15 minutos del aeropuerto. Rodeado de centros de financieros, comerciales, museos, teatros y el Centro Histórico hacen que sea un lugar ideal para su estancia en viajes de negocios o turísticos.',
    };
    let defualtCreated = await Hotel.findOne({ name: data.name });
    if (!defualtCreated) {
      let hotel = new Hotel(data);
      await hotel.save();
      console.log('Hotel default creado con exito');
    } else {
      console.log('Hotel default creado con anterioridad');
    }
  } catch (err) {
    console.error(err);
    console.log('Erro al crear los hoteles default por defecto');
  }
};
