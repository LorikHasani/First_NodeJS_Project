const express = require("express");
const app = express();
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes");
const methodOverride = require("method-override");

const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const mainRoutes = require("./routes/main");

const PORT = 7777;

const dbURI = "mongodb+srv://lorikhasani:Gilani06*@cluster0.wlbga5a.mongodb.net/?retryWrites=true&w=majority";

require("./config/passport")(passport);

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

app.use(express.json());
app.use(logger("dev"));
// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(methodOverride("_method"));

app.use("/", mainRoutes);

app.use("/", carRoutes);

app.use((req, res) => {
  res.render("404", { title: "404" });
});
