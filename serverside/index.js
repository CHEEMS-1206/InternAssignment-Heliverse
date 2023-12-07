// Nescessary imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// importing all routers


// importing database config code and rendering for config folder
import "./config/config.js";

// constructed a server
const SERVER = express();

// parsing the json, cors policy url encoding and json formatting
SERVER.use(bodyParser.json());
SERVER.use(cors());
SERVER.use(express.urlencoded({ extended: true }));
SERVER.use(express.json());

//MIDDLEWARES

// defining port for backend rest server
const PORT = 5001;

// run the server at PORT
SERVER.listen(PORT, () =>
  console.log(`server running at: http://localhost:${PORT} `)
);