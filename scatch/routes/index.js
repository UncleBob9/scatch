const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error, loogedin: false });
});

router.get("/shop", isloggedin, async function (req, res) {
    let products = await productModel.find(); // Fetch products
    let success = req.flash("success"); // Get success message
    res.render("shop", { products, success }); // Pass products and success to the template
});

router.get("/cart", isloggedin, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    res.render("cart", { user });
});

router.get("/addtocart/:productid", isloggedin, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

router.get("/logout", isloggedin, function (req, res) {
    res.render("shop");
});

module.exports = router;
