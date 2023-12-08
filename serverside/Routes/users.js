import express from "express";
import bodyParser from "body-parser";

// import controllers for home
import * as usersControllers from "../controllers/users.js";

// define router
const usersRouter = express.Router();

// CRUD, filtering and searching route for data to be displayed when browser calls '/'
usersRouter.get("/", usersControllers.getAllUsers);
usersRouter.get("/filter", usersControllers.filterUsers);
usersRouter.get("/search-by-name", usersControllers.findUsersByName);
usersRouter.get("/:id", usersControllers.getUser);
usersRouter.post("/", usersControllers.postUser);
usersRouter.patch("/:id", usersControllers.updateUser);
usersRouter.put("/:id", usersControllers.updateUser);
usersRouter.delete("/:id", usersControllers.deleteUser);

export default usersRouter;