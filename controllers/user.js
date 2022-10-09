const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .find()
    .toArray((err, lists) => {
      if(err) {
        res.status(400).json({ message: err }) || "There was an error while trying to perform this command. Please try again.";
      }
      else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      }
      
    });
  };

  const createUser = async (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      birthday: req.body.birthday,
      recipes: [
      ]

    }
    const response = await mongodb
    .getDb()
    .db()
    .collection('user')
    .insertOne(user);

    if(response.acknowledged) {
      res.status(201).json(response);

    }
    else {
      res.status(500).json(response.error || 'An error occurred while trying to add an user. Please try again');
    }
  
  };

  const updateUser = async (req, res) => {
      const userId = new ObjectId(req.params.id);
      const user = {
        firstName: req.params.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
      }
      const response = await mongodb
      .getDb()
      .db()
      .collection('user')
      .replaceOne({ _id: userId }, user);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
      }
}

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
  .getDb()
  .db()
  .collection('user').
  remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

  module.exports = {
    getAll,
    createUser,
    updateUser,
    deleteUser
  }