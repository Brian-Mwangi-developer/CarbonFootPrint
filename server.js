const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
const calculatorRouter = require("./routes/carbonCalculatorRoute");
const gameRouter =require("./routes/gameRouter");
const userRouter =require('./routes/userRoute');
const wasteRouter = require('./routes/disposedImageRoute')
const { notfound, errorHandler } = require("./middleware/errorHandler");
const dbConnect = require('./config/dbConfig');
const PORT =process.env.PORT ||8080;

dbConnect();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api/calculator',calculatorRouter);
app.use('/api/user',userRouter);
app.use('/api/game',gameRouter);
app.use('/api/waste',wasteRouter);
app.use(notfound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})