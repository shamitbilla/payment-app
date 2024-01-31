const express = require("express");
const cors = require('cors');
const {router} = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1',router);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
