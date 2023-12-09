const express       = require("express");
const app           = express();
const PORT          = 8000;
const mongoose = require('mongoose');
const customers = require('./routes/Customers');
const Rates = require('./routes/Rates');
const Bills = require('./routes/Bills');
const Inventory = require('./routes/Inventory');
const cors = require('cors');

app.use(cors());

app.use("/customers", customers);
app.use("/rates", Rates);
app.use("/bills", Bills);
app.use("/inventory", Inventory);



const url = "mongodb+srv://ashutoshkarmakar72:idOaNz7nCvWEmJde@jewellerybillingsystem.spl49dx.mongodb.net/";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(PORT, () => {
        console.log('Server is running at port : '+ PORT);
    })    
})
.catch((err) => {
    console.log(err)
});


