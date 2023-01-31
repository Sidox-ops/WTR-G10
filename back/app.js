const cookieParser = require("cookie-parser");
const logger = require("morgan");
const trainAI = require("./chatbotService.js");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectIo = require("./chatbotService.js");
const moment = require("moment");
const mongoose = require("mongoose");


const Moto = require("./models/moto");

//try three times to connect to the database
// mongoose
//   .connect("mongodb://localhost:27017/moto", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch((error) => {
//     console.log("Connection failed!", error);
//   });

  mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database");
});

app.use(cors());

const port = process.env.PORT || 9000;
app.set("port", port);

const server = http.createServer(app);
var io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
connectIo.connectWebSocket(io);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//train the AI
trainAI.trainChatBotIA();

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.get("/api/moto", (req, res, next) => {
    const motos = [
      {
        "id": 1,
        "title": "Yamaha R6",
        "price": 11999,
        "description": "La Yamaha R6 est une moto sportive puissante et performante, dotée d'un moteur de 600cc et d'un châssis léger en aluminium. Idéale pour les pistes de course et les longues balades sur la route.",
        "category": "motorcycles",
        "image": "https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_960_720.jpg",
        "rating": {
            "rate": 4.5,
            "count": 40
        }
      },
      {
        "id": 2,
        "title": "Ducati Panigale V4",
        "price": 21499,
        "description": "La Ducati Panigale V4 est une moto de course dérivée pour la route. Avec son moteur V4 de 214cv, elle offre une expérience de conduite explosive et une performance de niveau de course.",
        "category": "motorcycles",
        "image": "https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_960_720.jpg",
        "rating": {
            "rate": 4.8,
            "count": 30
        }
      },
      {
        "id": 3,
        "title": "Harley-Davidson Street Glide",
        "price": 19999,
        "description": "La Harley-Davidson Street Glide est un modèle de touring classique, équipé d'un moteur V-Twin puissant et confortable pour les longs trajets sur la route. Avec son design élégant, elle est également idéale pour les sorties en ville.",
        "category": "motorcycles",
        "image": "https://cdn.pixabay.com/photo/2015/08/27/09/06/bike-909690__340.jpg",
        "rating": {
            "rate": 4.2,
            "count": 50
        }
      },
      {
        "id": 4,
        "title": "Kawasaki Z H2",
        "price": 15999,
        "description": "La Kawasaki Z H2 est une moto de sport de caractère, dotée d'un moteur 998cc supercharge et d'une technologie avancée. Avec son style distinctif, elle est capable de livrer des performances exceptionnelles sur la route et sur la piste.",
        "category": "motorcycles",
        "image": "https://cdn.pixabay.com/photo/2016/03/27/17/59/motorcycle-1283299__340.jpg",
        "rating": {
            "rate": 4.6,
            "count": 35
        }
      },
      {
        "id": 1,
        "title": "Yamaha R6",
        "price": 11999,
        "description": "La Yamaha R6 est une moto sportive puissante et performante, dotée d'un moteur de 600cc et d'un châssis léger en aluminium. Idéale pour les pistes de course et les longues balades sur la route.",
        "category": "motorcycles",
        "image": "https://cdn.pixabay.com/photo/2014/12/16/03/37/motorcycle-569865__340.jpg",
        "rating": {
            "rate": 4.5,
            "count": 40
        }
      },
      {
        "id": 2,
        "title": "Ducati Panigale V4",
        "price": 21499,
        "description": "La Ducati Panigale V4 est une moto de course dérivée pour la route. Avec son moteur V4 de 214cv, elle offre une expérience de conduite explosive et une performance de niveau de course.",
        "category": "motorcycles",
        "image": "https://motos.fr/img/ducati-panigale-v4.jpg",
        "rating": {
            "rate": 4.8,
            "count": 30
        }
      },
      {
        "id": 3,
        "title": "Harley-Davidson Street Glide",
        "price": 19999,
        "description": "La Harley-Davidson Street Glide est un modèle de touring classique, équipé d'un moteur V-Twin puissant et confortable pour les longs trajets sur la route. Avec son design élégant, elle est également idéale pour les sorties en ville.",
        "category": "motorcycles",
        "image": "https://motos.fr/img/harley-davidson-street-glide.jpg",
        "rating": {
            "rate": 4.2,
            "count": 50
        }
      },
      {
        "id": 4,
        "title": "Kawasaki Z H2",
        "price": 15999,
        "description": "La Kawasaki Z H2 est une moto de sport de caractère, dotée d'un moteur 998cc supercharge et d'une technologie avancée. Avec son style distinctif, elle est capable de livrer des performances exceptionnelles sur la route et sur la piste.",
        "category": "motorcycles",
        "image": "https://motos.fr/img/kawasaki-z-h2.jpg",
        "rating": {
            "rate": 4.6,
            "count": 35
        }
      },{
        "id": 1,
        "title": "Yamaha R6",
        "price": 11999,
        "description": "La Yamaha R6 est une moto sportive puissante et performante, dotée d'un moteur de 600cc et d'un châssis léger en aluminium. Idéale pour les pistes de course et les longues balades sur la route.",
        "category": "motorcycles",
        "image": "https://motos.fr/img/yamaha-r6.jpg",
        "rating": {
            "rate": 4.5,
            "count": 40
        }
      },
      {
        "id": 2,
        "title": "Ducati Panigale V4",
        "price": 21499,
        "description": "La Ducati Panigale V4 est une moto de course dérivée pour la route. Avec son moteur V4 de 214cv, elle offre une expérience de conduite explosive et une performance de niveau de course.",
        "category": "motorcycles",
        "image": "https://motos.fr/img/ducati-panigale-v4.jpg",
        "rating": {
            "rate": 4.8,
            "count": 30
        }
      },
      {
        "id": 3,
        "title": "Harley-Davidson Street Glide",
        "price": 19999,
        "description": "La Harley-Davidson Street Glide est un modèle de touring classique, équipé d'un moteur V-Twin puissant et confortable pour les longs trajets sur la route. Avec son design élégant, elle est également idéale pour les sorties en ville.",
        "category": "motorcycles",
        "image": "https://motos.fr/img/harley-davidson-street-glide.jpg",
        "rating": {
            "rate": 4.2,
            "count": 50
        }
      },
      {
        "id": 4,
        "title": "Kawasaki Z H2",
        "price": 15999,
        "description": "La Kawasaki Z H2 est une moto de sport de caractère, dotée d'un moteur 998cc supercharge et d'une technologie avancée. Avec son style distinctif, elle est capable de livrer des performances exceptionnelles sur la route et sur la piste.",
        "category": "motorcycles",
        "image": "https://motos.fr/img/kawasaki-z-h2.jpg",
        "rating": {
            "rate": 4.6,
            "count": 35
        }
      }
    ]
    res.status(200).json(motos);
});

app.post("/api/moto", (req, res, next) => {
  delete req.body._id;
  const moto = new Moto({
    ...req.body,
  });
  moto.save().then((createdMoto) => {
    res.status(201).json({
      message: "Moto added successfully",
      motoId: createdMoto._id,
    });
  });
  moto.save()
    .then((createdMoto) => {res.status(201).json({message: "Moto added successfully", motoId: createdMoto._id,});})
    .catch((error) => {res.status(500).json({message: "Creating a moto failed!", error});});
});

server.listen(port, () => {
  console.log("SERVER IS RUNNING ON PORT " + port + "");
});
io.on("connection", (socket) => {
  console.log("USER CONNECTED " + socket.id + ""); // x8WIv7-mJelg7on_ALbx
});
