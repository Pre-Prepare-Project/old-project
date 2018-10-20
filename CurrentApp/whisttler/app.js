const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParsor = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const User = require('./src/models/users.model');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

const authRouter = require('./src/routes/authRoute')(passport);

const profileRouter = require('./src/routes/profileRoute');
const CampaignRouter = require('./src/routes/CampaignRoute');
const socialApiRouter= require('./src/routes/socialApiRoute');
// middelwares
app.use(morgan('tiny'));
app.use(bodyParsor.json());
app.use(bodyParsor.urlencoded({
  extened: true,
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.sendStatus(401);
};

app.use(cookieParser());
app.use(passport.initialize());

// route middelwares
app.use('/api/auth', authRouter);
//app.post('/login',passport.authenticate('local',{failureRedirect:'/error'}),function(req,res){

app.use('/api/profile',isLoggedIn,profileRouter);
app.use('/api/Campaign',isLoggedIn,CampaignRouter);
app.use('/api/SocialApi',isLoggedIn,socialApiRouter);
app.get('/error',function(req,res){
  res.send("error occur");
});
app.listen(port, () => {
  debug(chalk.green(port));
});
