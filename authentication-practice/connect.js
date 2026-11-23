const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectToMongoDB(url) {
    console.log("env url", url);
    return mongoose.connect(url);
}

module.exports = {
    connectToMongoDB,
};