const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb
    .getDb()
    .db()
    .collection('user')
    .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
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
  
  }

  module.exports = {
    getAll,
    createUser
  }