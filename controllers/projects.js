const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('projects').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};



const getSingle = async (req, res) => {
  const projectId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('projects').find({ _id: projectId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};



// creates a new contact and document in the collection
const createProject = async (req, res) => {
  const project = {
    jeepName: req.body.jeepName,
    projectName: req.body.projectName,
    description: req.body.description,
    partNeeded1: req.body.partNeeded1,
    partNeeded2: req.body.partNeeded2,
    partsOnhand: req.body.partsOnhand,
    startDate: req.body.startDate,
    hoursToComplete: req.body.hoursToComplete
  };
  const response = await mongodb.getDb().db().collection('projects').insertOne(project);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the project.');
  }
};



// Updates a project in a document
const updateProject = async (req, res) => {
  const projectId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const project = {
    jeepName: req.body.jeepName,
    projectName: req.body.projectName,
    description: req.body.description,
    partNeeded1: req.body.partNeeded1,
    partNeeded2: req.body.partNeeded2,
    partsOnhand: req.body.partsOnhand,
    startDate: req.body.startDate,
    hoursToComplete: req.body.hoursToComplete
  };
  const response = await mongodb
    .getDb().db().collection('projects').replaceOne({ _id: projectId }, project);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the project.');
  }
};


// deletes a document in the collection
const deleteProject = async (req, res) => {
  const projectId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('projects').deleteOne({ _id: projectId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the project.');
  }
};



module.exports = {
  getAll,
  getSingle,
  createProject,
  updateProject,
  deleteProject
};
