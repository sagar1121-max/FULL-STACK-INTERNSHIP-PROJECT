const mongoose = require("mongoose")

const connect = ()=>{
    mongoose.connect("mongodb+srv://sagar:FiWvjE9eeSqtbHoI@cluster0.oulngqn.mongodb.net/VIPS")
    .then(()=>{
        console.log("database connected");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connect
