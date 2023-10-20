const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.index);
router.post('/', usuariosController.create);
router.delete('/:id', usuariosController.delete);

module.exports = router;