// Controllers for users '/' after URL => http://localhost:5000/api/users

// importing model for rabbit
import usersModel from "../Models/usersModel.js";

// getting a particular user from the database by the given id
export const getUser = async (req, res) => {
  try {
    const query = await usersModel.findOne(req.params.u_id);
    if (query) {
      res.status(200).json(query);
    } else {
      res.status(400).json({
        msg: "No users found with this id !",
      });
    }
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};

// getting list of all users in the database
export const getAllUsers = async (req, res) => {
  try {
    const query = await usersModel.find();
    if (query) {
      res.status(200).json(query);
    } else {
      res.status(400).json({
        msg: "Oops No user available !",
      });
    }
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};

// Adding a new user in the database
export const postUser = async (req, res) => {
  const newUser = new usersModel({
    _id : req.body._id,
    u_id: req.body.u_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    avatar: req.body.avatar,
    domain: req.body.domain,
    available: req.body.available,
  });
  try {
    const addingNewUser = await newUser.save();
    res.status(200).json(newUser);
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};

// updating details for the user in the database with the id
export const updateUser = async (req, res) => {
  try {
    const query = await usersModel.findOneAndUpdate(
      req.params.u_id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!query) {
      res.status(400).json({ msg: "No user exists with this id !!" });
    } else {
      res.status(200).json(query);
    }
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

// deleting user from the database with the given id
export const deleteUser = async (req, res) => {
  try {
    const query = await usersModel.findOneAndDelete(
      req.params.u_id
    );
    if (!query) {
      res.status(400).json({ msg: "No user exists with this id !!" });
    } else {
      res.status(200).json(query);
    }
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};