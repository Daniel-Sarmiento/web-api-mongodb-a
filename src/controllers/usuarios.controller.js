const usuarioModel = require('../models/usuario.model')

const create = async (req, res) => {
    try {
        let usuario = new usuarioModel({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password
        });
    
        await usuario.save();
    
        return res.status(201).json({
            message: "usuario creado exitosamente!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "falló al crear el usuario!",
            error: error.message
        });
    }
};

module.exports = {
    create
}
