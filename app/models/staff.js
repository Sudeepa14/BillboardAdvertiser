var mongoose = require('mongoose');

var staffSchema = mongoose.Schema({

        staffID   : String,
        name      :  { type: String, required: true },
        possition :  { type: String, required: true }  
   
});
staffSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// methods ======================
// generating a hash
staffSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//
//// checking if password is valid
staffSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('request', questionSchema);