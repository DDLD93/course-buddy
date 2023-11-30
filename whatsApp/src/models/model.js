const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServerSchema = mongoose.model("Server", new Schema({
    name: { type: String, require: true },
    type: { type: String, enum: ["whatsApp", "telegram",], default: "whatsApp" },
    serverId: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    status: { type: String, enum: ["offline", "online",], default: "offline" },
    updatedAt: { type: Date, default: Date.now() },
    createdAt: { type: Date, default: Date.now() },
})
)

const MessageSchema = mongoose.model("Message", new Schema({
    serverId: { type: String, require: true, ref: "Server" },
    message: { type: String, require: true },
    status: { type: String, enum: ["unread", "read",], default: "unread" },
    updatedAt: { type: Date, default: Date.now() },
    createdAt: { type: Date, default: Date.now() },
})
)
const LogSchema = mongoose.model("Log", new Schema({
    serverId: { type: String, require: true, ref: "Server" },
    message: { type: String, require: true },
    type: { type: String, enum: ["error", "warining", "success",], default: "unread" },
    createdAt: { type: Date, default: Date.now() },
})
)
module.exports = {
    ServerSchema,
    MessageSchema,
    LogSchema
}

