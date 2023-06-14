const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const validation = require('../middleware/validate');

router.get('/', tripsController.getAll);

router.get('/:id', tripsController.getSingle);

// routes for post, put and delete a trip
router.post('/', validation.saveTrip, tripsController.createTrip);

router.put('/:id', validation.saveTrip, tripsController.updateTrip);

router.delete('/:id', tripsController.deleteTrip);

module.exports = router;