import User from '../Models/User.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandle } from '../Utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return next(errorHandle(400, "All fields are required"));
    }
    let hashedPassword;
    try {
        hashedPassword = bcryptjs.hashSync(password, 10);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong during password hashing" });
    }

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        next(error);
    }
};


// signin

export const signin = async (req, res, next) => {
    const { email, password } = req.body; // Correctly destructure from req.body

    // Check if email or password is missing
    if (!email || !password || email === "" || password === "") {
        return next(errorHandle(400, 'All fields are required'));
    }

    try {
        // Find user by email
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandle(400, 'User not found'));
        }

        // Compare provided password with stored hashed password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandle(400, 'Invalid password'));
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Optional: Set an expiry time for the token
        );

        // Exclude password from the response
        const { password: pass, ...rest } = validUser._doc;

        // Send response with token as a cookie
        res
            .status(200)
            .cookie('access_token', token, { httpOnly: true })
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req,res,next)=>{
    const {email,name,googlePhotoUrl} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password,...rest} = user._id;
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(rest);
        } else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username:name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashPassword,
                profilePicture:googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const{password,...rest} = newUser._doc;
            res
            .status(200)
            .cookie('access_token',token,{
                httpOnly:true,
            })
            .json(rest)
        }
    }catch(error){
     
    }
}