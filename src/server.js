import http from 'http';
import SocketIO from 'socket.io';
import WebSocket from 'ws';
import express from 'express';
// 실행 명령어 : npm run dev
const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

function onSocketMessage(sockets, msg) {
  const message = JSON.parse(msg);
  socket['nickname'] = 'Anon';
  switch (message.type) {
    case 'new_message':
      sockets.forEach((aSocket) =>
        setTimeout(() => {
          aSocket.send(`${socket.nickname}: ${message.payload}`);
        }, 1000)
      );
    //   socket.send(message);
    case 'nickname':
      socket['nickname'] = message.payload;
  }
}
function onSocketClose() {
  console.log('Disconnected to Browser');
}

// wss : 서버 전체
// socket : 연결된 브라우저
wss.on('connection', (socket) => {
  sockets.push(socket);
  //   console.log('socket-------', socket, '-------socket');
  console.log('Connected to Browser');
  socket.on('message', (message) => onSocketMessage(sockets, message));
  socket.on('close', onSocketClose);
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
server.listen(3000, handleListen);
