var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const e = require("express");

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
  { email: "mock2@gmail.com", password: "2345678" },
];

//mock product database
let productlist = [
  {
    productName: "grey chair",
    productDescription: "test1",
    category: "C1",
    price: "20",
    inStock: "100",
    imgSrc:
      "https://i5.walmartimages.com/asr/99c11ba4-f0b9-4bdd-bbb1-701b352b45fd.3e0f55c09e774710faafa402dc456b53.jpeg",
  },
  {
    productName: "Griddle",
    productDescription: "test2",
    category: "C2",
    price: "60",
    inStock: "30",
    imgSrc:
      "https://i5.walmartimages.com/asr/a972bcba-0df0-4b7e-a492-be955881389b.79ad24fa65ab475ea13f398dfdcf2c5d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  },
];
let userOn;

app.get("/userlist", (_, res) => {
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

//3.sign in
app.post("/login", (req, res) => {
  const user = userlist.find((ele) => {
    if (ele.email === req.body.email && ele.password === req.body.password) {
      return ele;
    }
  });
  if (!user) {
    res.status(401).json({ message: "login not successful" });
  } else {
    userOn = user;
    res.json({ message: "login succeed" });
    return;
  }
});

//4.get user
app.get("/getUser", (_, res) => {
  if (userOn !== undefined) {
    res.json(userOn);
  } else {
    res.status(401).json({ message: "no current user log in" });
  }
});

//5.log out
app.post("/signOut", (_, res) => {
  // console.log("in api app.js");
  userOn = undefined;
  res.json({ message: "logout successful" });
});

//6. get products
app.get("/getProducts", (_, res) => {
  res.json(productlist);
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
