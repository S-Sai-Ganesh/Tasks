const express = require('express');

const app = express();


app.use(express.static(__dirname ));

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
  
const objClients = {}; // To store active clients id

let count = 1; // Varaible used to send distinct data to each client 
io.on('connection', (socket) => {
    objClients[socket.id] = 1;

    
    setInterval(() => { // Sending data in a fixed interval time
        
        let keys = Object.keys(objClients);
        // console.log(keys);
        keys.forEach( id => {
            // console.log(id);
            io.to(id).emit('data', count++); 
        });
    }, 2000); 

    socket.on('disconnect', () => {
        delete objClients[socket.id];
    });
});


server.listen(3000, () => {
    console.log(` Server is listening `);
});