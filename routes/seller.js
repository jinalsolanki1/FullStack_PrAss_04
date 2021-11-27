const express=require('express');
const router = express.Router();
router.use(express.json());

const sellerList = require("../schema/seller");

router.get("/", (req,res) => res.send("API of Seller"));

//Adding Seller

router.post("/Add", (req,res) => {
    const { seller }=req.body;
    sellerList.push(seller);
    res.json({data : "Seller Added Succssesfully."});
});

//fetching seller based on productname

router.get("/:productName" , (req,res) => {
    const productName = req.params.productName;
    const productList = require("../schema/product");
    var seller = [];
    const product = productList.filter((prd) => (prd.Title===productName));
    if(product.length > 0)
    {
        seller=sellerList.filter((sel) => (sel.SellerId===product[0].SellerId));
    }
    else
    {
        seller = "No Product Found.";
    }
    res.json({data : seller});
});
//delete product
router.delete("/delete/:id" , (req,res) => {
    const sellerid= req.params.id;
    const seller = sellerList.filter((sel) => (sel.SellerId===sellerid));
    if(sellerid.length > 0)
    {
        var sind=seller.indexOf(seller[0]);
        sellerList.splice(sind);
        res.json({data : "Seller Deleted."});
    }
    else{
        res.json({data : "Seller Not Found."});
    }
});
module.exports = router;