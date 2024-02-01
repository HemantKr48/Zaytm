const mongoose = require("mongoose");
mongoose
	.connect(
		"mongodb+srv://hemantkumar48200:Hemant200@cluster0.ulzzhjj.mongodb.net/paytmdata"
	)
	.then(() => console.log("database connected"))
	.catch((err) => {
		console.log(err);
	});

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		minLength: 3,
		maxLength: 30,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		maxLength: 50,
	},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
