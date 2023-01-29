// basic node app

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");

// connect to mongoDB
mongoose.connect("mongodb://localhost:27017/simple-ecart", {
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Convertir le schéma en modèle MongoDB
const User = mongoose.model("User", userSchema);

io.on("connection", (socket) => {
  // Écouter les demandes d'authentification
  socket.on("authenticate", (data) => {
    // Trouver un utilisateur correspondant à l'identifiant et au mot de passe fournis
    User.findOne(
      { username: data.username, password: data.password },
      (err, user) => {
        if (err) {
          console.error(err);
        } else if (user) {
          // Si un utilisateur est trouvé, envoyer une réponse positive
          socket.emit("authenticated", {
            message: "Authentication successful",
          });
        } else {
          // Sinon, envoyer une réponse négative
          socket.emit("authenticated", { message: "Authentication failed" });
        }
      }
    );
  });
});

// define default port for express app
const PORT = process.env.PORT || 8000;

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello World 2 !");
});

// start the Express server
server.listen(PORT, () => {
  console.log("Example app listening on port 8000!");
});
