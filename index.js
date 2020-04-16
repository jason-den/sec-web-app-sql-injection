const express = require("express");
const route = require("./route");
const errorHandler = require("./errorHandler");
const app = express();

app.use(express.json());
app.use("/", route);
app.use("/", errorHandler);

app.listen(8000);
