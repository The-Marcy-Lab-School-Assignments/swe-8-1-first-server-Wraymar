// index.js
const express = require("express");
const app = express();

// The path module is useful for constructing relative filepaths
const path = require("path");

// the filepath is to the entire assets folder
const filepath = path.join(__dirname, "../frontend/dist");

// generate middleware using the filepath
const serveStatic = express.static(filepath);

// other controllers
// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

// Register the logRoutes middleware globally to log all requests
app.use(logRoutes);
// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

const servePicture = (req, res, next) => {
  const obj = {
    src: `https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg`,
  };
  // Send a picture as a response
  res.send(obj);
};

const serveJoke = (req, res, next) => {
  const obj = {
    setup: "what do you call a pile of kittens?",
    punchline: "a meowntain",
  };

  res.send(obj);
};

const rollDie = (req, res, next) => {
  //if there was no query parameter then we roll once
  //if there is a quantity then we roll the amount specified

  //to define the query needed we use req.query."whatever u wanna call it"
  const quantity = Number(req.query.quantity) || 1;
  const obj = { rolls: [] };

  const getRolls = (quantity) => {
    for (let i = 0; i < quantity; i++) {
      obj.rolls.push(Math.floor(Math.random() * 6) + 1);
    }
  };

  getRolls(quantity);

  res.send(obj);
};

// Other endpoints and controllers
app.get("/api/picture", servePicture);
app.get("/api/joke", serveJoke);
app.get("/api/rollDie", rollDie);

const port = 8080;
// run the server application on port 8080 of the current host (http://localhost during development)
app.listen(port);
