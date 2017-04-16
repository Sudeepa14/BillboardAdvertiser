var mongoose = require('mongoose');
var Schema      = mongoose.Schema;

var questionSchema = Schema({

        email        : String,
        description  : String
       
   
});

//saving th question
questionSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('Question', questionSchema);