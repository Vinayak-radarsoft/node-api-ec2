const User = require("../model/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).send("User Already Created");
        } else {
            const newUser = new User({ email, password });
            await newUser.save();
            return res.status(201).send("User created successfully");
        }
    } catch (e) {
        return res.send(`${e.status} ${e.message}`);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("enter", email);
    const user = await User.findOne({ email });
    try {
        if (user) {
            const token = jwt.sign({ id: user._id }, "BLOG109", {
                expiresIn: "1 hr",
            });
            const cookieOptions = {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS in production
                maxAge: 360 * 1000, // Cookie expiration time in milliseconds
                sameSite: 'Strict', // Adjust based on your needs
                path: '/',// Ensure the path is set to '/',

            };
            return res
                .status(201)
                .cookie("token", token, cookieOptions)
                .json({ msg: "user log in successfully.", token: token });
        }
    } catch (e) {
        return res.status(401).send("invalid Credentials");
    }
};

const getUser = async (req, res) => {
    const token = req.cookies.token;
    console.log("token", token);
    try {
        const users = await User.find();
        return res.status(200).json({ data: users })
    } catch (error) {
        return res.status(401).send("invalid Credentials");
    }
}


module.exports = { login, signup, getUser };
