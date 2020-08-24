const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const cas = require('passport-apereo-cas');


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log('ASU SSO example running');
    res.send("ASU SSO example running");
});

app.get("/login", passport.authenticate('cas'));

passport.use(new (require('passport-cas').Strategy)({
    version: 'CAS3.0',
    ssoBaseURL: 'https://weblogin.asu.edu/cas',
    serverBaseURL: 'http://localhost:8000/auth',
    validateURL: 'https://weblogin.asu.edu/cas/serviceValidate'
}, function (profile, done) {
    console.log(profile);
}));

app.listen(8000, () => {
    console.log("Listening on http://0.0.0.0:8000");
});