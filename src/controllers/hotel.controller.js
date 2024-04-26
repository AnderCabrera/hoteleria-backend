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
        let { id } = req.params
        let data = req.body
        let updatedHotel = await Hotel.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedHotel) return res.status(404).send({message: 'Hotel no encontrado, no se ha actualizado'})
        return res.send({message: 'Hotel actualizado', updatedHotel})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al actualizar el hotel'})
    }
}

export const deleteHotel = async(req, res) => {
    try{
        let { id } = req.params
        let deletedHotel = await Hotel.findOneAndDelete({_id: id})
        if(!deletedHotel) return res.status(404).send({message: 'Hotel no encontrado, no se ha actualizado'})
        return res.send({message: `El hotel ${deletedHotel.name} ha sido eliminado`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al eliminar el hotel'})
    }
}

export const viewHotels = async(req, res) => {
    try{
        let hotelsFound = await Hotel.find()
        if(!hotelsFound) return res.status(404).send({message: 'No se han encontrado hoteles'})
        return res.send({hotelsFound})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al visualizar los hoteles'})
    }
}