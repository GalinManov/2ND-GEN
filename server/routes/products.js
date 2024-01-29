const express = require("express");
const Product = require("../models/Product");
const User = require('../models/User')
const jwt = require("jsonwebtoken");

const productRouter = express.Router();


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const verified = jwt.verify(authHeader, process.env.SECRET);

        if (!verified) {
            return res.json({ err: "Invalid token!" })
        };

        next();
    } else {
        res.json({ errMessage: "Access forbidden!" })
    }
};

//POST PRODUCT

productRouter.post("/", async (req, res) => {
    try {
        const { type, productName, price, description, image, owner } = req.body;

        const newProduct = new Product({ type, productName, price, description, image, owner });
        await newProduct.save();
    } catch (err) {
        res.json({ err: err })
    }
});

//GET ALL PRODUCTS

productRouter.get("/:type", authMiddleware, async (req, res) => {
    const typePr = req.params.type;
    const products = await Product.find({ sold: false, type: typePr }).populate("owner");
    res.json(products);
});


//GET 1 PRODUCT

productRouter.get("/getone/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate("owner");

        res.json(product);
    } catch (err) {
        res.json({ err: err })
    }
})

//USER PRODUCTS - ACTIVE

productRouter.get("/active/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const products = await Product.find({ owner: id, sold: false });

        res.json({ message: "User listings fetched!", products });
    }
    catch (err) {
        res.status(400).json({ message: "Error when fetching user listings!" })
    }
});


//RATING

productRouter.patch("/allratings/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const userID = req.body.userID;
        const rating = req.body.rating;
        const product = await Product.findById(id);
        product.rating.push({ userID, rating });
        await product.save();
        const productRatings = product.rating;

        let ratingNumbers = [];
        productRatings.forEach(pr => ratingNumbers.push(pr.rating));

        const average = ratingNumbers.length > 0 ? ratingNumbers.reduce((a, b) => a + b) / ratingNumbers.length : 0;

        res.json(average)
    } catch (err) {
        res.status(400).json({ message: "Error when trying to patch!" })
    }

});


productRouter.get("/get/rating/:id", async (req, res) => {
    try {
        const productID = req.params.id;
        const product = await Product.findById(productID);
        const productRatings = product.rating;

        let ratingNumbers = [];
        productRatings.forEach(pr => ratingNumbers.push(pr.rating));

        const average = ratingNumbers.length > 0 ? ratingNumbers.reduce((a, b) => a + b) / ratingNumbers.length : 0;

        res.json({ productRatings, average })
    } catch (err) {
        res.json({ err: "Failed to retrieve product ratings!" })
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
        const productID = req.params.id;
        const soldProduct = await Product.findById(productID);
        soldProduct.sold = true;
        soldProduct.soldDate = Date();
        await soldProduct.save();
        res.json({ message: "Product has been marked as sold!" })
    } catch (err) {
        res.json({ message: err })
    }
});

productRouter.get("/soldproducts/:id", async (req, res) => {
    try {
        const userID = req.params.id;

        const userSoldProducts = await Product.find({ owner: userID, sold: true });

        res.json({ message: "Product history fetched!", productsHistory: userSoldProducts })
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
        res.status(500).json("Error! Cannot add product to favorites!")
    }
});

productRouter.get("/favorites/:id", async (req, res) => {
    try {
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

    } catch (err) {
        res.json({ err: err })
    }
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

productRouter.get("/cmon", (req, res) => {
    try {
        res.status(300).json({ message: "cmon" })

    } catch (err) {
        res.json({ err: err })
    }
})



module.exports = productRouter;