import User from "../models/user.model.js"
import bcrypt from  "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log("Password:", password); // Debugging line

        const profileImage = req.file;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!profileImage) {
            return res.status(400).send("No file uploaded");
        }
        const profileImagePath = profileImage.path;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath,
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        next(error);
    }
};


export const login = async(req,res) =>{
    try {
        const {email , password} =req.body 
        const validUser = await User.findOne({email})

        if(!validUser){
            return res(409).json({message:"User doesn't exists! "})
        }
        const validPassword = bcrypt.compareSync(password,validUser.password)
        if(!validPassword){
            return res(400).json({message:"Wrong Credentials! "})
        }
        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET)

        const { password: pass, ...rest } = validUser._doc

        res.status(200).json({ token, rest })

    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
}