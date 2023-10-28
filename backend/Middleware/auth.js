const jwt = require('jsonwebtoken');

const auth = async (req, res, next)=>{
    try {

        let token = req.headers.authorization || req.cookies.token;
        
        console.log("Request = " + req.headers, "bodyd === "+ req.body)
        console.log("token = " + token);
        if(!token){
            return res.status(401).json({message: "Token is missing"});
        }
        try{
            const validatedToken = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(validatedToken);
            //give token to user
            req.user = validatedToken;
        }
        catch(err){
            return res.status(401).json({
                message:'Invalid Token',
                success: false
            })
        }
        //if token is valid move on to next middleware
        next();

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            msg: "something went wrong"
        })
    }
}

const isUser = async(req, res, next) =>{
    try{
        const isUserRoute = await User.findOne({ email: req.user.email});
        if(isUserRoute.role == 'user'){
            next();
        }
        else{
            return res.status(400).json({
                msg:"You are not authorized"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            msg: "This route doesn't exists"
        })
    }
}

const isAdmin = async(req, res, next) =>{
    try{
        const isAdminRoute = await User.findOne({ email: req.user.email});

        if(isAdminRoute.role == 'admin'){
            next();
        }
        else{
            return res.status(400).json({
                msg:"You are not authorized"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            msg: "This route doesn't exists"
        })
    }
}

module.exports = 
{   auth,
    isUser,
    isAdmin,
};