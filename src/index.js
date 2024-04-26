import { initServer } from './configs/app.js'
import { connect } from './db/mongo.js'
import { userAdminDefault } from './controllers/user.controller.js'

initServer()
connect()
userAdminDefault()