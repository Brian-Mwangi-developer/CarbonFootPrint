const asyncHandler = require('express-async-handler');
const DisposedProd = require('../models/Disposedwastemodel');
const User = require('../models/userModel');
const AfricasTalking = require('africastalking');

// Initialize Africa's Talking SDK with your credentials
const africastalking = AfricasTalking({
    apiKey: process.env.AFRICASTALKING_API_KEY,
    username: process.env.AFRICASTALKING_USERNAME,
});

// Initialize SMS and Airtime services
const sms = africastalking.SMS;
const airtime = africastalking.Airtime;

const sendSMS = async (phoneNumber, message) => {
    // Use the SMS service to send a message
    try {
        const response = await sms.send({
            to: [phoneNumber], // Admin's phone number
            message: message,
        });

        return response;
    } catch (error) {
        throw error;
    }
};

const sendAirtime = async (phoneNumber, amount) => {
    // Use the Airtime service to send airtime to the user
    try {
        const response = await airtime.send({
            recipients: [
                {
                    phoneNumber: phoneNumber,
                    currencyCode: 'KES', // Kenyan Shilling
                    amount: amount,
                },
            ],
        });

        return response;
    } catch (error) {
        throw error;
    }
};

const calculatePoints = (quantity) => {

    if (quantity === 1) {
        return 10;
    } else if (quantity === 2) {
        return 20;
    } else if (quantity === 3) {
        return 30;
    } else {
        // Default: 10 points per item if quantity is not recognized
        return 10 * quantity;
    }
};

const DisposeItem = asyncHandler(async (req, res) => {
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
                imageLink,
                quantity,
                description,
            });

            // // Calculate points based on description and quantity
            // const points = calculatePoints(description, quantity);
            
            // Save the image and product details to the database
            await newProduct.save();

            // Find the user to get their phone number and award airtime
            const user = await User.findById(req.user.id);
            // const totalPoints = user.points + points;
            // await User.findByIdAndUpdate(req.user.id, { points: totalPoints });

            // Send airtime to the user
            // const airtimeAmount =  10; // 10 units of airtime per point
            // await sendAirtime(user.phone, airtimeAmount);

            // Send an SMS to the admin with the description, quantity, image URL, and user's phone number
            const message = `New product submitted: Description - ${description}, Quantity - ${quantity}, Image URL - ${imageLink}, User Phone - ${user.phoneNumber}`;
            await sendSMS('+254716498989', message); // Replace with your admin's phone number

            return res.status(201).json({ product: newProduct });
        } else {
            return res.status(401).json({ error: "User is not authorized or token is missing in the request" });
        }
    } catch (error) {
        console.error("Error saving disposed Product Details:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = { DisposeItem };
