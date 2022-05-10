const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth")

mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("DB Connection Successful!"))
.catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use("/api/auths", authRoute);
app.use("/api/users", userRoute);

app.listen( process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});