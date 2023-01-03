const express = require("express");
const app = express();
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes");
const methodOverride = require("method-override");

const PORT = 7777;

const dbURI = "mongodb+srv://lorikhasani:Gilani06*@cluster0.wlbga5a.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(PORT, () => {
      console.log(`Server is runing in PORT: ${PORT}`);
    })
  )
  .catch((err) => console.log(err));

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.use("/", carRoutes);

app.use((req, res) => {
  res.render("404", { title: "404" });
});
