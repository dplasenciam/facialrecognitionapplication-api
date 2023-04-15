// Importing express.js
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const knex = require("knex");

//Importing controllers
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// Creating the connection
/*
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "dplasencia",
    database: "smart-brain",
  },
});
*/
const db = knex({
  client: "pg",
  connection: {
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
  },
});

// Using Express
const app = express();

// Parsing JSON entries
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  //db.select("*")
  // .from("users")
  //  .then((data) => res.json(data));

  res.json("Hola mundo");
});

// TO CHECK IF THE USER AND PASSWORD YOU ENTERED ARE CORRECT
app.post("/signin", signin.handleSignin(db, bcrypt));

// TO REGISTER A NEW USER
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// TO GET THE INFORMATION ABOUT AN USER
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

// TO UPDATE THE NUMBER OF ENTRIES
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

// it will run after the listen happens
app.listen(process.env.PORT || 3001, () => {
  console.log("app is running in port tcp 3001");
});
