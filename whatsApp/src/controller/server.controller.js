const { ServerSchema } = require("../models/model");
const {createWhatsappServer} = require("../whatsAppEngine")

class ServerController {
    constructor() { }

    async getAll() {
        try {
            const data = await ServerSchema.find();
            return { ok: true, data };
        } catch (err) {
            console.log({ err })
            return { ok: false, message: err.message };
        }
    }

    async getOne(id) {
        try {
            const data = await ServerSchema.findById(id);
            return { ok: true, data };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    }

    async create(body) {
        try {
            const newServer = new ServerSchema(body);
            const data = await newServer.save();
            return { ok: true, data };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    }
    async startServer(id) {
        try {
            let { ok, data } = await this.getOne(id)
            if (!ok || !data) {
                return { ok: false, message: "server not found" };

            }
            createWhatsappServer(id)
            return { ok: true, message: "server started" };
        } catch (err) {
            console.log(err.message);
            return { ok: false, message: err.message };
        }
    }

    async update(id, newData) {
        try {
            const data = await ServerSchema.findByIdAndUpdate(id, newData, { new: true });
            return { ok: true, data };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    }

    async delete(id) {
        try {
            await ServerSchema.findByIdAndDelete(id);
            return { ok: true, message: "server deleted" };
        } catch (err) {
            return { ok: false, message: err.message };
        }
    }
}
module.exports = new ServerController();