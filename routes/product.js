const express = require('express');
const router = express.Router();
router.use(express.json());

const productList = require("../schema/product");

router.get("/",(req,res) => res.send("API of Product"));

//For Add The Product
router.post("/Add", (req,res) => {
    const { product } = req.body;
    productList.push(product);
    res.json({data : "Product Added Succsessfully."});
});

//Fetch all Product of Company
router.get("/List_All_Product_of_Comapany", ( req,res) => {
    const comapnyList= require("../schema/company");
    const companyId = comapnyList.filter((cmp) => (cmp.CompanyId));
    const products =productList.filter((prd) => (prd.CompanyId===companyId[0].CompanyId));
    res.json({data : products}) ;
});

//Fetch all product of Seller
router.get("/List_All_Product_of_Seller", (req,res) => {
    const sellerList=require("../schema/seller");
    const sellerId = sellerList.filter((sel) => (sel.SellerId));
    const products = productList.filter((prd) => (prd.SellerId===sellerId[0].SellerId));
    res.json({data : products});
});

//delete product

router.delete("/delete/:id" , (req,res) => {
    const productid= req.params.id;
    const product = productList.filter((prd) => (prd.ProductId===productid));
    if(productid.length > 0)
    {
        var pind=product.indexOf(product[0]);
        productList.splice(pind);
        res.json({data : "Product Deleted."});
    }
    else{
        res.json({data : "Product Not Found."});
    }
});
module.exports = router;