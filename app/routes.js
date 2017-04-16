
//console.log(Qusetion);
module.exports = function(app, passport) {
  
    var Question       = require('../app/models/question');
    var Advertisement  = require('../app/models/advertisement');

    app.get('/', function(req, res) {
        res.render('home'); // load the index.ejs file
    });


    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login', { message: req.flash('loginMessage') }); 
    });
        

    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') });
        
    });
        
    app.post('/signup', passport.authenticate('local-signup', { 
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    
  app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    app.use(function (req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
    });


    app.get('/profile', function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
    
    app.get('/viewcount', function(req, res, next){
      res.send('You viewed this page ' + req.session.views['/viewcount'] + ' times');
    });

    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    
//    app.get('/cookie', function(req, res){
//      res.cookie('username', 'Sudeepa nadeeshan', {expire: new Date() + 555}).send('username has the value of Derek Banas');
//    });

    app.get('/contact', function(req,res,next){
      res.render('contact',{csrf:'csrf token here', user : req.user })
      
    });
    
    app.post('/contact',function(res,req,next) {
          console.log("aldfladfladf");
          var newQ = new Question();
        
//          newQ.description =req.body.description;
          
//          newQ.email=req.body.emai l;
          newQ.save(function(err){
            if(err)
                console.log(err);
        });
        
   });

    app.get('/listcookies', function(req, res){
      console.log("Cookies : ", req.cookies);
      res.send('Look in the console for cookies');
    });

    app.get('/deletecookie', function(req, res){
      res.clearCookie('username');
      res.send('username Cookie Deleted');
    });
    
     app.get('/thankyou',function(req,res,next){
       res.render('thankyou'); 
    });

     app.get('/viewads', function(req, res){
        // Uses Mongoose schema to run the search (empty conditions)
        var query = Advertisement.find({});
        query.exec(function(err, ads){
            if(err)
                res.send(err);
            // If no errors are found, it responds with a JSON of all users
            res.render('viewAds',{advertisement:ads})
         
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    
    app.post('/postad', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newAd = new Advertisement();
        newAd.title=req.body.title;
        newAd.description=req.body.description;
        newAd.width=req.body.width;
        newAd.height=req.body.height;
        newAd.longitude=req.body.lng;
        newAd.latitude=req.body.lat;
//        newAd.location=req.body.location;
        console.log(req.body);
        // New User is saved in the db.
        newAd.save(function(err){
            if(err)
                //res.send(err);
                console.log(err);
            // If no errors are found, it responds with a completion notification window
           res.render('newAdvertisementResponse'); 
          
        });
    });
    
    app.get('/createAd', function(req,res){
      res.render('createAd',{csrf:'csrf token here'})
    });
    
    app.get('/search', function(req,res){
      res.render('search',{csrf:'csrf token here'})
    });
        
    app.use(function(req, res){
      res.type('text/html');
      res.status(404);
      res.render('404');
    });

    app.use(function(err, req, res, next){
      console.error(err.stack);
      res.status(500);
      res.render('500');
    });
    
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}