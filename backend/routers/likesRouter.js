const express = require('express')
const { likesController } = require('../controllers/index')
const router = express.Router()

router.post('/:id', likesController.createLike)
router.delete('/:id', likesController.createDislike)

module.exports = router