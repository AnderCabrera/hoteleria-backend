'use strict';

import Hotel from '../models/hotel.model.js';
import Room from '../models/room.model.js';
import FavoriteHotel from '../models/favorite-hotels.model.js';
import HotelImages from '../models/hotelImages.model.js';
import Review from '../models/review.model.js';
import { addInitialImage } from './hotelImages.controller.js';
import { roomDefault } from './room.controller.js';
import { serviceDefault } from './service.controller.js';

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

    await Room.deleteMany({ idHotel: id });
    await FavoriteHotel.deleteMany({ hotel_id: id });
    await HotelImages.deleteMany({ hotel_id: id });
    await Review.deleteMany({ hotel_id: id });

    return res.status(200).send({
      message: `El hotel ${deletedHotel.name} ha sido eliminado`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al eliminar el hotel' });
  }
};

export const viewHotels = async (req, res) => {
  try {
    let hotelsFound = await Hotel.find({});

    if (!hotelsFound)
      return res.status(404).send({ message: 'No se han encontrado hoteles' });

    return res.send({ hotelsFound });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error al visualizar los hoteles' });
  }
};
export const viewHotelsSearch = async (req, res) => {
  try {
    let { id } = req.params;
    let hotelsFound = await Hotel.find({ _id: id });
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
      await addInitialImage(
        'https://images.trvl-media.com/lodging/1000000/10000/2500/2495/e890be21.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
        hotel.name,
      );
      await roomDefault(
        'Habitación básica',
        1,
        40,
        'Individual',
        hotel.name,
        'https://www.derbyhotels.com/files/img/img_s/as-single-1-970.jpg',
      );
      await roomDefault(
        'Habitación doble',
        2,
        50,
        'Doble',
        hotel.name,
        'https://pensua.com/wp-content/uploads/Doble_estandar2camas.jpg',
      );
      await roomDefault(
        'Habitación premium',
        2,
        70,
        'Suite',
        hotel.name,
        'https://www.lavanguardia.com/files/article_gallery_microformat/uploads/2018/05/30/5fa437b2daf14.jpeg',
      );
      await serviceDefault(
        'WI-FI',
        'Acceso a internet inalambricamente',
        4,
        hotel.name,
      );
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
      await addInitialImage(
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/509957921.jpg?k=cd6cb6f7a90d9241592d3c5cd5a31d1fd3a0c9ce3ff0087e78b1c4ae710eb7f7&o=&hp=1',
        hotel.name,
      );
      await roomDefault(
        'Habitación básica',
        1,
        40,
        'Individual',
        hotel.name,
        'https://www.derbyhotels.com/files/img/img_s/as-single-1-970.jpg',
      );
      await roomDefault(
        'Habitación doble',
        2,
        50,
        'Doble',
        hotel.name,
        'https://pensua.com/wp-content/uploads/Doble_estandar2camas.jpg',
      );
      await roomDefault(
        'Habitación premium',
        2,
        70,
        'Suite',
        hotel.name,
        'https://www.lavanguardia.com/files/article_gallery_microformat/uploads/2018/05/30/5fa437b2daf14.jpeg',
      );
      await serviceDefault(
        'WI-FI',
        'Acceso a internet inalambricamente',
        4,
        hotel.name,
      );
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
      await addInitialImage(
        'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2017/08/27/2245/Hyatt-Centric-Guatemala-City-P033-Daylight-Exterior.jpg/Hyatt-Centric-Guatemala-City-P033-Daylight-Exterior.4x3.jpg?imwidth=628',
        hotel.name,
      );
      await roomDefault(
        'Habitación básica',
        1,
        40,
        'Individual',
        hotel.name,
        'https://www.derbyhotels.com/files/img/img_s/as-single-1-970.jpg',
      );
      await roomDefault(
        'Habitación doble',
        2,
        50,
        'Doble',
        hotel.name,
        'https://pensua.com/wp-content/uploads/Doble_estandar2camas.jpg',
      );
      await roomDefault(
        'Habitación premium',
        2,
        70,
        'Suite',
        hotel.name,
        'https://www.lavanguardia.com/files/article_gallery_microformat/uploads/2018/05/30/5fa437b2daf14.jpeg',
      );
      await serviceDefault(
        'WI-FI',
        'Acceso a internet inalambricamente',
        4,
        hotel.name,
      );
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
      await addInitialImage(
        'https://cf.bstatic.com/xdata/images/hotel/max500/513380399.jpg?k=a994c00aadde572aa3b4b1d39a7e8944a8217262c9850643de4435bd2e381a6d&o=&hp=1',
        hotel.name,
      );
      await roomDefault(
        'Habitación básica',
        1,
        40,
        'Individual',
        hotel.name,
        'https://www.derbyhotels.com/files/img/img_s/as-single-1-970.jpg',
      );
      await roomDefault(
        'Habitación doble',
        2,
        50,
        'Doble',
        hotel.name,
        'https://pensua.com/wp-content/uploads/Doble_estandar2camas.jpg',
      );
      await roomDefault(
        'Habitación premium',
        2,
        70,
        'Suite',
        hotel.name,
        'https://www.lavanguardia.com/files/article_gallery_microformat/uploads/2018/05/30/5fa437b2daf14.jpeg',
      );
      await serviceDefault(
        'WI-FI',
        'Acceso a internet inalambricamente',
        4,
        hotel.name,
      );
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
      await addInitialImage(
        'https://www.hilton.com/im/en/GUAGCGI/1454889/guagcgi-hotel-exterior-day-.jpg?impolicy=crop&cw=4928&ch=2759&gravity=NorthWest&xposition=0&yposition=252&rw=768&rh=430',
        hotel.name,
      );
      await roomDefault(
        'Habitación básica',
        1,
        40,
        'Individual',
        hotel.name,
        'https://www.derbyhotels.com/files/img/img_s/as-single-1-970.jpg',
      );
      await roomDefault(
        'Habitación doble',
        2,
        50,
        'Doble',
        hotel.name,
        'https://pensua.com/wp-content/uploads/Doble_estandar2camas.jpg',
      );
      await roomDefault(
        'Habitación premium',
        2,
        70,
        'Suite',
        hotel.name,
        'https://www.lavanguardia.com/files/article_gallery_microformat/uploads/2018/05/30/5fa437b2daf14.jpeg',
      );
      await serviceDefault(
        'WI-FI',
        'Acceso a internet inalambricamente',
        4,
        hotel.name,
      );
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
      await addInitialImage(
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/215129867.jpg?k=aa615ee89da2d9a4b2565cd8e5ad3675f5418b93c09d95cd8ed7dd2230bb29c3&o=&hp=1',
        hotel.name,
      );
      await roomDefault(
        'Habitación básica',
        1,
        40,
        'Individual',
        hotel.name,
        'https://www.derbyhotels.com/files/img/img_s/as-single-1-970.jpg',
      );
      await roomDefault(
        'Habitación doble',
        2,
        50,
        'Doble',
        hotel.name,
        'https://pensua.com/wp-content/uploads/Doble_estandar2camas.jpg',
      );
      await roomDefault(
        'Habitación premium',
        2,
        70,
        'Suite',
        hotel.name,
        'https://www.lavanguardia.com/files/article_gallery_microformat/uploads/2018/05/30/5fa437b2daf14.jpeg',
      );
      await serviceDefault(
        'WI-FI',
        'Acceso a internet inalambricamente',
        4,
        hotel.name,
      );
    } else {
      console.log('Hotel default creado con anterioridad');
    }
  } catch (err) {
    console.error(err);
    console.log('Erro al crear los hoteles default por defecto');
  }
};
