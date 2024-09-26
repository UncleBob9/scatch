const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const flash = require("connect-flash/lib/flash");

router.get("/create", upload.single("image"), async function (req, res) { 
    try{
    let{ name, price, discount, bgcolor, panelcolor, textcolor} = req.body;

   let product = await productModel.create({
    Image: req.file.buffer,
    name,
    price,
    discout,
    bgcolor,
    panelcolor,
    textcolor,
   });
   req.flash("success", "product created successfully.");
   res.redriect("/owners/admin");
 }  catch(err){
    res.send(err.message);
}
});

module.exports = router;