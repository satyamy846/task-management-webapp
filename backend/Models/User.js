const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default:'user'
    },

},{timestamps:true});


// userSchema.pre('save', function(){
//     let user = this;
//     if(user.isModified('password')){
//         return bcrypt.hash(user.password, 10, function(err, hashpassword){
//             if(!err){
//                 next(err);
//             }
//             user.password=hashpassword;
//             return next();
//         })
//     }
//     else{
//         return next();
//     }
// })

// userSchema.method.comparePassword = function(password, next){
//     bcrypt.compare(password, this.password, function(err, matched){
//         if(err){
//             return next(err, false)
//         }
//         return next(null, matched);
//     })
// }

const model = new mongoose.model("User", userSchema);

module.exports = model;

