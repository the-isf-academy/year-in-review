import 'bootstrap';
// import './scss/custom.scss';
// We can get the token from the "access_token" query
// param, available in the browsers "location" global
const query = window.location.search.substring(1)
const token = query.split('access_token=')[1]

import { Octokit } from '@octokit/rest';
// Required for side-effects
import {storeUser, display} from './database';


// Call the user info API using the fetch browser library
const octokit = new Octokit({
    auth: token
})
octokit.request("/user")
    .then(res => {
        // Once we get the response (which has many fields)
        // Documented here: https://developer.github.com/v3/users/#get-the-authenticated-user
        // Write "Welcome <user name>" to the documents body
        console.log(res.data)
        const welcomeHeader = document.getElementById("student-welcome")
        if (res.data.name) {
            welcomeHeader.textContent = "👾 Welcome, " + res.data.name;
        }
        storeUser(res);
        display(res.data.login);
    })

octokit.repos.listForAuthenticatedUser({
})
    .then(res => {
        // Listing out the user's repositories
        console.log(res.data)
        res.data.forEach(value => {
            const reposList = document.getElementById("repos-list")
            const li = document.createElement("li")
            const repoName = document.createTextNode(`\n${value.name}`)
            //li.appendChild(repoName)
            //reposList.appendChild(li)
        })
    })
