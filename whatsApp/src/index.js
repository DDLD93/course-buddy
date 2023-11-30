const { createServer } = require("http");
const createWhatsappServer = require("./whatsAppEngine");
const { port } = require("./config").app;
require("./connections/mongo.connection")();
const { Server } = require("socket.io");
const app = require("express")(); // Use express instead of createServer directly
const httpServer = createServer(app); // Create an HTTP server using express
const io = new Server(httpServer,{
    cors:{
        origin: "*",
        methods: "*"
    },
    
});
const cors = require("cors");

// Use CORS middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }));
  require("./socket")(io)
// io.of("/socket").on("connection", (socket) => {
//     console.log("connected");
// });

httpServer.listen(port, () => {
    console.log(`server running on port ${port}`);
    // createWhatsappServer("id")
});
module.exports = {io}
