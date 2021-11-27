const express= require('express');
const myapp = express();
const port = 5000
myapp.use(express.json());

const RoutProduct = require("./routes/product");
const RoutCompany = require("./routes/company");
const RoutSeller = require("./routes/seller");

myapp.use("/product",RoutProduct);
myapp.use("/company",RoutCompany);
myapp.use("/seller",RoutSeller);

myapp.get('/',(req,res) => res.send('Hello'));
myapp.listen(port,() => console.log('listening on port 5000.'));