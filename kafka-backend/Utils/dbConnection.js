const mongoose = require('mongoose');

exports.dbConnect = async() => {
  try {
    await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        poolSize: 10,
    });
    console.log('MongoDB connected...');
} catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
}
};

// const mongoose = require('mongoose');

// const connectDB = async() => {
//     try {
//         await mongoose.connect(process.env.DATABASE, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         });
//         console.log('MongoDB connected...');
//     } catch (err) {
//         console.error(err.message);
//         // Exit process with failure
//         process.exit(1);
//     }
// };

// module.exports = connectDB;