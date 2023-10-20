const usuarioModel = require('../models/usuario.model');

const index = async (req, res) => {
    try {
        const usuarios = await usuarioModel.find({deleted: false});

        return res.status(200).json({
            message: "se obtuvieron los usuarios correctamente",
            usuarios
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener los usuarios",
            error: error.message
        });
    }
};

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
        return res.status(error.code).json({
            message: "falló al crear el usuario!",
            error: error.message
        });
    }
};

const deleteLogico = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioEliminado = await usuarioModel.findByIdAndUpdate(usuarioId, {deleted: true, deleted_at: new Date()});

        if (!usuarioEliminado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            })
        }

        return res.status(200).json({
            message: "usuario eliminado exitosamente"
        })

    } catch (error) {
        return res.status(500).send({
            message: "ocurrió un error al eliminar el usuario",
            error: error.message
        })
    }
}


const deleteFisico = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioEliminado = await usuarioModel.findByIdAndDelete(usuarioId);

        if (!usuarioEliminado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario eliminado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al eliminar el usuario",
            error: error.message
        })
    }
}

module.exports = {
    index,
    create,
    delete: deleteLogico
} 