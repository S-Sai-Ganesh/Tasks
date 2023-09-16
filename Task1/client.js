const socket = io.connect("http://localhost:3000");

socket.on('data', data => {
  console.log(data);
});