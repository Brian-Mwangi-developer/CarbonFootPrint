const asyncHandler = require('express-async-handler');
const DisposedProd = require('../models/Disposedwastemodel');

const DisposeItem = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { imageLink, quantity, description } = req.body;

    if (!imageLink) {
        return res.status(400).json({ error: "Image is missing" });
    }
    if (!quantity) {
        return res.status(400).json({ error: "Quantity is missing" });
    }
    if (!description) {
        return res.status(400).json({ error: "Description is missing" });
    }

    try {
        if (req.user) {
            const newProduct = new DisposedProd({
                user_id: req.user.id,
                imageLink, // This should match the property name in your schema
                quantity,  // This should match the property name in your schema
                description, // This should match the property name in your schema
            });

            // Save the image to the database
            await newProduct.save();
            console.log(req.user.id);
            return res.status(201).json(newProduct);
        } else {
            return res.status(401).json({ error: "User is not authorized or token is missing in the request" });
        }
    } catch (error) {
        console.error("Error saving disposed Product Details:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = { DisposeItem };
