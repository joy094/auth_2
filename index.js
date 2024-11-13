const express = require("express");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const app = express();
const { setUser } = require("./service/auth");
const cookieParser = require("cookie-parser");
const logAuth = require("./html/middlewere/mid");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// const cors = require("cors");
// app.use(cors());
const port = 3000;
app.listen(port, async () => {
  console.log("server is live ");
  await db();
});

//
//   .then(() => {
//     console.log("db is connecrted");
//   })
//   .catch((error) => {
//     console.log("db is not connected");

//     console.log(error);
//   });
// mongoose;
//   .connect("mongodb://localhost:27017/PRACTIC")
app.get("/", logAuth,(req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/html/register.html");
});
app.get("/login",(req, res) => {
  res.sendFile(__dirname + "/html/login.html");
});
app.get("/alluser", async (req, res) => {
  const allUser = await productModel.find();
  res.send(allUser);
});

// app.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   const oneUser = await productModel.findOne({ _id: id });
//   res.send(oneUser);
// });

app.post("/register", async (req, res) => {
  try {
    const createData = new productModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const saveDatabase = await createData.save();
    return res.redirect("/login");
  } catch (error) {
    res.send(error.meassage);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await productModel.findOne({ email, password });
  if (!user)
    return res.sendFile(__dirname + "/html/login.html", {
      error: "invalid user name or password",
    });

  const sessionid = uuidv4();

  // const sessionIdToUserMap = new Map();

  // function setUser(id, user) {
  //   sessionIdToUserMap.set(id, user);
  // }

  // function getUser(id) {
  //   return sessionIdToUserMap.get(id);
  // }

  setUser(sessionid, user);
  res.cookie("uid", sessionid);
  return res.redirect("/");
});

const productSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  // createdTime: {
  //   type: Date,
  //   default: Date.now,
  // },
});
const productModel = mongoose.model("form_users", productSchema);

const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://joy209422600:Az094226@cluster0.cps8w.mongodb.net/TEST_DB"
    );
    console.log("MONGO_DB IS connected...");
  } catch (error) {
    console.log("db not connect");
    console.log(error);
  }
};
