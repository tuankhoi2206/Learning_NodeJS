const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 9000;
/* Start server */
server.listen(port, function () {
  console.log('Server listening at port ' + port);
});

const EVENT_CONST = {
  CONNECTION: 'connection',
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message',
  USER_JOIN: 'user_join'
};

io.on(EVENT_CONST.CONNECTION, function (socket) {
  console.log('a socket connected');
  var addedUser = false;
  // socket receive message to client
  socket.on(EVENT_CONST.SEND_MESSAGE, function (text) {
    console.log(socket.username);
    // gửi tin nhắn tới các client đang kết nối socket
    // ngoại trừ client đang kết nối (gửi tin nhắn)
    socket.broadcast.emit(EVENT_CONST.RECEIVE_MESSAGE, {
      username: socket.username,
      text: text
    });
  });

  // socket client  join vào room chát
  socket.on(EVENT_CONST.USER_JOIN, function (username) {
    if (addedUser)
      return false;
    socket.username = username;
    console.log('user_join: ' + socket.username);
    ++numUsers;
    addedUser = true;
    // báo cho client đang join phòng thành công
    socket.emit('login', {
      numberUsers: numUsers
    });
    // báo cho client khác biết có người mới join vào phòng
    socket.broadcast.emit('new_user_join', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  socket.on('disconnect', function () {
    if (addedUser)
      --numUsers;
    socket.broadcast.emit('user_left', {
      username: socket.username,
      numUsers: numUsers
    });
  })
});
