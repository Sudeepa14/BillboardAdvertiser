var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({

        buyerID        : String,
        requestNumber     : String,
        sellerID :String,
        AdvertisementID : String
       
});

requestSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('request', questionSchema);