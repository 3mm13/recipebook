const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validator = require('../middleware/validate')

router.get('/', userController.getAll);
router.post('/', validator.addUser, userController.createUser);
router.put('/:id', validator.addUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;