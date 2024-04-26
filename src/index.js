import { initServer } from './configs/app.js'
import { connect } from './db/mongo.js'

initServer()
connect()