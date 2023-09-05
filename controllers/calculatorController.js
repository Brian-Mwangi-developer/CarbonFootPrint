const asyncHandler = require('express-async-handler')

const Home = require('../models/houseModel');
const PersonalCar = require('../models/Personalcar');
const Motorbike = require('../models/motorbike');
const publicTransport = require('../models/publicTransport');

const HomefootPrint = asyncHandler(
    async (req, res) => {
        const { Electricity, Cookingoil, CookingGas } = req.body;
        try {
            if (req.user) {
                const newHomeFootprint = await Home.create({
                    user_id: req.user.id,
                    Electricity,
                    Cookingoil,
                    CookingGas,

                });
                res.json(newHomeFootprint)
            } else {
                res.status(401);
                throw new Error("User is not authorized or token is missing in request");
            }

        } catch (error) {
            throw new Error(error, "during Creating HomefootPrint")
        }
    });

const MotorbikefootPrint = asyncHandler(
    async (req, res) => {
        try {
            const newMotorbikeFootprint = await Motorbike.create(req.body);
            res.json(newMotorbikeFootprint)
        } catch (error) {
            throw new Error(error, "during Creating MotorbikefootPrint")
        }
    });

const personalCarfootPrint = asyncHandler(
    async (req, res) => {
        try {
            const newpersonalCarFootprint = await PersonalCar.create(req.body);
            res.json(newpersonalCarFootprint)
        } catch (error) {
            throw new Error(error, "during Creating personalcarfootPrint")
        }
    });


const PublictransfootPrint = asyncHandler(
    async (req, res) => {
        try {
            const newPublictransFootprint = await publicTransport.create(req.body);
            res.json(newPublictransFootprint)
        } catch (error) {
            throw new Error(error, "during Creating PublictransfootPrint")
        }
    });


module.exports = { HomefootPrint, MotorbikefootPrint, PublictransfootPrint, personalCarfootPrint }