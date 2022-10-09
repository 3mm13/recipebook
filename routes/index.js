const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/', require('./swagger'))
router.use('/recipe', require('./recipe'));

module.exports = router;