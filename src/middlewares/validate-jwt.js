import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const validateJwt = async(req, res, next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        if(!token) return res.status(401).send({message: 'No esta autorizado'})
        let { uid } = jwt.verify(token, secretKey)
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message: 'Usuario no encontrado - sin autorización'})
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Token invalido o expirado'})
    }
}

export const isAdmin = async(req, res, next)=>{
    try{
        let { role, name, username } = req.user
        if(!role || role !== 'ADMIN') res.status(401).send({message: `No tienes acceso ${username}`})
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Rol sin autorización'})
    }
}