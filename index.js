const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();

//connect to DB
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,useFindAndModify: false, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})


app.listen(3000, () => console.log('Server running......'));

