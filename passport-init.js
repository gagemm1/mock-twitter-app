var LocalStrategy   = require('passport-local').Strategy; //passport has strategies like this
var bCrypt = require('bcrypt-nodejs'); //the rest of this stuff the guy in tutorial just copy and pasted. 
//temporary data store
var users = {};
module.exports = function(passport){ //when passport is called, it needs a unique identifier for that user. We can use the username for the unique identifier if we want. 
    //exports is kinda like public in java
    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        
        //tell passport which id to use for user
        console.log('serializing user:',user.username);
        return done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        //return user object back
        return done(null,users[username]);

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            //check if user exists
            if(!user[username]){
                return done('user not found', false)
            }
            //check if password is correct
            if(!isValidPassword(users[username],password)){
                return done('invalid password',false);
            }
            //successfully signed in
            console.log('successfully logged in');
            return done(null,users[username]);
        }

    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            //check if user already exists
            if(users[username]){
                return done('username already taken', false);
            }
            //add user to db
            users[username] = {
                username: username,
                password:createHash(password)
            };
            return done(null, users[username]); //when you call a callback, your first parameter is usually an error while using nodejs so that's why the first parameter here is null

        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};