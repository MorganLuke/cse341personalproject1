const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/projects', require('./projects'));
router.use('/trips', require('./trips'));


module.exports = router;
