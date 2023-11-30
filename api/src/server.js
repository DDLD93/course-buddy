require("dotenv").config()
require("./connection/mongo.connection")
const { getEmbedding } = require("./uitils")
const { port } = require("./config")

const UPLOAD = __dirname + "/uploads"
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', require('./route/document.route')(UPLOAD));

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log(await getEmbedding()
  )

});


