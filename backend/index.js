const express = require("express");
const app = express();
const port = 5000;
const path =require('path')

const mongoDB = require("./db");
mongoDB();
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
app.use("/api", require("./Routes/CreatUser"));
app.use("/api", require("./Routes/Login"));
app.use("/api", require("./Routes/DisplayFoodData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/MyOrder"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
