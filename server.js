const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require('dotenv').config();
const calculatorRouter = require("./routes/carbonCalculatorRoute");
const userRouter =require('./routes/userRoute');
const { notfound, errorHandler } = require("./middleware/errorHandler");
const dbConnect = require('./config/dbConfig');
const PORT =process.env.PORT ||8080;

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/api/calculator',calculatorRouter);
app.use('/api/user',userRouter)
app.use(notfound);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})