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
const { error } = require("console");

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
//         id: "grey chair+1667593662172",
//         productName: "grey chair",
//         price: 20,
//         num: 1,
//         imgSrc:
//           "https://i5.walmartimages.com/asr/99c11ba4-f0b9-4bdd-bbb1-701b352b45fd.3e0f55c09e774710faafa402dc456b53.jpeg",
//       },
//       {
//         id: "Griddle+1667593644838",
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
    id: "grey chair+1667593662172",
    productName: "grey chair",
    productDescription: "test1",
    category: "C1",
    price: 20,
    inStock: "100",
    imgSrc:
      "https://i5.walmartimages.com/asr/99c11ba4-f0b9-4bdd-bbb1-701b352b45fd.3e0f55c09e774710faafa402dc456b53.jpeg",
  },
  {
    id: "Griddle+1667593644838",
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
  const qureyResult = await User.findOne(
    {
      email: req.body.email,
      password: req.body.password,
    },
    { id: 1, _id: 0, admin: 1 }
  );
  if (!qureyResult) {
    res.status(400).json({ message: "log in failed" });
  } else {
    userOn = qureyResult.id;
    const accessToken = createTokens(qureyResult);
    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000, //30days
      httpOnly: true,
    });
    res.cookie("guest-cart", "none", {
      maxAge: 60 * 60 * 3 * 1000, //3hrs
      httpOnly: true,
    });
    res.json({ auth: true, token: accessToken, result: qureyResult });
    return;
  }
});

//4.get user
app.get("/getUser", validateToken, (req, res) => {
  //could return user data
  userOn = req.id;
  if (userOn === undefined) {
    res.status(400).json({ error: "validation failed" });
  } else {
    res.json({ user: userOn, admin: req.admin });
  }
});

//5.log out
app.post("/signOut", async (_, res) => {
  userOn = undefined;
  res.cookie("access-token", "none", {
    maxAge: 60 * 60 * 24 * 30 * 1000, //30days
    httpOnly: true,
  });
  res.json({ message: "logout successful" });
});
//6 modify password
//7. get products req.page:where to start  req.num: how many documents are fetched
app.post("/getProducts", async (req, res) => {
  const productsRawData = await Product.find({})
    .skip(req.body.page)
    .limit(req.body.num);
  const productlist = productsRawData.map(
    ({
      productName,
      productDescription,
      category,
      price,
      inStock,
      imgSrc,
      id,
    }) => {
      return {
        productName,
        productDescription,
        category,
        price,
        inStock,
        imgSrc,
        id,
      };
    }
  );
  res.json(productlist);
});

//8. add a product
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
        message: "sign up succeed",
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
    res.json({ message: "addProduct not succeed" });
    return;
  }
  res.json({ message: "addProduct not succeed" });
});

//9.get user's cart
app.get("/getCart", async (req, res) => {
  if (userOn === undefined) {
    const cartInfo = req.cookies["guest-cart"];
    if (
      cartInfo === undefined ||
      cartInfo === "none" ||
      cartInfo.length === 0
    ) {
      res.json([]);
    } else {
      res.json(cartInfo);
    }

    return;
  } else {
    const qureyResult = await User.findOne({
      id: userOn,
    });
    // console.log(qureyResult);
    let cartInfo = [];
    if (qureyResult) {
      cartInfo = qureyResult.cart;
    }
    res.json(cartInfo);
  }
});

//10.add item to cart
app.post("/addCart", async (req, res) => {
  if (req.body && req.body.id && req.body.num) {
    if (userOn !== undefined) {
      const qureyResult = await User.findOne({
        id: userOn,
      });
      if (qureyResult.cart) {
        const modItem = qureyResult.cart.find((ele) => ele.id === req.body.id);
        if (modItem) {
          modItem.num = req.body.num;
        } else {
          qureyResult.cart = [...qureyResult.cart, req.body];
        }

        await qureyResult.save();
        res.json({ message: "add to cart succeed" });
      } else {
        qureyResult.cart = [...qureyResult.cart, req.body];
        await qureyResult.save();
        res.json({ message: "add to cart succeed" });
      }
    } else {
      var tempCart = req.cookies["guest-cart"];
      if (
        tempCart === undefined ||
        tempCart === "none" ||
        tempCart.length === 0
      ) {
        var temp = new Array();
        temp.push(req.body);
        res.cookie("guest-cart", temp, {
          maxAge: 60 * 60 * 3 * 1000, //30days
          httpOnly: true,
        });
        res.json({ message: "add to guest cart succeed" });
      } else {
        //if guest cart not empty
        //if the item is already in cart delete origin add then add new attemp
        const itemid = tempCart.findIndex((obj) => obj.id === req.body.id);
        if (itemid >= 0) {
          tempCart.splice(itemid, 1);
        }
        tempCart = [...tempCart, req.body];
        res.cookie("guest-cart", tempCart, {
          maxAge: 60 * 60 * 3 * 1000, //30days
          httpOnly: true,
        });
        res.json({ message: "add to guest cart succeed" });
      }
    }
    return;
  } else {
    res.status(400).json({ message: "add not succeed" });
  }
});
//11.delete from cart
app.delete("/deleteCart", async (req, res) => {
  if (req.body && req.body.id) {
    if (userOn !== undefined) {
      const qureyResult = await User.findOne({
        id: userOn,
      });
      qureyResult.cart = qureyResult.cart.filter((ele) => {
        return ele.id !== req.body.id;
      });
      await qureyResult.save();
      res.json({ message: "delete succeed" });
    } else {
      //delete from guest cart
      var tempCart = req.cookies["guest-cart"];
      const deleteIndex = tempCart.findIndex((obj) => obj.id === req.body.id);
      if (deleteIndex >= 0) {
        tempCart.splice(deleteIndex, 1);
      }
      res.cookie("guest-cart", tempCart, {
        maxAge: 60 * 60 * 3 * 1000, //3hrs
        httpOnly: true,
      });
      res.json({ message: "delete from guest succeed" });
    }
  } else {
    res.status(400).json({ message: "delete not succeed" });
  }
});
//12. edit product
app.put("/editProduct", async (req, res) => {
  if (req.body && req.body.id) {
    const id = req.body.id;
    const qureyResult = await Product.findOne({ id });
    const { modifiedCount } = await qureyResult.updateOne({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      category: req.body.category,
      price: req.body.price,
      inStock: req.body.inStock,
      imgSrc: req.body.imgSrc,
    });
    if (modifiedCount) {
      res.json({ message: "edit succeed" });
      return;
    }
  }
  res.json({ message: "edit failed" });
});
//13. getProductInfo
app.post("/getProductInfo", async (req, res) => {
  // console.log("get info", req.body);
  if (req.body.id) {
    const id = req.body.id;
    const qureyResult = await Product.findOne({ id });
    const product = (({
      productName,
      id,
      price,
      imgSrc,
      productDescription,
      inStock,
      category,
    }) => ({
      productName,
      id,
      price,
      imgSrc,
      productDescription,
      inStock,
      category,
    }))(qureyResult);

    // console.log(product);
    res.json(product);
    return;
  } else {
    res.json({ message: "no product id, get product failed" });
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
