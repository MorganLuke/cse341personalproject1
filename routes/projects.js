const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projects');

router.get('/', projectsController.getAll);

router.get('/:id', projectsController.getSingle);

// routes for post, put and delete a project
router.post('/', projectsController.createProject);

router.put('/:id', projectsController.updateProject);

router.delete('/:id', projectsController.deleteProject);

module.exports = router;