// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Star Wars Characters (DATA)
// =============================================================
var reservations = [{
  routeName: "smith20",
  name: "Smith",
  phone: "732-123-4444",
  email: "smithfamily@gmail.com",
  uid: "smith20"
}, {
  routeName: "jones99",
  name: "jones99",
  phone: "732-456-5555",
  email: "jonesfambly@gmail.com",
  uid: "jones99"
}, {
  routeName: "walters11",
  name: "Walters",
  phone: "908-405-1111",
  email: "walters@verizon.net",
  uid: "walters11"
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:reservations?", function(req, res) {
  var chosen = req.params.reservations;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        res.json(reservations[i]);
        return;
      }
    }

    res.json(false);
  }
  else {
    res.json(reservations);
  }
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  var newReservation = req.body;

  console.log(newReservation);

  characters.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
  });