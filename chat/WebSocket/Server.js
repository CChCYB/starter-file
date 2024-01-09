const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer);

// 用于存储消息的数组，模拟保存到数据库的操作
const messages = [];

io.on('connection', (socket) => {
//   console.log('A user connected');

  // 发送已有的消息给新连接的客户端
  socket.emit('allMessages', messages);

  socket.on('sendMessage', ({ address, msg }) => {
    // 处理消息逻辑，例如保存到数据库
    // 模拟保存到数据库的操作，将消息存储在服务器端的数组中
    messages.push({ address, msg });

    // 广播消息给所有连接的客户端
    io.emit('newMessage', { address, msg });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

httpServer.listen(3004, () => {
  console.log('WebSocket server listening on port 3004');
});
