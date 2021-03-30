const express = require("express");
const app = express();
const api = require("./api");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.set("port", process.env.PORT || 12345);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/", api);
app.use(express.static("static"));

app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use((req, res) => {
  const err = new Error("Not found");
  err.status = 404;
  res.json(err);
});

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/virtualstandups", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", () => {
  console.log("Connected to MongoDB");
  app.listen(app.get("port"), () =>
    console.log(`running on port ${app.get("port")}`)
  );
});
