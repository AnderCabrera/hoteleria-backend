'use strict'

import Hotel from '../models/hotel.model.js'

export const newHotel = async(req, res) => {
    try{
        let data = req.body
        let hotel = new Hotel(data)
        await hotel.save()
        return res.send({message: 'Hotel creado con exito'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al agregar el hotel'})
    }
}

export const updateHotel = async(req, res) => {
    try{

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al actualizar el hotel'})
    }
}