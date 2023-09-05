const asyncHandler = require('express-async-handler')
const Home = require('../models/houseModel');
const PersonalCar = require('../models/Personalcar');
const Motorbike = require('../models/motorbike');
const publicTransport = require('../models/publicTransport');
const { calculateHomeEmissions, calculatePersonalCarEmissions, calculateMotorbikeEmissions, calculatePublicTransportEmissions, } = require('../utils/emmisionCalHelper');



const HomefootPrint = asyncHandler(
    async (req, res) => {
        const { Electricity, Cookingoil, CookingGas } = req.body;
        try {
            if (req.user) {
                const homeEmissions =calculateHomeEmissions(
                    Electricity,
                    Cookingoil,
                    CookingGas
                );
                const newHomeFootprint = await Home.create({
                    user_id: req.user.id,
                    Electricity,
                    Cookingoil,
                    CookingGas,
                    emission: homeEmissions,

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
        const { Mileage, engineSize } = req.body;
        try {
            if (req.user) {
                const MotorbikeEmissions = calculateMotorbikeEmissions( Mileage);
                const newMotorbikeFootprint = await Motorbike.create({
                    user_id: req.user.id,
                    Mileage,
                    engineSize,
                    emission: MotorbikeEmissions
                });
                res.json(newMotorbikeFootprint)
            } else {
                res.status(401);
                throw new Error("User is not authorized or token is missing in request");
            }
        } catch (error) {
            throw new Error(error, "during Creating MotorbikefootPrint")
        }
    });

const personalCarfootPrint = asyncHandler(
    async (req, res) => {
        const { Mileage, fuel } = req.body;
        try {
            if (req.user) {
                const personalCarEmissions = calculatePersonalCarEmissions(Mileage, fuel)
                const newpersonalCarFootprint = await PersonalCar.create({
                    user_id: req.user.id,
                    Mileage,
                    fuel,
                    emission: personalCarEmissions
                });
                res.json(newpersonalCarFootprint)
            } else {
                res.status(401);
                throw new Error("User is not authorized or token is missing in request");
            }
        } catch (error) {
            throw new Error(error, "during Creating personalcarfootPrint")
        }
    });


const PublictransfootPrint = asyncHandler(
    async (req, res) => {
        const {bus,Train,Uber} =req.body
        try {
            const publicTransportEmissions = calculatePublicTransportEmissions(bus,Train,Uber)
            const newPublictransFootprint = await publicTransport.create({
                bus,
                Train,
                Uber,
                emission:publicTransportEmissions
            });
            res.json(newPublictransFootprint)
        } catch (error) {
            throw new Error(error, "during Creating PublictransfootPrint")
        }
    });


module.exports = { HomefootPrint, MotorbikefootPrint, PublictransfootPrint, personalCarfootPrint }