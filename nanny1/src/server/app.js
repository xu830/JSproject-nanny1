var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//1.login=>return boolean => LOGIN
//2.signup=>add a credential in BE, return a boolean flag / status =>signUp
//3.log out => return a boolean => LogOut

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//mock user database
let userlist = [
  { email: "mock1@gmail.com", password: "12345678" },
  { email: "mock1@gmail.com", password: "2345678" },
];
app.get("/userlist", (_, res) => {
  console.log("api call");
  res.json(userlist);
});

//2. add a user
//user info will be put in req body=>{email, password}
app.post("/signUp", (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    userlist = [...userlist, req.body];
    res.json({ message: "SignUp succeed" });
    return;
  }
  res.json({ message: "failed to signup" });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
