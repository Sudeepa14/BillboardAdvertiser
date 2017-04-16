
var Qusetion            = require('../app/models/question');
module.exports = function(question) {
    
    Qusetion.use('newquestion',
    
    function(req, done) {
        
                var newQuestion            = new Question();
                newQuestion.email   =  req.body.email;
                newQuestion.question =  req.body.ques;
        
                newQuestion.save(function(err) {
                    if (err)
                        throw err;
                    else{
                       return done(null, newQuestion);
                    }
                });
        
//                userSchema.pre('save', function(next) {
//                  // get the current date
//                  var currentDate = new Date();
//
//                  // change the updated_at field to current date
//                  this.updated_at = currentDate;
//
//                  // if created_at doesn't exist, add to that field
//                  if (!this.created_at)
//                    this.created_at = currentDate;
//
//                  next();
//                });
    }
    
)};
