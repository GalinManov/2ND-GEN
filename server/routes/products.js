const express = require("express");
const Product = require("../models/Product");
const User = require('../models/User')
const jwt = require("jsonwebtoken");


const productRouter = express.Router();


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        next();
    } else {
        res.json({ errMessage: "Access forbidden! Unauthorized!" })
    };
};

//POST PRODUCT

productRouter.post("/", async (req, res) => {
    const { type, productName, price, description, image, owner } = req.body;

    const newProduct = new Product({ type, productName, price, description, image, owner });
    await newProduct.save();
});

//GET ALL PRODUCTS

productRouter.get("/", (req, res) => {
    const products = Product.find();
    res.json(products);
});

productRouter.get("/peripherals", authMiddleware, async (req, res) => {
    const peripherals = await Product.find({ type: "peripheral" }).populate("owner");

    res.json(peripherals);
});

//GET 1 PRODUCT

productRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate("owner");

    res.json(product);
});

//USER PRODUCTS

productRouter.get("/active/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const products = await Product.find({ owner: id });

        res.json({ message: "User listings fetched!", products });
    }
    catch (err) {
        res.status(400).json({ message: "Error when fetching user listings!" })
    }
});

//RATING

productRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        product.rating.push(req.body.rating);
        await product.save();

        res.json(product);
    } catch (err) {
        res.status(400).json({ message: "Error when trying to patch!" })
    }

});

//EDIT PRODUCT

productRouter.patch("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { productName, price, description, image } = req.body;
        const product = await Product.findById(id);

        product.productName = productName;
        product.price = price;
        product.description = description;
        product.image = image;

        await product.save();

        res.json({ message: "Product updated successfully" });

    } catch (err) {
        res.json({ message: err })
    }

});

//DELETE PRODUCT

productRouter.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Product.deleteOne({ _id: id });

        res.json({ message: "Product listing deleted successfully!" })

    } catch (err) {
        res.json({ message: err })
    }
});

//SELL PRODUCTS

productRouter.post("/sell/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        const userId = product.owner;

        const user = await User.findById(userId);

        user.soldProducts.push(productId);

        await user.save();

        res.json({ message: "Product marked as sold!", user });

    } catch (err) {
        res.json({ message: err })
    }

});

productRouter.get("/soldproducts/:id", async (req, res) => {
    try {
        const userID = req.params.id;

        const user = await User.findById(userID).populate("soldProducts");

        const sold = user.soldProducts;

        res.json({ messaage: "Listing history retrieved!", sold })

    } catch (err) {
        res.json({ message: err })
    }
});

//FAVORITES

productRouter.post("/favorites/:id", async (req, res) => {
    try {
        const userID = req.body.userID;
        const productID = req.params.id;

        const user = await User.findById(userID);
        user.favoriteProducts.push(productID);

        await user.save();

        res.json({ message: "Product added to favorites!" });

    } catch (err) {
        throw Error("Error! Cannot add product to favorites!")
    }
});

productRouter.get("/favorites/:id", async (req, res) => {
    const userID = req.params.id;

    const user = await User.findById(userID);
    const products = await Product.find().populate("owner");

    const favoriteProductsIds = user.favoriteProducts;

    const favoriteProducts = [];

    products.forEach(pr => {
        if (favoriteProductsIds.includes(pr._id)) {
            favoriteProducts.push(pr)
        };
    });

    res.json({ message: "Products retrieved successfully!", favorites: favoriteProducts, favIds: favoriteProductsIds });
});

productRouter.patch("/favorites/delete/:id", async (req, res) => {
    const userID = req.params.id;
    const productId = req.body.productId;

    const user = await User.findById(userID);

    const updatedProducts = user.favoriteProducts?.filter(p => p != productId);

    user.favoriteProducts = updatedProducts;

    await user.save();

    res.json({ message: "Product removed from favorites!" });

})



module.exports = productRouter;