var mongoose = require('mongoose');
var Schema      = mongoose.Schema;


var notificationSchema = mongoose.Schema({

        buyerID       : String,
        description     : String,
        sellerID :String,
        AdvertisementID : String
});

notificationSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('notification', notificationSchema);