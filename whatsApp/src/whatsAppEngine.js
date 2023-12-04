const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const ServerController = require('./controller/server.controller');
// const { io } = require("./index");

function createWhatsappServer(id,io) {
  const client = new Client({
    authStrategy: new LocalAuth({ clientId: id, dataPath: `serverDB/${id}` })
  });

  const clients = new Set(); // Using a Set for better client management

  io.of("/"+id).on("connection", (socket) => {
    clients.add(socket); // Add the socket to the set of clients

    socket.on("disconnect", () => {
      clients.delete(socket); // Remove the socket on disconnection
    });

    socket.on("wa_connect", async () => {
      console.log("Engine start request received");
      try {
        await client.initialize();
        // Handle success if needed
      } catch (error) {
        emitToAll("error", error.message);
      }
    });

    socket.on("sendMessage", (data) => {
      const { receive, message } = data;
      if (client) {
        client.sendMessage(receive, message, {})
          .catch((error) => {
            emitToAll("error", error.message);
          });
      } else {
        emitToAll("error", "No client found");
      }
    });
  });

  client.on('qr', (qr) => {
    // qrcode.generate(qr, { small: true });
    // console.log(qr)
    emitToAll('qr', qr);
  });

  client.on('loading_screen', (percent, message) => {
    emitToAll('loading_screen', { percent, message });
  });

  client.on('authenticated', (id) => {
    console.log("authenticated",id)
    emitToAll('authenticated', 'AUTHENTICATED');
  });

  client.on('change_state', (state) => {
    emitToAll('state_change', state);
  });

  client.on('auth_failure', msg => {
    emitToAll('error', `AUTHENTICATION FAILURE: ${msg}`);
  });

  client.on('ready', async (id) => {
    console.log("ready",id)

    try {
      const { ok, data, message } = await ServerController.update(id, { status: "online" });
      if (!ok) {
        console.log(`Error updating server status`);
      } else {
        emitToAll('ready', 'Client is ready! ' + client.info);
      }
    } catch (error) {
      console.log('Error updating server status:', error);
    }
  });

  client.on('message', msg => {
    if (msg.body === '!ping') {
      
      emitToAll('message', `Message received: ${msg.body}`);
      msg.reply('pong');
    }
  });

  client.on("message_ack", (msg) => {
    console.log(msg.id);
  });

  function emitToAll(event, data) {
    clients.forEach(client => {
      client.emit(event, data);
    });
  }
}

module.exports = { createWhatsappServer };
