require("dotenv").config();
const express = require("express"); /// import express
const app = express(); //execution express
const db = require("./database/dbconfig"); //connection db
const cors = require("cors"); //blockage acces
const auth = require("./routes/authRoute");
const user = require("./routes/routeUser");
const conge = require("./routes/routeConge");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
db.connect((error) => {
  if (error) throw error;
  console.log("Connected to db ");
});

// root 

app.use("/auth", auth);
app.use("/user", user);
app.use("/conge", conge);





//end root

app.use((req, res) => {
    res.status(404).json({ error: "api not found" });
  });
module.exports = app;
