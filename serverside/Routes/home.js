import express from "express";
import bodyParser from "body-parser";

// import controllers for home
import * as homeControllers from "../controllers/home.js";

// define router
const homeRouter = express.Router();

// get route for data to be displayed when browser calls '/'
homeRouter.get("/", homeControllers.hitHome);
homeRouter.post("/", homeControllers.postHome);
homeRouter.patch("/", homeControllers.updateHome);
homeRouter.put("/", homeControllers.updateHome);
homeRouter.delete("/", homeControllers.deleteHome);

export default homeRouter;