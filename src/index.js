import { initServer } from './configs/app.js'
import { connect } from './db/mongo.js'
import { userAdminDefault } from './controllers/user.controller.js'
import { defaultHotel, defaultHotel2, defaultHotel3, defaultHotel4, defaultHotel5, defaultHotel6 } from './controllers/hotel.controller.js'

initServer()
connect()
userAdminDefault()
defaultHotel()
defaultHotel2()
defaultHotel3()
defaultHotel4()
defaultHotel5()
defaultHotel6()