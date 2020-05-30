require('dotenv').config()

import path from 'path'

// Import the express lirbary
import express from 'express'

// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
// Import the axios library, to make HTTP requests
import axios from 'axios'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import config from '../../webpack.dev.config.js'

// This is the client ID and client secret that you obtained
// while registering the application
const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

const app = express(),
    DIST_DIR = __dirname,
    INDEX_HTML_FILE = path.join(DIST_DIR, 'index.html'),
    WELCOME_HTML_FILE = path.join(DIST_DIR, 'welcome.html'),
    compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

// Declare the redirect route
app.get('/oauth/redirect', (req, res) => {
    // The req.query object has the query params that
    // were sent to this route. We want the `code` param
    const requestToken = req.query.code
    axios({
        // make a POST request
        method: 'post',
        // to the Github authentication API, with the client ID, client secret
        // and request token
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        // Set the content type header, so that we get the response in JSOn
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        // Once we get the response, extract the access token from
        // the response body
        const accessToken = response.data.access_token
        console.log(response)
        // redirect the user to the welcome page, along with the access token
        res.redirect(`/welcome.html?access_token=${accessToken}`)
    })
})

app.use(express.static(DIST_DIR))

app.get('/', (req, res, next) => {
    console.log("getting index")
    compiler.outputFileSystem.readFile(INDEX_HTML_FILE, (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

app.get('/welcome.html*', (req, res, next) => {
    console.log("getting welcome")
    compiler.outputFileSystem.readFile(WELCOME_HTML_FILE, (err, result) => {
        if (err) {
            return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})
// Start the server on port 8080
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit server.')
})

