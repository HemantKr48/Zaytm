const express = require("express");
const zod = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../db");

const  JWT_SECRET = require("../config");

const SignupSchema = zod.object({
	username: zod.string().email(),
	password: zod.string(),
	firstName: zod.string(),
	lastName: zod.string(),
});
router.post("/signup", async (req, res) => {
    const userData = req.body;

    const { success } = SignupSchema.safeParse(userData);

    if (!success) {
        return res
            .status(411)
            .json({ message: "Email already taken/ Incorrect inputs" });
    }
    try {
        const existingUser = await User.findOne({
            username: req.body.username,
        });
        if (existingUser) {
            return res.status(411), json({ message: "Email already taken" });
        }
    } catch (err){
        console.log("error in finding", err);
    };
  

  
	const user = await User.create({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	});

	const userId = user._id;
	try {
		const token = jwt.sign(
			{
				userId,
			},
			JWT_SECRET
		);
		res.json({
			message: "User created successfully",
			token: token,
		});
	} catch (err) {
		return res.json({ error: err });
	}
});


const signinSchema = zod.object({
	username: zod.string().email(),
	password: zod.string()
})
router.post("signin", (req, res) => {
	const userData = req.body;
	 
	const { success } = signinSchema.safeParse(userData);

	if (!success) {
		return res.status(411).json({ message:"Incorrect username or password"})
	}

	const existingUser = User.findOne({ 
		username: req.body.username,
		password:req.body.password
	})

	if (existingUser) {
		const token = jwt.sign({
			userId:user._id
		}, JWT_SECRET)
		
		res.json({
			token: token
		})
		return;
	}

	res.status(411).json({ message:"Error while logging in"})
})

module.exports = router;
