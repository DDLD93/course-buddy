const io = require('socket.io-client');
const socket = io('http://localhost:4000/controller'); // Replace with your server URL

// Event handlers for responses from the server
socket.on('connect', () => {
  console.log('Connected to server');

  // Example usage of getAll event
  socket.emit('startServer', "null", (response) => {
    if (response.ok) {
      const wa = io('http://localhost:4000/null'); // Replace with your server URL
      wa.on('connect', () => {
        console.log('All data received:   wa');
      })
      wa.emit("wa_connect", async (dd) => {
        console.log("started>>>>" + dd)
      })

      console.log('All data received:', response);
    } else {
      console.error('Error:', response.message);
    }
  });

  // Other event emissions and handling follow a similar pattern...
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Error handling
socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
});
