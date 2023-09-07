// controllers/gameController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Controller function to add points to the user.
const addPoints = asyncHandler(async (req, res) => {
    const { points } = req.body;

    try {
        // Find the user by their ID (you should have this from your authentication)
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Add points to the user
        user.points += points; // You can adjust the points as needed.
        await user.save();

        res.json( user);
    } catch (error) {
        res.status(500).json({ message: 'Error adding points to user.' });
    }
});

module.exports = { addPoints };
// const asyncHandler = require('express-async-handler');
// const Game = require('../models/gameModel');
// const User = require('../models/userModel');
// const CorrectWord = require('../models/correctWordModel');
// const wordList = require('../utils/worddata');

// // Controller function to make a guess in the game.
// const makeGuess = asyncHandler(async (req, res) => {
//     const { gameId, guess } = req.body; // Pass gameId and guess from the frontend.

//     try {
//         const game = await Game.findById(gameId);

//         if (!game) {
//             return res.status(404).json({ message: 'Game not found.' });
//         }

//         // Implement your logic to handle the guess and update the game state.
//         // Update correctLetters and incorrectLetters arrays based on the guess.

//         // Check if the game is won or lost and update accordingly.
//         if (game.word.includes(guess)) {
//             // Correct guess! Update user points and save.
//             const user = await User.findById(req.user._id);
//             user.points += 10; // You can adjust the points as needed.
//             await user.save();
//         }

//         res.json(game);
//     } catch (error) {
//         res.status(500).json({ message: 'Error making a guess.' });
//     }
// });






// module.exports = {makeGuess,seedCorrectWords};
