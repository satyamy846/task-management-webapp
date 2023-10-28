const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next)=>{
    try{
        //take details from request body
        const {
            name,
            email,
            password,
        } = req.body;

        console.log(req.body);
        if(!name || !email || !password){
            return res.status(400).json({msg: 'All fields are required'});
        }

        const user = await User.findOne({email: email});
        if(user){
            return res.status(400).json({msg: "Email already exists"})
        }
        //encrypt the password
        const hashpassword = await bcrypt.hash(password, 10);

        //create a new user
        const newUser = new User({
            name: name,
            email: email,
            password: hashpassword,
            role: "user"
        });

        if(!newUser){
            return res.status(400).json({
                msg: "User could not be created"
            })
        }
        await newUser.save();

        res.status(200).json({  msg: "New User is created"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ msg: "Something went wrong"});
    }
}


const login = async (req, res, next)=>{
    try{
        const {
            email,
            password
        } = req.body;
        console.log(req.body);
        var user = await User.findOne({ email:email });
        console.log("user =", user)
        if(!user){
            return res.status(401).send("User doesn't exists please register!");
        }

        const success = await bcrypt.compare(password, user.password);
          if(!success){
            return res.status(401).json({
              message:'Invalid Credentials'
            })
          }
    
          const payload = {
            phone: user.email,
            id: user._id
          }
        //   console.log("env" ,  process.env);
        console.log("object")
          const token =  jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:'24h'
          });
          console.log("token == ", token);
          const options = {
            domain:"localhost",
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          }

        //   res.status(200).cookie("token", token, options).json({
        //     msg: "login successfully",
        //     user: user
        //   })
        res.cookie("token", token, options);
        console.log("login")
         res.status(200).json({
            msg: 'login successfully',
            user: user,
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            msg: "Something went wrong"
        })
    }
}


module.exports = {
    signup,
    login
}