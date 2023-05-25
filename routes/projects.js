const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projects');
const validation = require('../middleware/validate');

router.get('/', projectsController.getAll);

router.get('/:id', projectsController.getSingle);

// routes for post, put and delete a project
router.post('/', validation.saveProject, projectsController.createProject);

router.put('/:id', validation.saveProject, projectsController.updateProject);

router.delete('/:id', projectsController.deleteProject);

module.exports = router;