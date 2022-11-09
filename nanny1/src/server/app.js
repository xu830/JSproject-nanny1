var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");

//connect to database
const connectToMongoose = require("./database/connect");
const { User, Product } = require("./database/model");
connectToMongoose();

//var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");
const e = require("express");

var app = express();
//jwt
const jwt = require("jsonwebtoken");
const { json } = require("express");
const { createTokens, validateToken } = require("./JWT");

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
// let userlist = [
//   {
//     email: "mock1@gmail.com",
//     password: "12345678",
//     cart: [
//       {
//         productid: "grey chair+1667593662172",
//         productName: "grey chair",
//         price: 20,
//         num: 1,
//         imgSrc:
//           "https://i5.walmartimages.com/asr/99c11ba4-f0b9-4bdd-bbb1-701b352b45fd.3e0f55c09e774710faafa402dc456b53.jpeg",
//       },
//       {
//         productid: "Griddle+1667593644838",
//         productName: "Griddle",
//         price: 60,
//         num: 3,
//         imgSrc:
//           "https://i5.walmartimages.com/asr/a972bcba-0df0-4b7e-a492-be955881389b.79ad24fa65ab475ea13f398dfdcf2c5d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
//       },
//     ],
//   },
//   { email: "mock2@gmail.com", password: "2345678" },
//   { email: "mock3@gmail.com", password: "12345678" },
// ];

//mock product database
let productlist = [
  {
    productid: "grey chair+1667593662172",
    productName: "grey chair",
    productDescription: "test1",
    category: "C1",
    price: 20,
    inStock: "100",
    imgSrc:
      "https://i5.walmartimages.com/asr/99c11ba4-f0b9-4bdd-bbb1-701b352b45fd.3e0f55c09e774710faafa402dc456b53.jpeg",
  },
  {
    productid: "Griddle+1667593644838",
    productName: "Griddle",
    productDescription: "test2",
    category: "C2",
    price: 60,
    inStock: "30",
    imgSrc:
      "https://i5.walmartimages.com/asr/a972bcba-0df0-4b7e-a492-be955881389b.79ad24fa65ab475ea13f398dfdcf2c5d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  },
];
let userOn;

app.get("/userlist", async (_, res) => {
  const usersRawData = await User.find({});
  const userlist = usersRawData.map(({ email, password, id }) => {
    return {
      email,
      password,
      id,
    };
  });
  res.json(userlist);
});

//2. add a user
//user info will be put in req body=>{email, password}
app.post("/signUp", async (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    // userlist = [...userlist, req.body];
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      id: uuidv4(),
    });
    const newUser = await user.save();
    if (user === newUser) {
      res.json({
        message: "sign up succeed",
        newUser: {
          email: newUser.email,
          password: newUser.password,
          id: newUser.id,
        },
      });
      return;
    }
    res.json({ error: "sign up failed" });
  }
  res.json({ error: "sign up failed" });
});

//3.sign in
app.post("/login", async (req, res) => {
  // const user = userlist.find((ele) => {
  //   if (ele.email === req.body.email && ele.password === req.body.password) {
  //     return ele;
  //   }
  // });
  const qureyResult = await User.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (!qureyResult) {
    res.status(400).json({ message: "log in failed" });
  } else {
    userOn = qureyResult.email;
    // const id = qureyResult.id;
    // const token = jwt.sign({ id }, "jwtSecret", {
    //   expiresIn: "1hr",
    // });
    const accessToken = createTokens(qureyResult);
    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000, //30days
      httpOnly: true,
    });
    res.json({ auth: true, token: accessToken, result: qureyResult });
    return;
  }
});

//4.get user
app.get("/getUser", validateToken, (_, res) => {
  //could return user data
  res.json("get User");
});

//5.log out
app.post("/signOut", async (_, res) => {
  // console.log("in api app.js");
  userOn = undefined;
  res.cookie("access-token", "none", {
    maxAge: 60 * 60 * 24 * 30 * 1000, //30days
    httpOnly: true,
  });
  res.json({ message: "logout successful" });
});

//6. get products
app.get("/getProducts", (_, res) => {
  res.json(productlist);
});

//7. add a product
app.post("/addProduct", async (req, res) => {
  if (
    req.body &&
    req.body.productName &&
    req.body.productDescription &&
    req.body.category &&
    req.body.price &&
    req.body.inStock &&
    req.body.imgSrc
  ) {
    console.log(req.body);
    const product = new Product({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      category: req.body.category,
      price: req.body.price,
      inStock: req.body.inStock,
      imgSrc: req.body.imgSrc,
      id: uuidv4(),
    });
    const newProduct = await product.save();
    if (product === newProduct) {
      res.json({
        message: "new product added",
        newProduct: {
          productName: newProduct.productName,
          productDescription: newProduct.productDescription,
          category: newProduct.category,
          price: newProduct.price,
          inStock: newProduct.inStock,
          imgSrc: newProduct.imgSrc,
          id: newProduct.id,
        },
      });
      return;
    }
    // productlist = [...productlist, req.body];
    res.json({ message: "addProduct n0t succeed" });
    return;
  }
  res.json({ message: "addProduct n0t succeed" });
});

//8.get user's cart
app.get("/getCart", (_, res) => {
  if (userOn.cart) {
    console.log(userOn.cart);
    userOn.cart = userOn.cart.reduce((re, obj) => {
      const item = re.find((o) => o.productid === obj.productid);
      console.log(item);
      item ? (item.num = item.num + obj.num) : re.push(obj);
      return re;
    }, []);
    // console.log("after reduce", output);
    res.json(userOn.cart);
  } else {
    res.json([""]);
  }
});

//9.add item to cart
app.post("/addCart", (req, res) => {
  if (req.body && req.body.productid && req.body.num) {
    if (userOn) {
      userOn.cart = [...userOn.cart, req.body];
    }
    res.json({ message: "add to cart succeed" });
    return;
  } else {
    res.json({ message: "add not succeed" });
  }
});

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

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
