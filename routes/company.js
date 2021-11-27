const express = require('express');
const router = express.Router();
router.use(express.json());

const companyList = require("../schema/company");

router.get("/",(req,res) => res.send("API of Company"));

//For Add The Company
router.post("/Add", (req,res) => {
    const { company } = req.body;
    companyList.push(company);
    res.json({data : "Company Added Succsessfully."});
});

// Getting company by productName
router.get("/:productName" , (req,res) => {
    const productName=req.params.productName;
    const productList= require("../schema/product");
    var companies = [];
    const product = productList.filter((prd) => (prd.Title===productName));
    if(product.length > 0){
        companies = companyList.filter((cmp) => (cmp.CompanyId===product[0].CompanyId));
    }
    else
    {
        companies = "No Product Found.";
    }
    res.json({data : companies});
});

// delete company
router.delete("/delete/:id" ,(req,res) =>{
    const companyid = req.params.id;
    const company=companyList.filter((com) => com.CompanyId===companyid);

    if(company.length > 0)
    {
        var cind =companyList.indexOf(company[0]);
        companyList.splice(cind,1);
        res.json({data : "Company Deleted."});
    }
    else{
        res.json({data : "Company Not Found."});
    }
});
module.exports =router;