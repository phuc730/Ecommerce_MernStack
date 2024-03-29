const express = require("express");
const cors = require('cors');

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const checkoutRoute = require("./routes/stripe")

mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("DB Connection Successful!"))
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use("/api/auths", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", checkoutRoute);

app.listen( process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});