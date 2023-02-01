const cookieParser = require('cookie-parser');
const logger = require('morgan');
const trainAI = require('./chatbotService');
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectIo = require('./chatbotService');
const mongoose = require('mongoose');

const AuthRoute = require('./routes/auth');

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database");
});


const port = process.env.PORT || 9000;


app.set('port', port);

const server = http.createServer(app);
var io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
connectIo.connectWebSocket(io);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', AuthRoute);



//train the AI
trainAI.trainChatBotIA();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//io middleware to check if user is authenticated
io.use((socket, next) => {
    if (socket.handshake.auth.token) {
    return next();
  }
  return next(new Error('authentication error'));
});

server.listen(port, () => {
  console.log("SERVER IS RUNNING ON PORT " + port + "");
});

io.use((socket, next) => {
  //check
});

