const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const clarifiapi = require("./controllers/apicall");
require("dotenv").config();

console.log("HOST", process.env.POSTGRES_USER);
const db = knex({
    client: "pg",
    connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
app.post("/detect", (req, res) => {
    clarifiapi.handleClarifiApiCall(req, res);
});
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// Get all users
// app.get("/", (req, res) => {
//     db.select("*")
//         .from("users")
//         .then((users) => {
//             if (users.length) {
//                 res.json(users);
//             }
//         });
// });

// Signing route
app.post("/signin", (req, res) => {
    signin.handleSignin(req, res, db, bcrypt);
});

// Register route
app.post("/register", (req, res) =>
    register.handleRegister(req, res, db, bcrypt)
);

// Get user profile
app.get("/profile/:id", (req, res) => {
    profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
    image.handleImage(req, res, db);
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});
