/*
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

 require('dotenv').config()

 import path from 'path'
 import webpack from 'webpack'
 import webpackDevMiddleware from 'webpack-dev-middleware'
 import config from '../../webpack.dev.config.js'

 // Import the express lirbary



var express = require('express');
var cookieParser = require('cookie-parser');
var http = require('http');
var https = require('https');
var admin = require('firebase-admin');
var bodyParser = require('body-parser');


const app = express(),
    DIST_DIR = __dirname,
    INDEX_HTML_FILE = path.join(DIST_DIR, 'index.html'),
    WELCOME_HTML_FILE = path.join(DIST_DIR, 'welcome.html'),
    compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

/**
 * Renders the profile page and serves it in the response.
 * @param {string} endpoint The get profile endpoint.
 * @param {!Object} req The expressjs request.
 * @param {!Object} res The expressjs response.
 * @param {!firebase.auth.DecodedIdToken} decodedClaims The decoded claims from verified
 *     session cookies.
 * @return {!Promise} A promise that resolves on success.
 */
function serveContentForUser(endpoint, req, res, decodedClaims) {
  // Lookup the user information corresponding to cookie and return the profile data for the user.
  return admin.auth().getUser(decodedClaims.sub).then(function(userRecord) {
    var html = '<!DOCTYPE html>' +
      '<html>' +
      '<meta charset="UTF-8">' +
      '<link href="style.css" rel="stylesheet" type="text/css" media="screen" />' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<title>Sample Profile Page</title>' +
      '<body>' +
      '<div id="container">' +
      '  <h3>Welcome to CS9, '+( userRecord.displayName || 'N/A') +'</h3>' +
      '  <div id="loaded">' +
      '    <div id="main">' +
      '      <div id="user-signed-in">' +
      // Show user profile information.
      '        <div id="user-info">' +
      '          <div id="photo-container">' +
      (userRecord.photoURL ? '      <img id="photo" src=' +userRecord.photoURL+ '>' : '') +
      '          </div>' +
      '          <div id="name">' + userRecord.displayName + '</div>' +
      '          <div id="email">'+
      userRecord.email + ' (' + (userRecord.emailVerified ? 'verified' : 'unverified') + ')</div>' +
      '          <div class="clearfix"></div>' +
      '        </div>' +
      '        <p>' +
      // Append button for sign out.
      '          <button id="sign-out" onClick="window.location.assign(\'/logout\')">Sign Out</button>' +
      // Append button for deletion.
      '          <button id="delete-account" onClick="window.location.assign(\'/delete\')">' +
      'Delete account</button>' +
      '        </p>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>' +
      '</body>' +
      '</html>';
    res.set('Content-Type', 'text/html');
    res.end(html);
  });
}

/**
 * Attaches a CSRF token to the request.
 * @param {string} url The URL to check.
 * @param {string} cookie The CSRF token name.
 * @param {string} value The CSRF token value to save.
 * @return {function} The middleware function to run.
 */
function attachCsrfToken(url, cookie, value) {
  return function(req, res, next) {
    console.log("csrf attachment middleware function run");
    console.log("req.url: "+req.url);
    console.log("url: "+ url);
    if (req.url == url) {
      console.log("csrf token attached ib middleware function");
      res.cookie(cookie, value);
    }
    next();
  }
}

/**
 * Checks if a user is signed in and if so, redirects to profile page.
 * @param {string} url The URL to check if signed in.
 * @return {function} The middleware function to run.
 */
function checkIfSignedIn(url) {
  return function(req, res, next) {
    if (req.url == url) {
      var accessToken = res.credential.accessToken;
      var sessionCookie = req.cookies.session || '';
      // User already logged in. Redirect to profile page.
      admin.auth().verifySessionCookie(sessionCookie).then(function(decodedClaims) {
        res.redirect('/welcome.html?access_token='+accessToken);
      }).catch(function(error) {
        next();
      });
    } else {
      next();
    }
  }
}

// Initialize Admin SDK.
admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKeys.json')
});
// Support JSON-encoded bodies.
app.use(bodyParser.json());
// Support URL-encoded bodies.
app.use(bodyParser.urlencoded({
  extended: true
}));
// Support cookie manipulation.
app.use(cookieParser());
// Attach CSRF token on each request.
app.use(attachCsrfToken('/*', 'csrfToken', (Math.random()* 100000000000000000).toString()));
// // If a user is signed in, redirect to profile page.
// app.use(checkIfSignedIn('/',));
// Serve static content from public folder.
app.use('/', express.static('public'));

/** Get profile endpoint. */
app.get('/profile', function (req, res) {
  // Get session cookie.
  var sessionCookie = req.cookies.session || '';
  // Get the session cookie and verify it. In this case, we are verifying if the
  // Firebase session was revoked, user deleted/disabled, etc.
  admin.auth().verifySessionCookie(sessionCookie, true /** check if revoked. */)
    .then(function(decodedClaims) {
      // Serve content for signed in user.
      return serveContentForUser('/profile', req, res, decodedClaims);
    }).catch(function(error) {
      // Force user to login.
      res.redirect('/');
    });
});

/** Session login endpoint. */
app.post('/sessionLogin', function (req, res) {
  // Get ID token and CSRF token.
  var idToken = req.body.idToken.toString();
  var csrfToken = req.body.csrfToken.toString();

  console.log("csrf token on post for /sessionLogin: "+csrfToken);


  // Guard against CSRF attacks.
  if (!req.cookies || csrfToken !== req.cookies.csrfToken) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
    return;
  }
  // Set session expiration to 5 days.
  var expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // We could also choose to enforce that the ID token auth_time is recent.
  admin.auth().verifyIdToken(idToken).then(function(decodedClaims) {
    // In this case, we are enforcing that the user signed in in the last 5 minutes.
    if (new Date().getTime() / 1000 - decodedClaims.auth_time < 5 * 60) {
      return admin.auth().createSessionCookie(idToken, {expiresIn: expiresIn});
    }
    throw new Error('UNAUTHORIZED REQUEST!');
  })
  .then(function(sessionCookie) {
    // Note httpOnly cookie will not be accessible from javascript.
    // secure flag should be set to true in production.
    var options = {maxAge: expiresIn, httpOnly: true, secure: false /** to test in localhost */};
    res.cookie('session', sessionCookie, options);
    res.end(JSON.stringify({status: 'success'}));
  })
  .catch(function(error) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
  });
});

/** User signout endpoint. */
app.get('/logout', function (req, res) {
  // Clear cookie.
  var sessionCookie = req.cookies.session || '';
  res.clearCookie('session');
  // Revoke session too. Note this will revoke all user sessions.
  if (sessionCookie) {
    admin.auth().verifySessionCookie(sessionCookie, true).then(function(decodedClaims) {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(function() {
      // Redirect to login page on success.
      res.redirect('/');
    })
    .catch(function() {
      // Redirect to login page on error.
      res.redirect('/');
    });
  } else {
    // Redirect to login page when no session cookie available.
    res.redirect('/');
  }
});

/** User delete endpoint. */
app.get('/delete', function (req, res) {
  var sessionCookie = req.cookies.session || '';
  res.clearCookie('session');
  if (sessionCookie) {
    // Verify user and then delete the user.
    admin.auth().verifySessionCookie(sessionCookie, true).then(function(decodedClaims) {
      return admin.auth().deleteUser(decodedClaims.sub);
    })
    .then(function() {
      // Redirect to login page on success.
      res.redirect('/');
    })
    .catch(function() {
      // Redirect to login page on error.
      res.redirect('/');
    });
  } else {
    // Redirect to login page when no session cookie available.
    res.redirect('/');
  }
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit server.')
})
