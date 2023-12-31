// Controllers for users '/' after URL => http://localhost:5000/api/users

// importing model for rabbit
import usersModel from "../Models/usersModel.js";

// getting a particular user from the database by the given id
export const getUser = async (req, res) => {
  try {
    const query = await usersModel.findOne({ u_id: req.params.id });
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

// Getting list of all users in the database with pagination
export const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default page is 1 and limit is 25, if not provided

  try {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const totalUsers = await usersModel.countDocuments({});
    const totalPages = Math.ceil(totalUsers / limitNumber);

    const users = await usersModel
      .find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    if (users.length > 0) {
      res.status(200).json({
        users,
        currentPage: pageNumber,
        totalPages,
      });
    } else {
      res.status(404).json({
        msg: "Oops! No users available.",
      });
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// Adding a new user in the database
export const postUser = async (req, res) => {
  const newUser = new usersModel({
    _id: req.body._id,
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
      { u_id: req.params.id },
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
    const query = await usersModel.findOneAndDelete({ u_id: req.params.id });
    if (!query) {
      res.status(400).json({ msg: "No user exists with this id !!" });
    } else {
      res.status(200).json(query);
    }
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

// Filtering user on basis of Domain, Gender and Availability
export const filterUsers = async (req, res) => {
  try {
    let { domain, gender, available, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    let reqQuery = {};

    if (domain) {
      reqQuery.domain = domain;
    }
    if (gender) {
      reqQuery.gender = gender;
    }
    if (available !== undefined) {
      if (available === "true" || available === "false") {
        console.log(available);
        reqQuery.available = available === "true";
      } else {
        return res
          .status(400)
          .json({ msg: "Available parameter must be a boolean" });
      }
    }

    const filteredUsers = await usersModel
      .find(reqQuery)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalUsers = await filterUsers.length;
    const totalPages = Math.ceil(totalUsers / limitNumber);

    if (!filteredUsers) {
      return res
        .status(400)
        .json({ msg: "No user exists with these filters applied." });
    } else {
      return res
        .status(200)
        .json({ users: filteredUsers, currentPage: pageNumber, totalPages });
    }
  } catch (error) {
    res.status(500).json({ error: `Error filtering users: ${error.message}` });
  }
};

// Controller to search users by name
export const findUsersByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ error: "Please provide a name to search." });
    }

    // Perform a case-insensitive search for users by name
    const users = await usersModel.find({
      $or: [
        { first_name: { $regex: new RegExp(name, "i") } },
        { last_name: { $regex: new RegExp(name, "i") } },
      ],
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found with this name." });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error finding users by name: ${error.message}` });
  }
};