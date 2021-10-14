const mongoose = require('mongoose');

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(()=>{
    console.log("Database connected");
})
}