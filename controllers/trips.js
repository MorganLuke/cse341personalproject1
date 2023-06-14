const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// const getAll = async (req, res) => {
//   const result = await mongodb.getDb().db().collection('trips').find();
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists);
//   });
// };

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('trips').find().toArray();
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No trips found.' });
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
      res.status(400).json('Must use a valid trip id to find a trip.');
    }
    const tripId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('trips').find({ _id: tripId }).toArray();
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'trip not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};



// creates a new contact and document in the collection
const createTrip = async (req, res) => {
  try{
  const trip = {
    tripName: req.body.tripName,
    description: req.body.description,
    friendOnTrip: req.body.friendOnTrip,
    vehicle: req.body.vehicle,
    camping: req.body.camping,
    tripDate: req.body.tripDate,
    numberOfNights: req.body.numberOfNights,
    milesFromHouse: req.body.milesFromHouse
  };
  const response = await mongodb.getDb().db().collection('trips').insertOne(trip);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the trip.');
  }
} catch (err) {
  res.status(500).json(err);
}
};



// Updates a trip in a document
const updateTrip = async (req, res) => {
  try{
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid trip id to find a trip.');
  }
  const tripId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const trip = {
    tripName: req.body.tripName,
    description: req.body.description,
    friendOnTrip: req.body.friendOnTrip,
    vehicle: req.body.vehicle,
    camping: req.body.camping,
    tripDate: req.body.tripDate,
    numberOfNights: req.body.numberOfNights,
    milesFromHouse: req.body.milesFromHouse
  };
  const response = await mongodb
    .getDb().db().collection('trips').replaceOne({ _id: tripId }, trip);
  console.log(response);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the trip.');
  }
} catch (err) {
  res.status(500).json(err);
}
};



// deletes a document in the collection
const deleteTrip = async (req, res) => {
  try{
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid trip id to find a trip.');
  }
  const tripId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('trips').deleteOne({ _id: tripId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the trip.');
  }
  } catch (err) {
  res.status(500).json(err);
}
};



module.exports = {
  getAll,
  getSingle,
  createTrip,
  updateTrip,
  deleteTrip
};
