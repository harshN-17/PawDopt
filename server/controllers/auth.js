import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

//REGISTER

export const register = async (req, res) => {
    console.log("object");
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            gender,
            mobile,
            age,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            gender,
            mobile,
            age,
        });

        const savedUser = await newUser.save();

        res.status(201).send(savedUser);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};

//LOGIN

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email: email});

        if(!user) return res.status(400).json({msg: "User does not exist"});

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({ msg: 'password do not match' });

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        delete user.password; // so the password does not get sent to the front end

        res.status(200).json({token, user});

    } catch (error) {
        res.status(500).json({error});
    }
}