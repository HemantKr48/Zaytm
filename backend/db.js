import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.connect("mongodb+srv://hemantkumar48200:Hemant200@cluster0.ulzzhjj.mongodb.net/paytmdata");


const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    password:String
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
