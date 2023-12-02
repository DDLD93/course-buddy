const ServerController = require('./controller/server.controller');
const { createWhatsappServer } = require("./whatsAppEngine")

module.exports = (io) => {
    const clients = new Set();

    io.of("/controller").on("connection", (socket) => {
        console.log("Connected @ controller", socket.id);
        clients.add(socket);

        socket.on("disconnect", () => {
            console.log("Disconnected @ controller", socket.id);
            clients.delete(socket);
        });

        socket.on('getAll', async (data, callback) => {
            try {
                const result = await ServerController.getAll();
                callback({ ok: true, data: result });
            } catch (err) {
                console.error("Error in getAll:", err.message);
                callback({ ok: false, message: err.message });
            }
        });

        socket.on('getOne', async (id, callback) => {
            try {
                const result = await ServerController.getOne(id);
                callback({ ok: true, data: result });
            } catch (err) {
                console.error("Error in getOne:", err.message);
                callback({ ok: false, message: err.message });
            }
        });

        socket.on('create', async (body, callback) => {
            try {
                const result = await ServerController.create(body);
                callback(result);
            } catch (err) {
                console.error("Error in create:", err.message);
                callback({ ok: false, message: err.message });
            }
        });

        socket.on('startServer', async (id, callback) => {
            try {
                const result = await ServerController.getOne(id);
                if (!result.ok) {
                    return callback({ ok: false, message: "server not found" })
                }
                console.log({ result })
                // createWhatsappServer(id, io)
                callback(result );
            } catch (err) {
                console.error("Error in startServer:", err.message);
                callback({ ok: false, message: err.message });
            }
        });

        socket.on('update', async ({ id, newData }, callback) => {
            try {
                const result = await ServerController.update(id, newData);
                callback(result );
            } catch (err) {
                console.error("Error in update:", err.message);
                callback({ ok: false, message: err.message });
            }
        });

        socket.on('delete', async (id, callback) => {
            try {
                await ServerController.delete(id);
                callback({ ok: true, message: 'Server deleted' });
            } catch (err) {
                console.error("Error in delete:", err.message);
                callback({ ok: false, message: err.message });
            }
        });
    });
};
