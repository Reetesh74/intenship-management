require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router=require("./Routes/routers")
const PORT = 6010;

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("./uploads"));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server start at port no ${PORT}`);
});
