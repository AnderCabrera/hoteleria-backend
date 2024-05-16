import { initServer } from './configs/app.js';
import { connect } from './db/mongo.js';
import { userAdminDefault } from './controllers/user.controller.js';
import { typeRoomDefault } from './controllers/typeRoom.controller.js';
import {
  defaultHotel,
  defaultHotel2,
  defaultHotel3,
  defaultHotel4,
  defaultHotel5,
  defaultHotel6,
} from './controllers/hotel.controller.js';

initServer();
connect();

const cosasDefault = async () => {
  await userAdminDefault();
  await typeRoomDefault('Individual');
  await typeRoomDefault('Doble');
  await typeRoomDefault('Suite');
  await defaultHotel();
  await defaultHotel2();
  await defaultHotel3();
  await defaultHotel4();
  await defaultHotel5();
  await defaultHotel6();
};

cosasDefault();
