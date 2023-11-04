const messageList = document.querySelector('ul');
const messageForm = document.querySelector('#message');
const nickForm = document.querySelector('#nick');
const socket = new WebSocket(`ws://${window.location.host}`);

//string으로 보내는 이유
// 서버가 js가 아닐 수 있기 때문에
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener('open', () => {
  console.log('Connected to Server');
});

socket.addEventListener('message', (message) => {
  //   console.log('New message: ', message.data);
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener('close', () => {
  console.log('Disconnected from Server');
});

// setTimeout(() => {
//   socket.send('hello from the browser');
// }, 10000);
//메세지
messageForm.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));
  input.value = '';
}
// 닉네임
nickForm.addEventListener('submit', handleNickSubmit);
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
  input.value = '';
}
