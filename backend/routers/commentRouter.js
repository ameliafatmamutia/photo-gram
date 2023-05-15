const express = require('express')
const { commentController } = require('../controllers/index')
const router = express.Router()

router.post('/', commentController.createComment)
router.delete('/:id', commentController.deleteComment)
router.get('/', commentController.getComment)
router.get('/:id', commentController.fetchComment)

module.exports = router