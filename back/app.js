const cookieParser = require('cookie-parser');
const logger = require('morgan');
const trainAI = require('./chatbotService');
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectIo = require('./chatbotService');

app.use(cors());

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


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

// console.log(connectIo);
// console.log(io.sockets);

server.listen(port, () => {
  console.log("SERVER IS RUNNING ON PORT " + port + "");
});
io.on("connection", (socket) => {
  console.log("USER CONNECTED "+ socket.id+""); // x8WIv7-mJelg7on_ALbx
});

