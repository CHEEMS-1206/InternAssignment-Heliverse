import express from "express";
import bodyParser from "body-parser";

// import controllers for home
import * as authControllers from '../Controllers/Authentication.js';

// define router
const authRouter = express.Router();

authRouter.post("/register", authControllers.register);
authRouter.post("/login", authControllers.login);

export default authRouter;