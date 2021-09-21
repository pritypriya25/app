const express = require("express");
const bodyParser = require("body-parser");
const getQueryResult = require('./presto_client');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//endpoints
app.get("/", (req, res) => res.send("Hello World!"));
app.post("/presto", getQueryResult);

app.listen(3000, () => console.log("listening on port 3000"));