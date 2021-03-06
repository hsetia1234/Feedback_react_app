const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true,
    useUnifiedTopology: true, }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const questionsRouter = require('./routers/questionRouter');
app.use('/questions',questionsRouter);
const responseRouter = require('./routers/responseRouter');
app.use('/responses',responseRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


