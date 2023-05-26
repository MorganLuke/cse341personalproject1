const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// const getAll = async (req, res) => {
//   const result = await mongodb.getDb().db().collection('projects').find();
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists);
//   });
// };

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('projects').find().toArray();
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No projects found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};



const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid project id to find a project.');
    }
    const projectId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('projects').find({ _id: projectId }).toArray();
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};



// creates a new contact and document in the collection
const createProject = async (req, res) => {
  try{
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
} catch (err) {
  res.status(500).json(err);
}
};



// Updates a project in a document
const updateProject = async (req, res) => {
  try{
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid project id to find a project.');
  }
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
} catch (err) {
  res.status(500).json(err);
}
};



// deletes a document in the collection
const deleteProject = async (req, res) => {
  try{
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid project id to find a project.');
  }
  const projectId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('projects').deleteOne({ _id: projectId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the project.');
  }
  } catch (err) {
  res.status(500).json(err);
}
};



module.exports = {
  getAll,
  getSingle,
  createProject,
  updateProject,
  deleteProject
};
