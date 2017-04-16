var express = require('express');
var flash = require('connect-flash');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(require('body-parser').urlencoded({extended: true}));   

var formidable = require('formidable');

var credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));


app.set('port', process.env.PORT || 3000);

require('./test/routes.js')(app, passport);


/////user login
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy,
     user = { // This a hard-coded user
            _id: 1,
            username: 'john',
            email: 'john@doe.com',
            password: 'password'
        };

    // Register a login strategy
   passport.use(new LocalStrategy(
  function(username, password, done) {
     //daatabase reading for pw       
      if(username === user.username && password === user.password) {
                return done(null, user);
            }
            else {
                done(null, false, { message: 'Invalid username and password.' });
            }
      
      
//     User.findOne({ username: username }, function(err, user) {
//          
//      if (err) {
//         
//          return done(err); }
//      if (!user) {
//        return done(null, false, { message: 'Incorrect username.' });
//      }
//      if (!user.validPassword(password)) {
//        return done(null, false, { message: 'Incorrect password.' });
//      }
//      return done(null, user);
//    });
  }
));

app.use(passport.initialize());
app.use(passport.session());

   // Required for storing user info into session 
    passport.serializeUser(function(user, done) {
      done(null, user._id);
    });

    // Required for retrieving user from session
    passport.deserializeUser(function(id, done) {
        // The user should be queried against db
        // using the id
        done(null, user);
    });     

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

///user login
app.get('/login',function(req,res){
   res.render('login'); 
});
/////
app.use(flash());


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

app.use(function(req, res, next){
  console.log("Looking for URL : " + req.url);
  next();
});     

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
  res.render('home');
    console.log("Session: %j", session);
});  

app.get('/junk', function(req, res, next){
  console.log('Tried to access /junk');
  throw new Error('/junk doesn\'t exist');
});

app.use(function(err, req, res, next){
  console.log('Error : ' + err.message);
  next();
});


app.get('/contact', function(req,res){
  res.render('contact',{csrf:'csrf token here'})
});

app.get('/thankyou',function(req,res){
   res.render('thankyou'); 
});


app.post('/process',function(req,res){
    console.log('Form :' + req.query.form);
    console.log('CSFR token :' + req.body._csrf);
    console.log('Email :' + req.body.email);
    console.log('Question :' + req.body.ques);
    res.redirect(303,'/thankyou')
});



app.get('/file-upload', function(req, res){
  var now = new Date();
  res.render('file-upload',{
    year: now.getFullYear(),
    month: now.getMonth() });
  });

app.post('/file-upload/:year/:month',
  function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, file){
      if(err)
        return res.redirect(303, '/error');
      else{
      console.log('Received File');
      console.log(file);
      console.log(fields.name);
          
     var MongoClient = mongo.MongoClient;
 
    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/ad';
 
    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
 
        // Get the documents collection
        var collection = db.collection('ad');
 
        // Get the student data passed from the form
//        var newAd = {'buyer name': req.body.inBuyer, 'ad location': req.body.location};
            var newAd = {'buyer name':fields.name, 'ad location':fields.email,'image':file};
 
        // Insert the student data into the database
        collection.insert([newAd], function (err, result){
          if (err) {
            console.log(err);
          } else {
 
            // Redirect to the updated student list
           // res.redirect("thelist");
               return res.redirect('/thankyou');
          }
 
          // Close the database
          db.close();
        });x
 
      }
    });
          
          
          
          
          
       
          }
  
  });
});

//cookies ///////////////////////////////////////////
app.get('/cookie', function(req, res){
  res.cookie('username', 'Sudeepa nadeeshan', {expire: new Date() + 555}).send('username has the value of Derek Banas');
});

app.get('/listcookies', function(req, res){
  console.log("Cookies : ", req.cookies);
  res.send('Look in the console for cookies');
});

app.get('/deletecookie', function(req, res){
  res.clearCookie('username');
  res.send('username Cookie Deleted');
});
//////////////////////////////////////////////

//session/////////////////////////////////////

var session = require('express-session');

var parseurl = require('parseurl');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: credentials.cookieSecret,
}));

app.use(function(req, res, next){
  var views = req.session.views;

  if(!views){
    views = req.session.views = {};
  }

  var pathname = parseurl(req).pathname;
    
  views[pathname] = (views[pathname] || 0) + 1;

  next();

});

app.get('/viewcount', function(req, res, next){
  res.send('You viewed this page ' + req.session.views['/viewcount'] + ' times');
});

////////////////////////////////////
//read and write

var fs = require("fs");

app.get('/readfile', function(req, res, next){
  fs.readFile('./public/randomfile.txt', function(err, data){
      if(err){
        return console.error(err);
      }
      res.send("the File : " + data.toString());
  });
});

app.get('/writefile', function(req, res, next){
  fs.writeFile('./public/randomfile2.txt',
    'More random text', function(err){
      if(err){
        return console.error(err);
      } 
    });

  fs.readFile('./public/randomfile2.txt', function(err, data){
    if(err){
      return console.error(err);
    }
    res.send("The File " + data.toString());
  });

});

//////database

var mongo=require('mongodb');
app.get('/thelist',function(req,res){
   var MongoClient=mongo.MongoClient;
   var url='mongodb://localhost:27017/ad';
   MongoClient.connect(url,function(err, db){    
           if(err){
               console.log('Unable to connect to the sever',err);
       } else{
           console.log("Connection Established");
           var collection =db.collection('ad');
         //     
           collection.find({}).toArray(function(err, result){
              if(err){
                  res.send(err);
              } 
              else if(result.length){
                  
                  console.log(result);
                   res.render('adlist',{
                       'ads':result,'titile':"Result"
                   });
              }else{
                  res.send('No Document found');
              }
               db.close();
           });
       }
    });
});

//// inserting the data into the databse
app.post('/addadvertisement', function(req, res){

    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;
 
    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/ad';
 
    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
 
        // Get the documents collection
        var collection = db.collection('ad');
 
        // Get the student data passed from the form
        var newAd = {'buyer name': req.body.inBuyer, 'ad location': req.body.location};
 
        // Insert the student data into the database
        collection.insert([newAd], function (err, result){
          if (err) {
            console.log(err);
          } else {
 
            // Redirect to the updated student list
            res.redirect("thelist");
          }
 
          // Close the database
          db.close();
        });
 
      }
    });
 
  });


app.get('/create', function(req, res){
  var now = new Date();
  res.render('createAd');
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





