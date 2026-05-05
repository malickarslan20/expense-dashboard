const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        default:null
    }
},{
    timestamps:true
});

// hash password
userSchema.pre('save', async function(){

    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(5);
    this.password = await bcrypt.hash(this.password, salt);

});

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
};

module.exports = mongoose.model('User',userSchema);