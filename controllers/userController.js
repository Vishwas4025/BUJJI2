
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn : '3d'})
}

//loginUser
const loginUser = async (req,res)=>{
    // res.json({mssg: "login user" })
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch(error) {
        res.status(400).json({error : error.message})
    }
}

//signupUser
const signupUser = async (req,res)=>{
    // res.json({mssg: "signup user" })
    const {username, email, password} = req.body
    try{
        const user = await User.signup(username, email, password)
        const token = createToken(user._id)
        res.status(200).json({username,token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}



// const User = require('../models/userModel');

// // loginUser
// const loginUser = async (req, res) => {
//     res.json({ message: 'login user' });
// };

// // signupUser
// const signupUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.signup(email, password);
//         res.status(200).json({ email, user });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// module.exports = { signupUser, loginUser };
