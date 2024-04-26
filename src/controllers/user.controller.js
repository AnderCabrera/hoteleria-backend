'use strict'

import User from '../models/user.model.js'
import { encrypt, checkPassword } from '../helpers/validator.js'
import { generateJwt } from '../helpers/jwt.js'


export const newUser = async(req, res) => {
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'CLIENT'
        data.tp_status = 'ACTIVE'
        let user = new User(data)
        await user.save()
        return res.send({message: 'Usuario registrado exitosamente'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al crear un nuevo usuario'})
    }
}

export const newAdmin = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'ADMIN'
        data.tp_status = 'ACTIVE'
        let user = new User(data)
        await user.save()
        return res.send({message: 'Admin registrado exitosamente'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registrando al Admin'})
    }
}

export const login = async(req, res)=>{
    try{
        let { email, password } = req.body
        let user = await User.findOne({email: email})
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Bienvenido ${loggedUser.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Credenciales no validas'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al logear'})
    }
}