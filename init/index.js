//node index.js
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const mongoose  = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const ATLASDB_URI = process.env.ATLASDB_URI;

main()
.then (() =>{
    console.log("connected to Atlas DB");
})
.catch((err) =>{
    console.log(err);
});
async function main() {
    await mongoose.connect(ATLASDB_URI);
}

const initDB = async () =>{
    await Listing.deleteMany({ });
    initData.data = initData.data.map((obj) => ({
        ...obj,owner:"690ac68bd53504258c708c26",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();